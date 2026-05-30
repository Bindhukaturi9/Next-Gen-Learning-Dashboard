"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  glowColor?: string;
}

export function BentoCard({ children, style, glowColor }: BentoCardProps) {
  return (
    <motion.article
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        ...style,
      }}
      whileFocus={{ outline: "2px solid var(--accent-violet)" }}
    >
      {/* Hover glow overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          border: `1px solid ${glowColor ?? "rgba(139,92,246,0.25)"}`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>
    </motion.article>
  );
}
