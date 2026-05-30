"use client";

import { motion } from "framer-motion";
import { Flame, Star, Award } from "lucide-react";
import { BentoCard } from "./BentoCard";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroTile() {
  const greeting = getGreeting();
  const xp = 4820;
  const nextLevel = 5000;
  const pct = Math.round((xp / nextLevel) * 100);

  return (
    <BentoCard
      style={{
        background: `
          radial-gradient(ellipse at 10% 50%, rgba(139,92,246,0.12) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 50%),
          var(--bg-card)
        `,
        padding: "28px 32px",
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>
            {greeting} 👋
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Arjun
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "6px" }}>
            Ready to level up today?
          </p>
        </div>

        {/* Streak badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.1))",
            border: "1px solid rgba(245,158,11,0.3)",
            borderRadius: "16px",
            padding: "14px 18px",
            textAlign: "center",
            cursor: "default",
          }}
        >
          <Flame size={20} color="#f59e0b" style={{ margin: "0 auto 4px" }} />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 800,
              color: "#f59e0b",
              lineHeight: 1,
            }}
          >
            12
          </p>
          <p style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px", letterSpacing: "0.05em" }}>
            STREAK
          </p>
        </motion.div>
      </div>

      {/* XP bar */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Star size={13} color="var(--accent-violet)" fill="var(--accent-violet)" />
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
              {xp.toLocaleString()} XP
            </span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
            {nextLevel.toLocaleString()} to next level
          </span>
        </div>

        <div
          style={{
            height: "6px",
            background: "var(--bg-elevated)",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            style={{
              height: "100%",
              borderRadius: "99px",
              background: "linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          {[
            { icon: <Award size={11} />, label: "Advanced", color: "var(--accent-violet)" },
            { icon: <Star size={11} fill="currentColor" />, label: "Advanced Rank", color: "var(--accent-green)" },
          ].map((badge) => (
            <span
              key={badge.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
                fontWeight: 500,
                color: badge.color,
                background: `${badge.color}18`,
                border: `1px solid ${badge.color}33`,
                borderRadius: "20px",
                padding: "3px 10px",
              }}
            >
              {badge.icon}
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
