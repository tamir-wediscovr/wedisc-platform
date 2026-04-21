// wSI visualization — three variants. Each takes the same event data shape.
// The Tweak "wsi_variant" switches between them.
// Dimensions: Audience Fit (EPI+BSI, 25%), Revenue (DAS+BSI, 20%), Track (CPI, 20%),
// Venue (SVI, 15%), Completeness (DAS, 5%), Depth (EPI+DAS, 10%), Halo/Spend (SVI+POS, 5%).

const WSI_DIMS = [
  { key: "audienceFit",  label: "Audience-Brand Fit", index: "EPI·BSI", w: 25 },
  { key: "revenue",      label: "Revenue potential",  index: "DAS·BSI", w: 20 },
  { key: "track",        label: "Curator track",      index: "CPI",     w: 20 },
  { key: "venue",        label: "Space quality",      index: "SVI",     w: 15 },
  { key: "depth",        label: "Community depth",    index: "EPI·DAS", w: 10 },
  { key: "halo",         label: "Venue halo",         index: "SVI·POS", w:  5 },
  { key: "completeness", label: "Completeness",       index: "DAS",     w:  5 },
];

// Variant A: score badge + bar list
const WSI_A = ({ ev, compact }) => (
  <div>
    <Row gap={16} align="center" style={{ marginBottom: compact ? 12 : 20 }}>
      <WSIScoreBadge value={ev.wsi} size={compact ? 58 : 76} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "var(--wd-ink-4)", fontWeight: 600, marginBottom: 4 }}>wSI MATCH</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>{scoreLabel(ev.wsi)}</div>
        <div style={{ fontSize: 12, color: "var(--wd-ink-3)", marginTop: 2 }}>Signal Index · {WSI_DIMS.length} inputs</div>
      </div>
    </Row>
    <Stack gap={10}>
      {WSI_DIMS.map(d => (
        <div key={d.key}>
          <Row style={{ justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: "var(--wd-ink-2)", fontWeight: 600 }}>{d.label}</span>
            <Row gap={8}>
              <span style={{ fontSize: 10, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.04em" }}>{d.index}</span>
              <span style={{ fontSize: 12, color: "var(--wd-ink)", fontWeight: 700, width: 30, textAlign: "right" }}>{ev[d.key]}</span>
            </Row>
          </Row>
          <Bar value={ev[d.key]} color={barColor(ev[d.key])} height={5} />
        </div>
      ))}
    </Stack>
  </div>
);

// Variant B: radar chart
const WSI_B = ({ ev }) => {
  const size = 220, cx = size / 2, cy = size / 2, r = 82;
  const n = WSI_DIMS.length;
  const rings = [0.25, 0.5, 0.75, 1.0];
  const pts = WSI_DIMS.map((d, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const v = ev[d.key] / 100;
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v];
  });
  const labelPts = WSI_DIMS.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * (r + 20), cy + Math.sin(a) * (r + 20)];
  });
  const poly = pts.map(p => p.join(",")).join(" ");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative" }}>
        <svg width={size} height={size}>
          {rings.map((rr, i) => (
            <polygon key={i}
              points={Array.from({length: n}, (_, j) => {
                const a = (j / n) * Math.PI * 2 - Math.PI / 2;
                return [cx + Math.cos(a) * r * rr, cy + Math.sin(a) * r * rr].join(",");
              }).join(" ")}
              fill="none" stroke="var(--wd-line)" strokeWidth={i === 3 ? 1.5 : 1} />
          ))}
          {WSI_DIMS.map((_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="var(--wd-line)" strokeWidth="1" />;
          })}
          <polygon points={poly} fill="rgba(0,102,255,0.15)" stroke="#0066FF" strokeWidth="1.75" strokeLinejoin="round" />
          {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#0066FF" />)}
          {labelPts.map((p, i) => (
            <text key={i} x={p[0]} y={p[1]} textAnchor="middle" dominantBaseline="middle"
              fontSize="9.5" fontFamily="Nunito" fontWeight="700" fill="var(--wd-ink-3)">
              {WSI_DIMS[i].index}
            </text>
          ))}
          <text x={cx} y={cy - 2} textAnchor="middle" fontSize="24" fontFamily="Nunito" fontWeight="700" fill="var(--wd-ink)" letterSpacing="-0.02em">{ev.wsi}</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fontFamily="Nunito" fontWeight="700" fill="var(--wd-ink-4)" letterSpacing="0.08em">WSI MATCH</text>
        </svg>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: "var(--wd-ink-3)" }}>{scoreLabel(ev.wsi)}</div>
    </div>
  );
};

// Variant C: single ring + fit reasons (compact)
const WSI_C = ({ ev }) => {
  const reasons = topReasons(ev);
  return (
    <Row gap={20} align="flex-start">
      <WSIRing value={ev.wsi} size={108} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>WSI MATCH</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--wd-ink)", marginBottom: 12 }}>{scoreLabel(ev.wsi)}</div>
        <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 }}>TOP FIT REASONS</div>
        <Stack gap={6}>
          {reasons.map(r => (
            <Row key={r.key} gap={8}>
              <Icon name="check" size={14} color="var(--wd-green-ink)" />
              <span style={{ fontSize: 12, color: "var(--wd-ink-2)" }}>{r.msg}</span>
            </Row>
          ))}
        </Stack>
      </div>
    </Row>
  );
};

const WSIScoreBadge = ({ value, size = 60 }) => {
  const color = barColor(value);
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: `${color}12`, border: `2px solid ${color}`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <div style={{ fontSize: size * 0.36, fontWeight: 700, color, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: Math.max(7, size * 0.12), fontWeight: 700, color: "var(--wd-ink-4)", letterSpacing: "0.08em", marginTop: 2 }}>wSI</div>
    </div>
  );
};

const WSIRing = ({ value, size = 100, stroke = 8 }) => {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const pct = value / 100;
  const color = barColor(value);
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--wd-pg-2)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x={size/2} y={size/2 - 2} textAnchor="middle" fontSize={size * 0.28} fontFamily="Nunito"
        fontWeight="700" fill="var(--wd-ink)" dominantBaseline="middle" letterSpacing="-0.02em">
        {value}
      </text>
      <text x={size/2} y={size/2 + size * 0.2} textAnchor="middle" fontSize="9" fontFamily="Nunito"
        fontWeight="700" fill="var(--wd-ink-4)" letterSpacing="0.08em">wSI</text>
    </svg>
  );
};

const barColor = (v) => v >= 85 ? "var(--wd-green-ink)" : v >= 70 ? "#0066FF" : v >= 55 ? "var(--wd-gold-ink)" : "var(--wd-orange-ink)";
const scoreLabel = (v) => v >= 85 ? "Exceptional fit" : v >= 75 ? "Strong fit" : v >= 65 ? "Good fit" : v >= 55 ? "Fair fit" : "Weak fit";

const topReasons = (ev) => {
  const sorted = [...WSI_DIMS].sort((a, b) => ev[b.key] - ev[a.key]).slice(0, 3);
  return sorted.map(d => ({
    key: d.key,
    msg: d.key === "audienceFit" ? `Audience overlap ${ev[d.key]}% with brand target`
       : d.key === "revenue"     ? `Revenue potential ${ev[d.key]}% above baseline`
       : d.key === "track"       ? `Curator track record scores ${ev[d.key]}`
       : d.key === "venue"       ? `Space index (SVI) at ${ev[d.key]}`
       : d.key === "depth"       ? `Expected engagement depth ${ev[d.key]}%`
       : d.key === "halo"        ? `Spend-per-head index ${ev[d.key]}`
       : `Brief completeness ${ev[d.key]}%`,
  }));
};

// Router
const WSI = ({ ev, variant = "bars", compact }) => {
  if (variant === "radar")   return <WSI_B ev={ev} />;
  if (variant === "reasons") return <WSI_C ev={ev} />;
  return <WSI_A ev={ev} compact={compact} />;
};

Object.assign(window, { WSI, WSIScoreBadge, WSIRing, WSI_DIMS, barColor, scoreLabel, topReasons });
