"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Profile, Reservation } from "../lib/types";
import type { User } from "@supabase/supabase-js";
import ScrollReveal from "../components/ScrollReveal";
import Link from "next/link";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/mon-espace` },
    });
    setLoading(false);
    if (!error) setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <p className="label mb-4 text-gold">Vérifiez votre boîte mail</p>
        <p className="text-dark/60">
          Un lien de connexion a été envoyé à <strong>{email}</strong>.
          Cliquez dessus pour accéder à votre espace.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="mx-auto max-w-sm">
      <p className="mb-6 text-center text-dark/60">
        Connectez-vous avec votre adresse email pour accéder à votre espace
        personnel.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        required
        className="w-full border-b border-dark/20 bg-transparent py-3 text-sm text-dark outline-none transition-colors focus:border-gold placeholder:text-dark/30"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-gold py-3 text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:bg-gold/80 disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Recevoir le lien"}
      </button>
    </form>
  );
}

const tableLabels: Record<string, string> = {
  sea_view: "Vue mer",
  interior: "Intérieur",
  terrace: "Terrasse",
};

const serviceLabels: Record<string, string> = {
  lunch: "Midi",
  dinner: "Soir",
  brunch: "Brunch",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Annulée",
};

const statusColors: Record<string, string> = {
  pending: "text-gold",
  confirmed: "text-green",
  cancelled: "text-red-400",
};

function Dashboard({ user }: { user: User }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    preferred_table: "" as string,
    favorite_wine: "",
    dietary_restrictions: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Load profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
      setForm({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        phone: profileData.phone || "",
        preferred_table: profileData.preferred_table || "",
        favorite_wine: profileData.favorite_wine || "",
        dietary_restrictions: profileData.dietary_restrictions || "",
        notes: profileData.notes || "",
      });
    }

    // Load reservations
    const { data: resData } = await supabase
      .from("reservations")
      .select("*")
      .eq("profile_id", user.id)
      .order("date", { ascending: false });

    if (resData) setReservations(resData);
  };

  const saveProfile = async () => {
    const updates = {
      id: user.id,
      email: user.email,
      ...form,
      preferred_table: form.preferred_table || null,
    };

    const { error } = await supabase.from("profiles").upsert(updates);
    if (!error) {
      setEditing(false);
      loadData();
    }
  };

  const upcomingReservation = reservations.find(
    (r) => new Date(r.date) >= new Date() && r.status !== "cancelled"
  );

  return (
    <div className="mx-auto max-w-4xl">
      {/* Welcome */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="label text-green">Bienvenue</p>
          <h2 className="font-heading text-3xl text-dark">
            {profile?.first_name
              ? `${profile.first_name} ${profile.last_name}`
              : user.email}
          </h2>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="label text-dark/40 transition-colors hover:text-dark"
        >
          Déconnexion
        </button>
      </div>

      {/* Next reservation */}
      {upcomingReservation && (
        <div className="mb-12 border border-gold/30 bg-gold/5 p-6">
          <p className="label mb-2 text-gold">Prochaine réservation</p>
          <p className="text-lg text-dark">
            {new Date(upcomingReservation.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            — {serviceLabels[upcomingReservation.service]}
          </p>
          <p className="mt-1 text-sm text-dark/60">
            {upcomingReservation.guests} couverts
            {upcomingReservation.table_preference &&
              ` · ${tableLabels[upcomingReservation.table_preference] || upcomingReservation.table_preference}`}
          </p>
        </div>
      )}

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Profile / Preferences */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="label text-dark/40">Mes préférences</p>
            <button
              onClick={() => (editing ? saveProfile() : setEditing(true))}
              className="label text-gold transition-colors hover:text-green"
            >
              {editing ? "Sauvegarder" : "Modifier"}
            </button>
          </div>

          {editing ? (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                  placeholder="Prénom"
                  className="border-b border-dark/20 bg-transparent py-2 text-sm outline-none focus:border-gold"
                />
                <input
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                  placeholder="Nom"
                  className="border-b border-dark/20 bg-transparent py-2 text-sm outline-none focus:border-gold"
                />
              </div>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Téléphone"
                className="border-b border-dark/20 bg-transparent py-2 text-sm outline-none focus:border-gold"
              />
              <select
                value={form.preferred_table}
                onChange={(e) =>
                  setForm({ ...form, preferred_table: e.target.value })
                }
                className="border-b border-dark/20 bg-transparent py-2 text-sm outline-none focus:border-gold"
              >
                <option value="">Table préférée...</option>
                <option value="sea_view">Vue mer</option>
                <option value="terrace">Terrasse</option>
                <option value="interior">Intérieur</option>
              </select>
              <input
                value={form.favorite_wine}
                onChange={(e) =>
                  setForm({ ...form, favorite_wine: e.target.value })
                }
                placeholder="Vin favori"
                className="border-b border-dark/20 bg-transparent py-2 text-sm outline-none focus:border-gold"
              />
              <input
                value={form.dietary_restrictions}
                onChange={(e) =>
                  setForm({ ...form, dietary_restrictions: e.target.value })
                }
                placeholder="Allergies / régimes"
                className="border-b border-dark/20 bg-transparent py-2 text-sm outline-none focus:border-gold"
              />
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes personnelles"
                rows={3}
                className="resize-none border-b border-dark/20 bg-transparent py-2 text-sm outline-none focus:border-gold"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-sm">
              {profile?.preferred_table && (
                <div className="flex justify-between border-b border-dark/5 pb-3">
                  <span className="text-dark/40">Table préférée</span>
                  <span>{tableLabels[profile.preferred_table]}</span>
                </div>
              )}
              {profile?.favorite_wine && (
                <div className="flex justify-between border-b border-dark/5 pb-3">
                  <span className="text-dark/40">Vin favori</span>
                  <span>{profile.favorite_wine}</span>
                </div>
              )}
              {profile?.dietary_restrictions && (
                <div className="flex justify-between border-b border-dark/5 pb-3">
                  <span className="text-dark/40">Restrictions</span>
                  <span>{profile.dietary_restrictions}</span>
                </div>
              )}
              {profile?.phone && (
                <div className="flex justify-between border-b border-dark/5 pb-3">
                  <span className="text-dark/40">Téléphone</span>
                  <span>{profile.phone}</span>
                </div>
              )}
              {!profile?.preferred_table &&
                !profile?.favorite_wine &&
                !profile?.dietary_restrictions && (
                  <p className="text-dark/40">
                    Aucune préférence enregistrée.{" "}
                    <button
                      onClick={() => setEditing(true)}
                      className="text-gold underline"
                    >
                      Ajouter
                    </button>
                  </p>
                )}
            </div>
          )}

          {/* Message from restaurant */}
          <div className="mt-10 border-l-2 border-gold pl-4">
            <p className="text-sm italic text-dark/60">
              &laquo; Merci de votre fidélité. Nous avons hâte de vous
              retrouver à votre table. &raquo;
            </p>
            <p className="label mt-2 text-dark/30">L&rsquo;équipe La Savane</p>
          </div>
        </div>

        {/* Reservations history */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="label text-dark/40">Mes réservations</p>
            <Link
              href="/reservation"
              className="label text-gold transition-colors hover:text-green"
            >
              Nouvelle
            </Link>
          </div>

          {reservations.length === 0 ? (
            <p className="text-sm text-dark/40">
              Aucune réservation.{" "}
              <Link href="/reservation" className="text-gold underline">
                Réserver
              </Link>
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {reservations.map((r) => (
                <div
                  key={r.id}
                  className="border border-dark/5 p-4 transition-colors hover:border-dark/10"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-dark">
                        {new Date(r.date).toLocaleDateString("fr-FR", {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="mt-1 text-sm text-dark/60">
                        {serviceLabels[r.service]} · {r.guests} couverts
                        {r.table_preference &&
                          ` · ${tableLabels[r.table_preference] || r.table_preference}`}
                      </p>
                    </div>
                    <span
                      className={`label ${statusColors[r.status] || "text-dark/40"}`}
                    >
                      {statusLabels[r.status] || r.status}
                    </span>
                  </div>
                  {r.special_requests && (
                    <p className="mt-2 text-xs text-dark/40">
                      {r.special_requests}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MonEspacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      {!user ? (
        <div className="mx-auto max-w-lg">
          <ScrollReveal className="text-center">
            <p className="label mb-4 text-green">Espace personnel</p>
            <h1 className="font-heading text-5xl text-dark lg:text-7xl">
              Mon Espace
            </h1>
          </ScrollReveal>
          <div className="mt-16">
            <AuthForm />
          </div>
        </div>
      ) : (
        <>
          <ScrollReveal>
            <p className="label mb-4 text-center text-green">
              Espace personnel
            </p>
            <h1 className="mb-16 text-center font-heading text-5xl text-dark lg:text-6xl">
              Mon Espace
            </h1>
          </ScrollReveal>
          <Dashboard user={user} />
        </>
      )}
    </div>
  );
}
