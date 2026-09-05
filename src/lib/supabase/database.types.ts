/**
 * Hand-written to match supabase/migrations/0001_init.sql.
 * Regenerate after schema changes with:
 *   npx supabase gen types typescript --project-id <ref> --schema public > src/lib/supabase/database.types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

type Timestamps = { created_at: string; updated_at: string };

export type ReservationRow = Timestamps & {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  reserved_date: string;
  reserved_time: string;
  message: string | null;
  locale: string;
  status: ReservationStatus;
  internal_note: string | null;
};

export type ContactMessageRow = Timestamps & {
  id: string;
  name: string;
  email: string;
  message: string;
  locale: string;
  is_read: boolean;
};

export type MenuCategoryRow = Timestamps & {
  id: string;
  slug: string;
  name_de: string;
  name_en: string;
  description_de: string | null;
  description_en: string | null;
  sort_order: number;
  is_active: boolean;
};

export type MenuItemRow = Timestamps & {
  id: string;
  category_id: string;
  name_de: string;
  name_en: string;
  description_de: string | null;
  description_en: string | null;
  price_cents: number;
  tags: string[];
  allergens: string[];
  image_path: string | null;
  sort_order: number;
  is_available: boolean;
};

export type OpeningHourRow = Timestamps & {
  id: string;
  weekday: number;
  opens_at: string | null;
  closes_at: string | null;
  is_closed: boolean;
  note_de: string | null;
  note_en: string | null;
  sort_order: number;
};

export type GalleryImageRow = Timestamps & {
  id: string;
  storage_path: string;
  alt_de: string;
  alt_en: string;
  width: number | null;
  height: number | null;
  sort_order: number;
  is_active: boolean;
};

export type SiteSettingRow = Timestamps & {
  key: string;
  value: Json;
};

export type AdminUserRow = {
  user_id: string;
  created_at: string;
};

type Table<Row, Required extends keyof Row, Generated extends keyof Row> = {
  Row: Row;
  Insert: Omit<Row, Generated> & Partial<Pick<Row, Generated>> & Pick<Row, Required>;
  Update: Partial<Row>;
  Relationships: [];
};

type Gen = "id" | "created_at" | "updated_at";

export type Database = {
  public: {
    Tables: {
      reservations: Table<
        ReservationRow,
        "name" | "email" | "phone" | "guests" | "reserved_date" | "reserved_time" | "locale",
        Gen | "message" | "status" | "internal_note"
      >;
      contact_messages: Table<
        ContactMessageRow,
        "name" | "email" | "message" | "locale",
        Gen | "is_read"
      >;
      menu_categories: Table<
        MenuCategoryRow,
        "slug" | "name_de" | "name_en",
        Gen | "description_de" | "description_en" | "sort_order" | "is_active"
      >;
      menu_items: Table<
        MenuItemRow,
        "category_id" | "name_de" | "name_en" | "price_cents",
        Gen | "description_de" | "description_en" | "tags" | "allergens" | "image_path" | "sort_order" | "is_available"
      >;
      opening_hours: Table<
        OpeningHourRow,
        "weekday",
        Gen | "opens_at" | "closes_at" | "is_closed" | "note_de" | "note_en" | "sort_order"
      >;
      gallery_images: Table<
        GalleryImageRow,
        "storage_path" | "alt_de" | "alt_en",
        Gen | "width" | "height" | "sort_order" | "is_active"
      >;
      site_settings: Table<SiteSettingRow, "key" | "value", "created_at" | "updated_at">;
      admin_users: Table<AdminUserRow, "user_id", "created_at">;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      reservation_status: ReservationStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
