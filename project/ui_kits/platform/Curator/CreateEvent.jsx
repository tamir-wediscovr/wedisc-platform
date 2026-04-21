// Create Event wizard — full clickthrough: format → brief → space → review → submit.
const CreateEvent = ({ onDone, onCancel }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    format: "listening",
    title: "Vinyl & Neighbors",
    desc: "Warm-up listening set with guest selector. Open doors, soft start.",
    date: "May 23 · Fri 20:00",
    cap: 120,
    neighborhood: "Neukölln",
    spaceChoice: "partner",
    space: "s3",
    ticket: "€16",
    targetAge: "25–40",
    nogo: ["alcohol_heavy"],
    noGoCategories: [],
  });

  const steps = ["Format", "Brief", "Space", "Review"];
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <>
      <PageHeader
        title="Create Event"
        sub="Build the brief. We'll route space + brand matches automatically."
        actions={<Btn variant="ghost" icon="x" onClick={onCancel}>Cancel</Btn>}
      />

      <Row gap={8} style={{ marginBottom: 28 }}>
        {steps.map((s, i) => (
          <Row key={i} gap={10} style={{ flex: 1, alignItems: "center" }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14,
              background: i <= step ? "#0066FF" : "var(--wd-pg-2)",
              color: i <= step ? "#fff" : "var(--wd-ink-3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
            }}>{i < step ? "✓" : i + 1}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: i <= step ? "var(--wd-ink)" : "var(--wd-ink-4)" }}>{s}</div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? "#0066FF" : "var(--wd-line)", borderRadius: 1 }} />}
          </Row>
        ))}
      </Row>

      <Card>
        {step === 0 && <StepFormat data={data} update={update} />}
        {step === 1 && <StepBrief  data={data} update={update} />}
        {step === 2 && <StepSpace  data={data} update={update} />}
        {step === 3 && <StepReview data={data} />}

        <Divider />
        <Row style={{ justifyContent: "space-between" }}>
          <Btn variant="ghost" onClick={() => step > 0 ? setStep(step - 1) : onCancel()}>
            {step === 0 ? "Cancel" : "← Back"}
          </Btn>
          <Row gap={8}>
            <span style={{ fontSize: 12, color: "var(--wd-ink-4)" }}>Step {step + 1} of {steps.length}</span>
            <Btn onClick={() => step < steps.length - 1 ? setStep(step + 1) : onDone()} icon={step === steps.length - 1 ? "check" : "arrowRight"}>
              {step === steps.length - 1 ? "Submit for QA" : "Continue"}
            </Btn>
          </Row>
        </Row>
      </Card>
    </>
  );
};

const StepFormat = ({ data, update }) => (
  <>
    <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "var(--wd-ink)" }}>Pick a format</h3>
    <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>Format presets duration, capacity ranges, and space requirements. You can adjust later.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
      {FORMATS.map(f => {
        const on = data.format === f.id;
        return (
          <button key={f.id} onClick={() => update("format", f.id)}
            style={{
              textAlign: "left", padding: 16,
              background: on ? "rgba(0,102,255,0.05)" : "var(--wd-surface)",
              border: on ? "1.5px solid #0066FF" : "1px solid var(--wd-line-2)",
              borderRadius: 12, cursor: "pointer", fontFamily: "Nunito",
              transition: "all 180ms",
            }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--wd-ink)", marginBottom: 6 }}>{f.name}</div>
            <div style={{ fontSize: 12, color: "var(--wd-ink-3)", marginBottom: 12, minHeight: 32 }}>{f.desc}</div>
            <Row gap={10}>
              <span style={{ fontSize: 11, color: "var(--wd-ink-4)" }}><Icon name="clock" size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }}/> {f.dur}</span>
              <span style={{ fontSize: 11, color: "var(--wd-ink-4)" }}><Icon name="users2" size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }}/> {f.cap}</span>
            </Row>
          </button>
        );
      })}
    </div>
  </>
);

const StepBrief = ({ data, update }) => (
  <>
    <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "var(--wd-ink)" }}>Event brief</h3>
    <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>Fill the required fields. Optional fields strengthen brand matching.</p>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
      <div>
        <Field label="Event name" required>
          <Input value={data.title} onChange={v => update("title", v)} />
        </Field>
        <Field label="Description" required hint="One-liner + short description. ~2-3 sentences.">
          <Textarea value={data.desc} onChange={v => update("desc", v)} rows={4} />
        </Field>
        <Row gap={16}>
          <div style={{ flex: 1 }}>
            <Field label="Date" required>
              <Input value={data.date} onChange={v => update("date", v)} />
            </Field>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="Capacity" required>
              <Input value={data.cap} onChange={v => update("cap", v)} />
            </Field>
          </div>
        </Row>
      </div>
      <div>
        <Field label="Neighborhood" required>
          <Input value={data.neighborhood} onChange={v => update("neighborhood", v)} />
        </Field>
        <Field label="Ticket price" hint="Use 'Free' or 'RSVP' for no ticket.">
          <Input value={data.ticket} onChange={v => update("ticket", v)} />
        </Field>
        <Field label="Target audience" hint="Strengthens brand matching.">
          <Input value={data.targetAge} onChange={v => update("targetAge", v)} />
        </Field>
        <Field label="No-go brand categories">
          <Row gap={6} wrap>
            {["Alcohol", "Gambling", "Fast food", "Crypto"].map(c => {
              const on = data.noGoCategories.includes(c);
              return <Chip key={c} selected={on} onClick={() => update("noGoCategories", on ? data.noGoCategories.filter(x => x !== c) : [...data.noGoCategories, c])}>{c}</Chip>;
            })}
          </Row>
        </Field>
      </div>
    </div>
  </>
);

const StepSpace = ({ data, update }) => (
  <>
    <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "var(--wd-ink)" }}>Choose a space</h3>
    <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>Apply to partner spaces (recommended) or use your own.</p>
    <Row gap={10} style={{ marginBottom: 20 }}>
      <Chip selected={data.spaceChoice === "partner"} onClick={() => update("spaceChoice", "partner")} icon="building">Apply to partner spaces</Chip>
      <Chip selected={data.spaceChoice === "own"} onClick={() => update("spaceChoice", "own")} icon="location">Use my own space</Chip>
    </Row>
    {data.spaceChoice === "partner" && (
      <>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--wd-ink-4)", letterSpacing: "0.06em", marginBottom: 12 }}>RECOMMENDED · 3 top matches for {data.neighborhood}</div>
        <Stack gap={10}>
          {SPACES.slice(0, 3).map(s => {
            const on = data.space === s.id;
            const match = 82 + (s.svi % 5);
            return (
              <div key={s.id} onClick={() => update("space", s.id)}
                style={{
                  display: "flex", gap: 16, padding: 16,
                  background: on ? "rgba(0,102,255,0.04)" : "var(--wd-surface)",
                  border: on ? "1.5px solid #0066FF" : "1px solid var(--wd-line-2)",
                  borderRadius: 12, cursor: "pointer", alignItems: "center",
                }}>
                <div style={{ width: 72, height: 72, borderRadius: 10, flexShrink: 0, overflow: "hidden", backgroundColor: "var(--wd-pg-2)", backgroundImage: s.img ? `url(${s.img})` : "none", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  {/* category stripe as identity */}
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: s.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <Row gap={8} style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--wd-ink)" }}>{s.name}</div>
                    <Pill color="#5B6476" tint="var(--wd-pg-2)" size="sm">{s.type}</Pill>
                  </Row>
                  <Row gap={12}>
                    <span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>{s.n}</span>
                    <span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>· cap {s.cap}</span>
                    <span style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>· SVI {s.svi}</span>
                  </Row>
                  <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 8 }}>
                    Equipment: {s.equipment.join(", ")}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <WSIScoreBadge value={match} size={56} />
                  <div style={{ fontSize: 10, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginTop: 6 }}>MATCH</div>
                </div>
              </div>
            );
          })}
        </Stack>
      </>
    )}
    {data.spaceChoice === "own" && (
      <Stack gap={14}>
        <Field label="Venue address" required><Input value="Weserstr. 104, 12045 Berlin" /></Field>
        <Row gap={16}>
          <div style={{ flex: 1 }}><Field label="Capacity" required><Input value="60" /></Field></div>
          <div style={{ flex: 1 }}><Field label="Type" required><Input value="Studio / gallery" /></Field></div>
        </Row>
      </Stack>
    )}
  </>
);

const StepReview = ({ data }) => {
  const space = getSpace(data.space);
  return (
    <>
      <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "var(--wd-ink)" }}>Review & submit</h3>
      <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--wd-ink-3)" }}>Once submitted the event enters QA review. On approval it goes live to Explorers and the Sponsor Feed.</p>
      <Stack gap={14}>
        <ReviewBlock label="Format" value={FORMATS.find(f => f.id === data.format).name} />
        <ReviewBlock label="Title" value={data.title} />
        <ReviewBlock label="Description" value={data.desc} />
        <Row gap={14}>
          <div style={{ flex: 1 }}><ReviewBlock label="Date" value={data.date} /></div>
          <div style={{ flex: 1 }}><ReviewBlock label="Capacity" value={data.cap} /></div>
          <div style={{ flex: 1 }}><ReviewBlock label="Ticket" value={data.ticket} /></div>
        </Row>
        <ReviewBlock label="Space" value={data.spaceChoice === "partner" ? `${space.name} · ${space.n}` : "Own space"} />
      </Stack>

      <div style={{ marginTop: 20, padding: 14, background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12 }}>
        <Row gap={10}>
          <Icon name="shield" size={18} color="#0066FF" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)", marginBottom: 2 }}>Next: QA review</div>
            <div style={{ fontSize: 12, color: "var(--wd-ink-3)" }}>
              {data.spaceChoice === "partner" ? "Space confirms, then QA reviews." : "QA reviews directly, no space step needed."} Typical turnaround: under 24h.
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

const ReviewBlock = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 11, color: "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>{label.toUpperCase()}</div>
    <div style={{ fontSize: 14, color: "var(--wd-ink)", fontWeight: 500 }}>{value}</div>
  </div>
);

Object.assign(window, { CreateEvent });
