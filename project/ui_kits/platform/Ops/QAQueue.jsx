// Ops QA Queue.
const QAQueue = ({ wsiVariant }) => {
  const [selected, setSelected] = useState(EVENTS.find(e => e.status === "qa_review"));
  const queue = EVENTS.filter(e => ["qa_review", "space_pending", "draft"].includes(e.status));
  return (
    <>
      <PageHeader
        title="QA Queue"
        sub={`${queue.length} events awaiting review · median turnaround 14h`}
        actions={<><Btn variant="ghost" icon="chart">QA metrics</Btn><Btn icon="settings">Rules</Btn></>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20, height: "calc(100vh - 260px)" }}>
        <Card padding={0} style={{ overflow: "auto" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--wd-line)", position: "sticky", top: 0, background: "var(--wd-surface)" }}>
            <Row gap={6}>
              <Chip selected>All</Chip>
              <Chip>QA review</Chip>
              <Chip>Space pending</Chip>
            </Row>
          </div>
          <Stack gap={0}>
            {queue.map(e => {
              const on = selected?.id === e.id;
              const cur = getCurator(e.curator);
              return (
                <div key={e.id} onClick={() => setSelected(e)} style={{
                  padding: "14px 16px", cursor: "pointer",
                  background: on ? "rgba(0,102,255,0.05)" : "transparent",
                  borderLeft: on ? "3px solid #0066FF" : "3px solid transparent",
                  borderBottom: "1px solid var(--wd-line)",
                }}>
                  <Row gap={10} style={{ marginBottom: 6 }}>
                    <Avatar name={cur.name} imgSrc={cur.img} color={cur.color} size={28}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.title}</div>
                      <div style={{ fontSize: 11, color: "var(--wd-ink-4)" }}>{cur.name} · {e.date}</div>
                    </div>
                  </Row>
                  <Row gap={6}>
                    <StatusPill status={e.status} size="sm"/>
                    <CatPill cat={e.cat} size="sm"/>
                  </Row>
                </div>
              );
            })}
          </Stack>
        </Card>

        {selected && (
          <Card style={{ overflow: "auto" }}>
            <Row style={{ justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <Row gap={8} style={{ marginBottom: 8 }}>
                  <StatusPill status={selected.status}/>
                  <CatPill cat={selected.cat}/>
                </Row>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--wd-ink)", letterSpacing: "-0.01em" }}>{selected.title}</h2>
                <div style={{ fontSize: 12, color: "var(--wd-ink-3)", marginTop: 4 }}>Submitted 4h ago · auto-checks passed: 6/6</div>
              </div>
              <Row gap={8}>
                <Btn variant="danger" icon="x">Reject</Btn>
                <Btn variant="success" icon="check">Approve & publish</Btn>
              </Row>
            </Row>

            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}>
              <Stack gap={16}>
                <div style={{ padding: 16, borderRadius: 12, background: "var(--wd-pg)", border: "1px solid var(--wd-line)" }}>
                  <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 }}>AUTO-CHECKS</div>
                  <Stack gap={8}>
                    {[
                      ["All required fields filled", true],
                      ["Space confirmed", true],
                      ["Curator profile 90%+ complete", true],
                      ["No duplicate submissions", true],
                      ["Description > 50 chars", true],
                      ["Date within 90-day window", true],
                    ].map(([l, ok], i) => (
                      <Row key={i} gap={8}>
                        <Icon name={ok ? "check" : "x"} size={14} color={ok ? "var(--wd-green-ink)" : "#FA2E2E"}/>
                        <span style={{ fontSize: 12, color: "var(--wd-ink-2)" }}>{l}</span>
                      </Row>
                    ))}
                  </Stack>
                </div>
                <div style={{ padding: 16, borderRadius: 12, background: "var(--wd-pg)", border: "1px solid var(--wd-line)" }}>
                  <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>DESCRIPTION</div>
                  <div style={{ fontSize: 13, color: "var(--wd-ink-2)", lineHeight: 1.6 }}>{selected.desc}</div>
                </div>
                <div style={{ padding: 16, borderRadius: 12, background: "var(--wd-pg)", border: "1px solid var(--wd-line)" }}>
                  <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>MANUAL NOTES</div>
                  <Textarea rows={3} placeholder="Optional notes for curator (visible on reject)..."/>
                </div>
              </Stack>
              <Stack gap={16}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>wSI · PREDICTED</div>
                  <WSI ev={selected} variant={wsiVariant}/>
                </div>
              </Stack>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

Object.assign(window, { QAQueue });
