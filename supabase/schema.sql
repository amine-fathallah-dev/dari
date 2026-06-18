-- ============================================================
-- DARI — Schéma Supabase
-- Exécuter dans SQL Editor de votre projet Supabase
-- ============================================================

-- Table properties
create table if not exists properties (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  reference text unique not null,
  transaction text not null check (transaction in ('vente', 'location')),
  property_type text not null check (property_type in (
    'appartement', 'villa', 'studio', 'terrain', 'local_commercial'
  )),
  title text not null,
  description text,
  price numeric not null,
  governorate text not null,
  delegation text,
  neighborhood text,
  latitude double precision,
  longitude double precision,
  surface_habitable integer,
  surface_terrain integer,
  pieces integer,
  bathrooms integer,
  floor integer,
  furnished boolean default false,
  condition text check (condition in ('neuf', 'ancien', 'sur_plan')),
  title_status text check (title_status in (
    'titre_foncier', 'titre_bleu', 'non_immatricule'
  )),
  amenities text[],
  images text[],
  is_featured boolean default false,
  status text not null default 'disponible'
    check (status in ('disponible', 'vendu', 'loue'))
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger properties_updated_at
  before update on properties
  for each row execute function update_updated_at();

-- Table contacts
create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  property_id uuid references properties(id) on delete set null,
  is_read boolean default false
);

-- RLS
alter table properties enable row level security;
alter table contacts enable row level security;

create policy "Public read properties"
  on properties for select using (true);

create policy "Admin write properties"
  on properties for all
  using (auth.role() = 'authenticated');

create policy "Public insert contacts"
  on contacts for insert with check (true);

create policy "Admin manage contacts"
  on contacts for all
  using (auth.role() = 'authenticated');

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "Public read property images"
  on storage.objects for select
  using (bucket_id = 'property-images');

create policy "Admin upload property images"
  on storage.objects for insert
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Admin delete property images"
  on storage.objects for delete
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');
