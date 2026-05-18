-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- ------------------------------------------------------------
-- entities
-- ------------------------------------------------------------
create table entities (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null,
  name        text not null,
  kind        text not null,
  metadata    jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

alter table entities enable row level security;

create policy "deny all on entities"
  on entities
  as restrictive
  for all
  to authenticated, anon
  using (false)
  with check (false);

-- ------------------------------------------------------------
-- raw_captures
-- ------------------------------------------------------------
create table raw_captures (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null,
  source          text not null,
  raw_text        text,
  audio_url       text,
  classification  jsonb not null default '{}',
  llm_source      text,
  routed_to       text,
  routed_id       uuid,
  created_at      timestamptz not null default now()
);

alter table raw_captures enable row level security;

create policy "deny all on raw_captures"
  on raw_captures
  as restrictive
  for all
  to authenticated, anon
  using (false)
  with check (false);

-- ------------------------------------------------------------
-- tasks
-- ------------------------------------------------------------
create table tasks (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null,
  title               text not null,
  description         text,
  urgency             text,
  key                 boolean not null default false,
  priority_score      numeric,
  time_estimate_min   integer,
  tags                text[] not null default '{}',
  due_date            timestamptz,
  owner               text,
  entity_id           uuid references entities (id) on delete set null,
  completed_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table tasks enable row level security;

create policy "deny all on tasks"
  on tasks
  as restrictive
  for all
  to authenticated, anon
  using (false)
  with check (false);

-- ------------------------------------------------------------
-- daily_logs
-- ------------------------------------------------------------
create table daily_logs (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null,
  log_date    date not null,
  notes       text,
  mood        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table daily_logs enable row level security;

create policy "deny all on daily_logs"
  on daily_logs
  as restrictive
  for all
  to authenticated, anon
  using (false)
  with check (false);

-- ------------------------------------------------------------
-- memory_chunks
-- ------------------------------------------------------------
create table memory_chunks (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null,
  source_type  text not null,
  source_id    uuid,
  text         text not null,
  embedding    vector(1536),
  created_at   timestamptz not null default now()
);

alter table memory_chunks enable row level security;

create policy "deny all on memory_chunks"
  on memory_chunks
  as restrictive
  for all
  to authenticated, anon
  using (false)
  with check (false);

-- ivfflat index — build after bulk-loading data; lists=100 suits up to ~1 M rows
create index memory_chunks_embedding_ivfflat_idx
  on memory_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ------------------------------------------------------------
-- audit_log
-- ------------------------------------------------------------
create table audit_log (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null,
  action         text not null,
  resource_type  text not null,
  resource_id    uuid,
  metadata       jsonb not null default '{}',
  created_at     timestamptz not null default now()
);

alter table audit_log enable row level security;

create policy "deny all on audit_log"
  on audit_log
  as restrictive
  for all
  to authenticated, anon
  using (false)
  with check (false);
