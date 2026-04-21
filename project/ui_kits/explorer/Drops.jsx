// Drops list — /App-Screens/Drops_App-Clean
function Drops({ onOpenEvent }) {
  const [filter, setFilter] = useState("caught");
  return (
    <div style={{ position: "absolute", inset: "48px 0 83px 0", overflowY: "auto" }}>
      <div style={{ padding: "20px 20px 0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>Drops</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.36)", marginTop: 4 }}>Berlin · 12 events available</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px 7px 10px", borderRadius: 22, background: "rgba(250,201,56,0.12)", border: "1px solid rgba(250,201,56,0.35)" }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: "#FAC938", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "rgba(122,46,0,0.88)" }}>D</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1 }}>2,120</div>
            <div style={{ fontSize: 9, color: "rgba(250,201,56,0.8)", marginTop: 3 }}>DISC</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 20px 8px", display: "flex", gap: 8 }}>
        {[
          { id: "caught", label: "Caught", c: "#7ED957" },
          { id: "available", label: "Available" },
          { id: "used", label: "Used" },
        ].map(t => (
          <button key={t.id} onClick={() => setFilter(t.id)} style={{
            height: 30, padding: "0 14px", borderRadius: 15,
            fontFamily: "Nunito", fontWeight: 700, fontSize: 11, cursor: "pointer",
            border: filter === t.id ? `1px solid ${t.c || "#0066FF"}` : "1px solid rgba(255,255,255,0.12)",
            background: filter === t.id ? `${t.c || "#0066FF"}26` : "transparent",
            color: filter === t.id ? (t.c || "#66A6FF") : "rgba(255,255,255,0.6)",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { title: "SPF30 Daily Moisturizer", brand: "Amazingy · Mitte", disc: 300, claimed: true, c: "#FAC938" },
          { title: "Vitamin C Serum", brand: "Amazingy · Mitte", disc: 450, claimed: true, c: "#FF5501" },
          { title: "Berlin Vinyl Mixtape", brand: "DJ Kleo · Neukölln", disc: 800, claimed: false, c: "#6968CB" },
          { title: "Kreuzberg Supper Pass", brand: "Chef Rico", disc: 1200, claimed: false, c: "#7ED957" },
        ].map((d, i) => (
          <div key={i} onClick={onOpenEvent} style={{ display: "flex", gap: 14, padding: 14, borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)", cursor: "pointer" }}>
            <div style={{ width: 72, height: 72, borderRadius: 14, background: d.c, flexShrink: 0, position: "relative" }}>
              {d.claimed && (
                <div style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "rgba(126,217,87,0.9)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</div>
              )}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{d.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{d.brand}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Pill tone="gold" style={{ borderRadius: 12, padding: "4px 10px", fontSize: 10 }}>★ +{d.disc} DISC</Pill>
                {d.claimed && <Pill tone="green" style={{ borderRadius: 12, padding: "4px 10px", fontSize: 10 }}>✓ Claimed</Pill>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Drops });
