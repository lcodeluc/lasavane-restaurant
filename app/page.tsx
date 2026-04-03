"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import ScrollReveal from "./components/ScrollReveal";
import Marquee from "./components/Marquee";
import ParallaxImage from "./components/ParallaxImage";
import AnimatedText from "./components/AnimatedText";

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-screen items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <motion.div className="h-full w-full" style={{ y: heroY }}>
          <Image
            src="/images/hero.jpg"
            alt="Coucher de soleil sur la baie de Deshaies avec voiliers"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/10 to-dark/70" />
      </motion.div>

      <motion.div className="relative z-10 text-center" style={{ opacity: heroOpacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="font-heading text-7xl italic text-cream md:text-8xl lg:text-[10rem] lg:leading-none">
            La Savane
          </h1>
        </motion.div>

        <motion.p
          className="label mt-6 text-cream/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Cuisine française &amp; créole · Face à la mer
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <Link
            href="/reservation"
            className="group relative overflow-hidden bg-gold px-10 py-4 text-sm font-light uppercase tracking-[0.2em] text-cream transition-all"
          >
            <span className="relative z-10">Réserver une table</span>
            <motion.div
              className="absolute inset-0 bg-cream/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          <Link
            href="/carte"
            className="group border border-cream/40 px-10 py-4 text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:border-gold hover:text-gold"
          >
            Découvrir la carte
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span className="label text-[0.5rem] text-cream/40">Scroll</span>
        <div className="h-8 w-px bg-cream/30" />
      </motion.div>
    </section>
  );
}

function GalleryImage({
  src,
  alt,
  className = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay} className={className}>
      <motion.div
        className="group relative h-full min-h-[250px] overflow-hidden"
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-dark/0 transition-colors duration-500 group-hover:bg-dark/10" />
      </motion.div>
    </ScrollReveal>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />

      <Marquee />

      {/* ===== INTRO SPLIT ===== */}
      <section className="grid min-h-[80vh] md:grid-cols-2">
        <div className="flex items-center bg-green px-8 py-20 lg:px-20">
          <div>
            <motion.p
              className="label mb-6 text-gold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Notre histoire
            </motion.p>
            <AnimatedText
              text="Au cœur de la baie de Deshaies, une table tournée vers l'horizon."
              tag="h2"
              className="font-heading text-4xl text-cream not-italic lg:text-5xl"
            />
            <motion.p
              className="mt-8 max-w-lg text-base leading-relaxed text-cream/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              La Savane propose une cuisine française sublimée par les saveurs
              créoles. Chaque repas devient un moment unique, façonné selon
              vos envies et vos habitudes. Nous nous souvenons de vous.
            </motion.p>
            <motion.div
              className="mt-8 h-px w-16 bg-gold"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
        </div>
        <ParallaxImage
          src="/images/salle.jpg"
          alt="Table dressée face au coucher de soleil sur la baie"
          className="min-h-[50vh] md:min-h-0"
          speed={0.2}
        />
      </section>

      {/* ===== GALERIE ===== */}
      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="label mb-4 text-green">Nos créations</p>
          </ScrollReveal>
          <AnimatedText
            text="Une cuisine d'exception"
            tag="h2"
            className="font-heading text-4xl text-dark lg:text-5xl"
            delay={0.1}
          />

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <GalleryImage
              src="/images/plat-1.jpg"
              alt="Plat signature face au coucher de soleil"
              className="md:col-span-2 md:row-span-2 min-h-[400px]"
            />
            <GalleryImage
              src="/images/plat-2.jpg"
              alt="Vue aérienne de la baie de Deshaies"
              delay={0.15}
            />
            <GalleryImage
              src="/images/plat-3.jpg"
              alt="La presqu'île de Deshaies"
              delay={0.25}
            />
          </div>
        </div>
      </section>

      {/* ===== SIGNATURE / PHILOSOPHIE ===== */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <ParallaxImage
          src="/images/signature.jpg"
          alt="Vue depuis le restaurant au coucher du soleil"
          className="absolute inset-0"
          speed={0.25}
          overlay
        />
        <div className="relative z-10 flex min-h-[80vh] items-center px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              className="label mb-6 text-gold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Notre philosophie
            </motion.p>
            <AnimatedText
              text="Nous croyons que les meilleurs repas sont ceux où tout semble avoir été pensé pour vous."
              tag="h2"
              className="font-heading text-4xl text-cream lg:text-6xl"
              delay={0.1}
            />
            <motion.p
              className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-cream/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Votre table préférée, votre vin habituel, votre moment favori de
              la journée. C&rsquo;est notre engagement.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE CARDS ===== */}
      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-16 text-center">
            <p className="label mb-4 text-green">L&rsquo;expérience</p>
          </ScrollReveal>
          <AnimatedText
            text="Trois piliers"
            tag="h2"
            className="mb-16 text-center font-heading text-4xl text-dark lg:text-5xl"
          />

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
                <motion.div
                  className="group relative h-[500px] overflow-hidden"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0"
                    variants={{
                      hover: { scale: 1.08 },
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.h3
                      className="font-heading text-3xl text-cream not-italic"
                      variants={{
                        hover: { y: -8 },
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      className="mt-3 text-sm leading-relaxed text-cream/70"
                      variants={{
                        hover: { opacity: 1, y: 0 },
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                    >
                      {card.desc}
                    </motion.p>
                    <motion.div
                      className="mt-4 h-px bg-gold"
                      variants={{
                        hover: { scaleX: 1 },
                      }}
                      initial={{ scaleX: 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA RESERVATION ===== */}
      <section className="bg-warm-dark px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl md:grid md:grid-cols-2 md:gap-16">
          <ScrollReveal>
            <motion.p
              className="label mb-4 text-gold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Horaires
            </motion.p>
            <AnimatedText
              text="Quand nous retrouver"
              tag="h2"
              className="font-heading text-4xl text-cream lg:text-5xl"
            />
            <ul className="mt-10 flex flex-col gap-4 text-cream/70">
              {[
                { day: "Vendredi", val: "Soir uniquement" },
                { day: "Samedi – Mardi", val: "Midi & Soir" },
                { day: "Dimanche", val: "Brunch 10h30 – 15h00" },
                { day: "Mercredi & Jeudi", val: "Fermé", muted: true },
              ].map((item, i) => (
                <motion.li
                  key={item.day}
                  className="flex justify-between border-b border-cream/10 pb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <span>{item.day}</span>
                  <span className={item.muted ? "text-cream/30" : ""}>
                    {item.val}
                  </span>
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-16 flex flex-col justify-center md:mt-0">
            <p className="max-w-md text-lg leading-relaxed text-cream/70">
              Offrez-vous une expérience unique face à la mer des Caraïbes.
              Réservez dès maintenant pour garantir votre table.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/reservation"
                className="group relative overflow-hidden bg-gold px-10 py-4 text-center text-sm font-light uppercase tracking-[0.2em] text-cream"
              >
                <span className="relative z-10">Réserver</span>
                <motion.div
                  className="absolute inset-0 bg-cream/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <a
                href="tel:+590590913958"
                className="border border-cream/30 px-10 py-4 text-center text-sm font-light uppercase tracking-[0.2em] text-cream transition-all hover:border-gold hover:text-gold"
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
