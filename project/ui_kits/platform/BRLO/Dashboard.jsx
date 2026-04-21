// BRLO merged dashboard — both capabilities, swim-laned.
const BRLODashboard = ({ setPage, setCap }) => {
  const e = BRLO_ENTITY;
  const spaceRequests = BRLO_INBOX.filter(i => i.cap === "space" && i.status === "new");
  const brandPitches  = BRLO_INBOX.filter(i => i.cap === "brand" && i.status === "new");

  return (
    <>
      <PageHeader
        title={`Guten Tag, BRLO`}
        sub="Your taproom + your brand sponsorship pipeline, in one place."
        actions={<>
          <Btn variant="ghost" icon="plus">Open calendar slot</Btn>
          <Btn icon="compass">Browse sponsor feed</Btn>
        </>}
      />

      {/* Capability overview — color-coded */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <CapSummaryCard
          cap="space" entity={e.space}
          stats={[
            { l: "Open slots",  v: e.space.openSlots },
            { l: "Booked",      v: e.space.booked },
            { l: "Utilization", v: `${e.space.utilization}%` },
            { l: "SVI",         v: e.space.svi },
          ]}
          cta="Manage calendar →"
          onCta={() => { setCap("space"); setPage("calendar"); }}
          pending={spaceRequests.length}
        />
        <CapSummaryCard
          cap="brand" entity={e.brand}
          stats={[
            { l: "Sponsoring",         v: e.brand.activeSponsorships },
            { l: "wEIDs this month",   v: e.brand.weidsThisMonth.toLocaleString() },
            { l: "Guaranteed pool",    v: e.brand.guaranteedRemaining.toLocaleString() },
            { l: "BSI",                v: e.brand.bsi },
          ]}
          cta="Browse feed →"
          onCta={() => { setCap("brand"); setPage("feed"); }}
          pending={brandPitches.length}
        />
      </div>

      {/* Cross-capability moments */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--wd-ink-4)", marginBottom: 12 }}>
          WHEN YOUR TWO HATS MEET
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {BRLO_CROSSOVERS.map(x => (
            <div key={x.id} style={{
              padding: 16, borderRadius: 14, background: "var(--wd-surface)",
              border: "1px solid var(--wd-line)",
              borderLeft: "3px solid transparent",
              position: "relative", overflow: "hidden",
            }}>
              {/* gradient stripe = both caps */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                background: `linear-gradient(180deg, ${CAPABILITY.space.color}, ${CAPABILITY.brand.color})`,
              }} />
              <Row gap={6} style={{ marginBottom: 8 }}>
                {x.cap.map(c => (
                  <span key={c} style={{
                    padding: "2px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.04em",
                    background: CAPABILITY[c].tintStrong, color: CAPABILITY[c].color,
                    borderRadius: 999,
                  }}>{CAPABILITY[c].label.toUpperCase()}</span>
                ))}
              </Row>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)", marginBottom: 4 }}>{x.headline}</div>
              <div style={{ fontSize: 12, color: "var(--wd-ink-3)", lineHeight: 1.5 }}>{x.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Unified inbox */}
      <Card padding={0}>
        <Row style={{ padding: "16px 20px", justifyContent: "space-between", borderBottom: "1px solid var(--wd-line)" }}>
          <Row gap={10}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Unified Inbox</h3>
            <Pill color="#D97706" tint="rgba(217,119,6,0.12)">
              {spaceRequests.length + brandPitches.length} NEW
            </Pill>
          </Row>
          <Row gap={6}>
            <FilterChip color={CAPABILITY.space.color} label="Space" count={spaceRequests.length} />
            <FilterChip color={CAPABILITY.brand.color} label="Brand" count={brandPitches.length} />
          </Row>
        </Row>
        <Stack gap={0}>
          {BRLO_INBOX.map((i, idx) => {
            const cur = getCurator(i.from);
            const C = CAPABILITY[i.cap];
            const isNew = i.status === "new";
            return (
              <div key={i.id} style={{
                padding: "14px 20px",
                borderBottom: idx < BRLO_INBOX.length - 1 ? "1px solid var(--wd-line)" : "none",
                borderLeft: `3px solid ${C.color}`,
                display: "grid", gridTemplateColumns: "auto 1fr auto auto auto",
                gap: 16, alignItems: "center",
                background: isNew ? `linear-gradient(90deg, ${C.tint} 0%, transparent 40%)` : "transparent",
                cursor: "pointer",
              }}>
                <span style={{
                  padding: "3px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
                  background: C.tintStrong, color: C.color, borderRadius: 4, minWidth: 52, textAlign: "center",
                }}>{C.label.toUpperCase()}</span>
                <div>
                  <Row gap={6} style={{ marginBottom: 2 }}>
                    {cur && <span style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink)" }}>{cur.name}</span>}
                    <span style={{ fontSize: 11, color: "var(--wd-ink-4)" }}>
                      {i.kind === "request" && "requested your space for"}
                      {i.kind === "pitch" && "is pitching a sponsorship for"}
                      {i.kind === "confirmation" && "confirmed your sponsorship of"}
                      {i.kind === "report" && "Campaign report ready ·"}
                    </span>
                  </Row>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--wd-ink-2)" }}>{i.ev}</div>
                  <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 2 }}>{i.date}</div>
                </div>
                <WSIScoreBadge value={i.match} size={36} />
                <span style={{ fontSize: 11, color: "var(--wd-ink-4)", whiteSpace: "nowrap" }}>{i.when}</span>
                <Row gap={6}>
                  {isNew && (i.kind === "request" ? (
                    <><Btn size="sm" variant="success" icon="check">Accept</Btn><Btn size="sm" variant="ghost">Counter</Btn></>
                  ) : i.kind === "pitch" ? (
                    <><Btn size="sm" icon="sparkle">Review pitch</Btn></>
                  ) : null)}
                  {!isNew && <Btn size="sm" variant="ghost">View</Btn>}
                </Row>
              </div>
            );
          })}
        </Stack>
      </Card>
    </>
  );
};

const CapSummaryCard = ({ cap, entity, stats, cta, onCta, pending }) => {
  const C = CAPABILITY[cap];
  return (
    <div style={{
      padding: 20, borderRadius: 16,
      background: "var(--wd-surface)",
      border: "1px solid var(--wd-line)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Top accent stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: C.color }} />
      <Row style={{ justifyContent: "space-between", marginBottom: 16 }}>
        <Row gap={10}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.tintStrong, color: C.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={C.icon} size={18}/>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.08em" }}>AS {C.label.toUpperCase()}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--wd-ink)", marginTop: 2 }}>
              {cap === "space" ? entity.venue : `${BRLO_ENTITY.name} · ${entity.industry}`}
            </div>
          </div>
        </Row>
        {pending > 0 && (
          <Pill color={C.color} tint={C.tintStrong}>{pending} PENDING</Pill>
        )}
      </Row>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 14 }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 10, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em" }}>{s.l.toUpperCase()}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--wd-ink)", marginTop: 4 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <button onClick={onCta} style={{
        width: "100%", padding: "10px 14px",
        background: C.tint, color: C.color,
        border: "none", borderRadius: 10,
        fontFamily: "Nunito", fontSize: 13, fontWeight: 700,
        cursor: "pointer", textAlign: "center",
      }}>{cta}</button>
    </div>
  );
};

const FilterChip = ({ color, label, count }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 10px", borderRadius: 999,
    background: "var(--wd-pg)", fontSize: 11, fontWeight: 700, color: "var(--wd-ink-2)",
  }}>
    <span style={{ width: 8, height: 8, borderRadius: 4, background: color }} />
    {label} · {count}
  </span>
);

Object.assign(window, { BRLODashboard });
