-- =====================================================
-- Enable Row Level Security
-- =====================================================

alter table public.goals enable row level security;

-- =====================================================
-- SELECT
-- =====================================================

create policy "Users can view their own goals"
on public.goals
for select
to authenticated
using (
  auth.uid() = user_id
);

-- =====================================================
-- INSERT
-- =====================================================

create policy "Users can insert their own goals"
on public.goals
for insert
to authenticated
with check (
  auth.uid() = user_id
);

-- =====================================================
-- UPDATE
-- =====================================================

create policy "Users can update their own goals"
on public.goals
for update
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- =====================================================
-- DELETE
-- =====================================================

create policy "Users can delete their own goals"
on public.goals
for delete
to authenticated
using (
  auth.uid() = user_id
);