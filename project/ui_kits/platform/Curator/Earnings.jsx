// Curator Earnings screen.
const Earnings = () => {
  const months = [
    { m: "Jan", v: 2100 }, { m: "Feb", v: 3400 }, { m: "Mar", v: 4120 },
    { m: "Apr", v: 4820 }, { m: "May", v: 5600, est: true },
  ];
  const max = Math.max(...months.map(m => m.v));
  return (
    <>
      <PageHeader
        title="Earnings"
        sub="Host fees, per-head payouts, and ticket share. Reconciled monthly."
        actions={<>
          <SegmentedControl options={[{value:"2026",label:"2026"},{value:"2025",label:"2025"}]} value="2026" onChange={()=>{}} size="sm" />
          <Btn variant="ghost" icon="upload">Export</Btn>
        </>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard label="This month · estimated" value="€4,820" delta="+18% MoM" deltaKind="up" sub="Before OS + payment fees" icon="euro" tint="rgba(126,217,87,0.18)" sparkColor="var(--wd-green-ink)" />
        <StatCard label="Ready to pay" value="€980" sub="1 event reconciled" icon="wallet" tint="rgba(0,102,255,0.08)" sparkColor="#0066FF" />
        <StatCard label="Year to date" value="€14,440" delta="+42% YoY" deltaKind="up" sub="Across 11 events" icon="chart" tint="rgba(105,104,203,0.10)" sparkColor="#6968CB" />
        <StatCard label="CPI bonus earned" value="€520" sub="From 3 DAS-overperforming events" icon="sparkle" tint="rgba(250,201,56,0.18)" sparkColor="var(--wd-gold-ink)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <Card>
          <Row style={{ justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>Monthly earnings</h3>
            <Row gap={12}>
              <Row gap={5}><span style={{ width: 9, height: 9, borderRadius: 2, background: "#0066FF" }}/><span style={{ fontSize: 11, color: "var(--wd-ink-3)" }}>Final</span></Row>
              <Row gap={5}><span style={{ width: 9, height: 9, borderRadius: 2, background: "rgba(0,102,255,0.3)", border: "1px dashed #0066FF" }}/><span style={{ fontSize: 11, color: "var(--wd-ink-3)" }}>Estimated</span></Row>
            </Row>
          </Row>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 200, padding: "0 6px" }}>
            {months.map(m => (
              <div key={m.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--wd-ink)" }}>€{(m.v/1000).toFixed(1)}k</div>
                <div style={{
                  width: "100%", height: `${(m.v / max) * 140}px`,
                  background: m.est ? "rgba(0,102,255,0.25)" : "#0066FF",
                  border: m.est ? "1px dashed #0066FF" : "none",
                  borderRadius: "6px 6px 0 0",
                  transition: "height 400ms var(--wd-ease)",
                }} />
                <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 600 }}>{m.m}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>April breakdown</h3>
          <Stack gap={12}>
            {[
              { label: "Host fees", amount: "€1,200", pct: 25 },
              { label: "Per-head (verified)", amount: "€2,420", pct: 50 },
              { label: "Ticket share (80%)", amount: "€820",  pct: 17 },
              { label: "DAS overperf. bonus", amount: "€520", pct: 11 },
            ].map((r, i) => (
              <div key={i}>
                <Row style={{ justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: "var(--wd-ink-2)", fontWeight: 600 }}>{r.label}</span>
                  <span style={{ fontSize: 13, color: "var(--wd-ink)", fontWeight: 700 }}>{r.amount}</span>
                </Row>
                <Bar value={r.pct * 2} color={barColor(70 + i * 5)} height={5} />
              </div>
            ))}
            <Divider style={{ margin: "4px 0" }}/>
            <Row style={{ justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--wd-ink-4)" }}>OS + payment fees</span>
              <span style={{ fontSize: 13, color: "var(--wd-ink-3)" }}>− €140</span>
            </Row>
            <Row style={{ justifyContent: "space-between", padding: "8px 0 0", borderTop: "1px solid var(--wd-line)" }}>
              <span style={{ fontSize: 13, color: "var(--wd-ink)", fontWeight: 700 }}>Net payout</span>
              <span style={{ fontSize: 18, color: "var(--wd-ink)", fontWeight: 700 }}>€4,820</span>
            </Row>
          </Stack>
        </Card>
      </div>

      <Card style={{ marginTop: 20 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "var(--wd-ink)" }}>Per-event detail</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--wd-line)" }}>
              {["Event", "Date", "Attended", "Host fee", "Per-head", "Tickets", "Bonus", "Net", "Status"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 8px", fontSize: 11, fontWeight: 700, color: "var(--wd-ink-4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Midsommar Listening", "Apr 27", "214/280", "€400", "€1,070", "€342", "€328", "€2,140", "scheduled", "#0066FF"],
              ["Moog × Push Session", "Apr 12", "92/100",  "€400", "€920",   "€0",   "€320", "€1,640", "calculating", "var(--wd-gold-ink)"],
              ["DJ Set @ Urban",      "Apr 5",  "118/120", "€400", "€580",   "€0",   "€0",   "€980",  "ready", "var(--wd-green-ink)"],
              ["Vinyl Night",         "Mar 22", "78/80",   "€400", "€820",   "€0",   "€0",   "€1,220","paid", "#5B6476"],
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--wd-line)" }}>
                <td style={{ padding: "14px 8px", fontSize: 13, fontWeight: 600, color: "var(--wd-ink)" }}>{r[0]}</td>
                <td style={{ padding: "14px 8px", fontSize: 13, color: "var(--wd-ink-3)" }}>{r[1]}</td>
                <td style={{ padding: "14px 8px", fontSize: 13, color: "var(--wd-ink-3)" }}>{r[2]}</td>
                <td style={{ padding: "14px 8px", fontSize: 13, color: "var(--wd-ink-2)" }}>{r[3]}</td>
                <td style={{ padding: "14px 8px", fontSize: 13, color: "var(--wd-ink-2)" }}>{r[4]}</td>
                <td style={{ padding: "14px 8px", fontSize: 13, color: "var(--wd-ink-2)" }}>{r[5]}</td>
                <td style={{ padding: "14px 8px", fontSize: 13, color: "var(--wd-ink-2)" }}>{r[6]}</td>
                <td style={{ padding: "14px 8px", fontSize: 13, fontWeight: 700, color: "var(--wd-ink)" }}>{r[7]}</td>
                <td style={{ padding: "14px 8px" }}><Pill color={r[9]} tint={`${r[9]}15`} size="sm">{r[8]}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

Object.assign(window, { Earnings });
