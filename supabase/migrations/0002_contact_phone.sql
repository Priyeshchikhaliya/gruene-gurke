-- Optional phone number on contact messages (the contact form asks for it).
alter table public.contact_messages
  add column if not exists phone text check (char_length(phone) <= 30);
