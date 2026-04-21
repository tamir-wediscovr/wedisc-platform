// Home feed screen — based on /App-Screens/00-Home-Screen.
function Home({ onOpenEvent }) {
  return (
    <div style={{ position: "absolute", inset: "48px 0 83px 0", overflowY: "auto", paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <Avatar size={40} initial="E" ring="rgba(0,102,255,0.6)" placeholder="#6968CB" />
            <div style={{ position: "absolute", right: -4, bottom: -4, width: 18, height: 18, borderRadius: 9, background: "#0066FF", border: "2px solid #050A14", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>+</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Hey Emma!</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(126,217,87,0.9)", marginTop: 3 }}>3 new events are near you</div>
          </div>
        </div>
        <div style={{ position: "relative", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
          <div style={{ position: "absolute", top: 2, right: 2, width: 9, height: 9, borderRadius: "50%", background: "#FA2E2E", border: "1.5px solid rgba(5,10,20,0.4)" }} />
        </div>
      </div>

      {/* Moments rail */}
      <div style={{ padding: "8px 16px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Your People's Moments</div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 2 }}>
          {[
            { name: "Devonte", at: "at Berlin 50", c: "#FAC938" },
            { name: "Kleo", at: "at ELEV8", c: "#FF5501" },
            { name: "Sarannya", at: "at Mitte", c: "#6968CB" },
            { name: "Jon", at: "at Yoga", c: "#7ED957" },
            { name: "EZ", at: "at FOOD", c: "#2C9CE4" },
            { name: "Tamir", at: "at DROP", c: "#0066FF" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <Avatar size={56} initial={p.name[0]} ring="#0066FF" placeholder={p.c} />
              <div style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{p.name}</div>
              <div style={{ fontSize: 9, color: "rgba(0,102,255,0.85)" }}>{p.at}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", height: 238, background: "linear-gradient(135deg,#6968CB,#2C9CE4)" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.32) 40%, rgba(0,0,0,0.92) 100%)" }} />
          <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8 }}>
            <Pill tone="live" live>LIVE</Pill>
            <Pill tone="hunt">AR HUNT</Pill>
          </div>
          <div style={{ position: "absolute", top: 18, right: 18, fontSize: 10, color: "#fff", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1AB8FF" }} /> 3km away
          </div>
          <div style={{ position: "absolute", left: 14, bottom: 56 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>Berlin 50</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>34 events · Apr–Jun 2026</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>47 Explorers active in Neukölln</div>
          </div>
          <button onClick={onOpenEvent} style={{ position: "absolute", right: 14, bottom: 14, height: 36, padding: "0 18px", border: "none", borderRadius: 18, background: "linear-gradient(#006BFF,#7852F2)", boxShadow: "0 6px 16px rgba(0,107,255,0.45)", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "Nunito", cursor: "pointer" }}>Join Berlin 50 →</button>
        </div>
      </div>

      {/* Happening Now */}
      <div style={{ padding: "18px 16px 0" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Happening Now</div>
        <div onClick={onOpenEvent} style={{ position: "relative", height: 104, borderRadius: 18, overflow: "hidden", background: "#6968CB", marginBottom: 12, cursor: "pointer" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.32) 40%, rgba(0,0,0,0.92) 100%)" }} />
          <div style={{ position: "absolute", top: 13, left: 14 }}><Pill tone="purple" style={{ borderRadius: 6 }}>EVENT TYPE</Pill></div>
          <div style={{ position: "absolute", left: 14, bottom: 13 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Midsommar Session</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>Neukölln · Tonight</div>
          </div>
          <div style={{ position: "absolute", right: 14, bottom: 14 }}>
            <CTA variant="glass" style={{ height: 28, fontSize: 10, padding: "0 14px", borderRadius: 14 }}>View Event →</CTA>
          </div>
        </div>
        <div onClick={onOpenEvent} style={{ position: "relative", height: 104, borderRadius: 18, overflow: "hidden", background: "linear-gradient(135deg,#FAC938,#FF5501)", cursor: "pointer" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.32) 40%, rgba(0,0,0,0.92) 100%)" }} />
          <div style={{ position: "absolute", top: 13, left: 14 }}><Pill tone="gold" style={{ borderRadius: 6 }}>BEAUTY</Pill></div>
          <div style={{ position: "absolute", left: 14, bottom: 13 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Amazingy Pop-Up</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>Mitte · This Weekend</div>
          </div>
          <div style={{ position: "absolute", right: 14, bottom: 14 }}>
            <CTA variant="glass" style={{ height: 28, fontSize: 10, padding: "0 14px", borderRadius: 14 }}>View Event →</CTA>
          </div>
        </div>
      </div>

      {/* Curators */}
      <div style={{ padding: "22px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Curators Dropping This Week</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0066FF" }}>Explore more</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { n: "DJ Kleo", s: "Music · Berlin", d: "NEXT: FRI", tone: "purple", c: "#6968CB" },
            { n: "Lena M.", s: "Yoga · Mitte",  d: "NEXT: TMRW", tone: "green", c: "#7ED957" },
            { n: "Chef Rico", s: "Food · Kreuzberg", d: "NEXT: SAT", tone: "orange", c: "#FF5501" },
          ].map((c, i) => (
            <GlassCard key={i} style={{ flex: 1, padding: 10, borderRadius: 18 }}>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: 12, background: c.c, marginBottom: 10 }} />
              <Pill tone={c.tone} style={{ borderRadius: 6, fontSize: 8, padding: "3px 6px" }}>{c.d}</Pill>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginTop: 6 }}>{c.n}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{c.s}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Home });
