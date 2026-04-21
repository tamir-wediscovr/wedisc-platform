// Demo navigator — floating launcher that exposes every flow in one sheet.
// For stakeholders who don't know the sidebar exists.

const DEMO_ACTS = [
  { num: "01", title: "A curator has an idea", sub: "DJ Kleo drafts Midsommar Listening",
    role: "curator", page: "create", roleLabel: "CURATOR", roleColor: "#6968CB" },
  { num: "02", title: "BRLO wears the Space hat", sub: "Request lands in unified inbox",
    role: "brlo", page: "dashboard", roleLabel: "BRLO · SPACE+BRAND",
    roleColor: "linear-gradient(90deg, #7ED957, #FF5501)" },
  { num: "03", title: "The two hats talk", sub: "Cross-capability handoff modal",
    role: "brlo", page: "dashboard", flag: "wd_demo_handoff", roleLabel: "CROSS-CAP",
    roleColor: "linear-gradient(90deg, #7ED957, #FF5501)" },
  { num: "04", title: "BRLO builds the activation", sub: "Recall Studio · AR setup",
    role: "brlo", page: "recall", roleLabel: "BRAND", roleColor: "#FF5501" },
  { num: "05", title: "The report lands", sub: "wEID trail · zero PII attribution",
    role: "brlo", page: "report", roleLabel: "ROI", roleColor: "#FF5501" },
  { num: "06", title: "How BRLO got here", sub: "Onboarding flashback",
    role: null, flag: "wd_demo_onboarding", roleLabel: "ONBOARDING", roleColor: "#0066FF" },
];

const ALL_FLOWS = {
  curator: [
    { page: "dashboard", label: "Curator Dashboard", sub: "DJ Kleo · pipeline + earnings" },
    { page: "create",    label: "Create Event wizard", sub: "4-step brief" },
    { page: "earnings",  label: "Earnings", sub: "Monthly reconciled" },
  ],
  brand: [
    { page: "feed",   label: "Sponsor Feed", sub: "Match-scored events" },
    { page: "recall", label: "Recall Studio", sub: "AR activation builder" },
    { page: "report", label: "Campaign Report", sub: "wEID trail" },
  ],
  space: [
    { page: "calendar", label: "Space Calendar", sub: "Urban Spree · Friedrichshain" },
  ],
  ops: [
    { page: "qa", label: "Ops QA Queue", sub: "weDISCOVR review" },
  ],
  brlo: [
    { page: "dashboard", label: "BRLO Dashboard", sub: "Space + Brand merged" },
    { page: "inbox",     label: "Unified Inbox", sub: "Requests from curators" },
    { page: "calendar",  label: "Taproom Calendar", sub: "Space capability" },
    { page: "feed",      label: "Sponsor Feed", sub: "Brand capability" },
    { page: "recall",    label: "Recall Studio", sub: "Self-sponsored activation" },
    { page: "report",    label: "Campaign Report", sub: "Hybrid ROI" },
    { page: "profile",   label: "Public Profile", sub: "Both capabilities visible" },
  ],
};

const ROLE_COLORS = {
  curator: "#6968CB",
  brand:   "#FF5501",
  space:   "#7ED957",
  ops:     "#0066FF",
  brlo:    "linear-gradient(90deg, #7ED957, #FF5501)",
};

const DemoNav = ({ tweaks, updateTweak, updatePage, currentPage, onShowOnboarding, onShowHandoff }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("story");

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const jumpTo = (role, page, flag) => {
    if (role && role !== tweaks.role) updateTweak("role", role);
    if (page) setTimeout(() => updatePage(page), 10);
    if (flag === "wd_demo_onboarding") onShowOnboarding();
    if (flag === "wd_demo_handoff") onShowHandoff();
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 90,
        background: "#0B1220", color: "#fff", border: "none",
        padding: "8px 16px 8px 10px", borderRadius: 999,
        fontFamily: "Nunito", fontSize: 12, fontWeight: 700, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 6px 20px rgba(11,18,32,0.28)", letterSpacing: "0.02em",
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#0066FF", borderRadius: 999, padding: "3px 9px",
          fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: "#fff" }}/>
          DEMO
        </span>
        <span>Jump to a flow</span>
        <span style={{ opacity: 0.5, fontSize: 14, marginLeft: 2 }}>⌘K</span>
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(11,18,32,0.55)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          padding: "80px 20px 40px",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: "100%", maxWidth: 760, maxHeight: "calc(100vh - 120px)",
            background: "#fff", borderRadius: 20, overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
            display: "flex", flexDirection: "column", fontFamily: "Nunito",
          }}>
            <div style={{ padding: "22px 26px 0", borderBottom: "1px solid #E3E6ED" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", color: "#0066FF", marginBottom: 4 }}>WEDISCOVR · DEMO NAVIGATOR</div>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1220" }}>Jump to any flow</div>
                </div>
                <button onClick={() => setOpen(false)} style={{ width: 32, height: 32, borderRadius: 16, border: "none", background: "#F3F5F9", color: "#0B1220", fontSize: 18, cursor: "pointer" }}>×</button>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {[["story", "Story arc"], ["all", "All flows"]].map(([v, l]) => (
                  <button key={v} onClick={() => setTab(v)} style={{
                    padding: "10px 16px", border: "none", background: "none",
                    borderBottom: tab === v ? "2px solid #0066FF" : "2px solid transparent",
                    color: tab === v ? "#0066FF" : "#5B6476",
                    fontFamily: "Nunito", fontSize: 13, fontWeight: 700, cursor: "pointer",
                    marginBottom: -1,
                  }}>{l}</button>
                ))}
              </div>
            </div>

            <div style={{ overflowY: "auto", padding: "22px 26px 26px" }}>
              {tab === "story" && (
                <>
                  <div style={{ fontSize: 12, color: "#5B6476", marginBottom: 18, lineHeight: 1.5 }}>
                    The 6-act investor walkthrough. Click an act to jump straight to that moment.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {DEMO_ACTS.map(a => (
                      <button key={a.num} onClick={() => jumpTo(a.role, a.page, a.flag)} style={{
                        display: "grid", gridTemplateColumns: "44px 1fr auto",
                        gap: 16, alignItems: "center",
                        padding: "14px 16px", borderRadius: 12,
                        border: "1px solid #E3E6ED", background: "#fff",
                        cursor: "pointer", textAlign: "left", fontFamily: "Nunito",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0066FF"; e.currentTarget.style.background = "#F7FAFF"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E3E6ED"; e.currentTarget.style.background = "#fff"; }}
                      >
                        <div style={{ fontSize: 28, fontWeight: 800, color: "#0066FF", letterSpacing: "-0.04em", lineHeight: 1 }}>{a.num}</div>
                        <div>
                          <div style={{ display: "inline-block", fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 999, background: a.roleColor, color: "#fff", marginBottom: 6 }}>{a.roleLabel}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1220" }}>{a.title}</div>
                          <div style={{ fontSize: 12, color: "#5B6476", marginTop: 2 }}>{a.sub}</div>
                        </div>
                        <div style={{ fontSize: 18, color: "#0066FF" }}>→</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {tab === "all" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {Object.entries(ALL_FLOWS).map(([role, flows]) => (
                    <div key={role}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 5, background: ROLE_COLORS[role] }}/>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#0B1220", textTransform: "uppercase" }}>{role === "brlo" ? "BRLO · Multi-capability" : role}</div>
                        {role === tweaks.role && <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 4, background: "#0066FF", color: "#fff" }}>ACTIVE</span>}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
                        {flows.map(f => {
                          const isCurrent = role === tweaks.role && f.page === currentPage;
                          return (
                            <button key={f.page} onClick={() => jumpTo(role, f.page)} style={{
                              padding: "10px 12px", borderRadius: 10,
                              border: isCurrent ? "1px solid #0066FF" : "1px solid #E3E6ED",
                              background: isCurrent ? "#F7FAFF" : "#fff",
                              cursor: "pointer", textAlign: "left", fontFamily: "Nunito",
                            }}
                              onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.borderColor = "#B5C2D6"; }}
                              onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.borderColor = "#E3E6ED"; }}
                            >
                              <div style={{ fontSize: 13, fontWeight: 700, color: "#0B1220" }}>{f.label}</div>
                              <div style={{ fontSize: 11, color: "#5B6476", marginTop: 2 }}>{f.sub}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: "14px 26px", borderTop: "1px solid #E3E6ED", background: "#F7F8FB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, color: "#5B6476" }}>
                Tip: role switcher lives bottom-right · Tweaks toggle in toolbar
              </div>
              <a href="../demo_arc.html" style={{ fontSize: 12, fontWeight: 700, color: "#0066FF", textDecoration: "none" }}>
                ← Back to story arc page
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

window.DemoNav = DemoNav;
