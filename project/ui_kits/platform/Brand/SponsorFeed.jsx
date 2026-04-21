// Brand Sponsor Feed — browse events, see wSI match %, apply to sponsor.
const SponsorFeed = ({ onOpenEvent, wsiVariant }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("match");
  const events = EVENTS.filter(e => ["published", "sponsor_matched", "confirmed", "live"].includes(e.status))
    .sort((a, b) => sort === "match" ? b.wsi - a.wsi : 0);
  return (
    <>
      <PageHeader
        title="Sponsor Feed"
        sub="Published events matching Amazingy's brand profile. Sorted by wSI."
        actions={<>
          <Btn variant="ghost" icon="shield">Attention Insurance</Btn>
          <Btn icon="target">Set targeting</Btn>
        </>}
      />

      <Row style={{ justifyContent: "space-between", marginBottom: 20 }}>
        <Row gap={8}>
          {[["all","All"],["beauty","Beauty"],["music","Music"],["culture","Culture"],["food","Food"]].map(([v,l]) => (
            <Chip key={v} selected={filter === v} onClick={() => setFilter(v)}>{l}</Chip>
          ))}
        </Row>
        <Row gap={12}>
          <span style={{ fontSize: 12, color: "var(--wd-ink-4)" }}>Sort by</span>
          <SegmentedControl options={[{value:"match",label:"wSI match"},{value:"date",label:"Date"}]} value={sort} onChange={setSort} size="sm"/>
        </Row>
      </Row>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 18 }}>
        {events.filter(e => filter === "all" || e.cat === filter).map(e => (
          <SponsorCard key={e.id} ev={e} onOpen={() => onOpenEvent(e)} wsiVariant={wsiVariant} />
        ))}
      </div>
    </>
  );
};

const SponsorCard = ({ ev, onOpen, wsiVariant }) => {
  const c = getCat(ev.cat), curator = getCurator(ev.curator), space = getSpace(ev.space);
  return (
    <Card onClick={onOpen} padding={0} style={{ overflow: "hidden" }}>
      <div style={{ height: 140, position: "relative", background: c.color, backgroundImage: space.img ? `url(${space.img})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)` }} />
        {/* 3px category stripe — identity */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: c.color }} />
        <div style={{ position: "absolute", top: 14, left: 14 }}><CatPill cat={ev.cat} /></div>
        <div style={{ position: "absolute", top: 14, right: 14 }}><StatusPill status={ev.status} /></div>
        <div style={{ position: "absolute", bottom: 12, right: 12 }}><WSIScoreBadge value={ev.wsi} size={52}/></div>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--wd-ink)", marginBottom: 8, lineHeight: 1.3 }}>{ev.title}</div>
        <Row gap={12} style={{ marginBottom: 14 }}>
          <Row gap={5}><Icon name="clock" size={12} color="var(--wd-ink-3)"/><span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{ev.date}</span></Row>
          <Row gap={5}><Icon name="location" size={12} color="var(--wd-ink-3)"/><span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{space.name}</span></Row>
        </Row>
        <Row gap={8} style={{ padding: "12px 0", borderTop: "1px solid var(--wd-line)", borderBottom: "1px solid var(--wd-line)", marginBottom: 14 }}>
          <Avatar name={curator.name} imgSrc={curator.img} color={curator.color} size={30} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink)" }}>{curator.name}</div>
            <div style={{ fontSize: 10, color: "var(--wd-ink-4)" }}>CPI {curator.cpi} · {curator.events} events</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)" }}>{ev.rsvps}/{ev.cap}</div>
            <div style={{ fontSize: 10, color: "var(--wd-ink-4)" }}>expected wEIDs</div>
          </div>
        </Row>
        <Stack gap={6}>
          {[
            { label: "Audience fit (EPI·BSI)", v: ev.audienceFit },
            { label: "Revenue potential (DAS)", v: ev.revenue },
            { label: "Space quality (SVI)", v: ev.venue },
          ].map(r => (
            <div key={r.label}>
              <Row style={{ justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 11, color: "var(--wd-ink-3)" }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--wd-ink)" }}>{r.v}</span>
              </Row>
              <Bar value={r.v} color={barColor(r.v)} height={4}/>
            </div>
          ))}
        </Stack>
        <Row style={{ justifyContent: "space-between", marginTop: 16 }}>
          <Btn variant="ghost" size="sm">View brief</Btn>
          <Btn size="sm" icon="sparkle">Sponsor this</Btn>
        </Row>
      </div>
    </Card>
  );
};

const EventDetail = ({ ev, onBack, wsiVariant }) => {
  const [applied, setApplied] = useState(false);
  const c = getCat(ev.cat), curator = getCurator(ev.curator), space = getSpace(ev.space);
  return (
    <>
      <Row gap={10} style={{ marginBottom: 24, cursor: "pointer" }} onClick={onBack}>
        <Icon name="arrowLeft" size={16} color="var(--wd-ink-3)" />
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink-3)" }}>Back to feed</span>
      </Row>
      <Row style={{ justifyContent: "space-between", marginBottom: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Row gap={8} style={{ marginBottom: 10 }}><CatPill cat={ev.cat}/><StatusPill status={ev.status}/></Row>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "var(--wd-ink)", letterSpacing: "-0.02em" }}>{ev.title}</h1>
          <Row gap={16} style={{ marginTop: 10 }}>
            <Row gap={5}><Icon name="clock" size={14} color="var(--wd-ink-3)"/><span style={{ fontSize: 13, color: "var(--wd-ink-3)" }}>{ev.date}</span></Row>
            <Row gap={5}><Icon name="location" size={14} color="var(--wd-ink-3)"/><span style={{ fontSize: 13, color: "var(--wd-ink-3)" }}>{space.name} · {space.n}</span></Row>
            <Row gap={5}><Icon name="users2" size={14} color="var(--wd-ink-3)"/><span style={{ fontSize: 13, color: "var(--wd-ink-3)" }}>{ev.rsvps} / {ev.cap} expected</span></Row>
          </Row>
        </div>
        {!applied ? (
          <Btn size="lg" icon="sparkle" onClick={() => setApplied(true)}>Sponsor this event</Btn>
        ) : (
          <Pill color="var(--wd-green-ink)" tint="rgba(126,217,87,0.18)">✓ Application submitted · chat opened</Pill>
        )}
      </Row>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}>
        <Stack gap={20}>
          <Card>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>About</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--wd-ink-2)", lineHeight: 1.6 }}>{ev.desc}</p>
          </Card>
          {ev.schedule && (
            <Card>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>Schedule</h3>
              <Stack gap={0}>
                {ev.schedule.map(([t, l], i, arr) => (
                  <Row key={i} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--wd-line)" : "none", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)" }}>{t}</span>
                    <span style={{ fontSize: 13, color: "var(--wd-ink-3)" }}>{l}</span>
                  </Row>
                ))}
              </Stack>
            </Card>
          )}
          <Card>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>Curator</h3>
            <Row gap={14}>
              <Avatar name={curator.name} imgSrc={curator.img} color={curator.color} size={56}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--wd-ink)" }}>{curator.name}</div>
                <div style={{ fontSize: 12, color: "var(--wd-ink-3)", marginTop: 2 }}>{curator.handle} · {curator.followers} followers · CPI {curator.cpi}</div>
                <div style={{ fontSize: 13, color: "var(--wd-ink-2)", marginTop: 8 }}>{curator.bio}</div>
              </div>
            </Row>
          </Card>
        </Stack>
        <Stack gap={20}>
          <Card>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>wSI breakdown</h3>
            <WSI ev={ev} variant={wsiVariant}/>
          </Card>
          <Card>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Guaranteed wEID impressions</h3>
            <Stack gap={10}>
              {[["Floor case (60%)", Math.round(ev.rsvps * 0.6)],["Base case", ev.rsvps],["Upside (DAS)", Math.round(ev.rsvps * 1.2)]].map(([l, v], i) => (
                <Row key={i} style={{ padding: "10px 12px", borderRadius: 10, background: i === 1 ? "rgba(0,102,255,0.05)" : "var(--wd-pg)", border: i === 1 ? "1px solid rgba(0,102,255,0.2)" : "1px solid var(--wd-line)" }}>
                  <div style={{ flex: 1, fontSize: 12, fontWeight: 700, color: "var(--wd-ink-2)" }}>{l}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: i === 1 ? "#0066FF" : "var(--wd-ink)" }}>{v}</div>
                </Row>
              ))}
            </Stack>
            <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 12, lineHeight: 1.5 }}>Priced and delivered via wSI. Never lead counts. Floor-case credit issued if breached.</div>
          </Card>
        </Stack>
      </div>
    </>
  );
};

Object.assign(window, { SponsorFeed, EventDetail });
