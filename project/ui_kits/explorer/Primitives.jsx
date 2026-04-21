// Primitive atoms for the Explorer UI kit.
const { useState } = React;

function Pill({ children, tone = "neutral", live, glow, style = {}, ...rest }) {
  const tones = {
    neutral: { bg: "rgba(5,10,20,0.65)", border: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.85)" },
    blue:    { bg: "rgba(0,102,255,0.18)",  border: "rgba(0,102,255,0.55)",  color: "#66A6FF" },
    purple:  { bg: "rgba(105,104,203,0.20)", border: "rgba(105,104,203,0.55)", color: "#9896E8" },
    orange:  { bg: "rgba(255,85,1,0.18)",   border: "rgba(255,85,1,0.55)",   color: "#FF8A4C" },
    gold:    { bg: "rgba(250,201,56,0.14)", border: "rgba(250,201,56,0.55)", color: "#FAC938" },
    green:   { bg: "rgba(126,217,87,0.18)", border: "rgba(126,217,87,0.65)", color: "#7ED957" },
    sky:     { bg: "rgba(44,152,228,0.18)", border: "rgba(44,152,228,0.55)", color: "#66BFF0" },
    live:    { bg: "rgba(126,217,87,0.38)", border: "rgba(126,217,87,0.75)", color: "#fff" },
    hunt:    { bg: "linear-gradient(rgba(255,85,1,0.92),rgba(250,201,56,0.92))", border: "rgba(250,201,56,0.45)", color: "#fff" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 10px", borderRadius: tone === "hunt" || tone === "live" ? 20 : 6,
      background: t.bg, border: `1px solid ${t.border}`, color: t.color,
      fontFamily: "Nunito", fontWeight: 700, fontSize: 10, letterSpacing: "0.04em",
      textTransform: "uppercase", whiteSpace: "nowrap",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      boxShadow: glow || (tone === "live" ? "0 0 10px 2px rgba(126,217,87,0.45)" :
                tone === "hunt" ? "0 2px 10px rgba(255,102,0,0.5)" : "none"),
      ...style,
    }} {...rest}>
      {live && (
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: "#fff",
          boxShadow: "0 0 0 3px rgba(126,217,87,0.28)",
        }} />
      )}
      {children}
    </span>
  );
}

function GlassCard({ children, style = {}, tone = "neutral", ...rest }) {
  const bg = tone === "curated"
    ? "rgba(105,104,203,0.08)"
    : "rgba(255,255,255,0.06)";
  const border = tone === "curated"
    ? "1px solid rgba(105,104,203,0.25)"
    : "1px solid rgba(255,255,255,0.10)";
  return (
    <div style={{
      background: bg, border, borderRadius: 20,
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      padding: "14px 16px 16px 16px",
      ...style,
    }} {...rest}>
      {children}
    </div>
  );
}

function SectionLabel({ children, style }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)",
      marginBottom: 12, ...style,
    }}>
      {children}
    </div>
  );
}

function Avatar({ src, initial, size = 44, ring, placeholder = "#6968CB" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: src ? `url(${src}) center/cover` : placeholder,
      border: ring ? `2.5px solid ${ring}` : "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
    }}>
      {!src && initial}
    </div>
  );
}

function CTA({ children, variant = "primary", onClick, style = {} }) {
  const styles = {
    primary: {
      background: "linear-gradient(#40A6FF,#0047E0)",
      boxShadow: "0 6px 16px rgba(0,38,128,0.55)",
      border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff",
    },
    alt: {
      background: "linear-gradient(#006BFF,#7852F2)",
      boxShadow: "0 6px 16px rgba(0,107,255,0.45)",
      border: "none", color: "#fff",
    },
    ghost: {
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "rgba(255,255,255,0.72)", boxShadow: "none",
    },
    glass: {
      background: "rgba(255,255,255,0.18)",
      border: "1px solid rgba(255,255,255,0.3)",
      backdropFilter: "blur(10px)", color: "#fff", boxShadow: "none",
    },
  };
  return (
    <button onClick={onClick} style={{
      height: 52, padding: "0 24px", borderRadius: 26,
      fontFamily: "Nunito", fontWeight: 700, fontSize: 15,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", transition: "transform 220ms cubic-bezier(0.22,0.61,0.36,1)",
      ...styles[variant], ...style,
    }}
    onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      {children}
    </button>
  );
}

function Divider({ color = "rgba(255,255,255,0.08)" }) {
  return <div style={{ height: 1, background: color, margin: "12px 0" }} />;
}

Object.assign(window, { Pill, GlassCard, SectionLabel, Avatar, CTA, Divider });
