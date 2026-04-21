// Cross-capability handoff: accept a space request → get nudged to sponsor it.
const HandoffModal = ({ req, onClose, onGoSponsor }) => {
  const cur = getCurator(req.from);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(11,18,32,0.55)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 40,
    }}>
      <div style={{
        width: "100%", maxWidth: 560, background: "var(--wd-surface)", borderRadius: 20, overflow: "hidden",
        border: "1px solid var(--wd-line)",
      }}>
        {/* Header with gradient stripe — both capabilities */}
        <div style={{ height: 5, background: `linear-gradient(90deg, ${CAPABILITY.space.color}, ${CAPABILITY.brand.color})` }} />
        <div style={{ padding: 32 }}>
          <Row gap={6} style={{ marginBottom: 14 }}>
            <span style={{ padding: "4px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", background: "rgba(126,217,87,0.18)", color: "var(--wd-green-ink)", borderRadius: 999 }}>✓ SPACE ACCEPTED</span>
            <span style={{ padding: "4px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", background: CAPABILITY.brand.tintStrong, color: CAPABILITY.brand.color, borderRadius: 999 }}>BRAND OPPORTUNITY</span>
          </Row>
          <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", lineHeight: 1.2 }}>
            You just booked your taproom. Want to pour your own beer too?
          </h2>
          <p style={{ fontSize: 13, color: "var(--wd-ink-3)", margin: "0 0 20px", lineHeight: 1.6 }}>
            {cur?.name}'s audience scores <strong style={{ color: "#FF5501" }}>89% wSI match</strong> against your BRLO brand profile. Self-sponsoring your own hosted event typically delivers <strong>3× margin</strong> vs. plain hosting. You keep the space revenue <em>and</em> the sponsor spend.
          </p>

          <div style={{ padding: 16, borderRadius: 12, background: "var(--wd-pg)", border: "1px solid var(--wd-line)", marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>PROJECTED UPSIDE</div>
            <Stack gap={10}>
              <Row style={{ justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--wd-ink-2)" }}>Space revenue (already locked)</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-green-ink)" }}>+ €2,400</span>
              </Row>
              <Row style={{ justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--wd-ink-2)" }}>Sponsor wEID value (est.)</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#FF5501" }}>+ €1,200</span>
              </Row>
              <Row style={{ justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--wd-line)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)" }}>Blended take</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--wd-ink)" }}>€3,600</span>
              </Row>
            </Stack>
          </div>

          <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginBottom: 20, lineHeight: 1.5 }}>
            weDISCOVR will route the handoff automatically. You'll land in Recall Studio to configure the offer, pre-filled with your SPF recipe from last time.
          </div>

          <Row gap={10} style={{ justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={onClose}>Just host this time</Btn>
            <Btn size="lg" icon="sparkle" onClick={onGoSponsor} style={{ background: "#FF5501" }}>Yes, also sponsor →</Btn>
          </Row>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { HandoffModal });
