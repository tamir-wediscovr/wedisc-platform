// BRLO — a multi-capability entity: Space (Brwhouse) + Brand (brewery sponsor).
// This extends the single-role data with entity-level context.

const BRLO_ENTITY = {
  id: "brlo",
  name: "BRLO",
  handle: "@brlo",
  tagline: "Kreuzberg brewery + taproom",
  city: "Kreuzberg, Berlin",
  color: "#FF5501",               // brand orange
  capabilities: ["space", "brand"], // enabled hats
  // Space capability
  space: {
    venue: "BRLO Brwhouse",
    n: "Kreuzberg",
    cap: 280,
    type: "Brewery + Taproom",
    svi: 78,
    revenueBaseline: "€2.4k avg night",
    utilization: 62,
    openSlots: 9,
    booked: 8,
    incomingRequests: 4,
    color: "#7ED957", // space capability color = green
  },
  // Brand capability
  brand: {
    industry: "Craft brewery",
    budget: "€45,000",
    bsi: 77,
    activeSponsorships: 3,
    pendingApplications: 2,
    weidsThisMonth: 2840,
    guaranteedRemaining: 6800,
    color: "#FF5501", // brand capability color = orange
  },
};

// Capability color system — used across the multi-cap UI
const CAPABILITY = {
  space:   { color: "#7ED957", tint: "rgba(126,217,87,0.12)", tintStrong: "rgba(126,217,87,0.22)", label: "Space",   icon: "building" },
  brand:   { color: "#FF5501", tint: "rgba(255,85,1,0.10)",   tintStrong: "rgba(255,85,1,0.20)",   label: "Brand",   icon: "megaphone" },
  curator: { color: "#6968CB", tint: "rgba(105,104,203,0.12)", tintStrong: "rgba(105,104,203,0.22)", label: "Curator", icon: "sparkle" },
  talent:  { color: "#FAC938", tint: "rgba(250,201,56,0.14)", tintStrong: "rgba(250,201,56,0.25)", label: "Talent",  icon: "mic" },
};

// BRLO's unified inbox (space requests + brand applications, mixed)
const BRLO_INBOX = [
  { id: "i1", cap: "space", kind: "request",      from: "c1", ev: "Midsommar Listening",        date: "May 14 · 20:00", match: 89, when: "2h ago", status: "new" },
  { id: "i2", cap: "brand", kind: "pitch",        from: "c3", ev: "Kreuzberg Supper Pass",      date: "May 03 · 19:00", match: 82, when: "4h ago", status: "new" },
  { id: "i3", cap: "space", kind: "request",      from: "c5", ev: "Afro-Futures Film Night",    date: "May 18 · 19:30", match: 76, when: "1d ago", status: "new" },
  { id: "i4", cap: "brand", kind: "confirmation", from: "c6", ev: "Design Systems in the Wild", date: "May 14 · 19:00", match: 84, when: "2d ago", status: "confirmed" },
  { id: "i5", cap: "space", kind: "request",      from: "c3", ev: "Neukölln Night Market",      date: "May 17 · 18:00", match: 84, when: "3d ago", status: "new" },
  { id: "i6", cap: "brand", kind: "report",       from: null, ev: "Midsommar Listening · live", date: "Apr 27",         match: 87, when: "last wk", status: "done" },
];

// BRLO's "cross-capability" moments — where the two hats inform each other
const BRLO_CROSSOVERS = [
  {
    id: "x1",
    headline: "You're hosting and sponsoring the same Friday",
    detail: "May 14, Design Systems in the Wild is at NIO House (not yours), but BRLO is pouring. Your taproom has an open slot that night. Consider co-hosting?",
    cap: ["space", "brand"],
  },
  {
    id: "x2",
    headline: "3 curator requests to your taproom mention beer pairings",
    detail: "DJ Kleo, Chef Rico, and Devonte Ali all flagged BRLO-first pairings. Converting these into sponsor-matched events could 2x margin.",
    cap: ["space", "brand"],
  },
];

Object.assign(window, { BRLO_ENTITY, CAPABILITY, BRLO_INBOX, BRLO_CROSSOVERS });
