// BRLO inbox — full unified view (standalone page).
const BRLOInbox = () => {
  const [filter, setFilter] = useState("all");
  const items = BRLO_INBOX.filter(i => filter === "all" || i.cap === filter);
  return (
    <>
      <PageHeader
        title="Unified Inbox"
        sub="Space requests + sponsor pitches + campaign updates. All in one queue."
        actions={<><Btn variant="ghost" icon="check">Mark all seen</Btn></>}
      />
      <Row gap={8} style={{ marginBottom: 20 }}>
        <Chip selected={filter === "all"} onClick={() => setFilter("all")}>All · {BRLO_INBOX.length}</Chip>
        <Chip selected={filter === "space"} onClick={() => setFilter("space")}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: CAPABILITY.space.color }}/>
          Space · {BRLO_INBOX.filter(i => i.cap === "space").length}
        </Chip>
        <Chip selected={filter === "brand"} onClick={() => setFilter("brand")}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: CAPABILITY.brand.color }}/>
          Brand · {BRLO_INBOX.filter(i => i.cap === "brand").length}
        </Chip>
      </Row>
      <Card padding={0}>
        <Stack gap={0}>
          {items.map((i, idx) => {
            const cur = i.from ? getCurator(i.from) : null;
            const C = CAPABILITY[i.cap];
            return (
              <div key={i.id} style={{
                padding: "16px 20px",
                borderBottom: idx < items.length - 1 ? "1px solid var(--wd-line)" : "none",
                borderLeft: `3px solid ${C.color}`,
                display: "grid", gridTemplateColumns: "auto 1fr auto auto",
                gap: 16, alignItems: "center",
              }}>
                <span style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                  background: C.tintStrong, color: C.color, borderRadius: 6,
                }}>{C.label.toUpperCase()}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)" }}>{i.ev}</div>
                  <div style={{ fontSize: 12, color: "var(--wd-ink-3)", marginTop: 2 }}>
                    {cur ? `${cur.name} · ` : ""}{i.date} · {i.when}
                  </div>
                </div>
                <WSIScoreBadge value={i.match} size={40}/>
                <Row gap={6}>
                  <Btn size="sm">Open</Btn>
                </Row>
              </div>
            );
          })}
        </Stack>
      </Card>
    </>
  );
};

Object.assign(window, { BRLOInbox });
