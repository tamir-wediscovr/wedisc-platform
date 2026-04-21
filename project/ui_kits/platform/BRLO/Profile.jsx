// BRLO public profile preview — shows both capabilities publicly.
const BRLOProfile = () => {
  const e = BRLO_ENTITY;
  return (
    <>
      <PageHeader
        title="Public profile"
        sub="This is how curators, brands, and the weDISCOVR Explorer app see BRLO."
        actions={<><Btn variant="ghost" icon="eye">Preview</Btn><Btn>Edit</Btn></>}
      />
      <Card padding={0} style={{ overflow: "hidden" }}>
        {/* Hero */}
        <div style={{
          height: 180, position: "relative",
          background: `linear-gradient(135deg, ${e.color} 0%, #8A2D00 100%)`,
        }}>
          <div style={{ position: "absolute", bottom: 14, left: 24, color: "#fff" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", opacity: 0.8 }}>BRLO · KREUZBERG</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>{e.name}</div>
          </div>
          {/* Capability ribbon */}
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
            {e.capabilities.map(c => {
              const C = CAPABILITY[c];
              return (
                <span key={c} style={{
                  padding: "6px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                  background: "rgba(255,255,255,0.18)", color: "#fff",
                  borderRadius: 999, backdropFilter: "blur(10px)",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: 4, background: C.color }} />
                  {C.label.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ fontSize: 14, color: "var(--wd-ink-2)", lineHeight: 1.6, marginBottom: 20 }}>
            A Kreuzberg brewery and taproom. We host events in our 280-cap Brwhouse and pour our craft beer at cultural events across Berlin. Both sides of our business live on weDISCOVR.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <CapabilityBlock cap="space" />
            <CapabilityBlock cap="brand" />
          </div>
        </div>
      </Card>
    </>
  );
};

const CapabilityBlock = ({ cap }) => {
  const C = CAPABILITY[cap];
  const e = BRLO_ENTITY;
  const items = cap === "space" ? [
    ["Venue", "BRLO Brwhouse, Kreuzberg"],
    ["Capacity", "280 people"],
    ["Type", "Brewery + Taproom"],
    ["SVI", e.space.svi],
    ["Equipment", "Sound, Kitchen, Bar, Outdoor"],
  ] : [
    ["Industry", "Craft brewery"],
    ["Category fit", "Food, Music, Culture"],
    ["Monthly budget", e.brand.budget],
    ["BSI", e.brand.bsi],
    ["Active campaigns", e.brand.activeSponsorships],
  ];
  return (
    <div style={{
      padding: 20, borderRadius: 14,
      border: `1px solid ${C.tintStrong}`,
      background: C.tint,
      position: "relative",
    }}>
      <Row gap={10} style={{ marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: C.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={C.icon} size={16} />
        </div>
        <div>
          <div style={{ fontSize: 10, color: C.color, fontWeight: 700, letterSpacing: "0.08em" }}>AS {C.label.toUpperCase()}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>
            {cap === "space" ? "Book our taproom" : "We'll sponsor your event"}
          </div>
        </div>
      </Row>
      <Stack gap={8}>
        {items.map(([k, v], i) => (
          <Row key={i} style={{ justifyContent: "space-between", padding: "6px 0", borderBottom: i < items.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)" }}>{v}</span>
          </Row>
        ))}
      </Stack>
    </div>
  );
};

Object.assign(window, { BRLOProfile });
