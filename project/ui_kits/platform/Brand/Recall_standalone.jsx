// Brand Recall Creative Studio — AR activation setup.
const RecallStudio = () => {
  const [format, setFormat] = useState("scratch");
  const [reward, setReward] = useState("voucher");
  const [discReward, setDiscReward] = useState(15);
  const [floor, setFloor] = useState(60);
  const [step, setStep] = useState("creative");
  const formats = [
    { id: "scratch", name: "Scratch Card", desc: "Tap to reveal a hidden offer" },
    { id: "spin", name: "Spin Wheel", desc: "Wheel of prizes, one spin per unlock" },
    { id: "quiz", name: "Quiz", desc: "3-question quiz, reward on completion" },
    { id: "cinematic", name: "Cinematic Reveal", desc: "Hero video → offer reveal" },
    { id: "unwrap", name: "Tap to Unwrap", desc: "Animated product reveal" },
    { id: "challenge", name: "Tap Challenge", desc: "Speed-tap mini-game" },
  ];
  return (
    <>
      <PageHeader
        title="Recall Creative Studio"
        sub="Configure the micro-experience that unlocks at AR geofences and in Recall placements."
        actions={<><Btn variant="ghost" icon="eye">Preview on device</Btn><Btn icon="check">Save & publish</Btn></>}
      />
      <Row gap={16} style={{ marginBottom: 20 }}>
        {[["creative","1. Creative"],["reward","2. Reward"],["target","3. Targeting"],["review","4. Review"]].map(([v, l], i) => (
          <button key={v} onClick={() => setStep(v)} style={{
            padding: "10px 16px", borderRadius: 10,
            background: step === v ? "rgba(0,102,255,0.08)" : "transparent",
            color: step === v ? "#0066FF" : "var(--wd-ink-3)",
            border: step === v ? "1px solid rgba(0,102,255,0.3)" : "1px solid var(--wd-line)",
            fontFamily: "Nunito", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>{l}</button>
        ))}
      </Row>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <Card>
          {step === "creative" && (
            <>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>Pick a Recall format</h3>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>Every placement needs a Recall Creative. Placements without one rank lower in the Explorer feed.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {formats.map(f => (
                  <button key={f.id} onClick={() => setFormat(f.id)} style={{
                    textAlign: "left", padding: 16,
                    background: format === f.id ? "rgba(0,102,255,0.05)" : "var(--wd-surface)",
                    border: format === f.id ? "1.5px solid #0066FF" : "1px solid var(--wd-line-2)",
                    borderRadius: 12, cursor: "pointer", fontFamily: "Nunito",
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)", marginBottom: 4 }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{f.desc}</div>
                  </button>
                ))}
              </div>
              <Divider />
              <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700 }}>AR Activation Kit</h4>
              <Stack gap={10}>
                {[
                  ["Brand logo", "amazingy-logo.svg", "check"],
                  ["Product 3D asset", "spf30-bottle.glb", "check"],
                  ["2D fallback", "spf30-card.png", "check"],
                  ["Activation copy", "\"Tap to unlock your sample\"", "check"],
                  ["Venue scan", "NIO House · completed", "check"],
                ].map(([k, v, st], i) => (
                  <Row key={i} gap={10} style={{ padding: "10px 0", borderBottom: i < 4 ? "1px solid var(--wd-line)" : "none" }}>
                    <Icon name="check" size={16} color="var(--wd-green-ink)"/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink-2)" }}>{k}</div>
                      <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 2 }}>{v}</div>
                    </div>
                  </Row>
                ))}
              </Stack>
            </>
          )}
          {step === "reward" && (
            <>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>Configure reward</h3>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>What lands in the Explorer's Caught wallet on unlock.</p>
              <Field label="Reward type">
                <Row gap={8} wrap>
                  {[["voucher","Voucher"],["sample","Sample"],["discount","Discount"],["experience","Experience pass"],["disc","DISC only"]].map(([v, l]) => (
                    <Chip key={v} selected={reward === v} onClick={() => setReward(v)}>{l}</Chip>
                  ))}
                </Row>
              </Field>
              <Field label="Reward title"><Input value="SPF30 Daily Moisturizer · 50ml sample"/></Field>
              <Field label="Monetary or experiential value"><Input value="€18 retail"/></Field>
              <Field label={`DISC points (default 15)`} hint="Points added to Explorer's DISC wallet on unlock. Explorer bonus runs in parallel to the reward itself.">
                <Row gap={12}>
                  <input type="range" min="0" max="100" value={discReward} onChange={e => setDiscReward(+e.target.value)} style={{ flex: 1, accentColor: "#FAC938" }}/>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--wd-gold-ink)", width: 60, textAlign: "right" }}>{discReward} DISC</span>
                </Row>
              </Field>
              <Field label="Post-unlock destination"><Input value="Drops → SPF30 product page"/></Field>
            </>
          )}
          {step === "target" && (
            <>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>Targeting</h3>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>Only Explorers meeting the wSI floor see this Recall. Higher floor = more premium, higher insurance cost.</p>
              <Field label={`wSI targeting floor (${floor})`} hint="0 = everyone · 100 = only exceptional-fit Explorers">
                <Row gap={12}>
                  <input type="range" min="0" max="100" value={floor} onChange={e => setFloor(+e.target.value)} style={{ flex: 1, accentColor: "#0066FF" }}/>
                  <span style={{ fontSize: 15, fontWeight: 700, color: barColor(floor), width: 40, textAlign: "right" }}>{floor}</span>
                </Row>
              </Field>
              <Field label="Geofence">
                <Row gap={8} wrap>
                  {["NIO House, Mitte","Urban Spree","Tree House, Neukölln","+ Add location"].map((l, i) => (
                    <Chip key={l} selected={i < 3}>{l}</Chip>
                  ))}
                </Row>
              </Field>
              <Field label="Interest categories">
                <Row gap={6} wrap>
                  {["Clean beauty","Skincare","Wellness","Sustainability","Design"].map((c, i) => <Chip key={c} selected={i < 4}>{c}</Chip>)}
                </Row>
              </Field>
            </>
          )}
          {step === "review" && (
            <>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>Review & publish</h3>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>weDISCOVR generates the AR experience from your assets. Preview in one click, approve, go live.</p>
              <Stack gap={14}>
                {[["Format", formats.find(f => f.id === format).name],["Reward", "€18 sample + " + discReward + " DISC"],["wSI floor", floor],["Geofences", "3 active"],["Est. unique wEIDs / mo", "4,200 – 6,800"]].map(([k, v], i) => (
                  <Row key={i} style={{ padding: "12px 0", borderBottom: i < 4 ? "1px solid var(--wd-line)" : "none", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{k}</span>
                    <span style={{ fontSize: 14, color: "var(--wd-ink)", fontWeight: 600 }}>{v}</span>
                  </Row>
                ))}
              </Stack>
            </>
          )}
        </Card>

        <div>
          <Card style={{ position: "sticky", top: 80 }}>
            <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>PREVIEW · EXPLORER APP</div>
            <div style={{ width: "100%", aspectRatio: "402 / 600", borderRadius: 24, background: "radial-gradient(#040F24 0%, #081C2C 100%)", border: "6px solid #0B1220", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: "20px 16px", borderRadius: 20, overflow: "hidden", backgroundImage: `url(${window.__resources.recall_preview})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)" }} />
                <div style={{ position: "absolute", top: 14, left: 14, padding: "4px 10px", borderRadius: 999, background: "rgba(126,217,87,0.4)", color: "#fff", fontSize: 10, fontWeight: 700, backdropFilter: "blur(8px)" }}>✨ RECALL</div>
                <div style={{ position: "absolute", left: 14, right: 14, bottom: 48, color: "#fff" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.9, marginBottom: 6 }}>AMAZINGY</div>
                  <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>Tap to unlock your sample</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>{formats.find(f => f.id === format).name} · +{discReward} DISC</div>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, height: 32, borderRadius: 16, background: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>Unlock →</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 12, textAlign: "center" }}>Live preview. Updates as you configure.</div>
          </Card>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { RecallStudio });
