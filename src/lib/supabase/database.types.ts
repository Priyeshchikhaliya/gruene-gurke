/**
 * Passend zu supabase/migrations/0001_init.sql.
 * Nach Schemaänderungen neu erzeugen:
 *   npx supabase gen types typescript --project-id <ref> --schema public > src/lib/supabase/database.types.ts
 */
export type ReservationStatus = "offen" | "bestaetigt" | "abgesagt";
export type GalleryCategory = "restaurant" | "catering";

type Stamps = { created_at: string; updated_at: string };

export type OpeningSeasonRow = Stamps & {
  id: string;
  slug: string;
  label: string;
  period: string;
  start_month: number;
  end_month: number;
  restaurant_opens: string;
  restaurant_closes: string;
  takeaway_opens: string;
  takeaway_closes: string;
  kitchen_until: string;
  sort_order: number;
};

export type MenuCategoryRow = Stamps & {
  id: string;
  slug: string;
  title: string;
  intro: string | null;
  note: string | null;
  sort_order: number;
  is_active: boolean;
};

export type MenuItemRow = Stamps & {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price_cents: number;
  allergens: string | null;
  tags: string[];
  extra_label: string | null;
  extra_price_cents: number | null;
  sort_order: number;
  is_available: boolean;
};

export type MenuItemVariantRow = {
  id: string;
  created_at: string;
  item_id: string;
  label: string;
  price_cents: number;
  sort_order: number;
};

export type AllergenRow = { code: string; label: string; sort_order: number };

export type MenuNoteRow = { id: string; created_at: string; text: string; sort_order: number };

export type GalleryImageRow = Stamps & {
  id: string;
  url: string;
  alt: string;
  category: GalleryCategory;
  width: number | null;
  height: number | null;
  sort_order: number;
  is_active: boolean;
};

export type JobPostingRow = Stamps & {
  id: string;
  title: string;
  terms: string | null;
  sort_order: number;
  is_active: boolean;
};

export type JobBenefitRow = { id: string; created_at: string; label: string; sort_order: number };

export type SiteSettingRow = {
  key: string;
  value: string;
  label: string;
  hint: string | null;
  multiline: boolean;
  sort_order: number;
  updated_at: string;
};

export type ReservationRow = Stamps & {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  reserved_date: string;
  reserved_time: string;
  message: string | null;
  status: ReservationStatus;
  internal_note: string | null;
};

export type ContactMessageRow = Stamps & {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
};

export type AdminUserRow = { user_id: string; name: string | null; created_at: string };

type Table<Row, Req extends keyof Row, Gen extends keyof Row> = {
  Row: Row;
  Insert: Omit<Row, Gen> & Partial<Pick<Row, Gen>> & Pick<Row, Req>;
  Update: Partial<Row>;
  Relationships: [];
};

type G = "id" | "created_at" | "updated_at";

export type Database = {
  public: {
    Tables: {
      admin_users: Table<AdminUserRow, "user_id", "created_at" | "name">;
      opening_seasons: Table<OpeningSeasonRow, "slug" | "label" | "period", G | "sort_order">;
      menu_categories: Table<MenuCategoryRow, "slug" | "title", G | "intro" | "note" | "sort_order" | "is_active">;
      menu_items: Table<
        MenuItemRow,
        "category_id" | "name" | "price_cents",
        G | "description" | "allergens" | "tags" | "extra_label" | "extra_price_cents" | "sort_order" | "is_available"
      >;
      menu_item_variants: Table<MenuItemVariantRow, "item_id" | "label" | "price_cents", "id" | "created_at" | "sort_order">;
      allergens: Table<AllergenRow, "code" | "label", "sort_order">;
      menu_notes: Table<MenuNoteRow, "text", "id" | "created_at" | "sort_order">;
      gallery_images: Table<GalleryImageRow, "url" | "alt" | "category", G | "width" | "height" | "sort_order" | "is_active">;
      job_postings: Table<JobPostingRow, "title", G | "terms" | "sort_order" | "is_active">;
      job_benefits: Table<JobBenefitRow, "label", "id" | "created_at" | "sort_order">;
      site_settings: Table<SiteSettingRow, "key" | "label", "updated_at" | "value" | "hint" | "multiline" | "sort_order">;
      reservations: Table<
        ReservationRow,
        "name" | "email" | "phone" | "guests" | "reserved_date" | "reserved_time",
        G | "message" | "status" | "internal_note"
      >;
      contact_messages: Table<ContactMessageRow, "name" | "email" | "message", G | "phone" | "is_read">;
    };
    Views: Record<string, never>;
    Functions: { is_admin: { Args: Record<string, never>; Returns: boolean } };
    Enums: { reservation_status: ReservationStatus };
    CompositeTypes: Record<string, never>;
  };
};
