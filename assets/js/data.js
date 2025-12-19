// assets/js/data.js
// 하드코딩된 대회 + 경기 데이터 (테스트/데모용)
// 구조:
// data = {
//   tournaments: [
//     {
//       id: 'val-2025-01',
//       name: 'VCT 2025 - Masters Winter',
//       gameType: 'val', // 'val' | 'lol' | 'ow'
//       region: 'International',
//       startDate: '2025-12-05',
//       endDate: '2025-12-12',
//       matches: [ { id, date, time, stage, teamA, teamB, scoreA, scoreB, status }, ... ]
//     }, ...
//   ]
// }

const data = {
  tournaments: [

    // ===== VALORANT (val) =====
    {
      id: 'val-2025-winter',
      name: 'VCT 2025 Masters - Winter',
      gameType: 'val',
      region: 'International',
      format: '3개 조 그룹 스테이지 → 상위 8팀 싱글 엘리미네이션 플레이오프 → 결승전',
      startDate: '2025-12-05',
      endDate: '2025-12-12',
      matches: [
        { id:'v-m1', date:'2025-12-05', time:'15:00', stage:'Group A', teamA:'Sentinels', teamB:'Fnatic', scoreA:1, scoreB:0, status:'finished' },
        { id:'v-m2', date:'2025-12-05', time:'17:00', stage:'Group B', teamA:'G2 Esports', teamB:'Paper Rex', scoreA:0, scoreB:1, status:'finished' },
        { id:'v-m3', date:'2025-12-06', time:'16:30', stage:'Group A', teamA:'OpTic', teamB:'Team Liquid', scoreA:0, scoreB:1, status:'finished' },
        { id:'v-m4', date:'2025-12-06', time:'19:00', stage:'Group C', teamA:'Vision Strikers', teamB:'DRX', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-m5', date:'2025-12-07', time:'20:30', stage:'Group B', teamA:'Sentinels', teamB:'Paper Rex', scoreA:2, scoreB:1, status:'finished' },
        { id:'v-m6', date:'2025-12-19', time:'18:45', stage:'Quarterfinal', teamA:'Fnatic', teamB:'G2 Esports', scoreA:1, scoreB:1, status:'live' }
      ]
    },
    {
      id: 'val-2025-qualifier-asia',
      name: 'VCT Asia Qualifier 2025',
      gameType: 'val',
      region: 'Asia',
      format: '아시아 지역 토너먼트 → 단판 싱글 엘리미네이션 → 상위 2팀 Masters 진출',
      startDate: '2025-11-28',
      endDate: '2025-12-08',
      matches: [
        { id:'v-a1', date:'2025-11-28', time:'14:00', stage:'R16', teamA:'Paper Rex', teamB:'X10', scoreA:1, scoreB:0, status:'finished' },
        { id:'v-a2', date:'2025-11-29', time:'16:15', stage:'R16', teamA:'DRX', teamB:'Vision Strikers', scoreA:2, scoreB:0, status:'finished' },
        { id:'v-a3', date:'2025-12-02', time:'13:30', stage:'R8', teamA:'Paper Rex', teamB:'DRX', scoreA:1, scoreB:2, status:'finished' },
        { id:'v-a4', date:'2025-12-09', time:'18:00', stage:'Final', teamA:'Paper Rex', teamB:'X10', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-a5', date:'2025-12-10', time:'20:00', stage:'3rd Place', teamA:'Vision Strikers', teamB:'DRX', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-a6', date:'2025-12-19', time:'21:00', stage:'Exhibition', teamA:'Sentinels', teamB:'OpTic', scoreA:0, scoreB:0, status:'scheduled' }
      ]
    },
    {
      id: 'val-2026-spring',
      name: 'VCT 2026 - Regional League (KR)',
      gameType: 'val',
      region: 'KR',
      format: '정규 시즌 라운드 로빈 → 상위 4팀 플레이오프 → 결승전',
      startDate: '2026-01-15',
      endDate: '2026-03-20',
      matches: [
        { id:'v-k1', date:'2026-01-15', time:'18:00', stage:'Week1', teamA:'DRX', teamB:'Paper Rex', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-k2', date:'2026-01-16', time:'20:00', stage:'Week1', teamA:'Vision Strikers', teamB:'X10', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-k3', date:'2026-01-22', time:'19:30', stage:'Week2', teamA:'DRX', teamB:'X10', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-k4', date:'2026-02-01', time:'17:00', stage:'Week3', teamA:'Paper Rex', teamB:'Vision Strikers', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-k5', date:'2026-02-10', time:'19:00', stage:'Week4', teamA:'DRX', teamB:'Sentinels', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'v-k6', date:'2026-03-05', time:'21:00', stage:'Playoffs', teamA:'Paper Rex', teamB:'DRX', scoreA:null, scoreB:null, status:'scheduled' }
      ]
    },

    // ===== Overwatch (ow) =====
    {
      id: 'ow-2025-season',
      name: 'OWL 2025 - Regular Season',
      gameType: 'ow',
      region: 'NA',
      format: '정규 시즌 리그 매치 → 승점제 운영 → 시즌 종료 후 상위 팀 플레이오프',
      startDate: '2025-11-20',
      endDate: '2026-04-10',
      matches: [
        { id:'o-m1', date:'2025-11-20', time:'19:00', stage:'Week1', teamA:'San Francisco Shock', teamB:'Seoul Dynasty', scoreA:3, scoreB:1, status:'finished' },
        { id:'o-m2', date:'2025-11-22', time:'21:00', stage:'Week1', teamA:'Dallas Fuel', teamB:'Shanghai Dragons', scoreA:2, scoreB:3, status:'finished' },
        { id:'o-m3', date:'2025-12-06', time:'18:00', stage:'Week3', teamA:'Boston Uprising', teamB:'Atlanta Reign', scoreA:1, scoreB:3, status:'finished' },
        { id:'o-m4', date:'2025-12-07', time:'20:00', stage:'Week3', teamA:'Houston Outlaws', teamB:'Florida Mayhem', scoreA:0, scoreB:3, status:'finished' },
        { id:'o-m5', date:'2025-12-19', time:'18:45', stage:'Week4', teamA:'Seoul Dynasty', teamB:'Shanghai Dragons', scoreA:2, scoreB:2, status:'live' },
        { id:'o-m6', date:'2025-12-22', time:'19:30', stage:'Week4', teamA:'Vancouver Titans', teamB:'Los Angeles Gladiators', scoreA:null, scoreB:null, status:'scheduled' }
      ]
    },
    {
      id: 'ow-2025-invite',
      name: 'Overwatch Invitational 2025',
      gameType: 'ow',
      region: 'International',
      format: '그룹 스테이지 → 싱글 엘리미네이션 플레이오프 → 결승전',
      startDate: '2025-12-01',
      endDate: '2025-12-10',
      matches: [
        { id:'o-i1', date:'2025-12-01', time:'15:00', stage:'Group A', teamA:'Seoul Dynasty', teamB:'Atlanta Reign', scoreA:2, scoreB:1, status:'finished' },
        { id:'o-i2', date:'2025-12-03', time:'17:00', stage:'Group B', teamA:'San Francisco Shock', teamB:'Boston Uprising', scoreA:3, scoreB:0, status:'finished' },
        { id:'o-i3', date:'2025-12-05', time:'19:00', stage:'Semifinal', teamA:'Shanghai Dragons', teamB:'Seoul Dynasty', scoreA:1, scoreB:3, status:'finished' },
        { id:'o-i4', date:'2025-12-10', time:'20:00', stage:'Final', teamA:'San Francisco Shock', teamB:'Seoul Dynasty', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'o-i5', date:'2025-12-19', time:'21:00', stage:'Showmatch', teamA:'Shanghai Dragons', teamB:'Boston Uprising', scoreA:0, scoreB:0, status:'scheduled' },
        { id:'o-i6', date:'2025-12-20', time:'18:30', stage:'Exhibition', teamA:'Dallas Fuel', teamB:'Houston Outlaws', scoreA:null, scoreB:null, status:'scheduled' }
      ]
    },
    {
      id: 'ow-2026-challengers',
      name: 'Overwatch Challengers KR 2026',
      gameType: 'ow',
      region: 'KR',
      format: '국내 예선 토너먼트 → 더블 엘리미네이션 플레이오프 → 결승전',
      startDate: '2026-01-10',
      endDate: '2026-03-15',
      matches: [
        { id:'o-k1', date:'2026-01-10', time:'18:00', stage:'R16', teamA:'Seoul Dynasty B', teamB:'Vancouver Titans B', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'o-k2', date:'2026-01-15', time:'20:00', stage:'R8', teamA:'Seoul Dynasty B', teamB:'Boston Uprising B', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'o-k3', date:'2026-02-10', time:'19:00', stage:'Final', teamA:'Seoul Dynasty B', teamB:'Dallas Fuel B', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'o-k4', date:'2026-03-01', time:'21:00', stage:'Playoffs', teamA:'Vancouver Titans B', teamB:'Boston Uprising B', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'o-k5', date:'2026-03-10', time:'18:30', stage:'3rd Place', teamA:'Dallas Fuel B', teamB:'Houston Outlaws B', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'o-k6', date:'2026-03-12', time:'20:00', stage:'Final', teamA:'Seoul Dynasty B', teamB:'Vancouver Titans B', scoreA:null, scoreB:null, status:'scheduled' }
      ]
    },

    // ===== League of Legends (lol) =====
    {
      id: 'lck-2025-winter',
      name: 'LCK 2025 - Winter Split',
      gameType: 'lol',
      region: 'KR',
      format: '정규 시즌 더블 라운드 로빈 → 상위 6팀 플레이오프 → 결승전',
      startDate: '2025-12-01',
      endDate: '2026-02-28',
      matches: [
        { id:'l-m1', date:'2025-12-01', time:'15:00', stage:'Day1', teamA:'T1', teamB:'Gen.G', scoreA:1, scoreB:0, status:'finished' },
        { id:'l-m2', date:'2025-12-01', time:'17:00', stage:'Day1', teamA:'DRX', teamB:'KT Rolster', scoreA:0, scoreB:1, status:'finished' },
        { id:'l-m3', date:'2025-12-06', time:'16:30', stage:'Day3', teamA:'Gen.G', teamB:'Afreeca Freecs', scoreA:0, scoreB:1, status:'finished' },
        { id:'l-m4', date:'2025-12-07', time:'19:30', stage:'Day4', teamA:'Hanwha Life Esports', teamB:'BNK Peakers', scoreA:1, scoreB:0, status:'finished' },
        { id:'l-m5', date:'2025-12-19', time:'18:45', stage:'Week3', teamA:'Nongshim RedForce', teamB:'Team Liquid', scoreA:1, scoreB:0, status:'live' },
        { id:'l-m6', date:'2025-12-21', time:'20:15', stage:'Week3', teamA:'kt Rolster', teamB:'DN Frix', scoreA:null, scoreB:null, status:'scheduled' }
      ]
    },
    {
      id: 'worlds-2025',
      name: 'Worlds 2025 - Group Stage (Mock)',
      gameType: 'lol',
      region: 'International',
      format: '그룹 스테이지 라운드 로빈 → 녹아웃 스테이지 → 결승전',
      startDate: '2025-10-10',
      endDate: '2025-11-05',
      matches: [
        { id:'w-m1', date:'2025-10-10', time:'13:00', stage:'Group A', teamA:'T1', teamB:'Cloud9', scoreA:1, scoreB:0, status:'finished' },
        { id:'w-m2', date:'2025-10-11', time:'15:00', stage:'Group B', teamA:'Gen.G', teamB:'FNATIC', scoreA:0, scoreB:1, status:'finished' },
        { id:'w-m3', date:'2025-10-12', time:'17:30', stage:'Group C', teamA:'DRX', teamB:'Team Liquid', scoreA:1, scoreB:1, status:'finished' },
        { id:'w-m4', date:'2025-10-20', time:'19:00', stage:'Quarterfinal', teamA:'T1', teamB:'Gen.G', scoreA:2, scoreB:0, status:'finished' },
        { id:'w-m5', date:'2025-10-25', time:'20:00', stage:'Semifinal', teamA:'T1', teamB:'FNATIC', scoreA:3, scoreB:2, status:'finished' },
        { id:'w-m6', date:'2025-11-03', time:'18:00', stage:'Final', teamA:'T1', teamB:'DWG KIA', scoreA:3, scoreB:1, status:'finished' }
      ]
    },
    {
      id: 'lec-2026-spring',
      name: 'LEC 2026 - Spring (Mock)',
      gameType: 'lol',
      region: 'EU',
      format: '정규 시즌 싱글 라운드 로빈 → 상위 6팀 플레이오프 → 결승전',
      startDate: '2026-02-01',
      endDate: '2026-04-30',
      matches: [
        { id:'e-m1', date:'2026-02-01', time:'18:00', stage:'Week1', teamA:'G2 Esports', teamB:'Fnatic', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'e-m2', date:'2026-02-03', time:'20:00', stage:'Week1', teamA:'MAD Lions', teamB:'Rogue', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'e-m3', date:'2026-02-10', time:'19:00', stage:'Week2', teamA:'G2 Esports', teamB:'MAD Lions', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'e-m4', date:'2026-03-05', time:'21:00', stage:'Week5', teamA:'Fnatic', teamB:'Rogue', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'e-m5', date:'2026-04-12', time:'19:30', stage:'Playoffs', teamA:'G2 Esports', teamB:'Fnatic', scoreA:null, scoreB:null, status:'scheduled' },
        { id:'e-m6', date:'2026-04-25', time:'20:00', stage:'Final', teamA:'G2 Esports', teamB:'MAD Lions', scoreA:null, scoreB:null, status:'scheduled' }
      ]
    }

  ] // tournaments end
}; // data end

// If main.js expects `data` as a global variable, this file is ready to be used.
// Otherwise export if using modules (uncomment below):
// export default data;
// Sample data for events and matches
const EVENTS = [
  { id: 1, title: "LoL Worlds Group Stage", game: "lol", startDate: "2025-12-01", endDate: "2025-12-10", location: "Global", status: "current" },
  { id: 2, title: "Valorant Champions Playoffs", game: "val", startDate: "2025-12-05", endDate: "2025-12-12", location: "Los Angeles", status: "upcoming" },
  { id: 3, title: "Overwatch League Finals", game: "ow", startDate: "2025-12-03", endDate: "2025-12-03", location: "Seoul", status: "current" },
  { id: 4, title: "LoL LCK Spring", game: "lol", startDate: "2026-02-01", endDate: "2026-04-15", location: "Seoul", status: "future" },
  { id: 5, title: "Valorant Masters", game: "val", startDate: "2025-11-10", endDate: "2025-11-20", location: "Tokyo", status: "past" }
];

const MATCHES = [
  // LoL — Worlds
  { id: 101, game: "lol", date: "2025-12-19", time: "14:00", teams: "T1 vs GEN", score: "1-0", status: "live", tournament: "Worlds" },
  { id: 104, game: "lol", date: "2025-12-19", time: "17:00", teams: "DK vs HLE", score: "-", status: "upcoming", tournament: "Worlds" },
  // Valorant — Champions
  { id: 102, game: "val", date: "2025-12-03", time: "17:00", teams: "PRX vs FNATIC", score: "2-1", status: "completed", tournament: "Champions" },
  { id: 105, game: "val", date: "2025-12-19", time: "18:30", teams: "TL vs NRG", score: "-", status: "upcoming", tournament: "Champions" },
  // Overwatch — OWL Finals
  { id: 103, game: "ow", date: "2025-12-03", time: "20:00", teams: "Seoul vs Dallas", score: "3-2", status: "completed", tournament: "OWL Finals" },
  { id: 106, game: "ow", date: "2025-12-19", time: "21:00", teams: "Shanghai vs NYXL", score: "-", status: "upcoming", tournament: "OWL Finals" }
];
