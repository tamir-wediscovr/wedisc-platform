// Caught Gift — /App-Screens/S11-Caught-Gift
function CaughtGift({ onBack }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(#050A14 0%, #0A1628 100%)", overflowY: "auto" }}>
      <div style={{ height: 48 }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.85)", cursor: "pointer" }} onClick={onBack}>← Drops</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Caught Gift</div>
        <div style={{ width: 45 }} />
      </div>

      <div style={{ margin: "0 16px", borderRadius: 24, overflow: "hidden", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 28px rgba(0,0,0,0.28)" }}>
        <div style={{ position: "relative", height: 160, background: "linear-gradient(135deg,#6968CB,#0066FF)" }}>
          <div style={{ position: "absolute", top: 14, left: 16 }}>
            <Pill tone="green" style={{ borderRadius: 14, padding: "7px 12px", fontSize: 11, textTransform: "none" }}>✓  CLAIMED</Pill>
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>SPF30 Daily Moisturizer</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>50ml · Sample size</div>
            </div>
            <Pill tone="gold" style={{ borderRadius: 13, padding: "5px 12px", fontSize: 11, textTransform: "none" }}>★  +300 DISC</Pill>
          </div>
          <Divider />
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.58)" }}>📍  Amazingy Beauty Drop · Rosenthaler 9</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", marginTop: 6 }}>Valid through April 30, 2026</div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>Awarded by Amazingy</div>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "#FAC938" }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 16px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.36)", marginBottom: 14 }}>HOW TO REDEEM</div>
        {[
          ["1", "Find the Amazingy stand on the event floor"],
          ["2", "Show this screen to the brand representative"],
          ["3", "Collect your SPF30 Daily Moisturizer  🎁"],
        ].map(([n, t], i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,102,255,0.2)", border: "1px solid rgba(0,102,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#66A6FF", flexShrink: 0 }}>{n}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{t}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        <CTA variant="primary" style={{ width: "100%" }}>Redeem at Stand  →</CTA>
        <CTA variant="ghost" style={{ width: "100%", height: 46, fontSize: 14 }}>I Want to Ship It to My Home</CTA>
      </div>
    </div>
  );
}

Object.assign(window, { CaughtGift });
