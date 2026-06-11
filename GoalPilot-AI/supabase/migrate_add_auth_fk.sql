-- Remove any previous foreign key if present.
alter table public.goals
drop constraint if exists goals_user_id_fkey;

-- Add a foreign key to Supabase Auth users.
alter table public.goals
add constraint goals_user_id_fkey
foreign key (user_id)
references auth.users(id)
on delete cascade;