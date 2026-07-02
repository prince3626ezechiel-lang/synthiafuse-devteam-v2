// Composant serveur (pas de "use client") — texte structurel rendu côté serveur (SEO)
import Link from "next/link";
import { site } from "@/lib/site";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          {/* Remplace .emblem par <img src="/logo.svg" alt="Logo EON IVOIRE" width={40} height={40}/> */}
          <span className="emblem" aria-hidden="true">e</span>
          <b>{site.brand}</b>
        </Link>
        <div className="links">
          <Link href="/pack-business/">Le Pack</Link>
          <Link href="/contact/">Contact</Link>
          <Link className="cta" href="/pack-business/">Commander</Link>
        </div>
      </div>
    </nav>
  );
}
