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
  },

  3: {
    phase: "Foundation Volume III",
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
        title: "Chest & Delts",
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
          "Close-Grip Bench Press",
          "Skull Crushers",
          "Kickbacks",
          "Underhand Pulldowns",
          "Barbell Curls",
          "Hammer Curls",
          "Barbell Shrugs"
        ]
      }
    }
  },

  4: {
    phase: "Structural Strength",
    days: {
      1: {
        title: "Legs & Calves",
        lifts: [
          "Squats",
          "Step-Ups",
          "Trap Bar Deadlifts",
          "Lateral Box Squats",
          "Romanian Deadlifts",
          "Seated Calf Raises"
        ]
      },
      2: {
        title: "Back, Traps & Biceps",
        lifts: [
          "Incline DB Curls",
          "Dumbbell Shrugs",
          "Dumbbell Pullovers",
          "Bent-Over Rows (Smith)",
          "V-Grip Pull-Ups",
          "Drag Curls"
        ]
      },
      3: {
        title: "Chest, Triceps & Back",
        lifts: [
          "Flat DB Press",
          "Single-Arm DB Rows",
          "Single-Arm DB Press",
          "Incline Flys",
          "Rear Delt Raises",
          "Incline Barbell Press"
        ]
      },
      4: {
        title: "Delts & Forearms",
        lifts: [
          "Overhead Press",
          "Reverse Curls",
          "Reverse Upright Rows",
          "Lateral Raises",
          "Single-Arm KB Press",
          "Finger Curls"
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
const todayTitle = document.getElementById("todayTitle");
const todayCard = document.getElementById("todayWorkout");

/* ============================
   DATE & DAY LOGIC
============================ */

const today = new Date();
const formattedDate = today.toLocaleDateString();
const workoutDay = (today.getDay() + 6) % 7 % 4 + 1; // cycles Day 1–4

todayTitle.textContent = `Today’s Workout — ${formattedDate}`;

/* ============================
   STORAGE HELPERS
============================ */

function storageKey(week, day, lift) {
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
            ${localStorage.getItem(storageKey(week, dayNum, lift)) === "done" ? "checked" : ""}
            onchange="localStorage.setItem('${storageKey(week, dayNum, lift)}','done')">
          <span>${lift}</span>
          <input type="number" class="form-control form-control-sm"
            placeholder="lbs"
            value="${localStorage.getItem(storageKey(week, dayNum, lift + '-w')) || ""}"
            oninput="localStorage.setItem('${storageKey(week, dayNum, lift + '-w')}', this.value)">
        </div>
      `).join("")}
    `;

    phaseContent.appendChild(card);
  });

  renderTodayWorkout(week);
}

function renderTodayWorkout(week) {
  todayCard.innerHTML = "";

  const day = program[week].days[workoutDay];
  if (!day) return;

  const card = document.createElement("div");
  card.className = "card p-3";

  card.innerHTML = `
    <p class="fw-semibold">Day ${workoutDay} — ${day.title}</p>
    ${day.lifts.map(lift => `
      <div class="lift-row">
        <input type="checkbox">
        <span>${lift}</span>
        <input type="number" class="form-control form-control-sm" placeholder="lbs">
      </div>
    `).join("")}
  `;

  todayCard.appendChild(card);
}

/* ============================
   INIT
============================ */

renderWeekTabs();
renderWeek(Object.keys(program)[0], phaseTabs.children[0]);
