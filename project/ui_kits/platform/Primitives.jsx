// Platform primitives — all light-mode by default.
const { useState, useEffect, useMemo, createContext, useContext } = React;

const Btn = ({ children, variant = "primary", size = "md", icon, onClick, style = {}, disabled }) => {
  const h = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  const vs = {
    primary: { bg: "#0066FF", color: "#fff", border: "none", hover: "#0054DD" },
    blue:    { bg: "#0066FF", color: "#fff", border: "none", hover: "#0054DD" },
    ghost:   { bg: "transparent", color: "var(--wd-ink)", border: "1px solid var(--wd-line-2)", hover: "var(--wd-pg-2)" },
    quiet:   { bg: "transparent", color: "var(--wd-ink-2)", border: "none", hover: "var(--wd-pg-2)" },
    danger:  { bg: "#FA2E2E", color: "#fff", border: "none", hover: "#DD1515" },
    success: { bg: "#7ED957", color: "#0B1220", border: "none", hover: "#6ECB47" },
    dark:    { bg: "#0B1220", color: "#fff", border: "none", hover: "#1C2536" },
  };
  const v = vs[variant];
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      style={{
        height: h, padding: size === "sm" ? "0 12px" : "0 16px",
        borderRadius: h / 2, fontFamily: "Nunito",
        fontWeight: 700, fontSize: size === "sm" ? 12 : 13,
        background: v.bg, color: v.color, border: v.border,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 180ms var(--wd-ease), transform 180ms var(--wd-ease)",
        whiteSpace: "nowrap", ...style,
      }}
      onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
      onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, onClick, hover, padding = 20 }) => (
  <div onClick={onClick}
    style={{
      background: "var(--wd-surface)", border: "1px solid var(--wd-line)",
      borderRadius: 16, padding,
      transition: "border-color 180ms, box-shadow 180ms, transform 180ms",
      cursor: onClick ? "pointer" : "default", ...style,
    }}
    onMouseEnter={hover || onClick ? e => {
      e.currentTarget.style.borderColor = "var(--wd-line-2)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(11,18,32,0.06)";
    } : undefined}
    onMouseLeave={hover || onClick ? e => {
      e.currentTarget.style.borderColor = "var(--wd-line)";
      e.currentTarget.style.boxShadow = "none";
    } : undefined}
  >
    {children}
  </div>
);

const StatCard = ({ label, value, delta, deltaKind = "neutral", sub, sparkColor = "#0066FF", spark, icon, tint }) => {
  const kinds = { up: "var(--wd-green-ink)", down: "#FA2E2E", neutral: "var(--wd-ink-3)" };
  return (
    <Card padding={20}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: "var(--wd-ink-3)", fontWeight: 600 }}>{label}</span>
        {icon && (
          <div style={{ width: 28, height: 28, borderRadius: 8, background: tint || "var(--wd-pg-2)", display: "flex", alignItems: "center", justifyContent: "center", color: sparkColor }}>
            <Icon name={icon} size={14} />
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: "var(--wd-ink)", letterSpacing: "-0.01em" }}>{value}</span>
        {delta && <span style={{ fontSize: 12, fontWeight: 700, color: kinds[deltaKind] }}>{delta}</span>}
      </div>
      {spark && <Sparkline values={spark} color={sparkColor} />}
      {sub && <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: spark ? 8 : 0 }}>{sub}</div>}
    </Card>
  );
};

const Sparkline = ({ values, color = "#0066FF", height = 28 }) => {
  const w = 100, h = height;
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => [i * (w / (values.length - 1)), h - ((v - min) / range) * (h - 4) - 2]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <path d={area} fill={color} fillOpacity="0.1" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Pill = ({ children, color = "#0066FF", tint, style = {}, size = "md" }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: size === "sm" ? "2px 8px" : "4px 10px",
    background: tint || `${color}15`, color,
    borderRadius: 999, fontSize: size === "sm" ? 10 : 11, fontWeight: 700,
    whiteSpace: "nowrap", ...style,
  }}>{children}</span>
);

const CatPill = ({ cat, size = "md" }) => {
  const c = getCat(cat);
  if (!c) return null;
  return (
    <Pill color={c.color} tint={c.tintLt} size={size}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: c.color }} />
      {c.name}
    </Pill>
  );
};

const StatusPill = ({ status, size = "md" }) => {
  const s = STATUS[status]; if (!s) return null;
  const dot = status === "live";
  return (
    <Pill color={s.color} tint={s.tint} size={size}>
      {dot && <span className="pulse" style={{ width: 6, height: 6, borderRadius: 3, background: s.color }} />}
      {s.label}
    </Pill>
  );
};

const Avatar = ({ name, imgSrc, color = "#6968CB", size = 36, ring }) => {
  const initials = name ? name.split(" ").map(s => s[0]).slice(0, 2).join("") : "";
  const baseStyle = {
    width: size, height: size, flexShrink: 0,
    borderRadius: size, background: color,
    border: ring ? `2px solid ${ring}` : "none",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 700, fontSize: size * 0.4,
    overflow: "hidden", position: "relative",
  };
  if (imgSrc) {
    return (
      <div style={baseStyle}>
        <img src={imgSrc} alt={name || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return <div style={baseStyle}>{initials}</div>;
};

const Bar = ({ value, color = "#0066FF", height = 6, bg = "var(--wd-pg-2)" }) => (
  <div style={{ height, background: bg, borderRadius: height / 2, overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.min(100, value)}%`, background: color, borderRadius: height / 2, transition: "width 400ms var(--wd-ease)" }} />
  </div>
);

const SegmentedControl = ({ options, value, onChange, size = "md" }) => (
  <div style={{ display: "inline-flex", padding: 3, background: "var(--wd-pg-2)", borderRadius: 10 }}>
    {options.map(o => (
      <button key={o.value} onClick={() => onChange(o.value)}
        style={{
          height: size === "sm" ? 28 : 34, padding: "0 14px",
          border: "none", fontFamily: "Nunito", fontWeight: 700,
          fontSize: size === "sm" ? 12 : 13,
          color: value === o.value ? "var(--wd-ink)" : "var(--wd-ink-3)",
          background: value === o.value ? "var(--wd-surface)" : "transparent",
          borderRadius: 8, cursor: "pointer",
          boxShadow: value === o.value ? "0 1px 3px rgba(11,18,32,0.1)" : "none",
          transition: "all 180ms var(--wd-ease)",
        }}>
        {o.label}
      </button>
    ))}
  </div>
);

const Field = ({ label, children, required, hint }) => (
  <label style={{ display: "block", marginBottom: 18 }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink-2)", marginBottom: 8 }}>
      {label}{required && <span style={{ color: "#FA2E2E", marginLeft: 3 }}>*</span>}
    </div>
    {children}
    {hint && <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 6 }}>{hint}</div>}
  </label>
);

const Input = ({ value, onChange, placeholder, style = {} }) => (
  <input value={value} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder}
    style={{
      width: "100%", height: 40, padding: "0 14px",
      background: "var(--wd-surface)", border: "1px solid var(--wd-line-2)",
      borderRadius: 10, fontFamily: "Nunito", fontSize: 13, color: "var(--wd-ink)",
      outline: "none", transition: "border-color 180ms", ...style,
    }}
    onFocus={e => e.target.style.borderColor = "#0066FF"}
    onBlur={e => e.target.style.borderColor = "var(--wd-line-2)"}
  />
);

const Textarea = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea value={value} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} rows={rows}
    style={{
      width: "100%", padding: 12,
      background: "var(--wd-surface)", border: "1px solid var(--wd-line-2)",
      borderRadius: 10, fontFamily: "Nunito", fontSize: 13,
      color: "var(--wd-ink)", outline: "none", resize: "vertical", lineHeight: 1.5,
    }}
    onFocus={e => e.target.style.borderColor = "#0066FF"}
    onBlur={e => e.target.style.borderColor = "var(--wd-line-2)"}
  />
);

const Chip = ({ children, selected, onClick, icon }) => (
  <button onClick={onClick}
    style={{
      height: 36, padding: "0 14px",
      background: selected ? "rgba(0,102,255,0.08)" : "var(--wd-surface)",
      border: selected ? "1px solid #0066FF" : "1px solid var(--wd-line-2)",
      borderRadius: 20, fontFamily: "Nunito", fontSize: 13, fontWeight: 600,
      color: selected ? "#0066FF" : "var(--wd-ink-2)",
      cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
      transition: "all 180ms",
    }}>
    {icon && <Icon name={icon} size={14} />}
    {children}
  </button>
);

const Divider = ({ vertical, style = {} }) => (
  <div style={{
    background: "var(--wd-line)",
    ...(vertical ? { width: 1, height: "100%" } : { height: 1, width: "100%", margin: "16px 0" }),
    ...style,
  }} />
);

const PageHeader = ({ title, sub, actions }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
    <div>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "var(--wd-ink)", letterSpacing: "-0.02em" }}>{title}</h1>
      {sub && <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--wd-ink-3)" }}>{sub}</p>}
    </div>
    {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
  </div>
);

const Row = ({ children, gap = 12, style = {}, align = "center", wrap }) => (
  <div style={{ display: "flex", alignItems: align, gap, flexWrap: wrap ? "wrap" : "nowrap", ...style }}>
    {children}
  </div>
);

const Stack = ({ children, gap = 12, style = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
    {children}
  </div>
);

Object.assign(window, {
  Btn, Card, StatCard, Sparkline, Pill, CatPill, StatusPill, Avatar, Bar,
  SegmentedControl, Field, Input, Textarea, Chip, Divider, PageHeader, Row, Stack,
});
