"use client";
// Fond animé inspiré de la nature — Framer Motion.
// Uniquement décoratif (aria-hidden), aucun texte structurel ici.
import { motion, useReducedMotion } from "framer-motion";

export default function NatureBackground() {
  const reduce = useReducedMotion();

  const blob = (repeat: boolean, dur: number, dx: number, dy: number) =>
    repeat
      ? { x: [0, dx, 0], y: [0, dy, 0], scale: [1, 1.16, 1] }
      : undefined;

  return (
    <div className="bg-nature" aria-hidden="true">
      <motion.span
        className="blob b1"
        animate={blob(!reduce, 18, 46, 34)}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="blob b2"
        animate={blob(!reduce, 24, -40, -30)}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: -6 }}
      />
      <motion.span
        className="blob b3"
        animate={blob(!reduce, 30, 30, -40)}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: -12 }}
      />
      <motion.svg
        className="waves"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        animate={reduce ? undefined : { x: [0, -60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M0,80 C240,120 480,40 720,70 C960,100 1200,30 1440,70" />
        <path d="M0,100 C260,60 520,120 780,90 C1020,60 1260,110 1440,90" />
      </motion.svg>
    </div>
  );
}
