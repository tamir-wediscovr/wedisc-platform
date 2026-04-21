// Curator Dashboard.
const CuratorDashboard = ({ setPage, wsiVariant }) => {
  const myEvents = EVENTS.filter(e => e.curator === "c1");
  const drafts = EVENTS.filter(e => e.status === "qa_review" || e.status === "space_pending");
  const nextEvent = myEvents.find(e => e.status === "live" || e.status === "confirmed") || myEvents[0];
  return (
    <>
      <PageHeader
        title="Welcome back, DJ Kleo"
        sub="Your events, brand matches and payout status, all in one place."
        actions={<>
          <Btn variant="ghost" icon="eye">Preview profile</Btn>
          <Btn icon="plus" onClick={() => setPage("create")}>Create Event</Btn>
        </>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Upcoming events" value="3" sub="Next: Fri 20:00 at Urban Spree"
          icon="calendar" tint="rgba(0,102,255,0.08)" sparkColor="#0066FF"
          spark={[2,3,2,4,3,5,4]} />
        <StatCard label="Estimated earnings" value="€4,820" delta="+18%" deltaKind="up" sub="This month · before fees"
          icon="euro" tint="rgba(126,217,87,0.18)" sparkColor="#7ED957"
          spark={[800,1200,900,1400,1800,2200,4820]} />
        <StatCard label="Brand matches" value="7" delta="+2 this week" deltaKind="up" sub="Pending sponsor decisions"
          icon="sparkle" tint="rgba(105,104,203,0.10)" sparkColor="#6968CB"
          spark={[3,4,5,4,6,7,7]} />
        <StatCard label="CPI · track record" value="86" sub="Top 12% of Berlin curators"
          icon="target" tint="rgba(250,201,56,0.18)" sparkColor="#FAC938"
          spark={[72,74,78,80,82,85,86]} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <Card>
          <Row style={{ justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>Your next event</h3>
            <StatusPill status={nextEvent.status} />
          </Row>
          <EventHero ev={nextEvent} />
          <Divider />
          <Row style={{ justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em" }}>ESTIMATED EARNINGS</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--wd-ink)", marginTop: 6 }}>€2,140</div>
              <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 2 }}>Host fee + per-head + ticket share</div>
            </div>
            <Row gap={8}>
              <Btn variant="ghost" size="sm">View run-sheet</Btn>
              <Btn size="sm" icon="arrowRight">Open event</Btn>
            </Row>
          </Row>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 18px", fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>
            Brand sponsor match
          </h3>
          <Row gap={10} style={{ marginBottom: 16, padding: 12, borderRadius: 12, background: "var(--wd-pg)" }}>
            <Avatar name="Ableton" color="#6968CB" size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)" }}>Ableton</div>
              <div style={{ fontSize: 11, color: "var(--wd-ink-3)", marginTop: 2 }}>Music tech · €60,000 budget</div>
            </div>
            <Pill color="#7ED957" tint="rgba(126,217,87,0.18)">MATCHED</Pill>
          </Row>
          <WSI ev={nextEvent} variant={wsiVariant} compact />
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        <Card>
          <Row style={{ justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>Upcoming</h3>
            <Btn variant="quiet" size="sm">View all →</Btn>
          </Row>
          <Stack gap={0}>
            {myEvents.slice(0, 3).map((e, i, arr) => (
              <React.Fragment key={e.id}>
                <EventRow ev={e} />
                {i < arr.length - 1 && <Divider style={{ margin: "12px 0" }}/>}
              </React.Fragment>
            ))}
          </Stack>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>
            Payout status
          </h3>
          <Stack gap={10}>
            {[
              { stage: "Scheduled", label: "Apr 27 · Midsommar", amount: "€2,140", active: false, done: true },
              { stage: "Happened · calculating", label: "Apr 12 · Moog Session", amount: "€1,640", active: true, done: false },
              { stage: "Ready to pay", label: "Apr 5 · DJ set @ Urban", amount: "€980", active: false, done: false },
              { stage: "Paid", label: "Mar 22 · Vinyl night", amount: "€1,220", active: false, done: true },
            ].map((p, i) => (
              <Row key={i} gap={12} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--wd-line)" : "none" }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: p.active ? "#0066FF" : p.done ? "#7ED957" : "var(--wd-line-3)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.04em" }}>{p.stage.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: "var(--wd-ink)", fontWeight: 600, marginTop: 3 }}>{p.label}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)" }}>{p.amount}</div>
              </Row>
            ))}
          </Stack>
        </Card>
      </div>
    </>
  );
};

const EventHero = ({ ev }) => {
  const c = getCat(ev.cat), space = getSpace(ev.space), curator = getCurator(ev.curator);
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: 128, height: 96, borderRadius: 12, flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: "var(--wd-pg-2)", backgroundImage: space.img ? `url(${space.img})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: c.color }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.4) 100%)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <Row gap={6} style={{ marginBottom: 6 }}>
          <CatPill cat={ev.cat} size="sm" />
          {ev.brand && <Pill color="#6968CB" tint="rgba(105,104,203,0.10)" size="sm">Sponsored</Pill>}
        </Row>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--wd-ink)", marginBottom: 6 }}>{ev.title}</div>
        <Row gap={14} style={{ marginBottom: 10 }}>
          <Row gap={4}><Icon name="clock" size={13} color="var(--wd-ink-3)"/><span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{ev.date}</span></Row>
          <Row gap={4}><Icon name="location" size={13} color="var(--wd-ink-3)"/><span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{space.name}</span></Row>
          <Row gap={4}><Icon name="users2" size={13} color="var(--wd-ink-3)"/><span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{ev.rsvps} / {ev.cap}</span></Row>
        </Row>
        <div style={{ fontSize: 13, color: "var(--wd-ink-2)", lineHeight: 1.5 }}>{ev.desc}</div>
      </div>
    </div>
  );
};

const EventRow = ({ ev }) => {
  const c = getCat(ev.cat), space = getSpace(ev.space);
  return (
    <Row gap={12}>
      <div style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0, overflow: "hidden", backgroundColor: "var(--wd-pg-2)", backgroundImage: space.img ? `url(${space.img})` : undefined, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2.5, background: c.color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Row gap={6} style={{ marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</span>
        </Row>
        <Row gap={10}>
          <span style={{ fontSize: 11, color: "var(--wd-ink-4)" }}>{ev.date}</span>
          <span style={{ fontSize: 11, color: "var(--wd-ink-4)" }}>· {space.name}</span>
        </Row>
      </div>
      <StatusPill status={ev.status} size="sm" />
    </Row>
  );
};

Object.assign(window, { CuratorDashboard, EventHero, EventRow });
