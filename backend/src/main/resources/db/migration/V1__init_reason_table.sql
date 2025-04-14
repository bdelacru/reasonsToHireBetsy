CREATE TABLE reason (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  reason_type VARCHAR(255),
  explanation TEXT,
  image_url TEXT,
  submitted_by VARCHAR(255),
  submitted_by_link TEXT,
  relationship TEXT,
  submitted_by_others BOOLEAN,
  approved BOOLEAN
);
