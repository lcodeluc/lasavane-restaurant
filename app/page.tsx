"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./components/ScrollReveal";
import Marquee from "./components/Marquee";

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Vue sur la baie de Deshaies au coucher du soleil"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/60" />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.h1
            className="font-heading text-6xl italic text-cream md:text-8xl lg:text-9xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            La Savane
          </motion.h1>
          <motion.p
            className="label mt-4 text-cream/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Cuisine française &amp; créole · Face à la mer
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link
              href="/reservation"
              className="bg-gold px-8 py-3 text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:bg-gold/80"
            >
              Réserver une table
            </Link>
            <Link
              href="/carte"
              className="border border-cream/50 px-8 py-3 text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:border-gold hover:text-gold"
            >
              Découvrir la carte
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-10 w-px bg-cream/40" />
        </motion.div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== INTRO SPLIT ===== */}
      <section className="grid min-h-[80vh] md:grid-cols-2">
        <div className="flex items-center bg-green px-8 py-20 lg:px-16">
          <ScrollReveal>
            <p className="label mb-6 text-gold">Notre histoire</p>
            <h2 className="font-heading text-4xl text-cream not-italic lg:text-5xl">
              Au cœur de la baie de Deshaies, une table tournée vers l&rsquo;horizon.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80">
              La Savane propose une cuisine française sublimée par les saveurs
              créoles. Chaque repas devient un moment unique, façonné selon
              vos envies et vos habitudes. Nous nous souvenons de vous.
            </p>
          </ScrollReveal>
        </div>
        <div className="relative min-h-[50vh] md:min-h-0">
          <Image
            src="/images/salle.jpg"
            alt="Salle du restaurant La Savane"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ===== GALERIE ===== */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="label mb-4 text-green">Nos créations</p>
            <h2 className="font-heading text-4xl text-dark lg:text-5xl">
              Une cuisine d&rsquo;exception
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <ScrollReveal className="md:col-span-2 md:row-span-2">
              <div className="group relative h-full min-h-[400px] overflow-hidden">
                <Image
                  src="/images/plat-1.jpg"
                  alt="Plat signature"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="group relative h-[250px] overflow-hidden">
                <Image
                  src="/images/plat-2.jpg"
                  alt="Entrée créole"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="group relative h-[250px] overflow-hidden">
                <Image
                  src="/images/plat-3.jpg"
                  alt="Dessert tropical"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SIGNATURE ===== */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/images/signature.jpg"
          alt="Expérience culinaire La Savane"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="relative z-10 flex min-h-[70vh] items-center px-6 lg:px-12">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="label mb-4 text-gold">Notre philosophie</p>
            <h2 className="font-heading text-4xl text-cream lg:text-6xl">
              Nous croyons que les meilleurs repas sont ceux où tout semble
              avoir été pensé pour vous.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80">
              Votre table préférée, votre vin habituel, votre moment favori de
              la journée. C&rsquo;est notre engagement.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== EXPERIENCE CARDS ===== */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-16 text-center">
            <p className="label mb-4 text-green">L&rsquo;expérience</p>
            <h2 className="font-heading text-4xl text-dark lg:text-5xl">
              Trois piliers
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Vue mer",
                desc: "Une terrasse face à la baie, où chaque coucher de soleil est un spectacle.",
                image: "/images/vue-mer.jpg",
              },
              {
                title: "La carte",
                desc: "Des produits locaux sublimés par une technique française et un esprit créole.",
                image: "/images/carte-preview.jpg",
              },
              {
                title: "Votre profil",
                desc: "Créez votre espace pour que chaque visite soit pensée selon vos goûts.",
                image: "/images/profil.jpg",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.15}>
                <div className="group relative h-[450px] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-heading text-3xl text-cream not-italic transition-transform duration-500 group-hover:-translate-y-2">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA RESERVATION ===== */}
      <section className="bg-warm-dark px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl md:grid md:grid-cols-2 md:gap-16">
          <ScrollReveal>
            <p className="label mb-4 text-gold">Horaires</p>
            <h2 className="font-heading text-4xl text-cream lg:text-5xl">
              Quand nous retrouver
            </h2>
            <ul className="mt-8 flex flex-col gap-3 text-cream/70">
              <li className="flex justify-between border-b border-cream/10 pb-3">
                <span>Vendredi</span>
                <span>Soir uniquement</span>
              </li>
              <li className="flex justify-between border-b border-cream/10 pb-3">
                <span>Samedi – Mardi</span>
                <span>Midi &amp; Soir</span>
              </li>
              <li className="flex justify-between border-b border-cream/10 pb-3">
                <span>Dimanche</span>
                <span>Brunch 10h30 – 15h00</span>
              </li>
              <li className="flex justify-between pb-3">
                <span>Mercredi &amp; Jeudi</span>
                <span className="text-cream/40">Fermé</span>
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-12 flex flex-col justify-center md:mt-0">
            <p className="max-w-md text-lg leading-relaxed text-cream/70">
              Offrez-vous une expérience unique face à la mer des Caraïbes.
              Réservez dès maintenant pour garantir votre table.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/reservation"
                className="bg-gold px-8 py-3 text-center text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:bg-gold/80"
              >
                Réserver
              </Link>
              <a
                href="tel:+590590913958"
                className="border border-cream/30 px-8 py-3 text-center text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:border-gold hover:text-gold"
              >
                Appeler
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
