"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import { HeroTile } from "./HeroTile";
import { StatsTile } from "./StatsTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";
import { ErrorTile } from "./ErrorTile";

interface BentoGridProps {
  courses: Course[] | null;
  error: string | null;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const tile = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

export function BentoGrid({ courses, error }: BentoGridProps) {
  const fallbackCourses: Course[] = [
    {
      id: "1",
      title: "Advanced React Patterns",
      progress: 75,
      icon_name: "Code2",
      description: "Hooks, context, compound components and composition patterns.",
      color: "violet",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "TypeScript Mastery",
      progress: 48,
      icon_name: "FileCode",
      description: "From generics to decorators — unlock the full power of TypeScript.",
      color: "cyan",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "System Design",
      progress: 32,
      icon_name: "Network",
      description: "Scalable architecture, distributed systems and caching strategies.",
      color: "green",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Data Structures & Algorithms",
      progress: 89,
      icon_name: "GitBranch",
      description: "Arrays, trees, graphs, dynamic programming and problem solving.",
      color: "amber",
      created_at: new Date().toISOString(),
    },
  ];

  const displayCourses = courses && courses.length > 0 ? courses : fallbackCourses;

  return (
    <section aria-label="Dashboard">
      {/* Page header */}
      <div style={{ marginBottom: "28px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            marginBottom: "4px",
          }}
        >
          Learning Command Center
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
          }}
        >
          Dashboard
        </h1>
      </div>

      {error && !courses && (
        <div style={{ marginBottom: "16px" }}>
          <ErrorTile message={error} />
        </div>
      )}

      {/* Bento grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 320px",
          gridTemplateRows: "auto auto",
          gap: "16px",
        }}
      >
        {/* Hero tile — spans 2 cols */}
        <motion.div variants={tile} style={{ gridColumn: "1 / 3" }}>
          <HeroTile />
        </motion.div>

        {/* Stats tile */}
        <motion.div variants={tile} style={{ gridRow: "1 / 3" }}>
          <StatsTile />
        </motion.div>

        {/* Courses section — spans 2 cols */}
        <motion.div variants={tile} style={{ gridColumn: "1 / 3" }}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Active Courses
                </h2>
                <span
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    fontSize: "11px",
                    fontWeight: 600,
                    borderRadius: "20px",
                    padding: "2px 8px",
                  }}
                >
                  {displayCourses.length}
                </span>
              </div>
              <button
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-secondary)",
                  fontSize: "12px",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                + Browse
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {displayCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  variants={tile}
                  custom={i}
                >
                  <CourseCard course={course} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Activity tile below on separate row */}
      <motion.div
        variants={tile}
        initial="hidden"
        animate="show"
        style={{ marginTop: "16px" }}
      >
        <ActivityTile />
      </motion.div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          section > div:last-of-type > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          section > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
