"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Trophy,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  Zap,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Courses", icon: BookOpen, href: "/courses", badge: 4 },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Leaderboard", icon: Trophy, href: "/leaderboard" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
];

const BOTTOM_ITEMS = [
  { label: "Notifications", icon: Bell, href: "/notifications", badge: 3 },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const width = collapsed ? 64 : 220;

  return (
    <motion.nav
      animate={{ width }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        height: "100vh",
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "20px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          borderBottom: "1px solid var(--border-subtle)",
          minHeight: "64px",
        }}
      >
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Zap size={16} color="#fff" fill="#fff" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                LearnOS
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
        )}

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-tertiary)",
              padding: "4px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Nav section label */}
      {!collapsed && (
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "var(--text-tertiary)",
            padding: "16px 20px 8px",
            textTransform: "uppercase",
          }}
        >
          Main Menu
        </p>
      )}

      {/* Main nav */}
      <div style={{ flex: 1, padding: collapsed ? "16px 0" : "0 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{ position: "relative" }}>
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.08))",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: collapsed ? "10px 0" : "10px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: "10px",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Icon
                    size={18}
                    color={active ? "var(--accent-violet)" : "var(--text-secondary)"}
                    strokeWidth={active ? 2 : 1.5}
                  />
                  {!collapsed && (
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: active ? 500 : 400,
                        color: active ? "var(--text-primary)" : "var(--text-secondary)",
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      style={{
                        background: "var(--accent-violet)",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 600,
                        borderRadius: "20px",
                        padding: "1px 7px",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom items */}
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: collapsed ? "12px 0" : "12px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: collapsed ? "10px 0" : "10px 12px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: "10px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Icon size={18} color="var(--text-secondary)" strokeWidth={1.5} />
                {!collapsed && (
                  <>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)", flex: 1 }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        style={{
                          background: "var(--accent-cyan)",
                          color: "#000",
                          fontSize: "10px",
                          fontWeight: 700,
                          borderRadius: "20px",
                          padding: "1px 7px",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}

        {/* Collapse button (when collapsed) */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0",
              color: "var(--text-tertiary)",
            }}
            aria-label="Expand sidebar"
          >
            <ChevronLeft size={16} style={{ transform: "rotate(180deg)" }} />
          </button>
        )}

        {/* User avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: collapsed ? "12px 0" : "12px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderTop: "1px solid var(--border-subtle)",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            AS
          </div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>
                Arjun Sharma
              </p>
              <p style={{ fontSize: "11px", color: "var(--accent-violet)", margin: 0 }}>
                Advanced · 4,820 XP
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
