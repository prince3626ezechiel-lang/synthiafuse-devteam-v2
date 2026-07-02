import type { Metadata } from "next";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SkillsGrid from "@/components/SkillsGrid";

export const metadata: Metadata = {
  title: "Commander le Pack Business",
  description:
    "Rejoignez le Pack Business Ivoire Monade : 13 compétences en ligne, accès à vie, paiement Wave ou Orange Money. 25 000 FCFA, satisfait ou remboursé.",
  alternates: { canonical: "/pack-business/" }
};

export default function PackBusiness() {
  return (
    <main>
      <section>
        <div className="wrap">
          <h1 style={{ textAlign: "center", fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4.5vw,2.6rem)", marginBottom: 10 }}>
            Rejoignez le Pack Business
          </h1>
          <p className="sub">Investissez sur vous aujourd'hui, récoltez votre liberté demain.</p>

          <div className="offer">
            <div className="box">
              <p className="price">{site.price}</p>
              <p style={{ color: "var(--muted)", marginBottom: 22 }}>
                Paiement unique · Accès à vie · Satisfait ou remboursé
              </p>
              <div className="pay">
                <a className="btn wave" href={site.pay.wave} target="_blank" rel="noopener">Payer avec Wave</a>
                <a className="btn orange" href={site.pay.orange} target="_blank" rel="noopener">Payer avec Orange Money</a>
              </div>
              <p style={{ color: "var(--muted)", marginTop: 18, fontSize: ".9rem" }}>
                Une question ? <a href={`https://wa.me/${site.whatsapp}`} style={{ color: "var(--green)" }}>WhatsApp {site.whatsappDisplay}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="dark patterned">
        <div className="wrap">
          <Reveal>
            <h2>Le contenu du <span className="accent">pack</span></h2>
            <p className="sub">13 compétences, des vidéos pratiques à suivre à votre rythme.</p>
          </Reveal>
          <SkillsGrid />
        </div>
      </section>
    </main>
  );
}
