-- PATH: supabase/migrations/flexible_profession_types.sql
-- Migration to make profession types flexible and manageable

-- Step 1: Create profession_types table if it doesn't exist
CREATE TABLE IF NOT EXISTS profession_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name_it VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  description_it TEXT,
  description_en TEXT,
  is_active BOOLEAN DEFAULT true,
  requires_license BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Insert all existing profession types
INSERT INTO profession_types (code, name_it, name_en, requires_license, display_order) VALUES
  ('geometra', 'Geometra', 'Surveyor', true, 1),
  ('architect', 'Architetto', 'Architect', true, 2),
  ('lawyer', 'Avvocato', 'Lawyer', true, 3),
  ('notary', 'Notaio', 'Notary', true, 4),
  ('realtor', 'Agente Immobiliare', 'Real Estate Agent', true, 5),
  ('contractor', 'Impresa Edile', 'Construction Company', true, 6),
  ('accountant', 'Commercialista', 'Accountant', true, 7),
  ('translator', 'Traduttore', 'Translator', false, 8),
  ('local_guide', 'Guida Turistica', 'Local Guide', false, 9),
  ('engineer', 'Ingegnere', 'Engineer', true, 10),
  ('interior_designer', 'Interior Designer', 'Interior Designer', false, 11),
  ('property_manager', 'Gestore Immobiliare', 'Property Manager', false, 12)
ON CONFLICT (code) DO NOTHING;

-- Step 3: Add profession_type_id to professionals table
ALTER TABLE professionals 
ADD COLUMN IF NOT EXISTS profession_type_id UUID REFERENCES profession_types(id);

-- Step 4: Update existing professionals to link to profession_types
UPDATE professionals p
SET profession_type_id = pt.id
FROM profession_types pt
WHERE p.profession::text = pt.code;

-- Step 5: Create services table for flexible service management
CREATE TABLE IF NOT EXISTS profession_services_catalog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profession_type_id UUID REFERENCES profession_types(id) ON DELETE CASCADE,
  code VARCHAR(50) NOT NULL,
  name_it VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  description_it TEXT,
  description_en TEXT,
  typical_price_range VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profession_type_id, code)
);

-- Step 6: Insert services for each profession type
-- Geometra services
INSERT INTO profession_services_catalog (profession_type_id, code, name_it, name_en, display_order)
SELECT 
  pt.id,
  s.code,
  s.name_it,
  s.name_en,
  s.display_order
FROM profession_types pt
CROSS JOIN (VALUES
  ('cadastral', 'Pratiche catastali', 'Cadastral services', 1),
  ('survey', 'Rilievi topografici', 'Topographic surveys', 2),
  ('permits', 'Pratiche edilizie', 'Building permits', 3),
  ('appraisal', 'Stime immobiliari', 'Property appraisals', 4),
  ('energy_cert', 'Certificazione energetica', 'Energy certification', 5)
) AS s(code, name_it, name_en, display_order)
WHERE pt.code = 'geometra';

-- Architect services
INSERT INTO profession_services_catalog (profession_type_id, code, name_it, name_en, display_order)
SELECT 
  pt.id,
  s.code,
  s.name_it,
  s.name_en,
  s.display_order
FROM profession_types pt
CROSS JOIN (VALUES
  ('design', 'Progettazione', 'Architectural design', 1),
  ('renovation', 'Ristrutturazioni', 'Renovations', 2),
  ('interior', 'Interior design', 'Interior design', 3),
  ('landscape', 'Progettazione giardini', 'Landscape design', 4),
  ('restoration', 'Restauro', 'Restoration', 5)
) AS s(code, name_it, name_en, display_order)
WHERE pt.code = 'architect';

-- Lawyer services
INSERT INTO profession_services_catalog (profession_type_id, code, name_it, name_en, display_order)
SELECT 
  pt.id,
  s.code,
  s.name_it,
  s.name_en,
  s.display_order
FROM profession_types pt
CROSS JOIN (VALUES
  ('duediligence', 'Due diligence', 'Due diligence', 1),
  ('contracts', 'Contratti', 'Contracts', 2),
  ('fiscal', 'Consulenza fiscale', 'Tax consulting', 3),
  ('inheritance', 'Successioni', 'Inheritance', 4),
  ('disputes', 'Contenziosi', 'Disputes', 5)
) AS s(code, name_it, name_en, display_order)
WHERE pt.code = 'lawyer';

-- Translator services
INSERT INTO profession_services_catalog (profession_type_id, code, name_it, name_en, display_order)
SELECT 
  pt.id,
  s.code,
  s.name_it,
  s.name_en,
  s.display_order
FROM profession_types pt
CROSS JOIN (VALUES
  ('document_translation', 'Traduzione documenti', 'Document translation', 1),
  ('interpretation', 'Interpretariato', 'Interpretation', 2),
  ('certified_translation', 'Traduzioni giurate', 'Certified translations', 3),
  ('contract_translation', 'Traduzione contratti', 'Contract translation', 4),
  ('technical_translation', 'Traduzione tecnica', 'Technical translation', 5)
) AS s(code, name_it, name_en, display_order)
WHERE pt.code = 'translator';

-- Local Guide services
INSERT INTO profession_services_catalog (profession_type_id, code, name_it, name_en, display_order)
SELECT 
  pt.id,
  s.code,
  s.name_it,
  s.name_en,
  s.display_order
FROM profession_types pt
CROSS JOIN (VALUES
  ('property_tours', 'Visite immobili', 'Property tours', 1),
  ('area_orientation', 'Orientamento zona', 'Area orientation', 2),
  ('cultural_assistance', 'Assistenza culturale', 'Cultural assistance', 3),
  ('relocation_support', 'Supporto trasferimento', 'Relocation support', 4),
  ('local_networking', 'Networking locale', 'Local networking', 5)
) AS s(code, name_it, name_en, display_order)
WHERE pt.code = 'local_guide';

-- Step 7: Create view for easy access to profession data
CREATE OR REPLACE VIEW v_profession_types_with_services AS
SELECT 
  pt.id,
  pt.code,
  pt.name_it,
  pt.name_en,
  pt.description_it,
  pt.description_en,
  pt.requires_license,
  pt.is_active,
  pt.display_order,
  COUNT(psc.id) as service_count,
  array_agg(
    json_build_object(
      'code', psc.code,
      'name_it', psc.name_it,
      'name_en', psc.name_en
    ) ORDER BY psc.display_order
  ) FILTER (WHERE psc.id IS NOT NULL) as services
FROM profession_types pt
LEFT JOIN profession_services_catalog psc ON pt.id = psc.profession_type_id AND psc.is_active = true
WHERE pt.is_active = true
GROUP BY pt.id, pt.code, pt.name_it, pt.name_en, pt.description_it, pt.description_en, 
         pt.requires_license, pt.is_active, pt.display_order
ORDER BY pt.display_order;

-- Step 8: Create RLS policies for profession_types
ALTER TABLE profession_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active profession types" 
ON profession_types FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage profession types" 
ON profession_types FOR ALL 
USING (auth.role() = 'service_role');

-- Step 9: Create RLS policies for profession_services_catalog
ALTER TABLE profession_services_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active services" 
ON profession_services_catalog FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage services" 
ON profession_services_catalog FOR ALL 
USING (auth.role() = 'service_role');

-- Step 10: Create helper functions
CREATE OR REPLACE FUNCTION get_profession_types(lang TEXT DEFAULT 'en')
RETURNS TABLE (
  id UUID,
  code VARCHAR,
  name VARCHAR,
  description TEXT,
  requires_license BOOLEAN,
  services JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pt.id,
    pt.code,
    CASE 
      WHEN lang = 'it' THEN pt.name_it
      ELSE pt.name_en
    END as name,
    CASE 
      WHEN lang = 'it' THEN pt.description_it
      ELSE pt.description_en
    END as description,
    pt.requires_license,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'code', psc.code,
          'name', CASE WHEN lang = 'it' THEN psc.name_it ELSE psc.name_en END
        ) ORDER BY psc.display_order
      ) FILTER (WHERE psc.id IS NOT NULL), 
      '[]'::jsonb
    ) as services
  FROM profession_types pt
  LEFT JOIN profession_services_catalog psc ON pt.id = psc.profession_type_id AND psc.is_active = true
  WHERE pt.is_active = true
  GROUP BY pt.id, pt.code, pt.name_it, pt.name_en, pt.description_it, pt.description_en, pt.requires_license
  ORDER BY pt.display_order;
END;
$$ LANGUAGE plpgsql;

-- Step 11: Create function to add new profession type
CREATE OR REPLACE FUNCTION add_profession_type(
  p_code VARCHAR,
  p_name_it VARCHAR,
  p_name_en VARCHAR,
  p_requires_license BOOLEAN DEFAULT false,
  p_services JSONB DEFAULT '[]'::jsonb
) RETURNS UUID AS $$
DECLARE
  v_profession_id UUID;
  v_service JSONB;
BEGIN
  -- Insert profession type
  INSERT INTO profession_types (code, name_it, name_en, requires_license, display_order)
  VALUES (
    p_code, 
    p_name_it, 
    p_name_en, 
    p_requires_license,
    (SELECT COALESCE(MAX(display_order), 0) + 10 FROM profession_types)
  )
  RETURNING id INTO v_profession_id;
  
  -- Insert services if provided
  FOR v_service IN SELECT * FROM jsonb_array_elements(p_services)
  LOOP
    INSERT INTO profession_services_catalog (
      profession_type_id, 
      code, 
      name_it, 
      name_en, 
      display_order
    )
    VALUES (
      v_profession_id,
      v_service->>'code',
      v_service->>'name_it',
      v_service->>'name_en',
      (v_service->>'display_order')::INTEGER
    );
  END LOOP;
  
  RETURN v_profession_id;
END;
$$ LANGUAGE plpgsql;

-- Example: How to add a new profession type
/*
SELECT add_profession_type(
  'photographer',
  'Fotografo Immobiliare',
  'Real Estate Photographer',
  false,
  '[
    {"code": "property_photos", "name_it": "Foto immobili", "name_en": "Property photos", "display_order": 1},
    {"code": "virtual_tours", "name_it": "Tour virtuali", "name_en": "Virtual tours", "display_order": 2},
    {"code": "drone_photos", "name_it": "Foto con drone", "name_en": "Drone photography", "display_order": 3}
  ]'::jsonb
);
*/

-- Step 12: Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profession_types_updated_at 
  BEFORE UPDATE ON profession_types
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
