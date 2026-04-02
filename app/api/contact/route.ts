import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
  });

  if (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
