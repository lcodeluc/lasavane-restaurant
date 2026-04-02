"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const brunchItems = [
  "Viennoiseries fraîches & pains maison",
  "Œufs brouillés créoles aux épices douces",
  "Pancakes à la banane, sirop d'érable & coco",
  "Salade de fruits tropicaux de saison",
  "Tartare de saumon, avocat, citron vert",
  "Accras & boudins créoles",
  "Jus frais pressés : goyave, passion, canne",
  "Café, thé & chocolat chaud maison",
];

export default function BrunchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
        <Image
          src="/images/brunch.jpg"
          alt="Brunch dominical La Savane"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark/40" />
        <div className="relative z-10 text-center">
          <ScrollReveal>
            <p className="label mb-4 text-gold">Chaque dimanche</p>
            <h1 className="font-heading text-5xl text-cream lg:text-7xl">
              Le Brunch
            </h1>
            <p className="mt-4 text-lg text-cream/80">
              10h30 – 15h00 · Face à la mer
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          {/* Text */}
          <ScrollReveal>
            <p className="label mb-4 text-green">Le rendez-vous du dimanche</p>
            <h2 className="font-heading text-3xl text-dark lg:text-4xl">
              Un buffet généreux entre terre et mer
            </h2>
            <p className="mt-6 leading-relaxed text-dark/60">
              Chaque dimanche, La Savane vous invite à un moment de partage autour
              d&rsquo;un brunch généreux. Produits frais, recettes créoles et
              classiques français se mêlent dans une ambiance détendue, les pieds
              presque dans le sable.
            </p>

            <div className="mt-10">
              <p className="label mb-4 text-dark/40">Au programme</p>
              <ul className="flex flex-col gap-3">
                {brunchItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-dark/70"
                  >
                    <span className="mt-1 text-gold">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/reservation"
                className="bg-gold px-8 py-3 text-center text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:bg-gold/80"
              >
                Réserver pour le brunch
              </Link>
            </div>
          </ScrollReveal>

          {/* Images */}
          <div className="flex flex-col gap-4">
            <ScrollReveal>
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src="/images/brunch-1.jpg"
                  alt="Buffet brunch"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src="/images/brunch-2.jpg"
                  alt="Terrasse brunch vue mer"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="bg-green px-6 py-16 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl text-cream">Infos pratiques</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <div>
                <p className="label text-gold">Quand</p>
                <p className="mt-2 text-cream/80">Dimanche</p>
                <p className="text-cream/80">10h30 – 15h00</p>
              </div>
              <div>
                <p className="label text-gold">Tarif</p>
                <p className="mt-2 text-cream/80">35€ par personne</p>
                <p className="text-cream/60 text-sm">Enfant -12 ans : 18€</p>
              </div>
              <div>
                <p className="label text-gold">Réservation</p>
                <p className="mt-2 text-cream/80">Recommandée</p>
                <a
                  href="tel:+590590913958"
                  className="text-sm text-gold transition-colors hover:text-cream"
                >
                  0590 91 39 58
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
