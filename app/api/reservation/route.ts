import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { firstName, lastName, email, phone, date, service, guests, tablePreference, specialRequests } = body;

  if (!firstName || !lastName || !email || !date || !service) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const { error } = await supabase.from("reservations").insert({
    date,
    service,
    guests: Number(guests),
    table_preference: tablePreference || null,
    special_requests: specialRequests || null,
    status: "pending",
    guest_name: `${firstName} ${lastName}`,
    guest_email: email,
    guest_phone: phone || null,
  });

  if (error) {
    console.error("Reservation error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
