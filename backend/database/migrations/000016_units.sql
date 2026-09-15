-- Units/rooms within properties
-- Each unit has a stable UUID identity and lifecycle state

CREATE TYPE unit_lifecycle AS ENUM (
    'AVAILABLE',
    'OCCUPIED',
    'RESERVED',
    'MAINTENANCE',
    'INACTIVE'
);

CREATE TABLE IF NOT EXISTS units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Unit information
    unit_number TEXT NOT NULL,
    unit_type TEXT, -- e.g., 'studio', '1br', '2br', 'commercial'
    floor_number INT,
    square_feet INT,
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    
    -- Lifecycle
    lifecycle unit_lifecycle NOT NULL DEFAULT 'AVAILABLE',
    
    -- Metadata
    description TEXT,
    amenities TEXT[], -- Array of amenity strings
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    version INT NOT NULL DEFAULT 1,
    
    CONSTRAINT units_lifecycle_check
        CHECK (lifecycle IN ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE', 'INACTIVE')),
    
    CONSTRAINT units_square_feet_check
        CHECK (square_feet IS NULL OR square_feet > 0),
    
    CONSTRAINT units_bedrooms_check
        CHECK (bedrooms >= 0),
    
    CONSTRAINT units_bathrooms_check
        CHECK (bathrooms >= 0),
    
    CONSTRAINT units_version_check
        CHECK (version >= 1),
    
    -- Ensure unit_number is unique within a property
    CONSTRAINT units_property_unit_unique
        UNIQUE (property_id, unit_number)
);

CREATE INDEX IF NOT EXISTS units_property_id_idx
    ON units (property_id);

CREATE INDEX IF NOT EXISTS units_lifecycle_idx
    ON units (lifecycle);

CREATE INDEX IF NOT EXISTS units_property_unit_idx
    ON units (property_id, unit_number);

-- Trigger to update updated_at timestamp
CREATE TRIGGER units_updated_at_trigger
    BEFORE UPDATE ON units
    FOR EACH ROW
    EXECUTE FUNCTION update_landlord_profiles_updated_at();
