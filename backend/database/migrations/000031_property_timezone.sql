-- Add timezone to properties for worldwide operation
ALTER TABLE properties
ADD COLUMN timezone TEXT;

COMMENT ON COLUMN properties.timezone IS 'IANA timezone identifier (e.g., Africa/Kampala, America/New_York)';
