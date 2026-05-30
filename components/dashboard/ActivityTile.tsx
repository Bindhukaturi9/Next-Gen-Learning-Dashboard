"use client";

import dynamic from "next/dynamic";
import { Activity } from "lucide-react";
import { BentoCard } from "./BentoCard";

function generateActivity() {
  const weeks = 14;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const rand = Math.random();
      week.push(rand < 0.35 ? 0 : rand < 0.55 ? 1 : rand < 0.75 ? 2 : rand < 0.9 ? 3 : 4);
    }
    data.push(week);
  }
  return data;
}

const INTENSITY = [
  "transparent",
  "rgba(139,92,246,0.2)",
  "rgba(139,92,246,0.4)",
  "rgba(139,92,246,0.65)",
  "rgba(139,92,246,0.9)",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function ActivityTileInner() {
  // generateActivity() only runs on the client since this component is never SSR-ed
  const activityData = generateActivity();

  return (
    <BentoCard style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Activity size={15} color="var(--accent-violet)" />
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Activity
          </h3>
        </div>
        <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
          62 of 112 days active
        </span>
      </div>

      <div style={{ display: "flex", gap: "4px", alignItems: "flex-start" }}>
        {/* Day labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", paddingTop: "0px", marginRight: "4px" }}>
          {DAY_LABELS.map((label, i) => (
            <div key={i} style={{ height: "12px", fontSize: "9px", color: "var(--text-tertiary)", lineHeight: "12px", width: "24px" }}>
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "flex", gap: "3px", flex: 1, overflowX: "auto" }}>
          {activityData.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {week.map((level, di) => (
                <div
                  key={di}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "3px",
                    background: INTENSITY[level],
                    border: `1px solid ${level === 0 ? "var(--border-subtle)" : "transparent"}`,
                  }}
                  title={`Activity level: ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px", marginTop: "12px" }}>
        <span style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>Less</span>
        {INTENSITY.map((color, i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: color,
              border: `1px solid ${i === 0 ? "var(--border-subtle)" : "transparent"}`,
            }}
          />
        ))}
        <span style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>More</span>
      </div>
    </BentoCard>
  );
}

// Export a client-only version — never SSR-ed, so Math.random() never runs on the server
export const ActivityTile = dynamic(() => Promise.resolve(ActivityTileInner), {
  ssr: false,
});