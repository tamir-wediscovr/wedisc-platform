// Event detail — /App-Screens/S04-Amazingy-Beauty-Drop
function EventDetail({ onBack, onClaim }) {
  return (
    <div style={{ position: "absolute", inset: "0 0 0 0", overflowY: "auto", background: "radial-gradient(#050A14 0%, #0A1628 100%)" }}>
      {/* hero */}
      <div style={{ position: "relative", height: 308, background: "linear-gradient(135deg,#FAC938,#FF5501)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.32) 40%, rgba(0,0,0,0.82) 100%)" }} />
        <div style={{ position: "absolute", top: 64, left: 20, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", cursor: "pointer" }} onClick={onBack}>← Back</div>
        <div style={{ position: "absolute", top: 64, right: 16, padding: "4px 10px", borderRadius: 12, background: "rgba(0,0,0,0.45)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>1 / 4</div>
        <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Pill tone="gold" style={{ borderRadius: 6 }}>BEAUTY</Pill>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2C9CE4" }}>● 0.8km</div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 140px" }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>Amazingy Beauty Drop</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Rosenthaler Str. 9 · Sat, Apr 27 · 14:00–18:00</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>34 going · 0.8km away</div>

        <GlassCard style={{ marginTop: 16 }}>
          <SectionLabel>About</SectionLabel>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            Meet the Amazingy team for a pop-up sampling of the new SPF30 line. Talk with founders, claim your Drop Pack, and enter the giveaway.
          </div>
        </GlassCard>

        <GlassCard style={{ marginTop: 12 }}>
          <SectionLabel>Schedule</SectionLabel>
          {[
            ["14:00", "Doors open"],
            ["14:30", "Product Reveal & Sampling"],
            ["15:30", "Founder Talk"],
            ["17:00", "Giveaway Draw"],
            ["18:00", "Event Closes"],
          ].map(([t, l], i, arr) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 13 }}>
              <span style={{ fontWeight: 700, color: "#fff" }}>{t}</span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>{l}</span>
            </div>
          ))}
        </GlassCard>

        <GlassCard style={{ marginTop: 12 }}>
          <SectionLabel>Curated by</SectionLabel>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar size={44} initial="A" placeholder="#6968CB" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Anya Reis</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Amazingy · Berlin</div>
            </div>
            <button style={{ height: 32, padding: "0 16px", borderRadius: 20, border: "none", background: "#0066FF", color: "#fff", fontFamily: "Nunito", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Follow</button>
          </div>
        </GlassCard>

        <GlassCard style={{ marginTop: 12 }}>
          <SectionLabel>Who's going</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex" }}>
              {["#6968CB","#FAC938","#7ED957","#FF5501"].map((c, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: "2px solid #050A14", marginLeft: i ? -8 : 0 }} />
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>+29 going</span>
          </div>
        </GlassCard>

        <GlassCard tone="curated" style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Drop Pack</div>
            <Pill tone="purple" style={{ borderRadius: 8 }}>CURATED</Pill>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>3 items · unlocks on check-in</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["#FAC938","#FF5501","#6968CB"].map((c, i) => (
              <div key={i} style={{ flex: 1, aspectRatio: "1", borderRadius: 12, background: c }} />
            ))}
          </div>
        </GlassCard>

        <div style={{ position: "fixed", bottom: 24, left: 20, right: 20, zIndex: 20 }}>
          <CTA onClick={onClaim} style={{ width: "100%" }}>Check In & Claim  →</CTA>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EventDetail });
