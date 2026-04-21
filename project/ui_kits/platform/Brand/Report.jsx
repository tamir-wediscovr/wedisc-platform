// Brand post-campaign wEID report.
const CampaignReport = () => {
  return (
    <>
      <PageHeader
        title="Amazingy · Spring Beauty Drops"
        sub="Campaign report · Apr 1 – Apr 30, 2026 · 4 sponsored events · 3 Recall placements"
        actions={<><Btn variant="ghost" icon="upload">Export PDF</Btn><Btn variant="ghost" icon="layers">Hashed wEID export</Btn></>}
      />

      <div style={{ padding: 14, borderRadius: 12, background: "rgba(0,102,255,0.04)", border: "1px solid rgba(0,102,255,0.2)", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
        <Icon name="shield" size={20} color="#0066FF"/>
        <div style={{ flex: 1, fontSize: 13, color: "var(--wd-ink-2)" }}>
          <strong style={{ color: "var(--wd-ink)" }}>No PII exported.</strong> All data expressed through anonymized wEIDs. Retargeting flows through weDISCOVR's pipes, not through your CRM.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard label="Unique wEIDs reached" value="4,847" delta="+22% vs. base" deltaKind="up" sub="Guaranteed: 4,200" icon="users" tint="rgba(0,102,255,0.08)" sparkColor="#0066FF" />
        <StatCard label="Recall impressions" value="18,920" delta="+14%" deltaKind="up" sub="Across 3 placements" icon="zap" tint="rgba(105,104,203,0.10)" sparkColor="#6968CB" />
        <StatCard label="Offer redemptions" value="1,208" delta="€14.40 CPE" deltaKind="neutral" sub="25% redemption rate" icon="gift" tint="rgba(250,201,56,0.18)" sparkColor="var(--wd-gold-ink)" />
        <StatCard label="Drops conversion" value="312" delta="€8,640 GMV" deltaKind="up" sub="Full IRL → Drop attribution" icon="target" tint="rgba(126,217,87,0.18)" sparkColor="var(--wd-green-ink)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Attention Insurance · delivery</h3>
          <Stack gap={14}>
            {[
              { l: "Unique wEIDs",    g: 4200, a: 4847 },
              { l: "Recall impressions", g: 15000, a: 18920 },
              { l: "Offer deliveries", g: 3000, a: 3620 },
            ].map((r, i) => {
              const pct = Math.min(130, (r.a / r.g) * 100);
              return (
                <div key={i}>
                  <Row style={{ justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink-2)" }}>{r.l}</span>
                    <span style={{ fontSize: 13, color: "var(--wd-ink)", fontWeight: 700 }}>
                      {r.a.toLocaleString()} <span style={{ color: "var(--wd-ink-4)", fontWeight: 400 }}>/ {r.g.toLocaleString()} guaranteed</span>
                    </span>
                  </Row>
                  <div style={{ position: "relative", height: 8, background: "var(--wd-pg-2)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(r.g / r.a) * Math.min(pct,100)}%`, background: "rgba(126,217,87,0.3)" }} />
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${Math.min(100, pct)}%`, background: "#7ED957" }} />
                  </div>
                </div>
              );
            })}
          </Stack>
          <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: "rgba(126,217,87,0.1)", fontSize: 12, color: "var(--wd-ink-2)" }}>
            ✓ All base-case minimums exceeded. DAS overperformance. Curator bonus triggered for DJ Kleo.
          </div>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Attribution trail</h3>
          <Stack gap={12}>
            {[
              { k: "IRL exposure", v: "4,847 wEIDs", c: "#0066FF" },
              { k: "Recall engagement", v: "2,416 plays", c: "#6968CB" },
              { k: "Offer saved", v: "1,802 saves", c: "#FAC938" },
              { k: "Redeemed", v: "1,208 redemptions", c: "#FF5501" },
              { k: "Drops purchase", v: "312 orders · €8,640 GMV", c: "#7ED957" },
            ].map((r, i, arr) => (
              <div key={i}>
                <Row gap={10}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: r.c }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "var(--wd-ink-4)", fontWeight: 700 }}>{r.k.toUpperCase()}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--wd-ink)", marginTop: 2 }}>{r.v}</div>
                  </div>
                </Row>
                {i < arr.length - 1 && <div style={{ width: 1, height: 14, background: "var(--wd-line-2)", marginLeft: 4, marginTop: 4 }} />}
              </div>
            ))}
          </Stack>
        </Card>
      </div>

      <Card>
        <Row style={{ justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Explorer pool insights</h3>
          <span style={{ fontSize: 11, color: "var(--wd-ink-4)" }}>Aggregated · wEID-level · zero PII</span>
        </Row>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { l: "Avg. wSI score", v: "74.2", s: "Top 30% of Berlin pool" },
            { l: "Peak hour",      v: "19:00", s: "8x the 11:00 rate" },
            { l: "Top category",   v: "Clean beauty", s: "62% overlap" },
            { l: "Neighborhood",   v: "Mitte", s: "48% of reached wEIDs" },
          ].map((r, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 12, background: "var(--wd-pg)", border: "1px solid var(--wd-line)" }}>
              <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em" }}>{r.l.toUpperCase()}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--wd-ink)", marginTop: 8 }}>{r.v}</div>
              <div style={{ fontSize: 11, color: "var(--wd-ink-3)", marginTop: 4 }}>{r.s}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

Object.assign(window, { CampaignReport });
