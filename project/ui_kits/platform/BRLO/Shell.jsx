// BRLO multi-capability shell. Replaces Sidebar for this persona.
// Design: left nav is capability-neutral (profile, inbox, settings),
// but CAPABILITY TABS sit at the top of the content area with color accents.

const BRLOShell = ({ page, setPage, cap, setCap, children, tweaks }) => {
  const e = BRLO_ENTITY;
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--wd-pg)" }}>
      <BRLOSidebar page={page} setPage={setPage} entity={e} shell={tweaks.shellVariant} />
      <main style={{ flex: 1, minWidth: 0 }}>
        <BRLOTopbar entity={e} cap={cap} setCap={setCap} page={page} />
        <div style={{ padding: "28px 40px 60px", maxWidth: 1400, margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
};

const BRLO_NAV = [
  { id: "dashboard", label: "Home",    icon: "home",     cap: null },        // merged
  { id: "inbox",     label: "Inbox",   icon: "bell",     cap: null },        // merged
  { id: "calendar",  label: "Calendar", icon: "calendar", cap: "space" },
  { id: "feed",      label: "Sponsor Feed", icon: "compass",  cap: "brand" },
  { id: "recall",    label: "Recall Studio", icon: "sparkle", cap: "brand" },
  { id: "report",    label: "Campaign Report", icon: "chart", cap: "brand" },
  { id: "profile",   label: "Public profile", icon: "users2", cap: null },
  { id: "settings",  label: "Settings", icon: "settings", cap: null },
];

const BRLOSidebar = ({ page, setPage, entity, shell }) => {
  const dark = shell !== "light";
  return (
    <aside style={{
      width: 248, flexShrink: 0, height: "100vh", position: "sticky", top: 0,
      background: dark ? "var(--wd-nav-bg)" : "var(--wd-surface)",
      borderRight: dark ? "none" : "1px solid var(--wd-line)",
      display: "flex", flexDirection: "column", padding: "20px 14px",
      color: dark ? "var(--wd-nav-fg)" : "var(--wd-ink-2)",
    }}>
      <Row gap={10} style={{ padding: "4px 8px 20px" }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: "#0066FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: "-0.03em" }}>wD</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: dark ? "#fff" : "var(--wd-ink)", letterSpacing: "-0.01em" }}>The Platform</div>
          <div style={{ fontSize: 10, color: dark ? "rgba(255,255,255,0.5)" : "var(--wd-ink-4)", fontWeight: 600, letterSpacing: "0.06em", marginTop: 2 }}>weDISCOVR · BERLIN</div>
        </div>
      </Row>

      <div style={{ fontSize: 10, color: dark ? "rgba(255,255,255,0.4)" : "var(--wd-ink-4)", fontWeight: 700, letterSpacing: "0.1em", padding: "12px 10px 8px" }}>
        MULTI-CAPABILITY
      </div>

      <Stack gap={2} style={{ flex: 1 }}>
        {BRLO_NAV.map(item => {
          const on = page === item.id;
          const capColor = item.cap ? CAPABILITY[item.cap].color : null;
          return (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", border: "none",
                background: on ? (dark ? "var(--wd-nav-active)" : "rgba(0,102,255,0.08)") : "transparent",
                color: on ? (dark ? "#fff" : "#0066FF") : (dark ? "var(--wd-nav-fg)" : "var(--wd-ink-2)"),
                borderRadius: 8, fontFamily: "Nunito", fontSize: 13, fontWeight: on ? 700 : 600,
                cursor: "pointer", textAlign: "left", width: "100%",
              }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = dark ? "var(--wd-nav-hover)" : "var(--wd-pg-2)"; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
              <Icon name={item.icon} size={17} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {capColor && <span style={{ width: 6, height: 6, borderRadius: 3, background: capColor, opacity: on ? 1 : 0.7 }} />}
            </button>
          );
        })}
      </Stack>

      {/* Entity card — color split bar shows both caps */}
      <div style={{
        margin: "12px 4px 0", padding: 12, borderRadius: 12,
        background: dark ? "rgba(255,255,255,0.04)" : "var(--wd-pg)",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--wd-line)",
        overflow: "hidden", position: "relative",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, display: "flex" }}>
          <div style={{ flex: 1, background: CAPABILITY.space.color }} />
          <div style={{ flex: 1, background: CAPABILITY.brand.color }} />
        </div>
        <Row gap={10}>
          <Avatar name={entity.name} color={entity.color} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: dark ? "#fff" : "var(--wd-ink)" }}>{entity.name}</div>
            <div style={{ fontSize: 10, color: dark ? "rgba(255,255,255,0.5)" : "var(--wd-ink-4)", marginTop: 2 }}>{entity.tagline}</div>
          </div>
        </Row>
        <Row gap={4} style={{ marginTop: 10 }}>
          {entity.capabilities.map(c => {
            const C = CAPABILITY[c];
            return (
              <span key={c} style={{
                padding: "2px 8px", fontSize: 9, fontWeight: 700,
                background: C.tintStrong, color: C.color,
                borderRadius: 999, letterSpacing: "0.04em",
              }}>{C.label.toUpperCase()}</span>
            );
          })}
        </Row>
      </div>
    </aside>
  );
};

const BRLOTopbar = ({ entity, cap, setCap, page }) => {
  // Only show capability tabs when a cap-specific page is relevant
  const capPages = BRLO_NAV.filter(n => n.cap).map(n => n.cap);
  const showTabs = !["dashboard", "inbox"].includes(page); // hide on merged views
  const current = BRLO_NAV.find(n => n.id === page);
  const activeCap = current?.cap;

  return (
    <div style={{
      borderBottom: "1px solid var(--wd-line)",
      background: "var(--wd-surface)", position: "sticky", top: 0, zIndex: 5,
    }}>
      <div style={{ height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Row gap={14}>
          {activeCap && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 999,
              background: CAPABILITY[activeCap].tintStrong,
              color: CAPABILITY[activeCap].color,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
            }}>
              <Icon name={CAPABILITY[activeCap].icon} size={12} />
              {CAPABILITY[activeCap].label.toUpperCase()} TOOLS
            </div>
          )}
          {!activeCap && (
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)" }}>
              {current?.label}
            </div>
          )}
        </Row>
        <Row gap={8}>
          <button style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--wd-line)", background: "var(--wd-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--wd-ink-2)" }}><Icon name="search" size={16}/></button>
          <button style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--wd-line)", background: "var(--wd-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", color: "var(--wd-ink-2)" }}>
            <Icon name="bell" size={16}/>
            <span style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: 4, background: "#FA2E2E", border: "1.5px solid var(--wd-surface)" }}/>
          </button>
        </Row>
      </div>
    </div>
  );
};

Object.assign(window, { BRLOShell, BRLO_NAV });
