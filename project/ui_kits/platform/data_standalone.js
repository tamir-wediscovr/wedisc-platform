// Shared sample data for the Platform UI kit.
// All money in EUR. Avatars use solid category-color blocks by design.

const CATEGORIES = {
  music:   { name: "Music",   color: "#6968CB", tintLt: "rgba(105,104,203,0.10)" },
  food:    { name: "Food",    color: "#FF5501", tintLt: "rgba(255, 85,  1,0.10)" },
  beauty:  { name: "Beauty",  color: "#FAC938", tintLt: "rgba(250,201, 56,0.18)" },
  fitness: { name: "Fitness", color: "#7ED957", tintLt: "rgba(126,217, 87,0.18)" },
  culture: { name: "Culture", color: "#2C9CE4", tintLt: "rgba( 44,152,228,0.10)" },
  talk:    { name: "Talk",    color: "#0066FF", tintLt: "rgba(  0,102,255,0.08)" },
};

const FORMATS = [
  { id: "talk",      name: "Talk",             dur: "60–90 min", cap: "30–80",   desc: "Fireside, panel, or lecture" },
  { id: "walk",      name: "Walk",             dur: "90–120 min", cap: "10–30",  desc: "Guided route with stops" },
  { id: "tasting",   name: "Tasting",          dur: "90 min",    cap: "20–60",   desc: "Food or drink curation" },
  { id: "listening", name: "Listening Session", dur: "120 min",  cap: "40–120",  desc: "Album preview, vinyl, DJ" },
  { id: "club",      name: "Club Night",       dur: "5–8 hrs",   cap: "120–400", desc: "Full venue takeover" },
  { id: "workshop",  name: "Workshop",         dur: "2–3 hrs",   cap: "10–25",   desc: "Hands-on, skills-based" },
  { id: "wellness",  name: "Wellness",         dur: "60–90 min", cap: "15–40",   desc: "Yoga, sound bath, breathwork" },
  { id: "screening", name: "Screening",        dur: "90–180 min", cap: "40–200", desc: "Film, documentary, premiere" },
];

const CURATORS = [
  { id: "c1", name: "DJ Kleo",     handle: "@djkleo",     city: "Neukölln",  cat: "music",   events: 14, rating: 4.8, followers: "18.2k", cpi: 86, color: "#6968CB", bio: "House & techno. Resident at Watergate.",
    img: window.__resources.cur_c1 },
  { id: "c2", name: "Lena Marx",   handle: "@lenam",      city: "Mitte",     cat: "fitness", events:  9, rating: 4.9, followers: "6.4k",  cpi: 82, color: "#7ED957", bio: "Yoga + breathwork, 10-year practice.",
    img: window.__resources.cur_c2 },
  { id: "c3", name: "Chef Rico",   handle: "@ricocooks",  city: "Kreuzberg", cat: "food",    events: 22, rating: 4.7, followers: "31.0k", cpi: 90, color: "#FF5501", bio: "Supper clubs. Slow food.",
    img: window.__resources.cur_c3 },
  { id: "c4", name: "Anya Reis",   handle: "@anyareis",   city: "Mitte",     cat: "beauty",  events:  6, rating: 4.6, followers: "12.1k", cpi: 74, color: "#FAC938", bio: "Clean beauty curator, Amazingy alum.",
    img: window.__resources.cur_c4 },
  { id: "c5", name: "Devonte Ali", handle: "@devonte",    city: "Friedrichshain", cat: "culture", events: 18, rating: 4.9, followers: "24.7k", cpi: 88, color: "#2C9CE4", bio: "Afro-German film nights + conversations.",
    img: window.__resources.cur_c5 },
  { id: "c6", name: "Tamir Ofek",  handle: "@tamir",      city: "Prenzlauer Berg", cat: "talk", events: 11, rating: 4.8, followers: "9.3k", cpi: 79, color: "#0066FF", bio: "Design, systems, cultural tech panels.",
    img: window.__resources.cur_c6 },
];

const SPACES = [
  { id: "s1", name: "Urban Spree",  n: "Friedrichshain", cap: 450, type: "Gallery / Club", svi: 84, revenueBaseline: "€3.8k avg night", permits: ["Events","Alcohol","Noise 02:00"], color: "#6968CB", equipment: ["Sound","Lights","AV","Bar"],
    img: window.__resources.sp_s1 },
  { id: "s2", name: "BRLO Brwhouse", n: "Kreuzberg",     cap: 280, type: "Brewery",        svi: 78, revenueBaseline: "€2.4k avg night", permits: ["Events","Alcohol"],             color: "#FF5501", equipment: ["Sound","Kitchen","Bar","Outdoor"],
    img: window.__resources.sp_s2 },
  { id: "s3", name: "Tree House",   n: "Neukölln",       cap: 120, type: "Gallery / Bar",  svi: 71, revenueBaseline: "€980 avg night",  permits: ["Events","Alcohol"],             color: "#7ED957", equipment: ["Sound","AV","Bar"],
    img: window.__resources.sp_s3 },
  { id: "s4", name: "NIO House",    n: "Mitte",          cap: 200, type: "Showroom",       svi: 82, revenueBaseline: "€1.4k avg night", permits: ["Events"],                       color: "#2C9CE4", equipment: ["AV","Coffee","Retail"],
    img: window.__resources.sp_s4 },
  { id: "s5", name: "Sports Hub",   n: "Wedding",        cap:  60, type: "Studio",         svi: 68, revenueBaseline: "€540 avg day",    permits: ["Events"],                       color: "#FAC938", equipment: ["Mats","Sound","Showers"],
    img: window.__resources.sp_s5 },
];

const BRANDS = [
  { id: "b1", name: "Amazingy",   cat: "beauty",  budget: "€24,000", color: "#FAC938", industry: "Clean beauty", bsi: 81 },
  { id: "b2", name: "Ableton",    cat: "music",   budget: "€60,000", color: "#6968CB", industry: "Music tech",   bsi: 87 },
  { id: "b3", name: "Veganz",     cat: "food",    budget: "€18,500", color: "#FF5501", industry: "Plant-based",  bsi: 74 },
  { id: "b4", name: "Allbirds",   cat: "fitness", budget: "€32,000", color: "#7ED957", industry: "Apparel",      bsi: 79 },
  { id: "b5", name: "BMW i",      cat: "culture", budget: "€120,000", color: "#2C9CE4", industry: "Mobility",    bsi: 92 },
  { id: "b6", name: "Aesop",      cat: "beauty",  budget: "€28,000", color: "#FAC938", industry: "Skincare",     bsi: 84 },
];

const EVENTS = [
  { id: "e1", title: "Midsommar Listening Session", curator: "c1", space: "s1", brand: "b2", cat: "music",
    date: "Apr 27 · Fri 20:00", cap: 280, rsvps: 214, ticket: "€18",
    status: "live", wsi: 87, audienceFit: 92, revenue: 78, track: 86, venue: 84, depth: 82, halo: 72, completeness: 95,
    desc: "Ableton preview + DJ Kleo plays the new Moog + Push session. Vinyl after.",
    schedule: [["20:00","Doors"],["20:45","Listening set"],["22:00","DJ Kleo B2B"],["02:00","Close"]] },
  { id: "e2", title: "Amazingy Beauty Drop",        curator: "c4", space: "s4", brand: "b1", cat: "beauty",
    date: "Apr 27 · Sat 14:00", cap: 200, rsvps: 156, ticket: "Free",
    status: "live", wsi: 82, audienceFit: 85, revenue: 68, track: 74, venue: 82, depth: 78, halo: 64, completeness: 90,
    desc: "SPF30 launch + founder talk + sampling booth. AR Drop enabled.",
    schedule: [["14:00","Doors"],["14:30","Product reveal"],["15:30","Founder talk"],["17:00","Giveaway"],["18:00","Close"]] },
  { id: "e3", title: "Kreuzberg Supper Pass",       curator: "c3", space: "s2", brand: null, cat: "food",
    date: "May 03 · Sat 19:00", cap: 40, rsvps: 38, ticket: "€65",
    status: "confirmed", wsi: 74, audienceFit: 70, revenue: 82, track: 90, venue: 76, depth: 71, halo: 81, completeness: 88,
    desc: "6-course seasonal tasting, open kitchen format." },
  { id: "e4", title: "Sound Bath at Sports Hub",    curator: "c2", space: "s5", brand: "b4", cat: "fitness",
    date: "May 05 · Sun 11:00", cap: 30, rsvps: 24, ticket: "€22",
    status: "confirmed", wsi: 76, audienceFit: 80, revenue: 62, track: 82, venue: 68, depth: 85, halo: 58, completeness: 92,
    desc: "90-min breathwork + sound bath. Allbirds sampling." },
  { id: "e5", title: "Afro-Futures Film Night",     curator: "c5", space: "s3", brand: null, cat: "culture",
    date: "May 10 · Fri 19:30", cap: 120, rsvps: 71, ticket: "€12",
    status: "published", wsi: 79, audienceFit: 75, revenue: 60, track: 88, venue: 71, depth: 82, halo: 68, completeness: 90,
    desc: "Two shorts + conversation with filmmakers." },
  { id: "e6", title: "Design Systems in the Wild",  curator: "c6", space: "s4", brand: "b5", cat: "talk",
    date: "May 14 · Wed 19:00", cap: 180, rsvps: 102, ticket: "Free",
    status: "sponsor_matched", wsi: 84, audienceFit: 88, revenue: 72, track: 79, venue: 82, depth: 81, halo: 70, completeness: 94,
    desc: "Panel + live audit of 3 live products.  BMW i sponsoring." },
  { id: "e7", title: "Neukölln Night Market",       curator: "c3", space: "s1", brand: "b3", cat: "food",
    date: "May 17 · Sat 18:00", cap: 450, rsvps: 318, ticket: "Free",
    status: "published", wsi: 81, audienceFit: 84, revenue: 68, track: 90, venue: 84, depth: 74, halo: 88, completeness: 88,
    desc: "20 vendors + Veganz sampling + Rico's open kitchen." },
  { id: "e8", title: "Morning Vinyasa + Coffee",    curator: "c2", space: "s4", brand: "b4", cat: "fitness",
    date: "May 18 · Sun 09:00", cap: 40, rsvps: 22, ticket: "€18",
    status: "qa_review", wsi: 72, audienceFit: 74, revenue: 58, track: 82, venue: 82, depth: 78, halo: 52, completeness: 82,
    desc: "60-min flow + NIO Coffee after." },
];

// STATUS palette — reserved colors that DO NOT overlap with CATEGORY hues.
// Categories are identity (Music=purple, Food=orange, etc). Statuses are state.
// Status palette = slate / amber / green / charcoal — semantic neutrals.
//   - waiting / in-progress → amber (D97706)
//   - confirmed / published → slate (334155) — neutral "all-good"
//   - success / live / paid → green-ink
//   - sponsor_matched       → sponsor-purple (kept; sponsor is its own domain concept)
//   - completed / draft     → grey
const STATUS = {
  draft:           { label: "Draft",           color: "#8892A4",              tint: "#EEF1F6" },
  space_pending:   { label: "Space pending",   color: "#D97706",              tint: "rgba(217,119,6,0.12)" },
  qa_review:       { label: "In QA review",    color: "#D97706",              tint: "rgba(217,119,6,0.12)" },
  published:       { label: "Published",       color: "#334155",              tint: "rgba(51,65,85,0.08)" },
  confirmed:       { label: "Confirmed",       color: "#334155",              tint: "rgba(51,65,85,0.08)" },
  sponsor_matched: { label: "Sponsor matched", color: "#6968CB",              tint: "rgba(105,104,203,0.10)" },
  live:            { label: "Live",            color: "var(--wd-green-ink)", tint: "rgba(126,217,87,0.18)" },
  completed:       { label: "Completed",       color: "#5B6476",              tint: "#EEF1F6" },
  paid:            { label: "Paid",            color: "var(--wd-green-ink)", tint: "rgba(126,217,87,0.18)" },
};

const getCurator = id => CURATORS.find(c => c.id === id);
const getSpace   = id => SPACES.find(s => s.id === id);
const getBrand   = id => BRANDS.find(b => b.id === id);
const getCat     = id => CATEGORIES[id];

Object.assign(window, { CATEGORIES, FORMATS, CURATORS, SPACES, BRANDS, EVENTS, STATUS,
  getCurator, getSpace, getBrand, getCat });
