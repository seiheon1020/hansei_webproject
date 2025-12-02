// Sample data for events and matches
const EVENTS = [
  { id: 1, title: "LoL Worlds Group Stage", game: "lol", startDate: "2025-12-01", endDate: "2025-12-10", location: "Global", status: "current" },
  { id: 2, title: "Valorant Champions Playoffs", game: "val", startDate: "2025-12-05", endDate: "2025-12-12", location: "Los Angeles", status: "upcoming" },
  { id: 3, title: "Overwatch League Finals", game: "ow", startDate: "2025-12-03", endDate: "2025-12-03", location: "Seoul", status: "current" },
  { id: 4, title: "LoL LCK Spring", game: "lol", startDate: "2026-02-01", endDate: "2026-04-15", location: "Seoul", status: "future" },
  { id: 5, title: "Valorant Masters", game: "val", startDate: "2025-11-10", endDate: "2025-11-20", location: "Tokyo", status: "past" }
];

const MATCHES = [
  { id: 101, game: "lol", date: "2025-12-03", time: "14:00", teams: "T1 vs GEN", tournament: "Worlds" },
  { id: 102, game: "val", date: "2025-12-03", time: "17:00", teams: "PRX vs FNATIC", tournament: "Champions" },
  { id: 103, game: "ow", date: "2025-12-03", time: "20:00", teams: "Seoul vs Dallas", tournament: "OWL Finals" }
];
