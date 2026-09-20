-- Add missing foreign key constraint for lock_commands to reference locks
-- This ensures lock commands cannot reference non-existent locks
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'lock_commands_lock_fk'
    ) THEN
        ALTER TABLE lock_commands
        ADD CONSTRAINT lock_commands_lock_fk
            FOREIGN KEY (lock_id) REFERENCES locks(id) ON DELETE RESTRICT;
    END IF;
END $$;
