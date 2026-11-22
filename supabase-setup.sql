-- CVC CUP / CUV tracking: run this ONCE in Supabase > SQL Editor > New query > Run.
-- One row per RC and item: item 'p' = CUP, 'v' = CUV.
-- status: 'done' | 'cnp' (could not process, with reason) | 'none' (untick / cleared).

create table if not exists public.cvc_tracking (
  rc_id      text        not null,
  item       text        not null check (item in ('p','v')),
  status     text        not null check (status in ('done','cnp','none')),
  reason     text,
  note       text,
  act_date   date,
  by_user    text,
  updated_at timestamptz not null default now(),
  primary key (rc_id, item)
);

create index if not exists cvc_tracking_updated_idx on public.cvc_tracking (updated_at);

-- The server clock decides which change is newest.
create or replace function public.cvc_tracking_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists cvc_tracking_touch on public.cvc_tracking;
create trigger cvc_tracking_touch
  before insert or update on public.cvc_tracking
  for each row execute function public.cvc_tracking_touch();

-- Row level security: the app (anon key) can read, add and change rows, but never delete.
alter table public.cvc_tracking enable row level security;

drop policy if exists "cvc read"   on public.cvc_tracking;
drop policy if exists "cvc insert" on public.cvc_tracking;
drop policy if exists "cvc update" on public.cvc_tracking;
create policy "cvc read"   on public.cvc_tracking for select to anon using (true);
create policy "cvc insert" on public.cvc_tracking for insert to anon with check (true);
create policy "cvc update" on public.cvc_tracking for update to anon using (true) with check (true);

grant select, insert, update on public.cvc_tracking to anon;
