create extension if not exists pgcrypto;

create table if not exists public.foresporsler (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'ny',
  source_page text,
  metal text,
  metal_label text,
  type_label text,
  fineness numeric,
  buy_rate numeric,
  weight_grams numeric,
  unknown_weight boolean not null default false,
  estimated_price_nok numeric,
  price_nok_oz numeric,
  prices_live boolean not null default false,
  customer_name text not null,
  customer_phone text,
  customer_email text,
  message text
);

alter table public.foresporsler enable row level security;

grant insert on public.foresporsler to anon, authenticated;

drop policy if exists "Nettsiden kan sende foresporsler" on public.foresporsler;

create policy "Nettsiden kan sende foresporsler"
on public.foresporsler
for insert
to anon, authenticated
with check (
  length(trim(customer_name)) > 0
  and (
    customer_phone is not null
    or customer_email is not null
  )
);

create index if not exists foresporsler_created_at_idx
on public.foresporsler (created_at desc);

create index if not exists foresporsler_status_idx
on public.foresporsler (status);
