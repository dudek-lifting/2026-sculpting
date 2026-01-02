/* ============================
   PROGRAM DATA (4 DAYS / WEEK)
   SAME LIFTS FOR 3 WEEKS
============================ */

const programBlocks = {
  1: {
    label: "Weeks 1–3",
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
    label: "Weeks 4–6",
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
  },

  3: {
    label: "Weeks 7–9",
    days: {
      1: {
        title: "Back & Trapezius",
        lifts: [
          "Pull-Ups",
          "T-Bar Rows",
          "Pendlay Rows",
          "Dumbbell Pullovers",
          "Rack Pulls",
          "Barbell Shrugs"
        ]
      },
      2: {
        title: "Chest",
        lifts: [
          "Barbell Press (Smith)",
          "Incline DB Press",
          "Dumbbell Flys",
          "Weighted Dips",
          "Cable Crossovers",
          "Landmine Press"
        ]
      },
      3: {
        title: "Legs & Calves",
        lifts: [
          "Box Squats",
          "Walking Lunges",
          "Romanian Deadlifts",
          "Hamstring Curls",
          "Seated Calf Raises"
        ]
      },
      4: {
        title: "Arms",
        lifts: [
          "Skull Crushers",
          "Close-Grip Bench Press",
          "Rope Extensions",
          "Seated DB Curls",
          "Underhand Pulldowns",
          "Reverse Curls"
        ]
      }
    }
  },

  4: {
    label: "Weeks 10–12",
    days: {
      1: {
        title: "Back & Chest",
        lifts: [
          "Flat DB Bench Press",
          "Dumbbell Pullovers",
          "Straight-Arm Pulldowns",
          "Incline DB Flys",
          "Bent-Over DB Rows",
          "Pull-Ups"
        ]
      },
      2: {
        title: "Legs",
        lifts: [
          "Squats",
          "Romanian Deadlifts",
          "Walking Lunges",
          "Leg Extensions",
          "Hamstring Curls",
          "Standing Calf Raises"
        ]
      },
      3: {
        title: "Shoulders & Traps",
        lifts: [
          "Arnold Press",
          "Cable Face Pulls",
          "Bent-Over Lateral Raises",
          "Lateral Raises",
          "Barbell Shrugs"
        ]
      },
      4: {
        title: "Arms",
        lifts: [
          "Close-Grip Bench Press",
          "Bench Dips",
          "Cable Tricep Extensions",
          "Concentration Curls",
          "Cable Curls"
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
   STORAGE KEY
============================ */

function key(block, day, lift) {
  return `b${block}-d${day}-${lift}`;
}

/* ============================
   RENDER FUNCTIONS
============================ */

function renderTabs() {
  Object.entries(programBlocks).forEach(([block, data], index) => {
    const btn = document.createElement("button");
    btn.className = `nav-link ${index === 0 ? "active" : ""}`;
    btn.textContent = data.label;
    btn.onclick = () => renderBlock(block, btn);
    phaseTabs.appendChild(btn);
  });
}

function renderBlock(block, btn) {
  document.querySelectorAll(".phase-tabs .nav-link")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  phaseContent.innerHTML = "";

  Object.entries(programBlocks[block].days).forEach(([dayNum, day]) => {
    const card = document.createElement("div");
    card.className = "card p-3";

    card.innerHTML = `
      <p class="fw-semibold">Day ${dayNum} — ${day.title}</p>

      ${day.lifts.map(lift => `
        <div class="lift-row">
          <input type="checkbox"
            ${localStorage.getItem(key(block, dayNum, lift)) === "done" ? "checked" : ""}
            onchange="localStorage.setItem('${key(block, dayNum, lift)}', this.checked ? 'done' : '')">
          <span>${lift}</span>
          <input type="number"
            class="form-control form-control-sm"
            placeholder="lbs"
            value="${localStorage.getItem(key(block, dayNum, lift + '-w')) || ""}"
            oninput="localStorage.setItem('${key(block, dayNum, lift + '-w')}', this.value)">
        </div>
      `).join("")}

      <div class="lift-row mt-2">
        <input type="checkbox"
          ${localStorage.getItem(key(block, dayNum, "StairClimber")) === "done" ? "checked" : ""}
          onchange="localStorage.setItem('${key(block, dayNum, "StairClimber")}', this.checked ? 'done' : '')">
        <span>StairClimber — 30 min steady</span>
      </div>
    `;

    phaseContent.appendChild(card);
  });
}

/* ============================
   INIT
============================ */

renderTabs();
renderBlock("1", phaseTabs.children[0]);
