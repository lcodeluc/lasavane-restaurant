"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-warm-dark px-6 py-16 text-cream/70 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-3xl text-cream not-italic">
            La Savane
          </h3>
          <p className="label mt-2 text-gold">Restaurant</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Cuisine française &amp; créole face à la baie de Deshaies,
            Guadeloupe.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="label mb-4 text-cream">Navigation</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/carte" className="transition-colors hover:text-gold">La Carte</Link></li>
            <li><Link href="/brunch" className="transition-colors hover:text-gold">Brunch Dominical</Link></li>
            <li><Link href="/reservation" className="transition-colors hover:text-gold">Réserver</Link></li>
            <li><Link href="/mon-espace" className="transition-colors hover:text-gold">Mon Espace</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="label mb-4 text-cream">Nous trouver</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>Boulevard des Poissonniers</li>
            <li>Deshaies 97126, Guadeloupe</li>
            <li className="mt-2">
              <a href="tel:+590590913958" className="transition-colors hover:text-gold">
                0590 91 39 58
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/lasavane_restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold"
              >
                @lasavane_restaurant
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Hours */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 pt-8">
        <div className="flex flex-wrap justify-between gap-6 text-xs">
          <div className="flex flex-wrap gap-6">
            <span>Vendredi : soir</span>
            <span>Sam–Mar : midi &amp; soir</span>
            <span>Dimanche : Brunch 10h30–15h</span>
            <span>Mer–Jeu : fermé</span>
          </div>
          <span className="text-cream/40">
            &copy; {new Date().getFullYear()} La Savane. Tous droits réservés.
          </span>
        </div>
      </div>
    </footer>
  );
}
