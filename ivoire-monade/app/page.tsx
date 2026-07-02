import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import NatureBackground from "@/components/NatureBackground";
import Reveal from "@/components/Reveal";
import SkillsGrid from "@/components/SkillsGrid";

export const metadata: Metadata = {
  title: "Pack Business : 13 compétences pour réussir en ligne",
  description:
    "Ivoire Monade — le Pack Business : e-commerce, produit digital, publicité, création de site et affiliation. Accès à vie, satisfait ou remboursé. 25 000 FCFA.",
  alternates: { canonical: "/" }
};

export default function Home() {
  return (
    <main>
      <header className="hero">
        <NatureBackground />
        <div className="wrap">
          <span className="badge">ACCÈS À VIE · MISES À JOUR INCLUSES</span>
          <h1>Pack Business : 13 compétences pour réussir en ligne</h1>
          <p className="lead">
            E-commerce, produit digital, publicité, création de site, affiliation… Tout, dans
            l'ordre, 100% pratique — quel que soit votre niveau.
          </p>
          <p className="price">
            {site.price} <small>Paiement unique · Satisfait ou remboursé</small>
          </p>
          <Link className="btn" href="/pack-business/">Je commande le pack</Link>
        </div>
      </header>
      <div className="pattern" aria-hidden="true" />

      <section className="patterned">
        <div className="wrap">
          <Reveal>
            <h2>Ce que vous allez <span className="accent">maîtriser</span></h2>
            <p className="sub">13 compétences essentielles pour lancer et faire vivre votre activité en ligne.</p>
          </Reveal>
          <SkillsGrid />
        </div>
      </section>

      <section className="dark patterned">
        <div className="wrap">
          <Reveal>
            <h2>Pourquoi {site.shortName}</h2>
            <p className="sub">Pensé pour passer à l'action, pas pour accumuler de la théorie.</p>
          </Reveal>
          <Reveal>
            <div className="grid">
              {[
                "Formations complètes, pas à pas",
                "Stratégies éprouvées + exemples pratiques",
                "Accès à vie",
                "Mises à jour régulières",
                "Pour tous les niveaux",
                "Satisfait ou remboursé"
              ].map((g) => (
                <div className="g" key={g}><span className="tick">✓</span><span>{g}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
