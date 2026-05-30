"use client";

import { motion } from "framer-motion";
import {
  Code2, FileCode, Network, GitBranch, BookOpen,
  Database, Globe, Cpu, Layers, Terminal, Palette, Lock,
} from "lucide-react";
import type { Course } from "@/types";
import { BentoCard } from "./BentoCard";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, FileCode, Network, GitBranch, BookOpen,
  Database, Globe, Cpu, Layers, Terminal, Palette, Lock,
};

const COLOR_MAP: Record<string, { bg: string; icon: string; bar: string; glow: string }> = {
  violet: {
    bg: "rgba(139,92,246,0.08)",
    icon: "#8b5cf6",
    bar: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
    glow: "rgba(139,92,246,0.3)",
  },
  cyan: {
    bg: "rgba(6,182,212,0.08)",
    icon: "#06b6d4",
    bar: "linear-gradient(90deg, #06b6d4, #67e8f9)",
    glow: "rgba(6,182,212,0.3)",
  },
  green: {
    bg: "rgba(16,185,129,0.08)",
    icon: "#10b981",
    bar: "linear-gradient(90deg, #10b981, #6ee7b7)",
    glow: "rgba(16,185,129,0.3)",
  },
  amber: {
    bg: "rgba(245,158,11,0.08)",
    icon: "#f59e0b",
    bar: "linear-gradient(90deg, #f59e0b, #fcd34d)",
    glow: "rgba(245,158,11,0.3)",
  },
  pink: {
    bg: "rgba(236,72,153,0.08)",
    icon: "#ec4899",
    bar: "linear-gradient(90deg, #ec4899, #f9a8d4)",
    glow: "rgba(236,72,153,0.3)",
  },
};

function getColor(course: Course, index: number) {
  const colorKeys = Object.keys(COLOR_MAP);
  const key = course.color && COLOR_MAP[course.color]
    ? course.color
    : colorKeys[index % colorKeys.length];
  return COLOR_MAP[key];
}

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const IconComponent = ICON_MAP[course.icon_name] ?? BookOpen;
  const colors = getColor(course, index);

  return (
    <BentoCard
      glowColor={colors.glow}
      style={{
        padding: "20px",
        background: `
          radial-gradient(ellipse at 0% 0%, ${colors.bg} 0%, transparent 60%),
          var(--bg-card)
        `,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          background: colors.bg,
          border: `1px solid ${colors.glow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px",
        }}
      >
        <IconComponent size={20} color={colors.icon} strokeWidth={1.5} />
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "15px",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "4px",
          lineHeight: 1.3,
        }}
      >
        {course.title}
      </h3>

      {course.description && (
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-tertiary)",
            marginBottom: "16px",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.description}
        </p>
      )}

      {/* Progress */}
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <span style={{ fontSize: "11px", color: "var(--text-tertiary)", letterSpacing: "0.02em" }}>
            Progress
          </span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: colors.icon }}>
            {course.progress}%
          </span>
        </div>

        <div
          style={{
            height: "5px",
            background: "var(--bg-elevated)",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              duration: 1.0,
              ease: "easeOut",
              delay: 0.3 + index * 0.1,
            }}
            style={{
              height: "100%",
              borderRadius: "99px",
              background: colors.bar,
            }}
          />
        </div>
      </div>
    </BentoCard>
  );
}
