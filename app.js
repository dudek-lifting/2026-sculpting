/* ==========================
   PROGRAM DATA (12-WEEK COMPLETE)
========================== */
const program = {
  "Phase 1": {
    name: "Weeks 1–3",
    days: {
      "Day 1 — Lower (Volume)": [
        { name: "Back Squat", sets: "4×8" },
        { name: "Romanian Deadlift", sets: "4×10" },
        { name: "Walking Lunges", sets: "3×12" }
      ],
      "Day 2 — Upper Push": [
        { name: "Bench Press", sets: "4×8" },
        { name: "Incline DB Press", sets: "3×10" },
        { name: "Triceps Superset", sets: "3×12" }
      ]
    }
  },
  "Phase 2": {
    name: "Weeks 4–6",
    days: {
      "Day 1 — Lower Intensity": [
        { name: "Back Squat", sets: "5×5" },
        { name: "Romanian Deadlift", sets: "4×8" },
        { name: "Front Lunges", sets: "3×12" },
        { name: "Leg Press", sets: "3×10" }
      ],
      "Day 2 — Upper Push Intensity": [
        { name: "Bench Press", sets: "5×5" },
        { name: "Incline DB Press", sets: "4×8" },
        { name: "DB Lateral Raises", sets: "3×15" },
        { name: "Triceps Rope Pushdown", sets: "3×12" }
      ]
    }
  },
  "Phase 3": {
    name: "Weeks 7–9",
    days: {
      "Day 1 — Strength Peak Lower": [
        { name: "Back Squat", sets: "3–5 reps" },
        { name: "Deadlift", sets: "3–5 reps" },
        { name: "Walking Lunges", sets: "3×10" }
      ],
      "Day 2 — Strength Peak Upper": [
        { name: "Bench Press", sets: "3–5 reps" },
        { name: "Pull-Ups", sets: "3×6–10" },
        { name: "DB Rows", sets: "3×8–12" },
        { name: "Overhead Press", sets: "3×6–10" }
      ]
    }
  },
  "Phase 4": {
    name: "Weeks 10–12",
    days: {
      "Day 1 — Final Sculpt Lower": [
        { name: "Back Squat", sets: "4×12" },
        { name: "RDL", sets: "4×12" },
        { name: "Walking Lunges", sets: "3×15" },
        { name: "Leg Press", sets: "3×12" }
      ],
      "Day 2 — Final Sculpt Upper": [
        { name: "Bench Press", sets: "4×12" },
        { name: "Incline DB Press", sets: "4×12" },
        { name: "Pull-Ups", sets: "3×10–12" },
        { name: "DB Lateral Raises", sets: "3×15" },
        { name: "Triceps Superset", sets: "3×12–15" }
      ]
    }
  }
};

/* ==========================
   HELPER FUNCTIONS
========================== */

// Map weekday to day in phase
function getTodayDayName(phaseData) {
  const dayNames = Object.keys(phaseData.days);
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday=0
  return dayNames[todayIndex % dayNames.length] || dayNames[0];
}

/* ==========================
   RENDER PHASE TABS & CARDS
========================== */
function renderPhases() {
  const tabs = document.getElementById('phaseTabs');
  const content = document.getElementById('phaseContent');

  Object.entries(program).forEach(([phaseKey, phaseData], index) => {
    const phaseId = phaseKey.replace(/\s+/g, '_');

    // Tab button
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
      <button class="nav-link ${index===0?'active':''}" 
              data-bs-toggle="pill" 
              data-bs-target="#${phaseId}" 
              type="button">
        ${phaseData.name}
      </button>
    `;
    tabs.appendChild(li);

    // Tab content
    const div = document.createElement('div');
    div.className = `tab-pane fade ${index===0?'show active':''}`;
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

/* ==========================
   RENDER TODAY’S WORKOUT
========================== */
function renderToday() {
  const activeTab = document.querySelector('.phase-tabs .nav-link.active');
  const phaseName = activeTab.innerText;
  const phaseKey = Object.keys(program).find(k => program[k].name === phaseName);
  const phaseData = program[phaseKey];

  const todayDayName = getTodayDayName(phaseData);
  const lifts = phaseData.days[todayDayName];

  const todayLiftsDiv = document.getElementById('todayLifts');
  todayLiftsDiv.innerHTML = '';

  lifts.forEach((lift, i) => {
    const liftId = `lift-${phaseKey}-${todayDayName}-${i}`;
    const checked = JSON.parse(localStorage.getItem(liftId)) || false;

    const row = document.createElement('div');
    row.className = 'lift-row';
    if (checked) row.classList.add('completed');

    row.innerHTML = `
      <input type="checkbox" id="${liftId}" ${checked?'checked':''} aria-label="${lift.name} complete">
      <span>${lift.name} ${lift.sets}</span>
      <input type="number" class="form-control form-control-sm" placeholder="lbs">
    `;

    todayLiftsDiv.appendChild(row);

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
  document.getElementById('todayTitle').innerText = `Today’s Workout — ${formattedDate} (${todayDayName})`;
}

/* ==========================
   TAB EVENT LISTENER
========================== */
function setupTabListeners() {
  document.querySelectorAll('.phase-tabs .nav-link').forEach(tab => {
    tab.addEventListener('shown.bs.tab', () => {
      renderToday();
    });
  });
}

/* ==========================
   INITIALIZE APP
========================== */
document.addEventListener('DOMContentLoaded', () => {
  renderPhases();
  renderToday();
  setupTabListeners();
});
