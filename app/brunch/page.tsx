"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";
import ParallaxImage from "../components/ParallaxImage";
import AnimatedText from "../components/AnimatedText";

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
      <section className="relative flex h-[75vh] items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src="/images/brunch.jpg"
            alt="Mosaïque du brunch dominical La Savane"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark/40" />
        </motion.div>
        <div className="relative z-10 text-center">
          <motion.p
            className="label mb-4 text-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Chaque dimanche
          </motion.p>
          <motion.h1
            className="font-heading text-6xl text-cream lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Le Brunch
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-cream/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            10h30 – 15h00 · Face à la mer
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          {/* Text */}
          <div>
            <motion.p
              className="label mb-4 text-green"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Le rendez-vous du dimanche
            </motion.p>
            <AnimatedText
              text="Un buffet généreux entre terre et mer"
              tag="h2"
              className="font-heading text-3xl text-dark lg:text-4xl"
            />
            <motion.p
              className="mt-6 leading-relaxed text-dark/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Chaque dimanche, La Savane vous invite à un moment de partage autour
              d&rsquo;un brunch généreux. Produits frais, recettes créoles et
              classiques français se mêlent dans une ambiance détendue, les pieds
              presque dans le sable.
            </motion.p>

            <div className="mt-10">
              <p className="label mb-4 text-dark/40">Au programme</p>
              <ul className="flex flex-col gap-3">
                {brunchItems.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-sm text-dark/70"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                  >
                    <span className="mt-1 text-gold">✦</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/reservation"
                className="group relative inline-block overflow-hidden bg-gold px-8 py-3 text-sm font-light uppercase tracking-[0.2em] text-cream"
              >
                <span className="relative z-10">Réserver pour le brunch</span>
                <motion.div
                  className="absolute inset-0 bg-cream/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-4">
            <ScrollReveal>
              <motion.div
                className="group relative h-[300px] overflow-hidden"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/brunch-1.jpg"
                  alt="Buffet brunch généreux"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                />
              </motion.div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <motion.div
                className="group relative h-[300px] overflow-hidden"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/brunch-2.jpg"
                  alt="Vue aérienne baie de Deshaies"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Full-width image band */}
      <ParallaxImage
        src="/images/vue-mer.jpg"
        alt="Vue depuis la terrasse au coucher du soleil"
        className="h-[40vh]"
        speed={0.3}
        overlay
      />

      {/* Infos pratiques */}
      <section className="bg-green px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText
            text="Infos pratiques"
            tag="h2"
            className="font-heading text-3xl text-cream"
          />
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {[
              {
                label: "Quand",
                line1: "Dimanche",
                line2: "10h30 – 15h00",
              },
              {
                label: "Tarif",
                line1: "35€ par personne",
                line2: "Enfant -12 ans : 18€",
              },
              {
                label: "Réservation",
                line1: "Recommandée",
                line2: "0590 91 39 58",
                link: "tel:+590590913958",
              },
            ].map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              >
                <p className="label text-gold">{info.label}</p>
                <p className="mt-2 text-cream/80">{info.line1}</p>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-sm text-gold transition-colors hover:text-cream"
                  >
                    {info.line2}
                  </a>
                ) : (
                  <p className="text-sm text-cream/60">{info.line2}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
