-- Migration: 001_professional_services_architecture.sql
-- Purpose: Create multi-professional service architecture for Apulink
-- Author: System
-- Date: 2025-01-17

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing views if they exist (to handle re-runs)
DROP VIEW IF EXISTS v_service_bundles CASCADE;
DROP VIEW IF EXISTS v_professional_services CASCADE;
DROP VIEW IF EXISTS v_service_hierarchy CASCADE;

-- Create professional types table
CREATE TABLE IF NOT EXISTS professional_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_it TEXT,
    icon VARCHAR(50),
    category VARCHAR(50) NOT NULL,
    requires_certification BOOLEAN DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create professional categories
CREATE TABLE IF NOT EXISTS professional_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_it TEXT,
    icon VARCHAR(50),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create service categories (top level)
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_it TEXT,
    icon VARCHAR(50),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create service subcategories
CREATE TABLE IF NOT EXISTS service_subcategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES service_categories(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_it TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subcategory_id UUID REFERENCES service_subcategories(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_it TEXT,
    typical_duration_days INTEGER,
    requires_site_visit BOOLEAN DEFAULT false,
    requires_documents BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pricing models
CREATE TABLE IF NOT EXISTS pricing_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    unit_en VARCHAR(50),
    unit_it VARCHAR(50),
    description_en TEXT,
    description_it TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Map which professional types can offer which services
CREATE TABLE IF NOT EXISTS professional_type_services (
    professional_type_id UUID REFERENCES professional_types(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    typical_price_min DECIMAL(10,2),
    typical_price_max DECIMAL(10,2),
    pricing_model_id UUID REFERENCES pricing_models(id),
    PRIMARY KEY (professional_type_id, service_id)
);

-- Professional services (what services each professional offers)
CREATE TABLE IF NOT EXISTS professional_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    pricing_model_id UUID REFERENCES pricing_models(id),
    base_price DECIMAL(10,2),
    price_unit VARCHAR(50),
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    duration_days INTEGER,
    experience_years INTEGER,
    completed_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(professional_id, service_id)
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    issuing_body VARCHAR(100),
    professional_type_id UUID REFERENCES professional_types(id),
    is_required BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Professional certifications
CREATE TABLE IF NOT EXISTS professional_certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
    certification_id UUID REFERENCES certifications(id) ON DELETE CASCADE,
    certificate_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(professional_id, certification_id)
);

-- Add professional_type_id to professionals table
ALTER TABLE professionals 
ADD COLUMN IF NOT EXISTS professional_type_id UUID REFERENCES professional_types(id);

-- Update inquiries table to support multiple services
ALTER TABLE inquiries
ADD COLUMN IF NOT EXISTS service_ids UUID[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS bundle_id UUID,
ADD COLUMN IF NOT EXISTS estimated_budget DECIMAL(10,2);

-- Create inquiry services junction table
CREATE TABLE IF NOT EXISTS inquiry_services (
    inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    notes TEXT,
    PRIMARY KEY (inquiry_id, service_id)
);

-- Create quotes services table (breakdown of quote by service)
CREATE TABLE IF NOT EXISTS quote_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    pricing_model_id UUID REFERENCES pricing_models(id),
    quantity DECIMAL(10,2) DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    duration_days INTEGER,
    notes TEXT
);

-- Create service bundles
CREATE TABLE IF NOT EXISTS service_bundles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_it TEXT,
    typical_price_min DECIMAL(10,2),
    typical_price_max DECIMAL(10,2),
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bundle services junction table
CREATE TABLE IF NOT EXISTS bundle_services (
    bundle_id UUID REFERENCES service_bundles(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    PRIMARY KEY (bundle_id, service_id)
);

-- Create service requirements (documents, prerequisites)
CREATE TABLE IF NOT EXISTS service_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    requirement_type VARCHAR(50) NOT NULL, -- 'document', 'prerequisite', 'certification'
    code VARCHAR(50) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_it VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_it TEXT,
    is_mandatory BOOLEAN DEFAULT true
);

-- Create views for easier querying

-- Service hierarchy view
CREATE VIEW v_service_hierarchy AS
SELECT 
    s.id AS service_id,
    s.code AS service_code,
    s.name_en AS service_name_en,
    s.name_it AS service_name_it,
    s.description_en AS service_description_en,
    s.description_it AS service_description_it,
    s.typical_duration_days,
    s.requires_site_visit,
    s.requires_documents,
    s.is_active AS service_active,
    ss.id AS subcategory_id,
    ss.code AS subcategory_code,
    ss.name_en AS subcategory_name_en,
    ss.name_it AS subcategory_name_it,
    sc.id AS category_id,
    sc.code AS category_code,
    sc.name_en AS category_name_en,
    sc.name_it AS category_name_it,
    sc.icon AS category_icon
FROM services s
JOIN service_subcategories ss ON s.subcategory_id = ss.id
JOIN service_categories sc ON ss.category_id = sc.id
WHERE s.is_active = true AND ss.is_active = true AND sc.is_active = true;

-- Professional services view
CREATE VIEW v_professional_services AS
SELECT 
    ps.*,
    p.first_name,
    p.last_name,
    p.company_name,
    p.service_areas,
    p.is_verified,
    p.rating AS professional_rating,
    pt.name_en AS professional_type_en,
    pt.name_it AS professional_type_it,
    s.name_en AS service_name_en,
    s.name_it AS service_name_it,
    pm.name_en AS pricing_model_en,
    pm.name_it AS pricing_model_it,
    pm.unit_en AS price_unit_en,
    pm.unit_it AS price_unit_it
FROM professional_services ps
JOIN professionals p ON ps.professional_id = p.id
JOIN professional_types pt ON p.professional_type_id = pt.id
JOIN services s ON ps.service_id = s.id
LEFT JOIN pricing_models pm ON ps.pricing_model_id = pm.id
WHERE ps.is_active = true AND p.is_active = true;

-- Service bundles view
CREATE VIEW v_service_bundles AS
SELECT 
    sb.*,
    array_agg(
        json_build_object(
            'service_id', s.id,
            'service_code', s.code,
            'service_name_en', s.name_en,
            'service_name_it', s.name_it,
            'is_required', bs.is_required,
            'typical_duration_days', s.typical_duration_days
        ) ORDER BY bs.display_order
    ) AS services
FROM service_bundles sb
JOIN bundle_services bs ON sb.id = bs.bundle_id
JOIN services s ON bs.service_id = s.id
WHERE sb.is_active = true
GROUP BY sb.id;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_professional_services_professional ON professional_services(professional_id);
CREATE INDEX IF NOT EXISTS idx_professional_services_service ON professional_services(service_id);
CREATE INDEX IF NOT EXISTS idx_inquiry_services_inquiry ON inquiry_services(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_inquiry_services_service ON inquiry_services(service_id);
CREATE INDEX IF NOT EXISTS idx_professionals_type ON professionals(professional_type_id);
CREATE INDEX IF NOT EXISTS idx_services_subcategory ON services(subcategory_id);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_professional_types_updated_at BEFORE UPDATE ON professional_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professional_services_updated_at BEFORE UPDATE ON professional_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
