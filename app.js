const program = {
  "Phase 1": {
    name: "Weeks 1–3",
    days: {
      "Day 1 — Lower (Volume)": [
        { name: "Back Squat", sets: "4×8" },
        { name: "RDL", sets: "4×10" },
        { name: "Walking Lunges", sets: "3×12" }
      ],
      "Day 2 — Upper Push": [
        { name: "Bench Press", sets: "4×8" },
        { name: "Incline DB Press", sets: "3×10" },
        { name: "Triceps Superset", sets: "3×12" }
      ]
    }
  },
  "Phase 2": { name: "Weeks 4–6", days: { /* ... */ } },
  "Phase 3": { name: "Weeks 7–9", days: { /* ... */ } },
  "Phase 4": { name: "Weeks 10–12", days: { /* ... */ } }
};
function renderPhases() {
  const tabs = document.getElementById('phaseTabs');
  const content = document.getElementById('phaseContent');

  Object.entries(program).forEach(([phaseKey, phaseData], index) => {
    const phaseId = phaseKey.replace(/\s+/g, '_');

    // Create tab button
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
      <button class="nav-link ${index === 0 ? 'active' : ''}"
              data-bs-toggle="pill"
              data-bs-target="#${phaseId}"
              type="button">
        ${phaseData.name}
      </button>`;
    tabs.appendChild(li);

    // Create tab-pane content
    const div = document.createElement('div');
    div.className = `tab-pane fade ${index === 0 ? 'show active' : ''}`;
    div.id = phaseId;

    Object.entries(phaseData.days).forEach(([dayName, lifts]) => {
      const card = document.createElement('div');
      card.className = 'card p-3';

      const liftList = lifts.map(l => `<span>${l.name} ${l.sets}</span>`).join('');
      card.innerHTML = `<p class="fw-semibold">${dayName}</p>${liftList}`;
      div.appendChild(card);
    });

    content.appendChild(div);
  });
}
function renderToday() {
  const activeTab = document.querySelector('.phase-tabs .nav-link.active');
  const phaseName = activeTab.innerText;

  const phaseKey = Object.keys(program).find(k => program[k].name === phaseName);
  const phaseData = program[phaseKey];

  const firstDayName = Object.keys(phaseData.days)[0];
  const lifts = phaseData.days[firstDayName];

  const todayLiftsDiv = document.getElementById('todayLifts');
  todayLiftsDiv.innerHTML = '';

  lifts.forEach((lift, i) => {
    const liftId = `lift-${phaseKey}-${firstDayName}-${i}`;
    const checked = JSON.parse(localStorage.getItem(liftId)) || false;

    const row = document.createElement('div');
    row.className = 'lift-row';
    if (checked) row.classList.add('completed');

    row.innerHTML = `
      <input type="checkbox" id="${liftId}" ${checked ? 'checked' : ''} aria-label="${lift.name} complete">
      <span>${lift.name} ${lift.sets}</span>
      <input type="number" class="form-control form-control-sm" placeholder="lbs">
    `;

    todayLiftsDiv.appendChild(row);

    // Persist checkbox state
    row.querySelector('input[type="checkbox"]').addEventListener('change', e => {
      row.classList.toggle('completed', e.target.checked);
      localStorage.setItem(liftId, JSON.stringify(e.target.checked));
    });
  });

  // StairClimber
  const stairCheckbox = document.getElementById('stairCheckbox');
  stairCheckbox.checked = JSON.parse(localStorage.getItem('stairCheckbox')) || false;
  stairCheckbox.addEventListener('change', () => {
    stairCheckbox.closest('.alert').classList.toggle('checked', stairCheckbox.checked);
    localStorage.setItem('stairCheckbox', JSON.stringify(stairCheckbox.checked));
  });
  stairCheckbox.closest('.alert').classList.toggle('checked', stairCheckbox.checked);

  // Update Today card title
  const today = new Date();
  const formattedDate = `${String(today.getMonth()+1).padStart(2,'0')}/${String(today.getDate()).padStart(2,'0')}/${String(today.getFullYear()).slice(-2)}`;
  document.getElementById('todayTitle').innerText = `Today’s Workout — ${formattedDate} (${firstDayName})`;
}
document.querySelectorAll('.phase-tabs .nav-link').forEach(tab => {
  tab.addEventListener('shown.bs.tab', () => {
    renderToday(); // Update Today card based on selected phase
  });
});
