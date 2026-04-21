// Capability expansion — "Add another hat" flow for an existing entity.
const CapabilityExpand = ({ onClose }) => {
  const existing = ["space", "brand"]; // BRLO already has these
  const [picked, setPicked] = useState(null);
  const options = [
    { id: "curator", desc: "Start running your own events at your taproom, not just hosting other curators." },
    { id: "talent", desc: "Offer your brewmasters as speakers or your staff as pop-up bartenders." },
  ].filter(o => !existing.includes(o.id));

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(11,18,32,0.5)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 40,
    }}>
      <div style={{ width: "100%", maxWidth: 620, background: "var(--wd-surface)", borderRadius: 20, padding: 32 }}>
        <Row style={{ justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.08em" }}>ADD A CAPABILITY</div>
          <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--wd-ink-3)" }}><Icon name="x" size={20}/></button>
        </Row>
        <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px" }}>Wear another hat?</h2>
        <p style={{ fontSize: 13, color: "var(--wd-ink-3)", margin: "0 0 22px", lineHeight: 1.6 }}>
          BRLO already does <strong style={{ color: CAPABILITY.space.color }}>Space</strong> and <strong style={{ color: CAPABILITY.brand.color }}>Brand</strong>. Adding a capability merges cleanly. One login, one profile, new tools appear.
        </p>

        <Stack gap={10}>
          {options.map(o => {
            const C = CAPABILITY[o.id];
            const on = picked === o.id;
            return (
              <button key={o.id} onClick={() => setPicked(o.id)} style={{
                padding: 16, textAlign: "left", cursor: "pointer",
                background: on ? C.tint : "var(--wd-pg)",
                border: on ? `2px solid ${C.color}` : "1px solid var(--wd-line)",
                borderRadius: 12, fontFamily: "Nunito",
                display: "flex", gap: 14, alignItems: "center",
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: on ? C.color : C.tintStrong, color: on ? "#fff" : C.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={C.icon} size={18}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)" }}>Add {C.label} capability</div>
                  <div style={{ fontSize: 12, color: "var(--wd-ink-3)", marginTop: 3 }}>{o.desc}</div>
                </div>
              </button>
            );
          })}
        </Stack>

        {picked && (
          <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: "rgba(0,102,255,0.06)", fontSize: 12, color: "var(--wd-ink-2)" }}>
            We'll add a <strong>{CAPABILITY[picked].label}</strong> tab to your nav, update your public profile with a new block, and send you a quick 3-question setup next login.
          </div>
        )}

        <Row gap={10} style={{ justifyContent: "flex-end", marginTop: 22 }}>
          <Btn variant="ghost" onClick={onClose}>Not now</Btn>
          <Btn icon="plus" disabled={!picked} onClick={onClose}>Add capability</Btn>
        </Row>
      </div>
    </div>
  );
};

Object.assign(window, { CapabilityExpand });
