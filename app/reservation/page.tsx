"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

interface ReservationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  service: "lunch" | "dinner" | "brunch";
  guests: number;
  tablePreference: "sea_view" | "interior" | "terrace";
  specialRequests: string;
}

export default function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>();

  const onSubmit = async (data: ReservationForm) => {
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  const inputClass =
    "w-full border-b border-dark/20 bg-transparent py-3 text-sm text-dark outline-none transition-colors focus:border-gold placeholder:text-dark/30";
  const labelClass = "label mb-2 block text-dark/50";

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <ScrollReveal className="text-center">
          <p className="label mb-4 text-gold">Merci</p>
          <h1 className="font-heading text-4xl text-dark lg:text-5xl">
            Réservation envoyée
          </h1>
          <p className="mx-auto mt-4 max-w-md text-dark/60">
            Nous avons bien reçu votre demande. Vous recevrez une confirmation
            par email sous 24h. À très bientôt à La Savane !
          </p>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <ScrollReveal>
          <p className="label mb-4 text-center text-green">Votre table</p>
          <h1 className="text-center font-heading text-5xl text-dark lg:text-7xl">
            Réserver
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-dark/60">
            Remplissez le formulaire ci-dessous et nous vous confirmerons votre
            réservation dans les meilleurs délais.
          </p>
        </ScrollReveal>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-16 flex flex-col gap-8"
        >
          {/* Name row */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Prénom</label>
              <input
                {...register("firstName", { required: true })}
                placeholder="Votre prénom"
                className={inputClass}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">Requis</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Nom</label>
              <input
                {...register("lastName", { required: true })}
                placeholder="Votre nom"
                className={inputClass}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">Requis</p>
              )}
            </div>
          </div>

          {/* Contact row */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email@exemple.com"
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">Requis</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Téléphone</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="0690 00 00 00"
                className={inputClass}
              />
            </div>
          </div>

          {/* Date & service */}
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                {...register("date", { required: true })}
                className={inputClass}
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-500">Requis</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Service</label>
              <select
                {...register("service", { required: true })}
                className={inputClass}
              >
                <option value="lunch">Midi</option>
                <option value="dinner">Soir</option>
                <option value="brunch">Brunch</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Couverts</label>
              <select
                {...register("guests", { required: true })}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "personne" : "personnes"}
                  </option>
                ))}
                <option value={0}>+8 (nous contacter)</option>
              </select>
            </div>
          </div>

          {/* Table preference */}
          <div>
            <label className={labelClass}>Préférence de table</label>
            <div className="flex flex-wrap gap-4">
              {[
                { value: "sea_view", label: "Vue mer" },
                { value: "terrace", label: "Terrasse" },
                { value: "interior", label: "Intérieur" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    value={opt.value}
                    {...register("tablePreference")}
                    className="accent-gold"
                  />
                  <span className="text-sm text-dark/70">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special requests */}
          <div>
            <label className={labelClass}>Notes spéciales</label>
            <textarea
              {...register("specialRequests")}
              placeholder="Occasion spéciale, allergies, préférences de vin..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full bg-gold py-4 text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:bg-gold/80 disabled:opacity-50"
          >
            {isSubmitting ? "Envoi en cours..." : "Confirmer la réservation"}
          </button>
        </form>
      </div>
    </div>
  );
}
