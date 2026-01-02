/***********************
 * PHASE CONFIG
 ***********************/
const phases = [
  { id: '1-3', label: 'Weeks 1–3' },
  { id: '4-6', label: 'Weeks 4–6' },
  { id: '7-9', label: 'Weeks 7–9' },
  { id: '10-12', label: 'Weeks 10–12' }
];

/***********************
 * STORAGE HELPERS
 ***********************/
const getPhaseDates = () =>
  JSON.parse(localStorage.getItem('phaseStartDates')) || {};

const setPhaseDate = (phaseId, date) => {
  const dates = getPhaseDates();
  dates[phaseId] = date;
  localStorage.setItem('phaseStartDates', JSON.stringify(dates));
};

/***********************
 * WEEK CALCULATION
 ***********************/
const getCurrentWeek = (startDate) => {
  if (!startDate) return null;
  const start = new Date(startDate);
  const today = new Date();
  const diffDays = Math.floor(
    (today - start) / (1000 * 60 * 60 * 24)
  );
  return Math.min(3, Math.floor(diffDays / 7) + 1);
};

/***********************
 * TAB RENDERING
 ***********************/
function renderTabs(activePhase = '1-3') {
  const tabs = document.getElementById('phaseTabs');
  tabs.innerHTML = '';

  phases.forEach(phase => {
    const li = document.createElement('li');
    li.className = 'nav-item';

    const btn = document.createElement('button');
    btn.className = `nav-link ${phase.id === activePhase ? 'active' : ''}`;
    btn.textContent = phase.label;
    btn.onclick = () => {
      document
        .querySelectorAll('.nav-link')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPhase(phase.id);
    };

    li.appendChild(btn);
    tabs.appendChild(li);
  });
}

/***********************
 * PHASE CONTENT
 ***********************/
function renderPhase(phaseId) {
  const container = document.getElementById('phaseContent');
  container.innerHTML = '';

  const phaseDates = getPhaseDates();
  const startDate = phaseDates[phaseId];
  const currentWeek = getCurrentWeek(startDate);

  /* Phase Header */
  const header = document.createElement('div');
  header.className = 'phase-header mb-4';

  header.innerHTML = `
    <h3>${phases.find(p => p.id === phaseId).label}</h3>
    <div class="phase-meta">
      <label>
        📅 Phase start:
        <input type="date" value="${startDate || ''}" />
      </label>
      ${
        currentWeek
          ? `<div class="current-week">Current: Week ${currentWeek} of 3</div>`
          : `<div class="current-week muted">Select a start date</div>`
      }
    </div>
  `;

  header.querySelector('input').addEventListener('change', (e) => {
    setPhaseDate(phaseId, e.target.value);
    renderPhase(phaseId);
  });

  container.appendChild(header);

  /* Workout Days */
  getWorkoutsForPhase(phaseId).forEach(day => {
    const card = document.createElement('div');
    card.className = 'card workout-day mb-3';

    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${day.title}</h5>
        <ul class="list-group list-group-flush">
          ${day.exercises
            .map(ex => `<li class="list-group-item">${ex}</li>`)
            .join('')}
        </ul>
      </div>
    `;

    container.appendChild(card);
  });
}

/***********************
 * WORKOUT DATA
 * (StairClimber INCLUDED PER DAY)
 ***********************/
function getWorkoutsForPhase() {
  return [
    {
      title: 'Day 1',
      exercises: [
        'Primary lifts (per program)',
        'Accessory lifts (per program)',
        'StairClimber — 30 min steady'
      ]
    },
    {
      title: 'Day 2',
      exercises: [
        'Primary lifts (per program)',
        'Accessory lifts (per program)',
        'StairClimber — 30 min steady'
      ]
    },
    {
      title: 'Day 3',
      exercises: [
        'Primary lifts (per program)',
        'Accessory lifts (per program)',
        'StairClimber — 30 min steady'
      ]
    },
    {
      title: 'Day 4',
      exercises: [
        'Primary lifts (per program)',
        'Accessory lifts (per program)',
        'StairClimber — 30 min steady'
      ]
    }
  ];
}

/***********************
 * INIT
 ***********************/
document.addEventListener('DOMContentLoaded', () => {
  renderTabs();
  renderPhase('1-3');
});
