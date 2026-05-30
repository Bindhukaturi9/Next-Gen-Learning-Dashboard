-- Run this in the Supabase SQL editor to set up and seed your courses table.

create table if not exists courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text not null default 'BookOpen',
  description text,
  color       text,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table courses enable row level security;

-- Allow anonymous reads (public dashboard)
create policy "Public read" on courses
  for select using (true);

-- Seed data
insert into courses (title, progress, icon_name, description, color) values
  ('Advanced React Patterns',       75, 'Code2',     'Master hooks, context, compound components and advanced composition patterns.', 'violet'),
  ('TypeScript Mastery',            48, 'FileCode',  'From generics to decorators — unlock the full expressive power of TypeScript.',  'cyan'),
  ('System Design Fundamentals',    32, 'Network',   'Scalable architecture, distributed systems, caching strategies and trade-offs.',  'green'),
  ('Data Structures & Algorithms',  89, 'GitBranch', 'Arrays, trees, graphs, dynamic programming and interview-ready problem solving.', 'amber');
