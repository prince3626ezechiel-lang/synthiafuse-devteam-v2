import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <p className="b">{site.brand}</p>
        <p>{site.tagline} — {site.region}</p>
        <p>
          Contact :{" "}
          <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp {site.whatsappDisplay}</a>
        </p>
        <p style={{ marginTop: 8, fontSize: ".82rem", color: "#6b7d97" }}>
          Les résultats dépendent de votre implication ; aucun gain n'est garanti.
        </p>
      </div>
    </footer>
  );
}
