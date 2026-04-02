"use client";

import ScrollReveal from "../components/ScrollReveal";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  signature?: boolean;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const menu: MenuCategory[] = [
  {
    title: "Entrées",
    items: [
      {
        name: "Tartare de thon rouge des Caraïbes",
        description: "Mangue verte, citron vert, huile de coriandre",
        price: "18€",
        signature: true,
      },
      {
        name: "Velouté de giraumon",
        description: "Crème coco, chips de christophine, piment doux",
        price: "14€",
      },
      {
        name: "Salade de langouste tiède",
        description: "Vinaigrette passion, mesclun local, avocat",
        price: "24€",
      },
      {
        name: "Accras de morue",
        description: "Sauce chien maison, citron vert",
        price: "12€",
      },
    ],
  },
  {
    title: "Plats",
    items: [
      {
        name: "Filet de vivaneau rôti",
        description: "Beurre blanc au rhum vieux, purée de patate douce, légumes péyi",
        price: "32€",
        signature: true,
      },
      {
        name: "Magret de canard laqué",
        description: "Réduction de goyave, gratin dauphinois créole",
        price: "34€",
      },
      {
        name: "Risotto aux fruits de mer",
        description: "Crevettes, lambis, safran local, parmesan",
        price: "30€",
        signature: true,
      },
      {
        name: "Filet de bœuf grillé",
        description: "Sauce poivre de Bois d'Inde, légumes grillés",
        price: "36€",
      },
      {
        name: "Court-bouillon de poisson",
        description: "Recette traditionnelle créole, riz basmati",
        price: "28€",
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Fondant au chocolat noir",
        description: "Cœur coulant, glace coco maison",
        price: "14€",
        signature: true,
      },
      {
        name: "Blanc-manger coco",
        description: "Coulis de fruits de la passion, zeste de citron vert",
        price: "12€",
      },
      {
        name: "Tarte tatin à la banane",
        description: "Caramel au rhum, crème chantilly vanille Bourbon",
        price: "13€",
      },
      {
        name: "Assiette de fruits frais",
        description: "Sélection de saison, sorbet maison",
        price: "10€",
      },
    ],
  },
  {
    title: "Vins & Boissons",
    items: [
      {
        name: "Ti' Punch maison",
        description: "Rhum agricole, citron vert, sucre de canne",
        price: "10€",
      },
      {
        name: "Sancerre blanc",
        description: "Domaine Vacheron — frais, minéral",
        price: "12€ / 48€",
      },
      {
        name: "Châteauneuf-du-Pape rouge",
        description: "Domaine du Vieux Télégraphe — puissant, épicé",
        price: "16€ / 65€",
      },
      {
        name: "Champagne Ruinart Blanc de Blancs",
        description: "Bulles fines, notes florales",
        price: "18€ / 95€",
      },
    ],
  },
];

export default function CartePage() {
  return (
    <div className="pt-28 pb-24">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <p className="label mb-4 text-green">Gastronomie</p>
          <h1 className="font-heading text-5xl text-dark lg:text-7xl">
            La Carte
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-dark/60">
            Une cuisine française sublimée par les saveurs créoles, élaborée
            avec les meilleurs produits locaux et de saison.
          </p>
        </ScrollReveal>
      </div>

      {/* Menu categories */}
      <div className="mx-auto mt-20 max-w-3xl px-6">
        {menu.map((category) => (
          <ScrollReveal key={category.title} className="mb-20">
            <h2 className="font-heading text-3xl text-green lg:text-4xl">
              {category.title}
            </h2>
            <div className="mt-2 h-px w-12 bg-gold" />

            <div className="mt-8 flex flex-col gap-8">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-normal text-dark not-italic">
                        {item.name}
                      </h3>
                      {item.signature && (
                        <span className="text-gold" title="Plat signature">
                          ✦
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-dark/50">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-light text-gold">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ))}

        {/* Legend */}
        <div className="border-t border-dark/10 pt-8 text-center">
          <p className="text-xs text-dark/40">
            <span className="text-gold">✦</span> Plat signature · Prix nets, service compris
          </p>
        </div>
      </div>
    </div>
  );
}
