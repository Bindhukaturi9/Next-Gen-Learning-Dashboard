export default function DashboardLoading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div className="skeleton" style={{ height: "14px", width: "160px", borderRadius: "6px" }} />
        <div className="skeleton" style={{ height: "32px", width: "280px", borderRadius: "8px" }} />
      </div>

      {/* Bento grid skeleton */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "16px",
        }}
      >
        {/* Hero tile */}
        <div
          className="skeleton"
          style={{
            gridColumn: "1 / 3",
            height: "200px",
            borderRadius: "16px",
          }}
        />
        {/* Stats tile */}
        <div className="skeleton" style={{ height: "200px", borderRadius: "16px" }} />

        {/* Course skeletons */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: "180px", borderRadius: "16px" }}
          />
        ))}
      </div>

      <style>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--bg-elevated) 25%,
            var(--bg-card) 50%,
            var(--bg-elevated) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
