-- PATH: migrations/populate_services_data.sql
-- Run this in Supabase SQL Editor to populate all professional services data

-- 1. Insert Professional Categories
INSERT INTO professional_categories (key, name_en, name_it, description_en, description_it, icon, display_order) VALUES
('surveyor', 'Surveyor (Geometra)', 'Geometra', 'Licensed property surveyors and technical consultants', 'Geometri abilitati e consulenti tecnici', '📐', 1),
('architect', 'Architect', 'Architetto', 'Design professionals for renovation and new construction', 'Professionisti del design per ristrutturazioni e nuove costruzioni', '🏛️', 2),
('lawyer', 'Lawyer', 'Avvocato', 'Legal professionals specializing in real estate', 'Professionisti legali specializzati in immobili', '⚖️', 3),
('notary', 'Notary', 'Notaio', 'Public officials for property transfers and contracts', 'Pubblici ufficiali per trasferimenti e contratti', '📜', 4),
('realtor', 'Real Estate Agent', 'Agente Immobiliare', 'Property sales and rental professionals', 'Professionisti di vendite e affitti immobiliari', '🏢', 5),
('contractor', 'Contractor', 'Impresa Edile', 'Construction and renovation companies', 'Imprese di costruzione e ristrutturazione', '🔨', 6),
('accountant', 'Accountant', 'Commercialista', 'Tax and financial advisors', 'Consulenti fiscali e finanziari', '💼', 7);

-- 2. Get category IDs for foreign key references
WITH cat_ids AS (
    SELECT key, id FROM professional_categories
)

-- 3. Insert Services for Surveyors (Geometra)
INSERT INTO services (category_id, key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order)
SELECT 
    (SELECT id FROM cat_ids WHERE key = 'surveyor'),
    key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order
FROM (VALUES
    ('property_survey', 'Property Survey', 'Perizia Immobiliare', 'Complete structural and technical assessment', 'Valutazione strutturale e tecnica completa', '5-7 days', 800, 1500, true, 1),
    ('cadastral_verification', 'Cadastral Verification', 'Verifica Catastale', 'Verify property registration and boundaries', 'Verifica registrazione e confini proprietà', '2-3 days', 300, 500, false, 2),
    ('energy_certificate', 'Energy Certificate (APE)', 'Certificato Energetico (APE)', 'Required energy performance certificate', 'Certificato di prestazione energetica obbligatorio', '3-5 days', 250, 400, true, 3),
    ('building_compliance', 'Building Compliance Check', 'Verifica Conformità Edilizia', 'Verify permits and legal compliance', 'Verifica permessi e conformità legale', '5-10 days', 600, 1200, true, 4),
    ('floorplan_drafting', 'Technical Floorplans', 'Planimetrie Tecniche', 'Detailed technical drawings', 'Disegni tecnici dettagliati', '3-5 days', 400, 800, true, 5),
    ('construction_supervision', 'Construction Supervision', 'Direzione Lavori', 'Oversee construction compliance', 'Supervisione conformità costruzione', 'Hourly', 80, 120, true, 6)
) AS s(key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order);

-- 4. Insert Services for Architects
INSERT INTO services (category_id, key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order)
SELECT 
    (SELECT id FROM cat_ids WHERE key = 'architect'),
    key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order
FROM (VALUES
    ('renovation_design', 'Renovation Design', 'Progetto di Ristrutturazione', 'Complete renovation project and plans', 'Progetto completo e piani di ristrutturazione', '2-4 weeks', 3000, 8000, 'fixed', true, 1),
    ('interior_design', 'Interior Design', 'Design Interni', 'Interior design and decoration planning', 'Progettazione interni e decorazione', '2-3 weeks', 2000, 5000, 'fixed', true, 2),
    ('permit_drawings', 'Permit Drawings', 'Disegni per Permessi', 'Technical drawings for building permits', 'Disegni tecnici per permessi edilizi', '1-2 weeks', 1500, 3000, 'fixed', false, 3),
    ('project_management', 'Project Management', 'Gestione Progetto', 'Full project oversight and coordination', 'Supervisione completa e coordinamento', 'Monthly', 2000, 4000, 'fixed', true, 4),
    ('landscape_design', 'Landscape Design', 'Progettazione Giardini', 'Garden and outdoor space design', 'Progettazione giardini e spazi esterni', '1-2 weeks', 1000, 3000, 'fixed', true, 5),
    ('restoration_planning', 'Historical Restoration', 'Restauro Storico', 'Specialized historical building restoration', 'Restauro specializzato edifici storici', '3-6 weeks', 5000, 15000, 'fixed', true, 6)
) AS s(key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order);

-- 5. Insert Services for Lawyers
INSERT INTO services (category_id, key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order)
SELECT 
    (SELECT id FROM cat_ids WHERE key = 'lawyer'),
    key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order
FROM (VALUES
    ('due_diligence', 'Legal Due Diligence', 'Due Diligence Legale', 'Complete legal review of property', 'Revisione legale completa della proprietà', '5-10 days', 1500, 3000, false, 1),
    ('purchase_contract', 'Purchase Contract Review', 'Revisione Contratto', 'Review and negotiate purchase terms', 'Revisione e negoziazione termini acquisto', '3-5 days', 800, 1500, false, 2),
    ('title_search', 'Title Search', 'Ricerca Titolo', 'Verify ownership and encumbrances', 'Verifica proprietà e vincoli', '3-5 days', 600, 1000, false, 3),
    ('tax_consultation', 'Tax Consultation', 'Consulenza Fiscale', 'Property tax and fiscal advice', 'Consulenza tasse e fiscale proprietà', '2-3 days', 500, 1000, false, 4),
    ('inheritance_law', 'Inheritance Matters', 'Pratiche Successorie', 'Handle inheritance property transfers', 'Gestione trasferimenti ereditari', '2-4 weeks', 2000, 5000, false, 5),
    ('dispute_resolution', 'Dispute Resolution', 'Risoluzione Controversie', 'Handle property-related disputes', 'Gestione controversie immobiliari', 'Hourly', 150, 300, false, 6)
) AS s(key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order);

-- 6. Insert Services for Notaries
INSERT INTO services (category_id, key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order)
SELECT 
    (SELECT id FROM cat_ids WHERE key = 'notary'),
    key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order
FROM (VALUES
    ('property_deed', 'Property Deed', 'Atto di Vendita', 'Official property transfer deed', 'Atto ufficiale trasferimento proprietà', '1 day', 1500, 3000, 'percentage', false, 1),
    ('mortgage_deed', 'Mortgage Deed', 'Atto di Mutuo', 'Official mortgage documentation', 'Documentazione ufficiale mutuo', '1 day', 1000, 2000, 'percentage', false, 2),
    ('donation_deed', 'Donation Deed', 'Atto di Donazione', 'Property donation documentation', 'Documentazione donazione proprietà', '1 day', 1200, 2500, 'percentage', false, 3),
    ('power_attorney', 'Power of Attorney', 'Procura', 'Legal representation documents', 'Documenti rappresentanza legale', '1 day', 300, 500, 'fixed', false, 4)
) AS s(key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order);

-- 7. Insert Services for Real Estate Agents
INSERT INTO services (category_id, key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order)
SELECT 
    (SELECT id FROM cat_ids WHERE key = 'realtor'),
    key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order
FROM (VALUES
    ('property_search', 'Property Search Service', 'Ricerca Immobili', 'Curated property selection', 'Selezione immobili personalizzata', '1-4 weeks', 0, 0, 'percentage', true, 1),
    ('viewing_coordination', 'Viewing Coordination', 'Coordinamento Visite', 'Organize and accompany viewings', 'Organizzazione e accompagnamento visite', '1-2 days', 200, 500, 'fixed', true, 2),
    ('negotiation_support', 'Negotiation Support', 'Supporto Negoziazione', 'Professional price negotiation', 'Negoziazione professionale prezzo', '1-2 weeks', 0, 0, 'percentage', false, 3),
    ('market_analysis', 'Market Analysis', 'Analisi di Mercato', 'Local market valuation report', 'Report valutazione mercato locale', '3-5 days', 300, 600, 'fixed', false, 4),
    ('rental_management', 'Rental Management', 'Gestione Affitti', 'Complete rental property management', 'Gestione completa proprietà affitto', 'Monthly', 8, 12, 'percentage', false, 5)
) AS s(key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order);

-- 8. Insert Services for Contractors
INSERT INTO services (category_id, key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order)
SELECT 
    (SELECT id FROM cat_ids WHERE key = 'contractor'),
    key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order
FROM (VALUES
    ('renovation_quote', 'Renovation Quote', 'Preventivo Ristrutturazione', 'Detailed renovation cost estimate', 'Preventivo dettagliato costi ristrutturazione', '3-5 days', 0, 500, 'fixed', true, 1),
    ('full_renovation', 'Complete Renovation', 'Ristrutturazione Completa', 'Full property renovation', 'Ristrutturazione completa proprietà', '2-6 months', 500, 2000, 'sqm', true, 2),
    ('trullo_restoration', 'Trullo Restoration', 'Restauro Trullo', 'Specialized trullo restoration', 'Restauro specializzato trulli', '3-6 months', 800, 1500, 'sqm', true, 3),
    ('pool_construction', 'Pool Construction', 'Costruzione Piscina', 'Swimming pool design and build', 'Progettazione e costruzione piscina', '2-3 months', 15000, 40000, 'fixed', true, 4),
    ('systems_upgrade', 'Systems Upgrade', 'Aggiornamento Impianti', 'Electrical, plumbing, heating updates', 'Aggiornamento elettrico, idraulico, riscaldamento', '2-4 weeks', 5000, 15000, 'fixed', true, 5),
    ('structural_work', 'Structural Work', 'Lavori Strutturali', 'Major structural modifications', 'Modifiche strutturali importanti', '1-3 months', 10000, 50000, 'fixed', true, 6)
) AS s(key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, price_unit, requires_site_visit, display_order);

-- 9. Insert Services for Accountants
INSERT INTO services (category_id, key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order)
SELECT 
    (SELECT id FROM cat_ids WHERE key = 'accountant'),
    key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order
FROM (VALUES
    ('tax_planning', 'Tax Planning', 'Pianificazione Fiscale', 'Property tax optimization strategy', 'Strategia ottimizzazione tasse proprietà', '1-2 weeks', 500, 1500, false, 1),
    ('vat_registration', 'VAT Registration', 'Apertura Partita IVA', 'Italian VAT number registration', 'Registrazione partita IVA italiana', '1-2 weeks', 300, 600, false, 2),
    ('fiscal_representation', 'Fiscal Representation', 'Rappresentanza Fiscale', 'Tax representation for non-residents', 'Rappresentanza fiscale per non residenti', 'Annual', 1000, 2000, false, 3),
    ('rental_taxation', 'Rental Income Tax', 'Tassazione Affitti', 'Rental income tax management', 'Gestione tasse reddito affitto', 'Annual', 500, 1200, false, 4),
    ('property_accounting', 'Property Accounting', 'Contabilità Immobiliare', 'Complete property accounting services', 'Servizi contabilità immobiliare completa', 'Monthly', 200, 500, false, 5)
) AS s(key, name_en, name_it, description_en, description_it, typical_duration, price_range_min, price_range_max, requires_site_visit, display_order);

-- 10. Create Service Bundles
INSERT INTO service_bundles (key, name_en, name_it, description_en, description_it, discount_percentage, is_popular, display_order)
VALUES
('complete_purchase', 'Complete Purchase Package', 'Pacchetto Acquisto Completo', 'Everything needed for property purchase', 'Tutto il necessario per acquisto proprietà', 10, true, 1),
('renovation_package', 'Renovation Planning Package', 'Pacchetto Pianificazione Ristrutturazione', 'Complete renovation planning and management', 'Pianificazione e gestione ristrutturazione completa', 15, true, 2),
('legal_safety', 'Legal Safety Package', 'Pacchetto Sicurezza Legale', 'Full legal protection for your purchase', 'Protezione legale completa per il tuo acquisto', 10, false, 3),
('property_investment', 'Property Investment Package', 'Pacchetto Investimento Immobiliare', 'Complete support for investment properties', 'Supporto completo per investimenti immobiliari', 20, false, 4);

-- 11. Link Services to Bundles
-- Complete Purchase Package
INSERT INTO bundle_services (bundle_id, service_id, is_required)
SELECT 
    (SELECT id FROM service_bundles WHERE key = 'complete_purchase'),
    s.id,
    true
FROM services s
WHERE s.key IN ('property_survey', 'due_diligence', 'property_deed', 'tax_planning');

-- Renovation Package
INSERT INTO bundle_services (bundle_id, service_id, is_required)
SELECT 
    (SELECT id FROM service_bundles WHERE key = 'renovation_package'),
    s.id,
    true
FROM services s
WHERE s.key IN ('renovation_design', 'renovation_quote', 'permit_drawings', 'project_management');

-- Legal Safety Package
INSERT INTO bundle_services (bundle_id, service_id, is_required)
SELECT 
    (SELECT id FROM service_bundles WHERE key = 'legal_safety'),
    s.id,
    true
FROM services s
WHERE s.key IN ('due_diligence', 'title_search', 'purchase_contract', 'property_deed');

-- Property Investment Package
INSERT INTO bundle_services (bundle_id, service_id, is_required)
SELECT 
    (SELECT id FROM service_bundles WHERE key = 'property_investment'),
    s.id,
    CASE WHEN s.key IN ('property_survey', 'tax_planning', 'rental_management') THEN true ELSE false END
FROM services s
WHERE s.key IN ('property_survey', 'tax_planning', 'rental_management', 'property_accounting', 'fiscal_representation');

-- 12. Migrate existing surveyors to new structure
UPDATE professionals 
SET professional_category_id = (SELECT id FROM professional_categories WHERE key = 'surveyor')
WHERE profession = 'geometra' OR profession = 'surveyor' OR is_surveyor = true;

-- 13. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_professionals_category ON professionals(professional_category_id);
CREATE INDEX IF NOT EXISTS idx_bundle_services_bundle ON bundle_services(bundle_id);
CREATE INDEX IF NOT EXISTS idx_bundle_services_service ON bundle_services(service_id);
