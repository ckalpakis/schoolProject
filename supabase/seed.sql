-- Seed demo courses for Try-a-Major platform
INSERT INTO courses (slug, title) VALUES 
  ('computer-science', 'Computer Science'),
  ('business-administration', 'Business Administration'),
  ('psychology', 'Psychology')
ON CONFLICT (slug) DO NOTHING;