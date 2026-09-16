-- Add legal entity type to landlord profiles for international registration
-- Supports: INDIVIDUAL, REGISTERED_BUSINESS, PROPERTY_MANAGEMENT_ORG

ALTER TABLE landlord_profiles
ADD COLUMN legal_entity_type TEXT;

ALTER TABLE landlord_profiles
ADD CONSTRAINT landlord_profiles_legal_entity_type_check
    CHECK (legal_entity_type IN ('INDIVIDUAL', 'REGISTERED_BUSINESS', 'PROPERTY_MANAGEMENT_ORG'));

COMMENT ON COLUMN landlord_profiles.legal_entity_type IS 'Legal entity type: INDIVIDUAL, REGISTERED_BUSINESS, or PROPERTY_MANAGEMENT_ORG';
