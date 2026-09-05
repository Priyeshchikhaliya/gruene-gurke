# Supabase

## Apply the schema

Option A — dashboard: open **SQL Editor**, paste `migrations/0001_init.sql`, run.

Option B — CLI:

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

## Make yourself an admin

1. Authentication → Users → **Add user** (email + password).
2. Copy the user's UUID, then in the SQL editor:

```sql
insert into public.admin_users (user_id) values ('<uuid>');
```

Only rows in `admin_users` pass `is_admin()`, which every admin RLS policy and the
`gallery` storage bucket use.

## Regenerate TypeScript types after schema changes

```bash
npx supabase gen types typescript --project-id <your-project-ref> --schema public \
  > src/lib/supabase/database.types.ts
```
