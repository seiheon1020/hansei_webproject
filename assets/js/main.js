function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getMonthDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  for (let i = 1; i <= last.getDate(); i++) days.push(new Date(year, month, i));
  return { first, last, days };
}

function eventsInDay(day, events) {
  const ds = formatDate(day);
  return events.filter(e => ds >= e.startDate && ds <= e.endDate);
}

function renderCalendar(targetId, events, filterGames, state) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const today = new Date();
  const curYear = state?.year ?? today.getFullYear();
  const curMonth = state?.month ?? today.getMonth();
  // Bounds: only this year and next year
  const baseYear = new Date().getFullYear();
  const minYear = baseYear, minMonth = 0; // Jan of this year
  const maxYear = baseYear + 1, maxMonth = 11; // Dec of next year
  const { first, last, days } = getMonthDays(curYear, curMonth);
  const filtered = filterGames && filterGames.size ? events.filter(e => filterGames.has(e.game)) : events;

  // Header: month label + navigation
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

  const weekdayNames = ["일","월","화","수","목","금","토"];
  const weekdayRow = document.createElement('div');
  weekdayRow.className = 'weekday';
  weekdayNames.forEach(w => {
    const el = document.createElement('div'); el.textContent = w; weekdayRow.appendChild(el);
  });

  const grid = document.createElement('div');
  grid.className = 'calendar';
  grid.appendChild(weekdayRow);

  // Leading blanks for alignment (Sun=0 ... Sat=6)
  for (let i = 0; i < first.getDay(); i++) {
    const blank = document.createElement('div');
    blank.className = 'day blank';
    grid.appendChild(blank);
  }

  days.forEach(day => {
    const dayEl = document.createElement('div'); dayEl.className = 'day';
    const dateEl = document.createElement('div'); dateEl.className = 'date'; dateEl.textContent = day.getDate();
    // Highlight today
    if (
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate()
    ) {
      dayEl.classList.add('today');
      dateEl.setAttribute('aria-label', '오늘');
    }
    dayEl.appendChild(dateEl);

    const dayEvents = eventsInDay(day, filtered);
    dayEvents.forEach(ev => {
      const evEl = document.createElement('div'); evEl.className = `event ${ev.game}`;
      evEl.textContent = `${ev.title}`;
      dayEl.appendChild(evEl);
    });

    grid.appendChild(dayEl);
  });

  container.innerHTML = '';
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
      renderCalendar(targetId, events, filterGames, state);
    });
    nextBtn.addEventListener('click', () => {
      const m = state.month + 1;
      state.month = m % 12;
      state.year = m > 11 ? state.year + 1 : state.year;
      // Prevent moving after max
      if (gt(state.year, state.month, maxYear, maxMonth)) {
        state.year = maxYear; state.month = maxMonth;
      }
      renderCalendar(targetId, events, filterGames, state);
    });
    todayBtn.addEventListener('click', () => {
      const n = new Date();
      state.year = n.getFullYear();
      state.month = n.getMonth();
      // Clamp to bounds just in case
      if (lt(state.year, state.month, minYear, minMonth)) { state.year = minYear; state.month = minMonth; }
      if (gt(state.year, state.month, maxYear, maxMonth)) { state.year = maxYear; state.month = maxMonth; }
      renderCalendar(targetId, events, filterGames, state);
    });
  }
}

function renderTodayMatches(targetId, matches, filterGames) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const today = formatDate(new Date());
  const filtered = matches.filter(m => m.date === today && (!filterGames || !filterGames.size || filterGames.has(m.game)));
  const list = document.createElement('div'); list.className = 'list';
  if (!filtered.length) {
    const empty = document.createElement('div'); empty.className = 'item'; empty.textContent = '오늘 예정된 경기가 없습니다.'; list.appendChild(empty);
  } else {
    filtered.forEach(m => {
      const item = document.createElement('div'); item.className = 'item';
      const title = document.createElement('div'); title.className = 'title'; title.textContent = `${m.teams}`;
      const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = `${m.tournament} · ${m.time}`;
      const badge = document.createElement('span'); badge.className = `badge ${m.game}`;
      badge.textContent = m.game === 'lol' ? 'LoL' : m.game === 'val' ? 'VAL' : 'OW';
      item.appendChild(title); item.appendChild(meta); item.appendChild(badge);
      list.appendChild(item);
    });
  }
  container.innerHTML = '';
  container.appendChild(list);
}

function setupMainPage() {
  const filterSet = new Set();
  const now = new Date();
  const calState = { year: now.getFullYear(), month: now.getMonth() };
  const checkboxes = document.querySelectorAll('input[name="game-filter"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      filterSet.clear();
      document.querySelectorAll('input[name="game-filter"]:checked').forEach(el => filterSet.add(el.value));
      renderCalendar('calendar', EVENTS, filterSet, calState);
      renderTodayMatches('today-matches', MATCHES, filterSet);
    });
  });
  renderCalendar('calendar', EVENTS, filterSet, calState);
  renderTodayMatches('today-matches', MATCHES, filterSet);
}

function renderGamePage(game) {
  const left = document.getElementById('game-events');
  const right = document.getElementById('current-tournaments');
  if (!left || !right) return;
  const events = EVENTS.filter(e => e.game === game);

  const pastFuture = events.filter(e => e.status === 'past' || e.status === 'future' || e.status === 'upcoming');
  const current = events.filter(e => e.status === 'current');

  const listLeft = document.createElement('div'); listLeft.className = 'list';
  pastFuture.forEach(e => {
    const item = document.createElement('div'); item.className = 'item';
    const title = document.createElement('div'); title.className = 'title'; title.textContent = e.title;
    const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = `${e.location} · ${e.startDate} ~ ${e.endDate}`;
    item.appendChild(title); item.appendChild(meta); listLeft.appendChild(item);
  });
  left.innerHTML = ''; left.appendChild(listLeft);

  const listRight = document.createElement('div'); listRight.className = 'list';
  if (!current.length) {
    const empty = document.createElement('div'); empty.className = 'item'; empty.textContent = '현재 진행중인 대회가 없습니다.'; listRight.appendChild(empty);
  } else {
    current.forEach(e => {
      const item = document.createElement('div'); item.className = 'item';
      const title = document.createElement('div'); title.className = 'title'; title.textContent = e.title;
      const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = `${e.location} · ${e.startDate} ~ ${e.endDate}`;
      item.appendChild(title); item.appendChild(meta); listRight.appendChild(item);
    });
  }
  right.innerHTML = ''; right.appendChild(listRight);
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
