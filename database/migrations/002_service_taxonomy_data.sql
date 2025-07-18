-- Migration: 002_service_taxonomy_data.sql
-- Purpose: Populate service taxonomy with comprehensive property investment services
-- Author: System
-- Date: 2025-01-17

-- Insert Professional Categories
INSERT INTO professional_categories (code, name_en, name_it, icon, display_order) VALUES
('technical', 'Technical Professionals', 'Professionisti Tecnici', '📐', 1),
('legal', 'Legal Professionals', 'Professionisti Legali', '⚖️', 2),
('financial', 'Financial Professionals', 'Professionisti Finanziari', '💰', 3),
('administrative', 'Administrative Services', 'Servizi Amministrativi', '📋', 4),
('construction', 'Construction & Trades', 'Costruzione e Mestieri', '🔨', 5),
('real_estate', 'Real Estate Services', 'Servizi Immobiliari', '🏠', 6)
ON CONFLICT (code) DO NOTHING;

-- Insert Professional Types
INSERT INTO professional_types (code, name_en, name_it, icon, category, requires_certification, display_order) VALUES
('surveyor', 'Surveyor/Geometra', 'Geometra', '📐', 'technical', true, 1),
('architect', 'Architect', 'Architetto', '🏛️', 'technical', true, 2),
('engineer', 'Engineer', 'Ingegnere', '👷', 'technical', true, 3),
('notary', 'Notary', 'Notaio', '📜', 'legal', true, 4),
('lawyer', 'Lawyer', 'Avvocato', '⚖️', 'legal', true, 5),
('accountant', 'Accountant', 'Commercialista', '📊', 'financial', true, 6),
('tax_advisor', 'Tax Advisor', 'Consulente Fiscale', '💼', 'financial', true, 7),
('real_estate_agent', 'Real Estate Agent', 'Agente Immobiliare', '🏘️', 'real_estate', false, 8),
('contractor', 'General Contractor', 'Imprenditore Edile', '🏗️', 'construction', false, 9),
('translator', 'Translator', 'Traduttore', '🌐', 'administrative', false, 10),
('property_manager', 'Property Manager', 'Gestore Immobiliare', '🏢', 'real_estate', false, 11),
('inspector', 'Building Inspector', 'Ispettore Edilizio', '🔍', 'technical', true, 12)
ON CONFLICT (code) DO NOTHING;

-- Insert Pricing Models
INSERT INTO pricing_models (code, name_en, name_it, unit_en, unit_it) VALUES
('hourly', 'Hourly Rate', 'Tariffa Oraria', 'hour', 'ora'),
('fixed', 'Fixed Price', 'Prezzo Fisso', 'project', 'progetto'),
('project', 'Project Based', 'A Progetto', 'project', 'progetto'),
('percentage', 'Percentage', 'Percentuale', '%', '%'),
('per_sqm', 'Per Square Meter', 'Per Metro Quadro', 'sqm', 'mq'),
('daily', 'Daily Rate', 'Tariffa Giornaliera', 'day', 'giorno')
ON CONFLICT (code) DO NOTHING;

-- Insert Service Categories
INSERT INTO service_categories (code, name_en, name_it, icon, display_order) VALUES
('property_search', 'Property Search & Evaluation', 'Ricerca e Valutazione Immobiliare', '🔍', 1),
('legal_services', 'Legal & Compliance', 'Servizi Legali e Conformità', '⚖️', 2),
('technical_assessment', 'Technical Assessment', 'Valutazione Tecnica', '📐', 3),
('financial_services', 'Financial & Tax Services', 'Servizi Finanziari e Fiscali', '💰', 4),
('renovation_construction', 'Renovation & Construction', 'Ristrutturazione e Costruzione', '🔨', 5),
('property_management', 'Property Management', 'Gestione Immobiliare', '🏠', 6),
('administrative_support', 'Administrative Support', 'Supporto Amministrativo', '📋', 7)
ON CONFLICT (code) DO NOTHING;

-- Insert Service Subcategories
INSERT INTO service_subcategories (category_id, code, name_en, name_it, display_order) VALUES
-- Property Search & Evaluation
((SELECT id FROM service_categories WHERE code = 'property_search'), 'property_sourcing', 'Property Sourcing', 'Ricerca Immobili', 1),
((SELECT id FROM service_categories WHERE code = 'property_search'), 'valuation', 'Valuation & Appraisal', 'Valutazione e Stima', 2),
((SELECT id FROM service_categories WHERE code = 'property_search'), 'market_analysis', 'Market Analysis', 'Analisi di Mercato', 3),

-- Legal & Compliance
((SELECT id FROM service_categories WHERE code = 'legal_services'), 'due_diligence', 'Due Diligence', 'Due Diligence', 1),
((SELECT id FROM service_categories WHERE code = 'legal_services'), 'contracts', 'Contracts & Agreements', 'Contratti e Accordi', 2),
((SELECT id FROM service_categories WHERE code = 'legal_services'), 'compliance', 'Regulatory Compliance', 'Conformità Normativa', 3),

-- Technical Assessment
((SELECT id FROM service_categories WHERE code = 'technical_assessment'), 'structural', 'Structural Assessment', 'Valutazione Strutturale', 1),
((SELECT id FROM service_categories WHERE code = 'technical_assessment'), 'systems', 'Systems & Utilities', 'Impianti e Utenze', 2),
((SELECT id FROM service_categories WHERE code = 'technical_assessment'), 'energy', 'Energy Efficiency', 'Efficienza Energetica', 3),

-- Financial & Tax Services
((SELECT id FROM service_categories WHERE code = 'financial_services'), 'tax_planning', 'Tax Planning', 'Pianificazione Fiscale', 1),
((SELECT id FROM service_categories WHERE code = 'financial_services'), 'financing', 'Financing & Mortgages', 'Finanziamenti e Mutui', 2),
((SELECT id FROM service_categories WHERE code = 'financial_services'), 'accounting', 'Accounting Services', 'Servizi Contabili', 3),

-- Renovation & Construction
((SELECT id FROM service_categories WHERE code = 'renovation_construction'), 'design', 'Design & Planning', 'Progettazione', 1),
((SELECT id FROM service_categories WHERE code = 'renovation_construction'), 'construction', 'Construction Works', 'Lavori Edili', 2),
((SELECT id FROM service_categories WHERE code = 'renovation_construction'), 'restoration', 'Restoration', 'Restauro', 3),

-- Property Management
((SELECT id FROM service_categories WHERE code = 'property_management'), 'rental_management', 'Rental Management', 'Gestione Affitti', 1),
((SELECT id FROM service_categories WHERE code = 'property_management'), 'maintenance', 'Maintenance', 'Manutenzione', 2),
((SELECT id FROM service_categories WHERE code = 'property_management'), 'utilities', 'Utilities Management', 'Gestione Utenze', 3),

-- Administrative Support
((SELECT id FROM service_categories WHERE code = 'administrative_support'), 'documentation', 'Documentation', 'Documentazione', 1),
((SELECT id FROM service_categories WHERE code = 'administrative_support'), 'translation', 'Translation Services', 'Servizi di Traduzione', 2),
((SELECT id FROM service_categories WHERE code = 'administrative_support'), 'relocation', 'Relocation Services', 'Servizi di Trasferimento', 3)
ON CONFLICT (code) DO NOTHING;

-- Insert Services (Sample set - expand as needed)
INSERT INTO services (subcategory_id, code, name_en, name_it, typical_duration_days, requires_site_visit, requires_documents) VALUES
-- Property Sourcing Services
((SELECT id FROM service_subcategories WHERE code = 'property_sourcing'), 'property_search', 'Property Search Service', 'Servizio Ricerca Immobili', 30, true, false),
((SELECT id FROM service_subcategories WHERE code = 'property_sourcing'), 'viewing_coordination', 'Viewing Coordination', 'Coordinamento Visite', 7, true, false),
((SELECT id FROM service_subcategories WHERE code = 'property_sourcing'), 'negotiation_support', 'Negotiation Support', 'Supporto Negoziazione', 14, false, true),

-- Valuation Services
((SELECT id FROM service_subcategories WHERE code = 'valuation'), 'market_valuation', 'Market Valuation', 'Valutazione di Mercato', 5, true, true),
((SELECT id FROM service_subcategories WHERE code = 'valuation'), 'bank_valuation', 'Bank Valuation', 'Perizia Bancaria', 7, true, true),
((SELECT id FROM service_subcategories WHERE code = 'valuation'), 'investment_analysis', 'Investment Analysis', 'Analisi Investimento', 7, false, true),

-- Due Diligence Services
((SELECT id FROM service_subcategories WHERE code = 'due_diligence'), 'legal_due_diligence', 'Legal Due Diligence', 'Due Diligence Legale', 10, false, true),
((SELECT id FROM service_subcategories WHERE code = 'due_diligence'), 'title_verification', 'Title Verification', 'Verifica Titolo', 5, false, true),
((SELECT id FROM service_subcategories WHERE code = 'due_diligence'), 'planning_check', 'Planning Permission Check', 'Verifica Permessi', 7, false, true),

-- Contract Services
((SELECT id FROM service_subcategories WHERE code = 'contracts'), 'purchase_contract', 'Purchase Contract', 'Contratto di Acquisto', 14, false, true),
((SELECT id FROM service_subcategories WHERE code = 'contracts'), 'preliminary_contract', 'Preliminary Contract', 'Compromesso', 7, false, true),
((SELECT id FROM service_subcategories WHERE code = 'contracts'), 'deed_preparation', 'Deed Preparation', 'Preparazione Rogito', 21, false, true),

-- Structural Assessment Services
((SELECT id FROM service_subcategories WHERE code = 'structural'), 'structural_survey', 'Structural Survey', 'Perizia Strutturale', 3, true, true),
((SELECT id FROM service_subcategories WHERE code = 'structural'), 'seismic_assessment', 'Seismic Assessment', 'Valutazione Sismica', 5, true, true),
((SELECT id FROM service_subcategories WHERE code = 'structural'), 'foundation_analysis', 'Foundation Analysis', 'Analisi Fondazioni', 3, true, true),

-- Systems Assessment Services
((SELECT id FROM service_subcategories WHERE code = 'systems'), 'electrical_inspection', 'Electrical System Inspection', 'Ispezione Impianto Elettrico', 1, true, false),
((SELECT id FROM service_subcategories WHERE code = 'systems'), 'plumbing_inspection', 'Plumbing Inspection', 'Ispezione Idraulica', 1, true, false),
((SELECT id FROM service_subcategories WHERE code = 'systems'), 'hvac_inspection', 'HVAC Inspection', 'Ispezione Climatizzazione', 1, true, false),

-- Energy Services
((SELECT id FROM service_subcategories WHERE code = 'energy'), 'energy_certificate', 'Energy Performance Certificate', 'APE - Attestato Prestazione Energetica', 5, true, true),
((SELECT id FROM service_subcategories WHERE code = 'energy'), 'energy_audit', 'Energy Audit', 'Audit Energetico', 3, true, true),
((SELECT id FROM service_subcategories WHERE code = 'energy'), 'renewable_assessment', 'Renewable Energy Assessment', 'Valutazione Energie Rinnovabili', 5, true, false),

-- Tax Services
((SELECT id FROM service_subcategories WHERE code = 'tax_planning'), 'tax_consultation', 'Tax Consultation', 'Consulenza Fiscale', 3, false, true),
((SELECT id FROM service_subcategories WHERE code = 'tax_planning'), 'imu_calculation', 'IMU Tax Calculation', 'Calcolo IMU', 1, false, true),
((SELECT id FROM service_subcategories WHERE code = 'tax_planning'), 'tax_residency', 'Tax Residency Planning', 'Pianificazione Residenza Fiscale', 14, false, true),

-- Financing Services
((SELECT id FROM service_subcategories WHERE code = 'financing'), 'mortgage_brokerage', 'Mortgage Brokerage', 'Intermediazione Mutui', 30, false, true),
((SELECT id FROM service_subcategories WHERE code = 'financing'), 'financial_planning', 'Financial Planning', 'Pianificazione Finanziaria', 7, false, true),

-- Design Services
((SELECT id FROM service_subcategories WHERE code = 'design'), 'architectural_design', 'Architectural Design', 'Progettazione Architettonica', 60, true, true),
((SELECT id FROM service_subcategories WHERE code = 'design'), 'interior_design', 'Interior Design', 'Design Interni', 45, true, false),
((SELECT id FROM service_subcategories WHERE code = 'design'), 'landscape_design', 'Landscape Design', 'Progettazione Giardini', 30, true, false),

-- Construction Services
((SELECT id FROM service_subcategories WHERE code = 'construction'), 'general_renovation', 'General Renovation', 'Ristrutturazione Generale', 180, true, true),
((SELECT id FROM service_subcategories WHERE code = 'construction'), 'bathroom_renovation', 'Bathroom Renovation', 'Ristrutturazione Bagno', 30, true, true),
((SELECT id FROM service_subcategories WHERE code = 'construction'), 'kitchen_renovation', 'Kitchen Renovation', 'Ristrutturazione Cucina', 45, true, true),

-- Restoration Services
((SELECT id FROM service_subcategories WHERE code = 'restoration'), 'trullo_restoration', 'Trullo Restoration', 'Restauro Trullo', 180, true, true),
((SELECT id FROM service_subcategories WHERE code = 'restoration'), 'masseria_restoration', 'Masseria Restoration', 'Restauro Masseria', 365, true, true),
((SELECT id FROM service_subcategories WHERE code = 'restoration'), 'historic_restoration', 'Historic Building Restoration', 'Restauro Edificio Storico', 365, true, true),

-- Property Management Services
((SELECT id FROM service_subcategories WHERE code = 'rental_management'), 'rental_listing', 'Rental Listing Service', 'Servizio Annunci Affitto', 7, true, false),
((SELECT id FROM service_subcategories WHERE code = 'rental_management'), 'tenant_management', 'Tenant Management', 'Gestione Inquilini', 365, false, true),
((SELECT id FROM service_subcategories WHERE code = 'rental_management'), 'airbnb_management', 'Airbnb Management', 'Gestione Airbnb', 365, true, false),

-- Maintenance Services
((SELECT id FROM service_subcategories WHERE code = 'maintenance'), 'routine_maintenance', 'Routine Maintenance', 'Manutenzione Ordinaria', 365, true, false),
((SELECT id FROM service_subcategories WHERE code = 'maintenance'), 'emergency_repairs', 'Emergency Repairs', 'Riparazioni Emergenza', 1, true, false),
((SELECT id FROM service_subcategories WHERE code = 'maintenance'), 'pool_maintenance', 'Pool Maintenance', 'Manutenzione Piscina', 365, true, false),

-- Documentation Services
((SELECT id FROM service_subcategories WHERE code = 'documentation'), 'document_retrieval', 'Document Retrieval', 'Recupero Documenti', 14, false, false),
((SELECT id FROM service_subcategories WHERE code = 'documentation'), 'cadastral_update', 'Cadastral Update', 'Aggiornamento Catastale', 30, false, true),
((SELECT id FROM service_subcategories WHERE code = 'documentation'), 'permit_application', 'Permit Application', 'Richiesta Permessi', 60, false, true),

-- Translation Services
((SELECT id FROM service_subcategories WHERE code = 'translation'), 'document_translation', 'Document Translation', 'Traduzione Documenti', 7, false, true),
((SELECT id FROM service_subcategories WHERE code = 'translation'), 'certified_translation', 'Certified Translation', 'Traduzione Giurata', 14, false, true),
((SELECT id FROM service_subcategories WHERE code = 'translation'), 'interpretation_service', 'Interpretation Service', 'Servizio Interpretariato', 1, true, false)
ON CONFLICT (code) DO NOTHING;

-- Map Professional Types to Services (Sample mappings)
INSERT INTO professional_type_services (professional_type_id, service_id, is_primary, typical_price_min, typical_price_max, pricing_model_id) VALUES
-- Surveyor/Geometra Services
((SELECT id FROM professional_types WHERE code = 'surveyor'), (SELECT id FROM services WHERE code = 'structural_survey'), true, 500, 1500, (SELECT id FROM pricing_models WHERE code = 'fixed')),
((SELECT id FROM professional_types WHERE code = 'surveyor'), (SELECT id FROM services WHERE code = 'cadastral_update'), true, 300, 800, (SELECT id FROM pricing_models WHERE code = 'fixed')),
((SELECT id FROM professional_types WHERE code = 'surveyor'), (SELECT id FROM services WHERE code = 'energy_certificate'), true, 150, 400, (SELECT id FROM pricing_models WHERE code = 'fixed')),
((SELECT id FROM professional_types WHERE code = 'surveyor'), (SELECT id FROM services WHERE code = 'market_valuation'), true, 400, 1000, (SELECT id FROM pricing_models WHERE code = 'fixed')),

-- Architect Services
((SELECT id FROM professional_types WHERE code = 'architect'), (SELECT id FROM services WHERE code = 'architectural_design'), true, 50, 150, (SELECT id FROM pricing_models WHERE code = 'per_sqm')),
((SELECT id FROM professional_types WHERE code = 'architect'), (SELECT id FROM services WHERE code = 'interior_design'), true, 2000, 10000, (SELECT id FROM pricing_models WHERE code = 'project')),
((SELECT id FROM professional_types WHERE code = 'architect'), (SELECT id FROM services WHERE code = 'permit_application'), false, 1000, 5000, (SELECT id FROM pricing_models WHERE code = 'fixed')),

-- Notary Services
((SELECT id FROM professional_types WHERE code = 'notary'), (SELECT id FROM services WHERE code = 'deed_preparation'), true, 2000, 5000, (SELECT id FROM pricing_models WHERE code = 'percentage')),
((SELECT id FROM professional_types WHERE code = 'notary'), (SELECT id FROM services WHERE code = 'purchase_contract'), true, 1500, 3000, (SELECT id FROM pricing_models WHERE code = 'fixed')),

-- Lawyer Services
((SELECT id FROM professional_types WHERE code = 'lawyer'), (SELECT id FROM services WHERE code = 'legal_due_diligence'), true, 150, 300, (SELECT id FROM pricing_models WHERE code = 'hourly')),
((SELECT id FROM professional_types WHERE code = 'lawyer'), (SELECT id FROM services WHERE code = 'title_verification'), true, 500, 1500, (SELECT id FROM pricing_models WHERE code = 'fixed')),
((SELECT id FROM professional_types WHERE code = 'lawyer'), (SELECT id FROM services WHERE code = 'preliminary_contract'), true, 1000, 2500, (SELECT id FROM pricing_models WHERE code = 'fixed')),

-- Real Estate Agent Services
((SELECT id FROM professional_types WHERE code = 'real_estate_agent'), (SELECT id FROM services WHERE code = 'property_search'), true, 0, 0, (SELECT id FROM pricing_models WHERE code = 'percentage')),
((SELECT id FROM professional_types WHERE code = 'real_estate_agent'), (SELECT id FROM services WHERE code = 'viewing_coordination'), true, 100, 300, (SELECT id FROM pricing_models WHERE code = 'daily')),
((SELECT id FROM professional_types WHERE code = 'real_estate_agent'), (SELECT id FROM services WHERE code = 'negotiation_support'), true, 0, 0, (SELECT id FROM pricing_models WHERE code = 'percentage'))
ON CONFLICT DO NOTHING;

-- Create Service Bundles
INSERT INTO service_bundles (code, name_en, name_it, description_en, description_it, typical_price_min, typical_price_max, discount_percentage, is_featured) VALUES
('buyer_essential', 'Essential Buyer Package', 'Pacchetto Acquirente Essenziale', 'Core services for property purchase', 'Servizi essenziali per acquisto immobiliare', 2000, 4000, 10, true),
('buyer_complete', 'Complete Buyer Package', 'Pacchetto Acquirente Completo', 'Comprehensive support for international buyers', 'Supporto completo per acquirenti internazionali', 5000, 10000, 15, true),
('renovation_basic', 'Basic Renovation Package', 'Pacchetto Ristrutturazione Base', 'Essential renovation planning services', 'Servizi essenziali pianificazione ristrutturazione', 3000, 6000, 10, false),
('renovation_full', 'Full Renovation Package', 'Pacchetto Ristrutturazione Completo', 'Complete renovation management', 'Gestione completa ristrutturazione', 10000, 25000, 20, true),
('investment_package', 'Investment Property Package', 'Pacchetto Investimento Immobiliare', 'Services for rental property investors', 'Servizi per investitori immobiliari', 4000, 8000, 15, false),
('relocation_package', 'Relocation Support Package', 'Pacchetto Supporto Trasferimento', 'Complete relocation assistance', 'Assistenza completa al trasferimento', 3000, 6000, 10, false)
ON CONFLICT (code) DO NOTHING;

-- Map Services to Bundles
INSERT INTO bundle_services (bundle_id, service_id, is_required, display_order) VALUES
-- Essential Buyer Package
((SELECT id FROM service_bundles WHERE code = 'buyer_essential'), (SELECT id FROM services WHERE code = 'legal_due_diligence'), true, 1),
((SELECT id FROM service_bundles WHERE code = 'buyer_essential'), (SELECT id FROM services WHERE code = 'structural_survey'), true, 2),
((SELECT id FROM service_bundles WHERE code = 'buyer_essential'), (SELECT id FROM services WHERE code = 'market_valuation'), true, 3),
((SELECT id FROM service_bundles WHERE code = 'buyer_essential'), (SELECT id FROM services WHERE code = 'energy_certificate'), false, 4),

-- Complete Buyer Package
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'property_search'), true, 1),
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'legal_due_diligence'), true, 2),
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'structural_survey'), true, 3),
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'market_valuation'), true, 4),
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'negotiation_support'), true, 5),
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'deed_preparation'), true, 6),
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'tax_consultation'), false, 7),
((SELECT id FROM service_bundles WHERE code = 'buyer_complete'), (SELECT id FROM services WHERE code = 'document_translation'), false, 8)
ON CONFLICT DO NOTHING;

-- Update existing professionals to have a professional_type_id
UPDATE professionals 
SET professional_type_id = (SELECT id FROM professional_types WHERE code = 'surveyor')
WHERE profession = 'geometra' AND professional_type_id IS NULL;

-- Migrate existing surveyor data to new structure
INSERT INTO professional_services (
    professional_id,
    service_id,
    pricing_model_id,
    base_price,
    experience_years,
    is_active
)
SELECT 
    p.id,
    s.id,
    pm.id,
    500, -- Default base price
    CASE 
        WHEN p.years_experience = '0-2' THEN 1
        WHEN p.years_experience = '3-5' THEN 4
        WHEN p.years_experience = '6-10' THEN 8
        WHEN p.years_experience = '11-20' THEN 15
        ELSE 25
    END,
    true
FROM professionals p
CROSS JOIN services s
JOIN pricing_models pm ON pm.code = 'fixed'
WHERE p.professional_type_id = (SELECT id FROM professional_types WHERE code = 'surveyor')
AND s.code IN ('structural_survey', 'market_valuation', 'energy_certificate', 'cadastral_update')
ON CONFLICT (professional_id, service_id) DO NOTHING;
