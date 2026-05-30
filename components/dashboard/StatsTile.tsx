"use client";

import { motion } from "framer-motion";
import { Clock, Award, CheckCircle, TrendingUp } from "lucide-react";
import { BentoCard } from "./BentoCard";

const STATS = [
  {
    label: "Hours Learned",
    value: 248,
    delta: "+18%",
    icon: Clock,
    color: "#06b6d4",
  },
  {
    label: "Certificates",
    value: 6,
    delta: "+50%",
    icon: Award,
    color: "#f59e0b",
  },
  {
    label: "Completed",
    value: 14,
    delta: "+8%",
    icon: CheckCircle,
    color: "#10b981",
  },
];

export function StatsTile() {
  return (
    <BentoCard
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        height: "100%",
      }}
    >
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
              delay: 0.2 + i * 0.1,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "var(--bg-elevated)",
              borderRadius: "12px",
              padding: "14px",
              flex: 1,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: `${stat.color}18`,
                border: `1px solid ${stat.color}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={16} color={stat.color} strokeWidth={1.5} />
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "10px", color: "var(--text-tertiary)", marginBottom: "2px", letterSpacing: "0.04em" }}>
                {stat.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </p>
            </div>

            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <TrendingUp size={11} />
              {stat.delta}
            </span>
          </motion.div>
        );
      })}
    </BentoCard>
  );
}
