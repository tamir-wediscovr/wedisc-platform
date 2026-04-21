// Explorer app shell + router.
function App() {
  const [screen, setScreen] = useState(() => localStorage.getItem("wd_screen") || "home");
  const [tab, setTab] = useState("home");
  const nav = (s) => { setScreen(s); localStorage.setItem("wd_screen", s); };

  return (
    <div style={{
      position: "relative", width: 402, height: 874, overflow: "hidden",
      background: "radial-gradient(#040F24 0%, #1F4C69 0%, #081C2C 100%)",
      color: "#fff", fontFamily: "Nunito",
      borderRadius: 44, boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.04)",
    }}>
      <StatusBar />
      {screen === "home" && tab === "home" && <Home onOpenEvent={() => nav("event")} />}
      {screen === "drops" && tab === "home" && <Drops onOpenEvent={() => nav("event")} />}
      {screen === "event" && <EventDetail onBack={() => nav("home")} onClaim={() => nav("gift")} />}
      {screen === "gift" && <CaughtGift onBack={() => nav("drops")} />}
      {tab !== "home" && screen !== "event" && screen !== "gift" && (
        <div style={{ position: "absolute", inset: "48px 0 83px 0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{tab[0].toUpperCase() + tab.slice(1)}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Coming in Phase 2</div>
        </div>
      )}
      {screen !== "event" && screen !== "gift" && (
        <TabBar active={tab} onChange={(t) => {
          setTab(t);
          if (t === "home") nav("home");
          if (t === "passport") nav("drops");
        }} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
