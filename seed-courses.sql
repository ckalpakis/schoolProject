-- Seed demo courses for Try-a-Major platform
-- Run locally with: npx supabase sql --file seed-courses.sql

INSERT INTO courses (slug, title) VALUES 
  ('computer-science', 'Computer Science'),
  ('business-administration', 'Business Administration'),
  ('psychology', 'Psychology')
ON CONFLICT (slug) DO NOTHING;