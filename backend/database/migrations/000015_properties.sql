-- Properties owned by landlords
-- Each property belongs to a verified landlord

CREATE TYPE property_status AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED',
    'PENDING_VERIFICATION'
);

CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landlord_profile_id UUID NOT NULL REFERENCES landlord_profiles(id) ON DELETE CASCADE,
    
    -- Property information
    property_name TEXT NOT NULL,
    property_type TEXT, -- e.g., 'apartment', 'house', 'commercial'
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'US',
    
    -- Status
    status property_status NOT NULL DEFAULT 'PENDING_VERIFICATION',
    
    -- Metadata
    total_units INT DEFAULT 0,
    description TEXT,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT properties_status_check
        CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION')),
    
    CONSTRAINT properties_total_units_check
        CHECK (total_units >= 0),
    
    CONSTRAINT properties_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS properties_landlord_profile_id_idx
    ON properties (landlord_profile_id);

CREATE INDEX IF NOT EXISTS properties_status_idx
    ON properties (status);

CREATE INDEX IF NOT EXISTS properties_address_idx
    ON properties (city, state, postal_code);

-- Trigger to update updated_at timestamp
CREATE TRIGGER properties_updated_at_trigger
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
