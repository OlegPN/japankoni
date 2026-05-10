"use client";
import { ReactNode, useEffect, useState } from "react";

function useIsNative() {
  const [isNative, setIsNative] = useState(false);
  useEffect(() => {
    const w = window as unknown as { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } };
    const cap = w.Capacitor;
    if (cap?.isNativePlatform?.() || (cap?.getPlatform && cap.getPlatform() !== "web")) {
      setIsNative(true);
    }
  }, []);
  return isNative;
}

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const isNative = useIsNative();

  if (isNative) {
    return (
      <div
        className="flex flex-col"
        style={{
          // 100dvh — реальная высота viewport (учитывает URL-бар на мобильном).
          // h-screen дал бы 100vh, что на Android включает status-bar и обрезает контент.
          height: "100dvh",
          background: "var(--bg)",
          color: "var(--text)",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <div className="flex-1 overflow-y-auto" style={{ padding: "8px 20px 16px" }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8" style={{ background: "linear-gradient(180deg, #faf2ee 0%, #f5e6e0 100%)" }}>
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: 380,
          maxWidth: "100%",
          height: "min(820px, calc(100vh - 32px))",
          background: "var(--bg)",
          borderRadius: 40,
          border: "8px solid #1a1115",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          color: "var(--text)",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 110, height: 24, background: "#1a1115", borderRadius: "0 0 14px 14px", zIndex: 100 }} />
        <div style={{ padding: "12px 24px 6px", display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
          <span>9:41</span><span>● ● ●</span>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ padding: "8px 20px 36px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
