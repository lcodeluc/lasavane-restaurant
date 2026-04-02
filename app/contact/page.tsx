"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSent(true);
    } catch {
      alert("Erreur. Veuillez réessayer.");
    }
  };

  const inputClass =
    "w-full border-b border-dark/20 bg-transparent py-3 text-sm text-dark outline-none transition-colors focus:border-gold placeholder:text-dark/30";

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal className="text-center">
          <p className="label mb-4 text-green">Nous retrouver</p>
          <h1 className="font-heading text-5xl text-dark lg:text-7xl">
            Contact
          </h1>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          {/* Info */}
          <ScrollReveal>
            <div className="flex flex-col gap-10">
              <div>
                <p className="label mb-3 text-dark/40">Adresse</p>
                <p className="text-dark/70">Boulevard des Poissonniers</p>
                <p className="text-dark/70">Deshaies 97126, Guadeloupe</p>
              </div>
              <div>
                <p className="label mb-3 text-dark/40">Téléphone</p>
                <a
                  href="tel:+590590913958"
                  className="text-dark/70 transition-colors hover:text-gold"
                >
                  0590 91 39 58
                </a>
              </div>
              <div>
                <p className="label mb-3 text-dark/40">Instagram</p>
                <a
                  href="https://instagram.com/lasavane_restaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark/70 transition-colors hover:text-gold"
                >
                  @lasavane_restaurant
                </a>
              </div>
              <div>
                <p className="label mb-3 text-dark/40">Horaires</p>
                <ul className="flex flex-col gap-1 text-sm text-dark/70">
                  <li>Vendredi : soir uniquement</li>
                  <li>Samedi – Mardi : midi &amp; soir</li>
                  <li>Dimanche : Brunch 10h30 – 15h00</li>
                  <li className="text-dark/40">Mercredi &amp; Jeudi : fermé</li>
                </ul>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-10 h-[300px] overflow-hidden bg-dark/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3811.5!2d-61.798!3d16.305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDE4JzE4LjAiTiA2McKwNDcnNTIuOCJX!5e0!3m2!1sfr!2sgp!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Savane - Deshaies, Guadeloupe"
              />
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.15}>
            {sent ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="label mb-4 text-gold">Message envoyé</p>
                  <p className="text-dark/60">
                    Merci ! Nous vous répondrons dans les meilleurs délais.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <div>
                  <label className="label mb-2 block text-dark/50">Nom</label>
                  <input
                    {...register("name", { required: true })}
                    placeholder="Votre nom"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">Requis</p>
                  )}
                </div>
                <div>
                  <label className="label mb-2 block text-dark/50">Email</label>
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
                  <label className="label mb-2 block text-dark/50">
                    Message
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    placeholder="Votre message..."
                    rows={6}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">Requis</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold py-4 text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:bg-gold/80 disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi..." : "Envoyer"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
