// App shell: sidebar + topbar + page.
const TweaksCtx = createContext(null);

const NAV = {
  curator: [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "events",    label: "My Events", icon: "calendar" },
    { id: "create",    label: "Create Event", icon: "plus", accent: true },
    { id: "sponsors",  label: "Sponsors",  icon: "megaphone" },
    { id: "earnings",  label: "Earnings",  icon: "wallet" },
    { id: "settings",  label: "Settings",  icon: "settings" },
  ],
  brand: [
    { id: "feed",      label: "Sponsor Feed", icon: "compass" },
    { id: "recall",    label: "Recall Studio", icon: "sparkle" },
    { id: "insurance", label: "Attention Insurance", icon: "shield" },
    { id: "report",    label: "Campaign Report", icon: "chart" },
    { id: "assets",    label: "Brand Assets", icon: "layers" },
    { id: "settings",  label: "Settings", icon: "settings" },
  ],
  space: [
    { id: "calendar",  label: "Calendar", icon: "calendar" },
    { id: "requests",  label: "Requests", icon: "bell" },
    { id: "events",    label: "Events", icon: "building" },
    { id: "revenue",   label: "Revenue", icon: "chart" },
    { id: "warehouse", label: "Flex Warehouse", icon: "layers" },
    { id: "settings",  label: "Settings", icon: "settings" },
  ],
  ops: [
    { id: "qa",        label: "QA Queue", icon: "shield" },
    { id: "events",    label: "All Events", icon: "calendar" },
    { id: "entities",  label: "Entities", icon: "users" },
    { id: "wsi",       label: "wSI Monitor", icon: "chart" },
    { id: "settings",  label: "Settings", icon: "settings" },
  ],
};

const ROLES = [
  { id: "curator", label: "Curator", color: "#6968CB", person: "DJ Kleo",   sub: "Music · Neukölln" },
  { id: "brand",   label: "Brand",   color: "#FAC938", person: "Amazingy",  sub: "Clean beauty" },
  { id: "space",   label: "Space",   color: "#2C9CE4", person: "Urban Spree", sub: "Friedrichshain" },
  { id: "ops",     label: "Ops",     color: "#0066FF", person: "weDISCOVR", sub: "Platform team" },
];

const Sidebar = ({ role, page, setPage, shell }) => {
  const items = NAV[role];
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
        {role.toUpperCase()}
      </div>

      <Stack gap={2} style={{ flex: 1 }}>
        {items.map(item => {
          const on = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", border: "none",
                background: on ? (dark ? "var(--wd-nav-active)" : "rgba(0,102,255,0.08)") : "transparent",
                color: on ? (dark ? "#fff" : "#0066FF") : (dark ? "var(--wd-nav-fg)" : "var(--wd-ink-2)"),
                borderRadius: 8, fontFamily: "Nunito", fontSize: 13, fontWeight: on ? 700 : 600,
                cursor: "pointer", textAlign: "left", width: "100%",
                transition: "background 180ms",
              }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = dark ? "var(--wd-nav-hover)" : "var(--wd-pg-2)"; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
              {item.accent && !on && <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 6, background: "rgba(0,102,255,0.2)", color: "#66A6FF" }}>NEW</span>}
            </button>
          );
        })}
      </Stack>

      <RoleCard role={role} dark={dark} />
    </aside>
  );
};

const RoleCard = ({ role, dark }) => {
  const r = ROLES.find(x => x.id === role);
  return (
    <div style={{
      margin: "12px 4px 0", padding: 12, borderRadius: 12,
      background: dark ? "rgba(255,255,255,0.04)" : "var(--wd-pg)",
      border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--wd-line)",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <Avatar name={r.person} color={r.color} size={32} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: dark ? "#fff" : "var(--wd-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.person}</div>
        <div style={{ fontSize: 10, color: dark ? "rgba(255,255,255,0.5)" : "var(--wd-ink-4)", marginTop: 2 }}>{r.sub}</div>
      </div>
    </div>
  );
};

const Topbar = ({ title, sub }) => (
  <div style={{
    height: 60, padding: "0 32px", display: "flex", alignItems: "center",
    justifyContent: "space-between", borderBottom: "1px solid var(--wd-line)",
    background: "var(--wd-surface)", position: "sticky", top: 0, zIndex: 5,
  }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--wd-ink)" }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--wd-ink-4)", marginTop: 2 }}>{sub}</div>}
    </div>
    <Row gap={8}>
      <button style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--wd-line)", background: "var(--wd-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--wd-ink-2)" }}><Icon name="search" size={16}/></button>
      <button style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--wd-line)", background: "var(--wd-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", color: "var(--wd-ink-2)" }}>
        <Icon name="bell" size={16}/>
        <span style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: 4, background: "#FA2E2E", border: "1.5px solid var(--wd-surface)" }}/>
      </button>
    </Row>
  </div>
);

const Shell = ({ role, page, setPage, children, title, sub, shell }) => (
  <div style={{ display: "flex", minHeight: "100vh", background: "var(--wd-pg)" }}>
    <Sidebar role={role} page={page} setPage={setPage} shell={shell} />
    <main style={{ flex: 1, minWidth: 0 }}>
      <Topbar title={title} sub={sub} />
      <div style={{ padding: "32px 40px 60px", maxWidth: 1400, margin: "0 auto" }}>
        {children}
      </div>
    </main>
  </div>
);

Object.assign(window, { Shell, ROLES, NAV, TweaksCtx });
