function ymd(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function weekdayKo(d) {
  return ['일','월','화','수','목','금','토'][d.getDay()];
}

function formatKDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth()+1}월 ${d.getDate()}일 (${weekdayKo(d)})`;
}

function getMonthDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  for (let i = 1; i <= last.getDate(); i++) days.push(new Date(year, month, i));
  return { first, last, days };
}

function inSameMonth(dateStr, year, month) {
  const d = new Date(dateStr);
  return d.getFullYear() === year && d.getMonth() === month;
}

// Render calendar as a date-grouped list of tournaments/matches for the current month
function renderCalendar(targetId, tournaments, filterGames, state) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const today = new Date();
  const curYear = state?.year ?? today.getFullYear();
  const curMonth = state?.month ?? today.getMonth();
  // Bounds: only this year and next year
  const baseYear = today.getFullYear();
  const minYear = baseYear, minMonth = 0; // Jan of this year
  const maxYear = baseYear + 1, maxMonth = 11; // Dec of next year
  const { first, last, days } = getMonthDays(curYear, curMonth);
  const filtered = (filterGames && filterGames.size)
    ? tournaments.filter(t => filterGames.has(t.gameType))
    : tournaments;

  // Clear and build header: month label + navigation
  container.innerHTML = '';
  const monthBar = document.createElement('div');
  monthBar.className = 'monthbar';
  monthBar.setAttribute('aria-live', 'polite');

  const nav = document.createElement('div');
  nav.className = 'monthnav';
  const prevBtn = document.createElement('button');
  prevBtn.className = 'nav-btn';
  prevBtn.type = 'button';
  prevBtn.setAttribute('aria-label', '이전 달');
  prevBtn.textContent = '‹';

  const todayBtn = document.createElement('button');
  todayBtn.className = 'nav-btn';
  todayBtn.type = 'button';
  todayBtn.setAttribute('aria-label', '오늘로 이동');
  todayBtn.textContent = '오늘';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'nav-btn';
  nextBtn.type = 'button';
  nextBtn.setAttribute('aria-label', '다음 달');
  nextBtn.textContent = '›';

  nav.appendChild(prevBtn);
  nav.appendChild(todayBtn);
  nav.appendChild(nextBtn);

  const label = document.createElement('div');
  label.className = 'monthlabel';
  label.textContent = `${curYear}년 ${curMonth + 1}월`;

  // Swap positions: label first (left), nav second (right)
  monthBar.appendChild(label);
  monthBar.appendChild(nav);

  // Weekday header
  const weekdayNames = ["일","월","화","수","목","금","토"];
  const weekdayRow = document.createElement('div');
  weekdayRow.className = 'weekday';
  weekdayNames.forEach(w => {
    const el = document.createElement('div'); el.textContent = w; weekdayRow.appendChild(el);
  });

  const grid = document.createElement('div');
  grid.className = 'calendar';
  grid.appendChild(weekdayRow);

  // Leading blanks for alignment
  for (let i = 0; i < first.getDay(); i++) {
    const blank = document.createElement('div');
    blank.className = 'day blank';
    grid.appendChild(blank);
  }

  // Helper: tournaments that have matches on this exact day
  const eventsInDay = (day) => {
    const ds = ymd(day);
    return filtered.filter(t => Array.isArray(t.matches) && t.matches.some(m => m.date === ds));
  };

  // Days of month
  days.forEach(day => {
    const dayEl = document.createElement('div'); dayEl.className = 'day';
    const dateEl = document.createElement('div'); dateEl.className = 'date'; dateEl.textContent = day.getDate();
    if (
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate()
    ) {
      dayEl.classList.add('today');
      dateEl.setAttribute('aria-label', '오늘');
    }
    dayEl.appendChild(dateEl);

    const dayEvents = eventsInDay(day);
    dayEvents.forEach(t => {
      const evEl = document.createElement('div');
      evEl.className = 'event';
      // Apply game-type class for color styling (lol/val/ow)
      if (t.gameType) evEl.classList.add(t.gameType);
      evEl.textContent = t.name;
      // Optional: tooltip for period/format
      const fmtText = t.format ? ` — ${t.format}` : '';
      evEl.title = `${t.startDate} ~ ${t.endDate}${fmtText}`;
      dayEl.appendChild(evEl);
    });

    grid.appendChild(dayEl);
  });

  container.appendChild(monthBar);
  container.appendChild(grid);

  // Wire up navigation actions
  if (state) {
    // Helper to check bounds
    const lt = (ya, ma, yb, mb) => (ya < yb) || (ya === yb && ma < mb);
    const gt = (ya, ma, yb, mb) => (ya > yb) || (ya === yb && ma > mb);

    const isAtMin = (state.year === minYear && state.month === minMonth) || lt(state.year, state.month, minYear, minMonth);
    const isAtMax = (state.year === maxYear && state.month === maxMonth) || gt(state.year, state.month, maxYear, maxMonth);

    const setDisabled = () => {
      prevBtn.disabled = isAtMin;
      nextBtn.disabled = isAtMax;
      prevBtn.setAttribute('aria-disabled', String(prevBtn.disabled));
      nextBtn.setAttribute('aria-disabled', String(nextBtn.disabled));
    };
    setDisabled();

    prevBtn.addEventListener('click', () => {
      const m = state.month - 1;
      state.month = (m + 12) % 12;
      state.year = m < 0 ? state.year - 1 : state.year;
      // Prevent moving before min
      if (lt(state.year, state.month, minYear, minMonth)) {
        state.year = minYear; state.month = minMonth;
      }
      renderCalendar(targetId, tournaments, filterGames, state);
    });
    nextBtn.addEventListener('click', () => {
      const m = state.month + 1;
      state.month = m % 12;
      state.year = m > 11 ? state.year + 1 : state.year;
      // Prevent moving after max
      if (gt(state.year, state.month, maxYear, maxMonth)) {
        state.year = maxYear; state.month = maxMonth;
      }
      renderCalendar(targetId, tournaments, filterGames, state);
    });
    todayBtn.addEventListener('click', () => {
      const n = new Date();
      state.year = n.getFullYear();
      state.month = n.getMonth();
      // Clamp to bounds just in case
      if (lt(state.year, state.month, minYear, minMonth)) { state.year = minYear; state.month = minMonth; }
      if (gt(state.year, state.month, maxYear, maxMonth)) { state.year = maxYear; state.month = maxMonth; }
      renderCalendar(targetId, tournaments, filterGames, state);
    });
  }

}

function flattenMatches(tournaments) {
  const arr = [];
  tournaments.forEach(t => t.matches.forEach(m => arr.push({ ...m, tournamentId: t.id, tournament: t.name, gameType: t.gameType })));
  return arr;
}

// Render only today's matches into a target container
function renderTodayMatches(targetId, tournaments, filterGames) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const todayStr = ymd(new Date());
  const filteredT = (filterGames && filterGames.size) ? tournaments.filter(t => filterGames.has(t.gameType)) : tournaments;
  const all = flattenMatches(filteredT);
  const matches = all.filter(m => m.date === todayStr);

  // Maintain per-page toggle state (default OFF)
  if (!renderTodayMatches._state) renderTodayMatches._state = { showScores: false };
  const uiState = renderTodayMatches._state;

  // Sort by time only (no live priority)
  matches.sort((a,b) => (a.time || '').localeCompare(b.time || ''));

  const list = document.createElement('div'); list.className = 'list';
  if (!matches.length) {
    const empty = document.createElement('div'); empty.className = 'item'; empty.textContent = '오늘 예정된 경기가 없습니다.'; list.appendChild(empty);
  } else {
    matches.forEach(m => {
      const item = document.createElement('div'); item.className = 'item';
      const title = document.createElement('div'); title.className = 'title'; title.textContent = `${m.teamA} vs ${m.teamB}`;
      if (m.status === 'live' || m.status === 'finished') {
        const score = document.createElement('span'); score.className = 'score'; score.textContent = ` ${m.scoreA ?? '-'}:${m.scoreB ?? '-'}`;
        if (!uiState.showScores) score.classList.add('blurred');
        title.appendChild(score);
      }
      const meta = document.createElement('div'); meta.className = 'meta';
      const statusLabel = m.status === 'finished' ? '종료' : (m.status === 'scheduled' ? '예정' : '');
      const parts = [m.tournament, m.time, m.stage];
      if (statusLabel) parts.push(statusLabel);
      meta.textContent = parts.join(' · ');
      const badge = document.createElement('span'); badge.className = `badge ${m.gameType}`; badge.textContent = m.gameType === 'lol' ? 'LoL' : m.gameType === 'val' ? 'VAL' : 'OW';
      item.appendChild(title); item.appendChild(meta); item.appendChild(badge);
      list.appendChild(item);
    });
  }
  // Controls for score toggle
  const controls = document.createElement('div'); controls.className = 'controls';
  const toggle = document.createElement('label'); toggle.className = 'toggle';
  const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = uiState.showScores; cb.setAttribute('aria-label','경기 결과 보기 ON/OFF');
  const txt = document.createElement('span'); txt.textContent = '경기 결과 보기';
  cb.addEventListener('change', () => { uiState.showScores = cb.checked; renderTodayMatches(targetId, tournaments, filterGames); });
  toggle.appendChild(cb); toggle.appendChild(txt); controls.appendChild(toggle);

  container.innerHTML = '';
  container.appendChild(controls);
  container.appendChild(list);
}

function renderRightPanel(targetId, tournaments, filterGames, options = {}) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const todayStr = ymd(new Date());
  const filteredT = (filterGames && filterGames.size) ? tournaments.filter(t => filterGames.has(t.gameType)) : tournaments;
  const all = flattenMatches(filteredT);

  let listMatches = [];
  let header = options.label || '경기 일정';

  if (options.mode === 'tournament' && filteredT.length === 1) {
    listMatches = all.sort((a,b) => (a.date + a.time).localeCompare(b.date + b.time));
  } else {
    const today = all.filter(m => m.date === todayStr).sort((a,b) => (a.time || '').localeCompare(b.time || ''));
    if (today.length) {
      listMatches = today;
      header = '경기 일정 — 오늘 경기';
    } else {
      // nearest scheduled in future
      const future = all.filter(m => m.status === 'scheduled').sort((a,b)=> (a.date + a.time).localeCompare(b.date + b.time));
      if (future.length) {
        const nextTid = future[0].tournamentId;
        listMatches = all.filter(m => m.tournamentId === nextTid).sort((a,b)=> (a.date + a.time).localeCompare(b.date + b.time));
        header = `${future[0].tournament} — 경기 일정`;
      }
    }
  }

  const list = document.createElement('div'); list.className = 'list';
  if (!listMatches.length) {
    const empty = document.createElement('div'); empty.className = 'item'; empty.textContent = '표시할 경기가 없습니다.'; list.appendChild(empty);
  } else {
    listMatches.forEach(m => {
      const item = document.createElement('div'); item.className = 'item';
      const title = document.createElement('div'); title.className = 'title'; title.textContent = `${m.teamA} vs ${m.teamB}`;
      const meta = document.createElement('div'); meta.className = 'meta';
      const statusLabel = m.status === 'finished' ? `${m.scoreA ?? '-'}-${m.scoreB ?? '-'}` : (m.status === 'scheduled' ? '예정' : '');
      const parts = [m.tournament, `${m.date} ${m.time}`, m.stage];
      if (statusLabel) parts.push(statusLabel);
      meta.textContent = parts.join(' · ');
      const badge = document.createElement('span');
      badge.className = `badge ${m.gameType}`;
      badge.textContent = m.gameType === 'lol' ? 'LoL' : m.gameType === 'val' ? 'VAL' : 'OW';
      item.appendChild(title); item.appendChild(meta); item.appendChild(badge);
      list.appendChild(item);
    });
  }
  container.innerHTML = '';
  const hdr = document.createElement('div'); hdr.className = 'meta'; hdr.textContent = header;
  container.appendChild(hdr);
  container.appendChild(list);
}

function setupMainPage() {
  const filterSet = new Set();
  const now = new Date();
  const calState = { year: now.getFullYear(), month: now.getMonth() };
  const appState = { selectedTid: null };
  const checkboxes = document.querySelectorAll('input[name="game-filter"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      filterSet.clear();
      document.querySelectorAll('input[name="game-filter"]:checked').forEach(el => filterSet.add(el.value));
      // If selected tournament is filtered out, clear selection
      if (appState.selectedTid) {
        const tidIn = data.tournaments.some(t => t.id === appState.selectedTid && filterSet.has(t.gameType));
        if (!tidIn) appState.selectedTid = null;
      }
      renderCalendar('calendar', data.tournaments, filterSet, calState);
      renderTodayMatches('today-matches', data.tournaments, filterSet);
    });
  });
  renderCalendar('calendar', data.tournaments, filterSet, calState);
  renderTodayMatches('today-matches', data.tournaments, filterSet);
}

function renderGamePage(game) {
  const left = document.getElementById('game-events');
  const right = document.getElementById('game-matches');
  if (!left || !right) return;
  // Filter and sort tournaments per requested rules
  const allByGame = data.tournaments.filter(t => t.gameType === game);
  const now = new Date();
  const groupOrder = (t) => {
    const s = new Date(t.startDate);
    const e = new Date(t.endDate);
    if (s <= now && now <= e) return 0; // ongoing
    if (s > now) return 1; // upcoming
    return 2; // past
  };
  const tournaments = [...allByGame].sort((a,b) => {
    const ga = groupOrder(a), gb = groupOrder(b);
    if (ga !== gb) return ga - gb;
    if (ga === 0) { // ongoing: earliest start first
      return new Date(a.startDate) - new Date(b.startDate);
    } else if (ga === 1) { // upcoming: nearest start first
      return new Date(a.startDate) - new Date(b.startDate);
    } else { // past: most recent end first
      return new Date(b.endDate) - new Date(a.endDate);
    }
  });
  const formatBox = document.querySelector('.format');
  const uiState = { showScores: false };

  // Build left list: all tournaments for this game (past/current/upcoming/future)
  const listLeft = document.createElement('div'); listLeft.className = 'list';
  tournaments.forEach(t => {
    const item = document.createElement('div'); item.className = 'item';
    item.dataset.tournament = t.id;
    const title = document.createElement('div'); title.className = 'title'; title.textContent = t.name;
    const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = `${t.region} · ${t.startDate} ~ ${t.endDate}`;
    item.appendChild(title); item.appendChild(meta); listLeft.appendChild(item);
  });
  left.innerHTML = ''; left.appendChild(listLeft);

  // Helper: render matches list into right panel
  function renderMatches(matches, label) {
    const list = document.createElement('div'); list.className = 'list';
    if (!matches.length) {
      const empty = document.createElement('div'); empty.className = 'item'; empty.textContent = '경기 일정이 없습니다.'; list.appendChild(empty);
    } else {
      matches.forEach(m => {
        const item = document.createElement('div'); item.className = 'item';
        const title = document.createElement('div'); title.className = 'title';
        title.textContent = `${m.teamA} vs ${m.teamB}`;
        if (m.status === 'live' || m.status === 'finished') {
          const score = document.createElement('span'); score.className = 'score'; score.textContent = ` ${m.scoreA ?? '-'}:${m.scoreB ?? '-'}`;
          if (!uiState.showScores) score.classList.add('blurred');
          title.appendChild(score);
        }
        const meta = document.createElement('div'); meta.className = 'meta';
        const statusLabel = m.status === 'finished' ? '종료' : (m.status === 'scheduled' ? '예정' : '');
        const parts = [`${m.date} ${m.time}`, m.stage];
        if (statusLabel) parts.push(statusLabel);
        meta.textContent = parts.join(' · ');
        item.appendChild(title); item.appendChild(meta);
        list.appendChild(item);
      });
    }
    right.innerHTML = '';
    // Toggle controls next to header
    const controls = document.createElement('div'); controls.className = 'controls';
    const toggle = document.createElement('label'); toggle.className = 'toggle';
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = uiState.showScores; cb.setAttribute('aria-label','경기 결과 보기 ON/OFF');
    const txt = document.createElement('span'); txt.textContent = '경기 결과 보기';
    cb.addEventListener('change', () => { uiState.showScores = cb.checked; renderMatches(matches, label); });
    toggle.appendChild(cb); toggle.appendChild(txt); controls.appendChild(toggle);
    const hdr = document.createElement('div'); hdr.className = 'meta'; hdr.textContent = label || '경기 일정';
    right.appendChild(controls);
    right.appendChild(hdr);
    right.appendChild(list);
  }

  // Default view: live matches first; otherwise most recent/current tournament
  const gameMatches = flattenMatches(tournaments).filter(m => m.gameType === game);
  const live = gameMatches.filter(m => m.status === 'live');
  if (live.length) {
    renderMatches(live, '실시간 경기');
    const t = tournaments.find(x => x.id === live[0].tournamentId);
    if (formatBox && t?.format) formatBox.innerHTML = `<strong>대회 진행 방식</strong><br />${t.format}`;
  } else {
    // Pick a default tournament: closest by date from matches
    const sorted = [...gameMatches].sort((a,b)=> (a.date + a.time).localeCompare(b.date + b.time));
    const defTid = sorted[0]?.tournamentId;
    const byTournament = defTid ? gameMatches.filter(m => m.tournamentId === defTid) : [];
    const defName = sorted[0]?.tournament;
    renderMatches(byTournament, defName ? `${defName} 경기` : '경기 일정');
    const t = tournaments.find(x => x.id === defTid);
    if (formatBox && t?.format) formatBox.innerHTML = `<strong>대회 진행 방식</strong><br />${t.format}`;
  }

  // Click to select a tournament and show matches; manage selected state
  listLeft.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
      listLeft.querySelectorAll('.item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
      const tid = item.dataset.tournament;
      const matches = gameMatches.filter(m => m.tournamentId === tid);
      const t = tournaments.find(x => x.id === tid);
      renderMatches(matches, t ? `${t.name} 경기` : '경기 일정');
      if (formatBox && t?.format) formatBox.innerHTML = `<strong>대회 진행 방식</strong><br />${t.format}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('calendar')) {
    setupMainPage();
  }
  const gamePage = document.body.getAttribute('data-game');
  if (gamePage) {
    renderGamePage(gamePage);
  }
});
