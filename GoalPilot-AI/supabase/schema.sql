-- Enable UUID generation
create extension if not exists pgcrypto;

-- ============================
-- GOALS
-- ============================
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null,

  title text not null,

  description text,

  target_date date,

  status text not null default 'active'
    check (status in ('active', 'completed', 'paused')),

  created_at timestamptz not null default now()
);

create index if not exists idx_goals_user_id
on public.goals(user_id);

-- ============================
-- MILESTONES
-- ============================
create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),

  goal_id uuid not null references public.goals(id)
    on delete cascade,

  title text not null,

  completed boolean not null default false,

  due_date date
);

create index if not exists idx_milestones_goal_id
on public.milestones(goal_id);

-- ============================
-- TASKS
-- ============================
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),

  milestone_id uuid not null references public.milestones(id)
    on delete cascade,

  title text not null,

  completed boolean not null default false,

  scheduled_for date
);

create index if not exists idx_tasks_milestone_id
on public.tasks(milestone_id);