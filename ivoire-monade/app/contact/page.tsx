import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Ivoire Monade (EON IVOIRE) — conseil, énergies renouvelables et e-business en Côte d'Ivoire. WhatsApp, Wave, Orange Money.",
  alternates: { canonical: "/contact/" }
};

export default function Contact() {
  return (
    <main>
      <section>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h1 style={{ textAlign: "center", fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4.5vw,2.6rem)", marginBottom: 10 }}>
            Contact
          </h1>
          <p className="sub">{site.tagline} — {site.region}</p>

          <div className="offer">
            <div className="box">
              <p style={{ marginBottom: 16 }}>
                Écrivez-nous sur WhatsApp, nous répondons rapidement.
              </p>
              <div className="pay">
                <a className="btn" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
                  WhatsApp {site.whatsappDisplay}
                </a>
                <a className="btn wave" href={site.pay.wave} target="_blank" rel="noopener">Payer avec Wave</a>
                <a className="btn orange" href={site.pay.orange} target="_blank" rel="noopener">Payer avec Orange Money</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
