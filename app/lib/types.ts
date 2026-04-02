export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_table: "sea_view" | "interior" | "terrace" | null;
  favorite_wine: string | null;
  dietary_restrictions: string | null;
  special_occasions: { type: string; date: string }[] | null;
  notes: string | null;
  created_at: string;
}

export interface Reservation {
  id: string;
  profile_id: string;
  date: string;
  service: "lunch" | "dinner" | "brunch";
  guests: number;
  table_preference: string | null;
  special_requests: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}
