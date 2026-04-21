// Line icon set — 1.75 stroke, 24×24 viewBox. Minimal, neutral.
// Drawn in a consistent Feather-ish style: round caps/joins, open paths,
// lowercase naming. Keep strokeWidth 1.75 as default; size via `size` prop.
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.75, style = {} }) => {
  const paths = {
    // Nav + structure
    home:       <><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></>,
    calendar:   <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    plus:       <><path d="M12 5v14M5 12h14"/></>,
    minus:      <><path d="M5 12h14"/></>,
    zap:        <><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></>,
    compass:    <><circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6z"/></>,
    wallet:     <><path d="M3 7a2 2 0 0 1 2-2h12l2 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M17 13h.01"/></>,
    sparkle:    <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></>,
    chart:      <><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></>,
    barchart:   <><path d="M3 3v18h18"/><rect x="7" y="13" width="3" height="5"/><rect x="12" y="9" width="3" height="9"/><rect x="17" y="5" width="3" height="13"/></>,
    tag:        <><path d="M20 12 12 20l-8-8V4h8z"/><circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none"/></>,
    bell:       <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    search:     <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    filter:     <><path d="M3 5h18l-7 8v6l-4-2v-4z"/></>,
    settings:   <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
    grid:       <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    list:       <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="3.5" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="3.5" cy="18" r="1.2" fill="currentColor" stroke="none"/></>,

    // People + entities
    users:      <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8"/><path d="M22 21a7 7 0 0 0-5-6.7"/></>,
    users2:     <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    user:       <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    megaphone:  <><path d="M3 11v2a2 2 0 0 0 2 2h1v4h3v-4h1l9 4V7l-9 4H5a2 2 0 0 0-2 2z"/></>,
    building:   <><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"/></>,
    briefcase:  <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></>,

    // Actions + states
    check:      <><path d="m5 12 5 5L20 7"/></>,
    checkCircle:<><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
    x:          <><path d="M6 6l12 12M18 6 6 18"/></>,
    xCircle:    <><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></>,
    info:       <><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8.5v0"/></>,
    warn:       <><path d="M12 3 2 20h20z"/><path d="M12 10v5M12 18v0"/></>,
    help:       <><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5A2.5 2.5 0 1 1 12 14v1.5M12 19v0"/></>,

    // Arrows + chevrons
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowLeft:  <><path d="M19 12H5M11 5l-7 7 7 7"/></>,
    arrowUp:    <><path d="M12 19V5M5 11l7-7 7 7"/></>,
    arrowDown:  <><path d="M12 5v14M5 13l7 7 7-7"/></>,
    chevronRight:<><path d="m9 6 6 6-6 6"/></>,
    chevronLeft:<><path d="m15 6-6 6 6 6"/></>,
    chevronDown:<><path d="m6 9 6 6 6-6"/></>,
    chevronUp:  <><path d="m6 15 6-6 6 6"/></>,
    trend:      <><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
    trendDown:  <><path d="m3 7 6 6 4-4 8 8"/><path d="M14 17h7v-7"/></>,
    externalLink:<><path d="M14 3h7v7M21 3 10 14M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></>,

    // Communication + commerce
    dot:        <><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></>,
    location:   <><path d="M12 22s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock:      <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    eye:        <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff:     <><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M6.5 6.5C4.1 8 2 12 2 12s4 7 10 7a9.8 9.8 0 0 0 5.5-1.5M9.9 5.1A9.9 9.9 0 0 1 12 5c6 0 10 7 10 7a17.8 17.8 0 0 1-3.1 4"/></>,
    euro:       <><path d="M17 5a8 8 0 1 0 0 14M3 9h12M3 15h12"/></>,
    upload:     <><path d="M12 3v13M6 9l6-6 6 6M4 21h16"/></>,
    download:   <><path d="M12 3v13M6 13l6 6 6-6M4 21h16"/></>,
    scan:       <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></>,
    target:     <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
    gift:       <><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9M12 8a3 3 0 0 1-3-3 2 2 0 1 1 3 3zM12 8a3 3 0 0 0 3-3 2 2 0 1 0-3 3z"/></>,
    layers:     <><path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5"/></>,
    shield:     <><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></>,

    // Media + creative
    mic:        <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/></>,
    headphones: <><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="14" width="5" height="7" rx="1.5"/><rect x="16" y="14" width="5" height="7" rx="1.5"/></>,
    music:      <><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
    camera:     <><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/></>,
    image:      <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m3 17 5-5 7 7M14 14l3-3 4 4"/></>,
    video:      <><rect x="3" y="6" width="14" height="12" rx="2"/><path d="m17 10 4-2v8l-4-2z"/></>,
    play:       <><path d="M6 4v16l14-8z" fill="currentColor" stroke="none"/></>,
    pause:      <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    paint:      <><path d="M19 11V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8v4a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3v-2a2 2 0 0 0 0-4"/><circle cx="7" cy="9" r="0.01"/></>,

    // Misc used throughout
    send:       <><path d="M21 3 3 10l7 3 3 7z"/><path d="M21 3 10 13"/></>,
    link:       <><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></>,
    heart:      <><path d="M12 20s-7-4.5-7-11a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 6.5-7 11-7 11z"/></>,
    star:       <><path d="m12 3 2.7 5.7 6.3.9-4.6 4.5 1.1 6.4-5.5-2.9-5.5 2.9 1.1-6.4L3 9.6l6.3-.9z"/></>,
    flag:       <><path d="M4 21V4a1 1 0 0 1 1-1h13l-2 4 2 4H5"/></>,
    bookmark:   <><path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4z"/></>,
    refresh:    <><path d="M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16"/><path d="M3 21v-5h5"/></>,
    copy:       <><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
    edit:       <><path d="M17 3a2.8 2.8 0 0 1 4 4L8 20H4v-4z"/></>,
    trash:      <><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14M10 11v6M14 11v6"/></>,
    lock:       <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    unlock:     <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></>,
    globe:      <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    sun:        <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></>,
    moon:       <><path d="M20 15a8 8 0 0 1-11-11 9 9 0 1 0 11 11z"/></>,
    menu:       <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    more:       <><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,

    // weDISCOVR domain
    signal:     <><path d="M3 21h4M9 21h4M15 21h6"/><path d="M3 18v-2M9 18V12M15 18V6M21 18V3"/></>,
    pulse:      <><path d="M3 12h4l3-9 4 18 3-9h4"/></>,
    vibe:       <><circle cx="12" cy="12" r="3"/><path d="M7 12a5 5 0 0 1 10 0M4 12a8 8 0 0 1 16 0"/></>,
  };
  if (!paths[name]) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}>
      {paths[name]}
    </svg>
  );
};

Object.assign(window, { Icon });
