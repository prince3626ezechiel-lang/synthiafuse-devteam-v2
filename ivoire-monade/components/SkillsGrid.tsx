"use client";
// Grille des 13 compétences avec apparition en cascade (stagger) au scroll.
// Contenu issu de lib/site → prérendu en HTML statique (SEO OK).
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { skills } from "@/lib/site";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

export default function SkillsGrid() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="grid">
        {skills.map((s) => (
          <article className="skill" key={s.n}>
            <span className="n">{s.n}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {skills.map((s) => (
        <motion.article className="skill reveal" key={s.n} variants={item}>
          <span className="n">{s.n}</span>
          <h3>{s.t}</h3>
          <p>{s.d}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
