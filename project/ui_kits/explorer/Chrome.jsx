// Status bar + tab bar.
function StatusBar({ time = "9:41" }) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 48,
      background: "#050A14", zIndex: 10, display: "flex",
      alignItems: "center", justifyContent: "space-between",
      padding: "0 24px 0 28px",
    }}>
      <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{time}</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#fff"><rect x="0" y="9" width="3" height="3" rx="0.5"/><rect x="4.5" y="6" width="3" height="6" rx="0.5"/><rect x="9" y="3" width="3" height="9" rx="0.5"/><rect x="13.5" y="0" width="3" height="12" rx="0.5"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="#fff"><path d="M8 11.5 L5.5 9 A3.5 3.5 0 0 1 10.5 9 Z M8 7 L3 2 A7 7 0 0 1 13 2 Z" /></svg>
        <div style={{ width: 24, height: 11, borderRadius: 3, border: "1px solid rgba(255,255,255,0.6)", position: "relative", padding: 1 }}>
          <div style={{ width: "80%", height: "100%", background: "#fff", borderRadius: 1 }} />
          <div style={{ position: "absolute", right: -3, top: 3, width: 2, height: 5, background: "rgba(255,255,255,0.6)", borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home",      label: "Home",     icon: HomeIcon },
    { id: "discover",  label: "Discover", icon: CompassIcon },
    { id: "hunt",      label: "Hunt",     icon: ScanIcon },
    { id: "passport",  label: "Passport", icon: PassportIcon },
    { id: "you",       label: "You",      icon: UserIcon },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 83,
      background: "rgba(5,10,20,0.88)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
      display: "flex", padding: "12px 0", zIndex: 10,
    }}>
      {tabs.map(t => {
        const Icon = t.icon;
        const on = active === t.id;
        return (
          <div key={t.id} onClick={() => onChange(t.id)} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 5, cursor: "pointer", paddingTop: 5,
          }}>
            <Icon active={on} />
            <span style={{
              fontSize: 9, fontWeight: 700,
              color: on ? "#0066FF" : "rgba(255,255,255,0.4)",
            }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Tab icons drawn as SVG (stroke 1.8, round joins) — substituting Figma custom vectors.
const iconProps = (on) => ({
  width: 24, height: 24, viewBox: "0 0 24 24", fill: "none",
  stroke: on ? "#0066FF" : "rgba(255,255,255,0.4)",
  strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
});
function HomeIcon({ active }) { return <svg {...iconProps(active)}><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" fill={active ? "#0066FF" : "none"} /></svg>; }
function CompassIcon({ active }) { return <svg {...iconProps(active)}><circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6z" fill={active ? "#0066FF" : "none"}/></svg>; }
function ScanIcon({ active }) { return <svg {...iconProps(active)}><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>; }
function PassportIcon({ active }) { return <svg {...iconProps(active)}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3" fill={active ? "#0066FF" : "none"}/><path d="M8 16h8"/></svg>; }
function UserIcon({ active }) { return <svg {...iconProps(active)}><circle cx="12" cy="8" r="4" fill={active ? "#0066FF" : "none"}/><path d="M4 21a8 8 0 0 1 16 0"/></svg>; }

Object.assign(window, { StatusBar, TabBar });
