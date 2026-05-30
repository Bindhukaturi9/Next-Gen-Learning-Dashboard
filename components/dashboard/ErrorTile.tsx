"use client";

import { AlertTriangle } from "lucide-react";

interface ErrorTileProps {
  message: string;
}

export function ErrorTile({ message }: ErrorTileProps) {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "rgba(239,68,68,0.06)",
        border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: "12px",
        padding: "14px 18px",
      }}
    >
      <AlertTriangle size={16} color="#ef4444" />
      <div>
        <p style={{ fontSize: "13px", fontWeight: 500, color: "#ef4444", marginBottom: "2px" }}>
          Database connection error
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
          {message} — showing fallback data below.
        </p>
      </div>
    </div>
  );
}
