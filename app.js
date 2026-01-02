/* ============================
   PROGRAM DATA (4 DAYS / WEEK)
============================ */

const program = {
  1: {
    phase: "Foundation Volume",
    days: {
      1: {
        title: "Back & Rear Delts",
        lifts: [
          "Deadlifts",
          "Pull-Ups",
          "Single-Arm DB Rows",
          "T-Bar Rows",
          "Bent-Over Lateral Raises"
        ]
      },
      2: {
        title: "Chest & Anterior / Lateral Delts",
        lifts: [
          "Incline DB Press",
          "Flat Bench Press",
          "Landmine Press",
          "Dumbbell Flys",
          "Alt DB Front Raises",
          "Lateral Raises"
        ]
      },
      3: {
        title: "Legs",
        lifts: [
          "Squats",
          "Walking Lunges",
          "Romanian Deadlifts",
          "Glute Bridges",
          "Kettlebell Swings",
          "Seated Calf Raises"
        ]
      },
      4: {
        title: "Arms & Traps",
        lifts: [
          "Alt Hammer Curls",
          "Close-Grip Bench Press",
          "Barbell Shrug / High Row",
          "Skull Crushers",
          "Barbell Curls",
          "Single-Arm Cable Pushdowns",
          "Underhand Pulldowns"
        ]
      }
    }
  },

  2: {
    phase: "Foundation Volume II",
    days: {
      1: {
        title: "Back & Rear Delts",
        lifts: [
          "Deadlifts (Smith)",
          "Inverted Rows / Pull-Ups",
          "Renegade Rows",
          "Single-Arm Cable Rows",
          "Rear Delt Raises",
          "Straight-Bar Cable Rows"
        ]
      },
      2: {
        title: "Chest & Delts",
        lifts: [
          "Incline DB Press",
          "Flat Bench Press",
          "Landmine Press",
          "Decline DB Flys",
          "Alt DB Front Raises",
          "Lateral Raises"
        ]
      },
      3: {
        title: "Legs",
        lifts: [
          "Squats",
          "Walking Lunges",
          "Romanian Deadlifts",
          "Glute Bridges",
          "Kettlebell Swings",
          "Seated Calf Raises"
        ]
      },
      4: {
        title: "Arms & Traps",
        lifts: [
          "Close-Grip Bench Press",
          "Skull Crushers",
          "Kickbacks",
          "Underhand Pulldowns",
          "Barbell Curls",
          "Hammer Curls",
          "Barbell Shrug / High Row"
        ]
      }
    }
  }
};

/* ============================
   DOM REFERENCES
============================ */

const phaseTabs = document.getElementById("phaseTabs");
const phaseContent = document.getElementById("phaseContent");

/* ============================
   STORAGE HELPERS
============================ */

function liftKey(week, day, lift) {
  return `w${week}-d${day}-${lift}`;
}

/* ============================
   RENDER FUNCTIONS
============================ */

function renderWeekTabs() {
  Object.keys(program).forEach((week, i) => {
    const btn = document.createElement("button");
    btn.className = `nav-link ${i === 0 ? "active" : ""}`;
    btn.textContent = `Week ${week}`;
    btn.dataset.week = week;
    btn.onclick = () => renderWeek(week, btn);
    phaseTabs.appendChild(btn);
  });
}

function renderWeek(week, clickedBtn) {
  document
    .querySelectorAll(".phase-tabs .nav-link")
    .forEach(b => b.classList.remove("active"));
  clickedBtn.classList.add("active");

  phaseContent.innerHTML = "";

  Object.entries(program[week].days).forEach(([dayNum, day]) => {
    const card = document.createElement("div");
    card.className = "card p-3";

    card.innerHTML = `
      <p class="fw-semibold">Day ${dayNum} — ${day.title}</p>

      ${day.lifts.map(lift => `
        <div class="lift-row">
          <input type="checkbox"
            ${localStorage.getItem(liftKey(week, dayNum, lift)) === "done" ? "checked" : ""}
            onchange="localStorage.setItem('${liftKey(week, dayNum, lift)}', this.checked ? 'done' : '')">
          <span>${lift}</span>
          <input
            type="number"
            class="form-control form-control-sm"
            placeholder="lbs"
            value="${localStorage.getItem(liftKey(week, dayNum, lift + '-w')) || ""}"
            oninput="localStorage.setItem('${liftKey(week, dayNum, lift + '-w')}', this.value)">
        </div>
      `).join("")}

      <!-- StairClimber -->
      <div class="lift-row mt-2">
        <input type="checkbox"
          ${localStorage.getItem(liftKey(week, dayNum, "StairClimber")) === "done" ? "checked" : ""}
          onchange="localStorage.setItem('${liftKey(week, dayNum, "StairClimber")}', this.checked ? 'done' : '')">
        <span>StairClimber — 30 min (steady)</span>
      </div>
    `;

    phaseContent.appendChild(card);
  });
}

/* ============================
   INIT
============================ */

renderWeekTabs();
renderWeek(Object.keys(program)[0], phaseTabs.children[0]);
