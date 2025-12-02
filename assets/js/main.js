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

function renderCalendar(targetId, events, filterGames) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const now = new Date();
  const { days } = getMonthDays(now.getFullYear(), now.getMonth());
  const filtered = filterGames && filterGames.size ? events.filter(e => filterGames.has(e.game)) : events;

  const weekdayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const weekdayRow = document.createElement('div');
  weekdayRow.className = 'weekday';
  weekdayNames.forEach(w => {
    const el = document.createElement('div'); el.textContent = w; weekdayRow.appendChild(el);
  });

  const grid = document.createElement('div');
  grid.className = 'calendar';
  grid.appendChild(weekdayRow);

  days.forEach(day => {
    const dayEl = document.createElement('div'); dayEl.className = 'day';
    const dateEl = document.createElement('div'); dateEl.className = 'date'; dateEl.textContent = day.getDate();
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
  container.appendChild(grid);
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
  const checkboxes = document.querySelectorAll('input[name="game-filter"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      filterSet.clear();
      document.querySelectorAll('input[name="game-filter"]:checked').forEach(el => filterSet.add(el.value));
      renderCalendar('calendar', EVENTS, filterSet);
      renderTodayMatches('today-matches', MATCHES, filterSet);
    });
  });
  renderCalendar('calendar', EVENTS, filterSet);
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
