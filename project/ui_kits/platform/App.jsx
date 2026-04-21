// Root app — role switcher + page router + tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "role": "brlo",
  "shellVariant": "hybrid",
  "density": "airy",
  "wsiVariant": "bars"
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweaks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wd_platform_tweaks")) || TWEAK_DEFAULTS; }
    catch { return TWEAK_DEFAULTS; }
  });
  const [showTweaks, setShowTweaks] = useState(false);
  const [page, setPage] = useState(() => localStorage.getItem("wd_platform_page") || "dashboard");
  const [cap, setCap] = useState("space");
  const [eventOpen, setEventOpen] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(() => localStorage.getItem("wd_demo_onboarding") === "1");
  const [showHandoff, setShowHandoff] = useState(() => localStorage.getItem("wd_demo_handoff") === "1");
  const [showExpand, setShowExpand] = useState(false);

  const updateTweak = (k, v) => {
    const n = { ...tweaks, [k]: v };
    setTweaks(n);
    localStorage.setItem("wd_platform_tweaks", JSON.stringify(n));
    window.parent.postMessage({type: "__edit_mode_set_keys", edits: { [k]: v }}, "*");
  };
  const updatePage = (p) => { setPage(p); localStorage.setItem("wd_platform_page", p); setEventOpen(null); };

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setShowTweaks(true);
      if (e.data?.type === "__deactivate_edit_mode") setShowTweaks(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({type: "__edit_mode_available"}, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const isBRLO = tweaks.role === "brlo";
  const currentNav = isBRLO ? BRLO_NAV : NAV[tweaks.role];
  const validPages = currentNav ? currentNav.map(i => i.id) : ["dashboard"];
  const safePage = validPages.includes(page) ? page : validPages[0];

  useEffect(() => {
    if (safePage !== page) updatePage(safePage);
  }, [tweaks.role]);

  const titleMap = {
    curator: { dashboard: ["Dashboard", "Curator · Berlin · Neukölln"], create: ["Create Event", "Build brief + route to space and brand"], events: ["My Events", "Upcoming, past and drafts"], earnings: ["Earnings", "Reconciled monthly"], sponsors: ["Sponsors", "Brand matches in your feed"], settings: ["Settings", "Profile, payouts, preferences"] },
    brand:   { feed: ["Sponsor Feed", "Live events matching your brand profile"], recall: ["Recall Studio", "AR activation + micro-experience"], insurance: ["Attention Insurance", "Guaranteed wEID pool"], report: ["Campaign Report", "Spring Beauty Drops · Apr 2026"], assets: ["Brand Assets", "Logos, packshots, 3D"], settings: ["Settings", "Brand profile"] },
    space:   { calendar: ["Calendar", "Urban Spree · Friedrichshain"], requests: ["Requests", "Pending from curators"], events: ["Events", "Hosted history"], revenue: ["Revenue", "POS attribution"], warehouse: ["Flex Warehouse", "Brand storage income"], settings: ["Settings", "Space profile"] },
    ops:     { qa: ["QA Queue", "Events awaiting review"], events: ["All Events", "Platform-wide"], entities: ["Entities", "Curators, spaces, brands"], wsi: ["wSI Monitor", "Signal-index health"], settings: ["Settings", "Platform"] },
  };
  const [title, sub] = !isBRLO ? (titleMap[tweaks.role]?.[safePage] || ["", ""]) : ["", ""];

  const renderBRLO = () => (
    <BRLOShell page={safePage} setPage={updatePage} cap={cap} setCap={setCap} tweaks={tweaks}>
      {safePage === "dashboard" && <BRLODashboard setPage={updatePage} setCap={setCap} />}
      {safePage === "inbox" && <BRLOInbox />}
      {safePage === "calendar" && <SpaceCalendar />}
      {safePage === "feed" && !eventOpen && <SponsorFeed onOpenEvent={setEventOpen} wsiVariant={tweaks.wsiVariant}/>}
      {safePage === "feed" && eventOpen   && <EventDetail ev={eventOpen} onBack={() => setEventOpen(null)} wsiVariant={tweaks.wsiVariant}/>}
      {safePage === "recall" && <RecallStudio />}
      {safePage === "report" && <CampaignReport />}
      {safePage === "profile" && <BRLOProfile />}
      {safePage === "settings" && <Placeholder label="Settings" />}
    </BRLOShell>
  );

  return (
    <>
      {isBRLO ? renderBRLO() : (
        <Shell role={tweaks.role} page={safePage} setPage={updatePage} shell={tweaks.shellVariant} title={title} sub={sub}>
          {tweaks.role === "curator" && safePage === "dashboard" && <CuratorDashboard setPage={updatePage} wsiVariant={tweaks.wsiVariant}/>}
          {tweaks.role === "curator" && safePage === "create"    && <CreateEvent onCancel={() => updatePage("dashboard")} onDone={() => updatePage("events")}/>}
          {tweaks.role === "curator" && safePage === "earnings"  && <Earnings/>}
          {tweaks.role === "curator" && (safePage === "events" || safePage === "sponsors" || safePage === "settings") && <Placeholder label={titleMap.curator[safePage][0]} />}

          {tweaks.role === "brand" && safePage === "feed" && !eventOpen && <SponsorFeed onOpenEvent={setEventOpen} wsiVariant={tweaks.wsiVariant}/>}
          {tweaks.role === "brand" && safePage === "feed" && eventOpen   && <EventDetail ev={eventOpen} onBack={() => setEventOpen(null)} wsiVariant={tweaks.wsiVariant}/>}
          {tweaks.role === "brand" && safePage === "recall" && <RecallStudio/>}
          {tweaks.role === "brand" && safePage === "report" && <CampaignReport/>}
          {tweaks.role === "brand" && (safePage === "insurance" || safePage === "assets" || safePage === "settings") && <Placeholder label={titleMap.brand[safePage][0]}/>}

          {tweaks.role === "space" && safePage === "calendar" && <SpaceCalendar/>}
          {tweaks.role === "space" && safePage !== "calendar" && <Placeholder label={titleMap.space[safePage][0]}/>}

          {tweaks.role === "ops" && safePage === "qa" && <QAQueue wsiVariant={tweaks.wsiVariant}/>}
          {tweaks.role === "ops" && safePage !== "qa" && <Placeholder label={titleMap.ops[safePage][0]}/>}
        </Shell>
      )}

      {/* Role switcher — includes BRLO as a multi-cap persona */}
      <div style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 100,
        background: "#0B1220", borderRadius: 14, padding: 6,
        boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
        display: "flex", gap: 2,
      }}>
        {[...ROLES, { id: "brlo", label: "BRLO", color: "#FF5501", isMulti: true }].map(r => (
          <button key={r.id} onClick={() => updateTweak("role", r.id)}
            style={{
              padding: "8px 14px", border: "none",
              background: tweaks.role === r.id ? "rgba(255,255,255,0.15)" : "transparent",
              color: tweaks.role === r.id ? "#fff" : "rgba(255,255,255,0.5)",
              borderRadius: 10, fontFamily: "Nunito", fontSize: 12, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, position: "relative",
            }}>
            {r.isMulti ? (
              <span style={{ display: "flex", width: 8, height: 8, borderRadius: 4, overflow: "hidden" }}>
                <span style={{ flex: 1, background: "#7ED957" }} />
                <span style={{ flex: 1, background: "#FF5501" }} />
              </span>
            ) : (
              <span style={{ width: 8, height: 8, borderRadius: 4, background: r.color }}/>
            )}
            {r.label}
            {r.isMulti && <span style={{ fontSize: 8, fontWeight: 800, padding: "1px 4px", borderRadius: 4, background: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>MULTI</span>}
          </button>
        ))}
      </div>

      <DemoNav
        tweaks={tweaks}
        updateTweak={updateTweak}
        updatePage={updatePage}
        currentPage={safePage}
        onShowOnboarding={() => setShowOnboarding(true)}
        onShowHandoff={() => setShowHandoff(true)}
      />

      {showTweaks && <TweaksPanel tweaks={tweaks} update={updateTweak} onShowOnboarding={() => setShowOnboarding(true)} onShowExpand={() => setShowExpand(true)} onShowHandoff={() => setShowHandoff(true)} />}

      {showOnboarding && <Onboarding onExit={() => { setShowOnboarding(false); localStorage.removeItem("wd_demo_onboarding"); }} />}
      {showHandoff && isBRLO && <HandoffModal req={BRLO_INBOX[0]} onClose={() => { setShowHandoff(false); localStorage.removeItem("wd_demo_handoff"); }} onGoSponsor={() => { setShowHandoff(false); localStorage.removeItem("wd_demo_handoff"); updatePage("recall"); }} />}
      {showExpand && <CapabilityExpand onClose={() => setShowExpand(false)} />}
    </>
  );
};

const TweaksPanel = ({ tweaks, update, onShowOnboarding, onShowExpand, onShowHandoff }) => (
  <div style={{
    position: "fixed", bottom: 84, right: 24, zIndex: 100, width: 280,
    background: "#0B1220", borderRadius: 14, padding: 16,
    boxShadow: "0 12px 32px rgba(0,0,0,0.35)", color: "#fff",
  }}>
    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>TWEAKS</div>
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Demo flows</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <button onClick={onShowOnboarding} style={{ padding: "8px 12px", border: "none", borderRadius: 8, background: "rgba(255,255,255,0.08)", color: "#fff", fontFamily: "Nunito", fontSize: 11, fontWeight: 700, cursor: "pointer", textAlign: "left" }}>▶ Onboarding wizard</button>
        <button onClick={onShowHandoff} style={{ padding: "8px 12px", border: "none", borderRadius: 8, background: "rgba(255,255,255,0.08)", color: "#fff", fontFamily: "Nunito", fontSize: 11, fontWeight: 700, cursor: "pointer", textAlign: "left" }}>▶ Cross-cap handoff</button>
        <button onClick={onShowExpand} style={{ padding: "8px 12px", border: "none", borderRadius: 8, background: "rgba(255,255,255,0.08)", color: "#fff", fontFamily: "Nunito", fontSize: 11, fontWeight: 700, cursor: "pointer", textAlign: "left" }}>▶ Add capability</button>
      </div>
    </div>
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Shell variant</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[["light","Light"],["hybrid","Hybrid"]].map(([v, l]) => (
          <button key={v} onClick={() => update("shellVariant", v)} style={{
            flex: 1, padding: "8px 0", border: "none", borderRadius: 8,
            background: tweaks.shellVariant === v ? "#0066FF" : "rgba(255,255,255,0.08)",
            color: "#fff", fontFamily: "Nunito", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>{l}</button>
        ))}
      </div>
    </div>
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>wSI visualization</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[["bars","Bars"],["radar","Radar"],["reasons","Reasons"]].map(([v, l]) => (
          <button key={v} onClick={() => update("wsiVariant", v)} style={{
            flex: 1, padding: "8px 0", border: "none", borderRadius: 8,
            background: tweaks.wsiVariant === v ? "#0066FF" : "rgba(255,255,255,0.08)",
            color: "#fff", fontFamily: "Nunito", fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>{l}</button>
        ))}
      </div>
    </div>
  </div>
);

const Placeholder = ({ label }) => (
  <>
    <PageHeader title={label} sub="Screen stubbed."/>
    <Card padding={48} style={{ textAlign: "center" }}>
      <Icon name="layers" size={32} color="var(--wd-ink-4)" style={{ margin: "0 auto 14px" }}/>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--wd-ink)" }}>{label}</div>
    </Card>
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
