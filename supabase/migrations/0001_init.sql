create table courses (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  title      text not null,
  created_at timestamptz default now()
);

create table lessons (
  id         uuid primary key default gen_random_uuid(),
  course_id  uuid references courses on delete cascade,
  slug       text not null,
  title      text not null,
  order_idx  int  not null,
  content_md text not null,
  created_at timestamptz default now()
);

create table progress (
  user_id      uuid references auth.users,
  lesson_id    uuid references lessons,
  completed_at timestamptz default now(),
  primary key (user_id, lesson_id)
);


-- Row-Level Security
alter table progress enable row level security;

create policy "Students can select only their progress"
  on progress for select
  using (auth.uid() = user_id);

create policy "Students can insert progress for themselves"
  on progress for insert
  with check (auth.uid() = user_id);