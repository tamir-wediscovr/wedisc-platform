// Space Calendar + Requests.
//
// COLOR LOGIC
// -----------
// Calendar cells are colored by STATUS only (status = state):
//   • Available  → soft green tint
//   • Booked     → neutral ink-filled cell
//   • Pending    → amber (separate from Food orange to avoid conflict)
//   • Blocked    → flat neutral grey
// The event CATEGORY on booked days appears as a thin 3px stripe on the left
// edge of the cell (identity, secondary). Never as the main fill.

const SpaceCalendar = () => {
  // days 1..31 (May 2026 layout — starts Fri col 5)
  const pad = Array.from({length: 4}, (_, i) => null);
  const days = pad.concat(Array.from({length: 31}, (_, i) => i + 1));
  const booked = { 2: "food", 8: "music", 9: "music", 15: "culture", 17: "food", 23: "fitness", 27: "music", 28: "beauty" };
  const pendingDays = [14, 21];
  const blockedDays = [5, 12]; // private / closed days
  const available = [3, 4, 6, 7, 10, 11, 13, 16, 18, 19, 20, 22, 24, 25, 26, 29, 30, 31];

  return (
    <>
      <PageHeader
        title="Calendar"
        sub="Urban Spree · Friedrichshain · cap 450. Mark available slots to receive curator requests."
        actions={<><Btn variant="ghost" icon="upload">Sync iCal</Btn><Btn icon="plus">Open new slot</Btn></>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <Card>
          <Row style={{ justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>May 2026</h3>
            <Row gap={14}>
              <LegendChip swatch="avail"    label="Available"/>
              <LegendChip swatch="booked"   label="Booked"/>
              <LegendChip swatch="pending"  label="Pending"/>
              <LegendChip swatch="blocked"  label="Blocked"/>
            </Row>
          </Row>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 }}>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d =>
              <div key={d} style={{ fontSize: 10, fontWeight: 700, color: "var(--wd-ink-4)", letterSpacing: "0.06em", textAlign: "center", padding: "6px 0" }}>{d.toUpperCase()}</div>)}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {days.map((d, idx) => {
              if (d === null) return <div key={`pad-${idx}`}/>;
              const bk = booked[d];
              const cat = bk ? getCat(bk) : null;
              const isAvail = available.includes(d);
              const isPending = pendingDays.includes(d);
              const isBlocked = blockedDays.includes(d);
              return (
                <DayCell
                  key={d} day={d}
                  status={bk ? "booked" : isPending ? "pending" : isBlocked ? "blocked" : isAvail ? "available" : "empty"}
                  catColor={cat?.color} catName={cat?.name}
                />
              );
            })}
          </div>

          <Divider/>
          <Row gap={12}>
            <StatPills />
          </Row>
        </Card>

        <div>
          <Card>
            <Row style={{ justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Incoming requests</h3>
              <Pill color="#D97706" tint="rgba(217,119,6,0.12)">3 NEW</Pill>
            </Row>
            <Stack gap={14}>
              {[
                { c: "c1", title: "Midsommar Listening", date: "May 14 · 20:00", match: 89 },
                { c: "c5", title: "Afro-Futures Film Night", date: "May 18 · 19:30", match: 76 },
                { c: "c3", title: "Neukölln Night Market", date: "May 17 · 18:00", match: 84 },
              ].map((r, i) => {
                const curator = getCurator(r.c);
                const cat = getCat(curator.cat);
                return (
                  <div key={i} style={{ padding: 12, borderRadius: 10, background: "var(--wd-pg)", border: "1px solid var(--wd-line)", position: "relative", overflow: "hidden" }}>
                    {/* thin category stripe — identity only, not status */}
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: cat.color }}/>
                    <Row gap={10} style={{ marginBottom: 10, paddingLeft: 4 }}>
                      <Avatar name={curator.name} imgSrc={curator.img} color={curator.color} size={32}/>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink)" }}>{curator.name}</div>
                        <div style={{ fontSize: 10, color: "var(--wd-ink-4)" }}>CPI {curator.cpi} · {curator.city} · {cat.name}</div>
                      </div>
                      <WSIScoreBadge value={r.match} size={40}/>
                    </Row>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink-2)", paddingLeft: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 3, paddingLeft: 4 }}>{r.date}</div>
                    <Row gap={6} style={{ marginTop: 10, paddingLeft: 4 }}>
                      <Btn size="sm" variant="success" icon="check">Accept</Btn>
                      <Btn size="sm" variant="ghost">Counter</Btn>
                      <Btn size="sm" variant="quiet">Decline</Btn>
                    </Row>
                  </div>
                );
              })}
            </Stack>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>Revenue uplift</h3>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--wd-ink)", letterSpacing: "-0.02em" }}>+38%</div>
            <div style={{ fontSize: 12, color: "var(--wd-ink-3)", marginBottom: 10 }}>vs. baseline nights · from POS attribution</div>
            <Sparkline values={[100, 110, 130, 125, 140, 138, 155]} color="var(--wd-green-ink)" height={36}/>
            <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 8 }}>Events on weDISCOVR drive consistent above-baseline revenue.</div>
          </Card>
        </div>
      </div>
    </>
  );
};

// A single calendar cell. Status drives fill; category is a 3px left stripe.
const DayCell = ({ day, status, catColor, catName }) => {
  const cellStyles = {
    available: { bg: "rgba(126,217,87,0.14)", border: "1px solid rgba(126,217,87,0.4)", text: "var(--wd-ink)", subtext: "var(--wd-green-ink)" },
    booked:    { bg: "var(--wd-ink)",         border: "none",                          text: "#fff",           subtext: "rgba(255,255,255,0.75)" },
    pending:   { bg: "rgba(217,119,6,0.14)",  border: "1px dashed rgba(217,119,6,0.5)",text: "var(--wd-ink)",  subtext: "#D97706" },
    blocked:   { bg: "repeating-linear-gradient(135deg, var(--wd-pg-2) 0 6px, var(--wd-pg) 6px 12px)", border: "1px solid var(--wd-line-2)", text: "var(--wd-ink-4)", subtext: "var(--wd-ink-4)" },
    empty:     { bg: "var(--wd-surface)",     border: "1px solid var(--wd-line)",      text: "var(--wd-ink-3)",subtext: "var(--wd-ink-4)" },
  };
  const s = cellStyles[status];
  const subLabel =
    status === "available" ? "Open" :
    status === "booked"    ? catName :
    status === "pending"   ? "Review" :
    status === "blocked"   ? "Blocked" : "";

  return (
    <div style={{
      aspectRatio: "1", borderRadius: 8,
      background: s.bg, border: s.border,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: 8, cursor: "pointer", position: "relative", overflow: "hidden",
    }}>
      {status === "booked" && catColor && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: catColor }}/>
      )}
      <div style={{ fontSize: 13, fontWeight: 700, color: s.text, paddingLeft: status === "booked" ? 4 : 0 }}>{day}</div>
      {subLabel && (
        <div style={{ fontSize: 9, color: s.subtext, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", paddingLeft: status === "booked" ? 4 : 0 }}>
          {subLabel}
        </div>
      )}
    </div>
  );
};

// Little legend swatches that visually match the cells exactly.
const LegendChip = ({ swatch, label }) => {
  const swatches = {
    avail:   { bg: "rgba(126,217,87,0.14)", bd: "1px solid rgba(126,217,87,0.5)" },
    booked:  { bg: "var(--wd-ink)",         bd: "none" },
    pending: { bg: "rgba(217,119,6,0.14)",  bd: "1px dashed rgba(217,119,6,0.5)" },
    blocked: { bg: "repeating-linear-gradient(135deg, var(--wd-pg-2) 0 3px, var(--wd-pg) 3px 6px)", bd: "1px solid var(--wd-line-2)" },
  };
  const s = swatches[swatch];
  return (
    <Row gap={6}>
      <span style={{ width: 12, height: 12, borderRadius: 3, background: s.bg, border: s.bd }}/>
      <span style={{ fontSize: 11, color: "var(--wd-ink-3)" }}>{label}</span>
    </Row>
  );
};

const StatPills = () => (
  <>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em" }}>OPEN SLOTS</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "var(--wd-ink)", marginTop: 4 }}>12</div>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em" }}>BOOKED</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "var(--wd-ink)", marginTop: 4 }}>7</div>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em" }}>SVI</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "var(--wd-ink)", marginTop: 4 }}>84</div>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em" }}>UTILIZATION</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "var(--wd-ink)", marginTop: 4 }}>58%</div>
    </div>
  </>
);

Object.assign(window, { SpaceCalendar });
