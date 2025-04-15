DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name='reason' AND column_name='reason'
  ) THEN
    ALTER TABLE reason ADD COLUMN reason VARCHAR(255);
  END IF;
END $$;
