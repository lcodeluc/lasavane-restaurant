"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useI18n } from "../lib/i18n/context";
import type { TranslationKey } from "../lib/i18n/translations";

const links: { href: string; key: TranslationKey }[] = [
  { href: "/carte", key: "nav_carte" },
  { href: "/brunch", key: "nav_brunch" },
  { href: "/reservation", key: "nav_reservation" },
  { href: "/mon-espace", key: "nav_espace" },
  { href: "/contact", key: "nav_contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, toggleLocale } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-warm-dark/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-heading text-2xl italic text-cream">
              La Savane
            </span>
            <span className="label mt-0.5 text-gold">Restaurant</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label text-cream/80 transition-colors hover:text-gold"
              >
                {t(link.key)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="label ml-2 border border-cream/20 px-2 py-1 text-cream/60 transition-colors hover:border-gold hover:text-gold"
            >
              {t("lang_switch")}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <motion.span
              className="block h-px w-6 bg-cream"
              animate={
                mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
              }
            />
            <motion.span
              className="block h-px w-6 bg-cream"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-px w-6 bg-cream"
              animate={
                mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
              }
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-warm-dark"
          >
            <ul className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-3xl italic text-cream transition-colors hover:text-gold"
                  >
                    {t(link.key)}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
              >
                <button
                  onClick={() => {
                    toggleLocale();
                    setMobileOpen(false);
                  }}
                  className="label border border-cream/20 px-4 py-2 text-cream/60 transition-colors hover:border-gold hover:text-gold"
                >
                  {t("lang_switch")}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
