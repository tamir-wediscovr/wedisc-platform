// Entity onboarding flow — single- and multi-capability.
// A 4-step wizard: identity → capabilities → per-capability details → confirm.

const Onboarding = ({ onExit }) => {
  const [step, setStep] = useState(0);
  const [caps, setCaps] = useState([]);
  const [entity, setEntity] = useState({ name: "", city: "Berlin", tagline: "" });

  const steps = ["Identity", "Capabilities", "Details", "Confirm"];
  const toggle = (c) => setCaps(caps.includes(c) ? caps.filter(x => x !== c) : [...caps, c]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "var(--wd-pg)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Top progress bar */}
      <div style={{
        background: "var(--wd-surface)", borderBottom: "1px solid var(--wd-line)",
        padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Row gap={10}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#0066FF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, letterSpacing: "-0.03em" }}>wD</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)" }}>Join weDISCOVR</span>
        </Row>
        <Row gap={16}>
          {steps.map((s, i) => (
            <Row key={s} gap={6}>
              <span style={{
                width: 20, height: 20, borderRadius: 10,
                background: i <= step ? "#0066FF" : "var(--wd-pg-2)",
                color: i <= step ? "#fff" : "var(--wd-ink-4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
              }}>{i + 1}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: i <= step ? "var(--wd-ink)" : "var(--wd-ink-4)" }}>{s}</span>
              {i < steps.length - 1 && <span style={{ width: 24, height: 1, background: "var(--wd-line-2)", marginLeft: 10 }}/>}
            </Row>
          ))}
        </Row>
        <button onClick={onExit} style={{ padding: "6px 12px", border: "1px solid var(--wd-line-2)", borderRadius: 8, background: "transparent", fontSize: 12, color: "var(--wd-ink-3)", cursor: "pointer", fontFamily: "Nunito" }}>Exit demo</button>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 720 }}>
          {step === 0 && <StepIdentity entity={entity} setEntity={setEntity}/>}
          {step === 1 && <StepCapabilities caps={caps} toggle={toggle}/>}
          {step === 2 && <StepDetails caps={caps}/>}
          {step === 3 && <StepConfirm entity={entity} caps={caps}/>}
          <Row gap={10} style={{ justifyContent: "space-between", marginTop: 32 }}>
            <Btn variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Back</Btn>
            {step < 3 ? (
              <Btn size="lg" onClick={() => setStep(step + 1)} disabled={step === 1 && caps.length === 0}>
                Continue →
              </Btn>
            ) : (
              <Btn size="lg" variant="success" icon="check" onClick={onExit}>Enter dashboard</Btn>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

const StepIdentity = ({ entity, setEntity }) => (
  <div>
    <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Welcome. Who are you?</h1>
    <p style={{ fontSize: 15, color: "var(--wd-ink-3)", marginTop: 10, marginBottom: 28 }}>Start with the basics. You'll pick what you <em>do</em> next.</p>
    <Stack gap={14}>
      <Field label="Entity name" required><Input value={entity.name} onChange={v => setEntity({...entity, name: v})} placeholder="e.g. BRLO, DJ Kleo, Amazingy…"/></Field>
      <Field label="City"><Input value={entity.city} onChange={v => setEntity({...entity, city: v})}/></Field>
      <Field label="One-line tagline" hint="Shown on your public profile."><Input value={entity.tagline} onChange={v => setEntity({...entity, tagline: v})} placeholder="e.g. Kreuzberg brewery + taproom"/></Field>
    </Stack>
  </div>
);

const StepCapabilities = ({ caps, toggle }) => {
  const options = [
    { id: "curator", label: "Curate events",     desc: "Run cultural nights, supper clubs, listening sessions, workshops.", example: "DJs, chefs, foundations" },
    { id: "space",   label: "Host at my venue",  desc: "Open a physical space to curators and receive booking requests.", example: "Breweries, galleries, showrooms" },
    { id: "brand",   label: "Sponsor events",    desc: "Buy guaranteed wEID attention at relevant cultural events.",     example: "Beauty brands, breweries, auto" },
    { id: "talent",  label: "Offer talent / services", desc: "Make yourself bookable for other curators' events.",      example: "DJs, speakers, caterers" },
  ];
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>What do you do?</h1>
      <p style={{ fontSize: 15, color: "var(--wd-ink-3)", marginTop: 10, marginBottom: 28 }}>Pick one or more. You can always add capabilities later. <strong>Multiple = one unified dashboard.</strong></p>
      <Stack gap={10}>
        {options.map(o => {
          const C = CAPABILITY[o.id];
          const on = caps.includes(o.id);
          return (
            <button key={o.id} onClick={() => toggle(o.id)} style={{
              padding: 20, borderRadius: 14, textAlign: "left", cursor: "pointer",
              background: on ? C.tint : "var(--wd-surface)",
              border: on ? `2px solid ${C.color}` : "1px solid var(--wd-line-2)",
              fontFamily: "Nunito", display: "flex", gap: 16, alignItems: "center",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: on ? C.color : C.tintStrong,
                color: on ? "#fff" : C.color,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={C.icon} size={20}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>{o.label}</div>
                <div style={{ fontSize: 13, color: "var(--wd-ink-3)", marginTop: 4 }}>{o.desc}</div>
                <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 6, fontStyle: "italic" }}>e.g. {o.example}</div>
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: 12,
                border: on ? `none` : "2px solid var(--wd-line-2)",
                background: on ? C.color : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {on && <Icon name="check" size={14} color="#fff"/>}
              </div>
            </button>
          );
        })}
      </Stack>
      {caps.length >= 2 && (
        <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.15)", fontSize: 13, color: "var(--wd-ink-2)" }}>
          ✨ <strong>Multi-capability account.</strong> You'll get a unified dashboard with {caps.length} capability tabs, like BRLO, who hosts <em>and</em> sponsors.
        </div>
      )}
    </div>
  );
};

const StepDetails = ({ caps }) => (
  <div>
    <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Quick details per hat</h1>
    <p style={{ fontSize: 15, color: "var(--wd-ink-3)", marginTop: 10, marginBottom: 28 }}>Just enough so we can set up your dashboard. You can fill the rest later.</p>
    <Stack gap={16}>
      {caps.map(c => {
        const C = CAPABILITY[c];
        return (
          <div key={c} style={{
            padding: 20, borderRadius: 14,
            border: `1px solid ${C.tintStrong}`, background: C.tint,
          }}>
            <Row gap={10} style={{ marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: C.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={C.icon} size={14}/>
              </div>
              <span style={{ fontSize: 11, color: C.color, fontWeight: 700, letterSpacing: "0.08em" }}>AS {C.label.toUpperCase()}</span>
            </Row>
            {c === "curator" && <Row gap={10}><Input placeholder="Primary category (music, food, …)"/><Input placeholder="Avg events per month"/></Row>}
            {c === "space"   && <Row gap={10}><Input placeholder="Venue name"/><Input placeholder="Capacity"/></Row>}
            {c === "brand"   && <Row gap={10}><Input placeholder="Industry"/><Input placeholder="Monthly budget (€)"/></Row>}
            {c === "talent"  && <Row gap={10}><Input placeholder="What you offer (DJ, chef, …)"/><Input placeholder="Day rate (€)"/></Row>}
          </div>
        );
      })}
    </Stack>
  </div>
);

const StepConfirm = ({ entity, caps }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
    <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Welcome, {entity.name || "you"}.</h1>
    <p style={{ fontSize: 15, color: "var(--wd-ink-3)", marginTop: 12, maxWidth: 460, margin: "12px auto 28px" }}>
      Your {caps.length > 1 ? "multi-capability" : "single-capability"} account is ready. {caps.length > 1 && "One dashboard, all your hats."}
    </p>
    <Row gap={8} style={{ justifyContent: "center", marginBottom: 28 }}>
      {caps.map(c => {
        const C = CAPABILITY[c];
        return (
          <span key={c} style={{
            padding: "8px 14px", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em",
            background: C.tintStrong, color: C.color, borderRadius: 999,
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            <Icon name={C.icon} size={14}/>
            {C.label.toUpperCase()}
          </span>
        );
      })}
    </Row>
  </div>
);

Object.assign(window, { Onboarding });
