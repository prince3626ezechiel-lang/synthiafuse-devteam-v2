"use client";
// Apparition au scroll (Framer Motion). Le texte est passé en children et prérendu
// côté serveur (SSG) → présent dans le HTML statique, donc lisible par les crawlers.
// Repli sans JS : la règle .reveal en <noscript> (layout) force l'affichage.
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`reveal ${className ?? ""}`.trim()}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
