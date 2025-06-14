const users = {};

// Login logic
function login() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  if (!u || !p) {
    alert("Enter username and password");
    return;
  }
  const savedUser = localStorage.getItem('username');
  const savedPass = localStorage.getItem('password');
  if (savedUser && savedPass) {
    if (u === savedUser && p === savedPass) {
      enterSystem(u);
    } else {
      alert("Wrong credentials");
    }
  } else {
    localStorage.setItem('username', u);
    localStorage.setItem('password', p);
    enterSystem(u);
  }
}

function enterSystem(user) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('user-display').innerText = user;
  nextWorkout();
  loadQuest();
}

const workouts = [
  "10 Pushups (E-Rank)", "20 Squats + 15 Sit-ups (D-Rank)",
  "30 Pushups + 20 Jumping Jacks (C-Rank)", "Weighted Burpees + Plank (B-Rank)",
  "Explosive Pushups + Tuck Jumps (A-Rank)", "SSS-Rank: Full Body Burnout - 15 min HIIT"
];

const quests = [
  "Do 50 jumping jacks", "Complete 15 burpees", "Stretch for 5 minutes",
  "Run for 10 minutes", "Meditate for 5 minutes", "Complete 3 dungeons"
];

function nextWorkout() {
  const workout = workouts[Math.floor(Math.random() * workouts.length)];
  document.getElementById('rank-workout').innerText = workout;
}

function loadQuest() {
  const quest = quests[Math.floor(Math.random() * quests.length)];
  document.getElementById('daily-quest').innerText = quest;
}

function completeQuest() {
  alert("Quest Completed! +50 EXP +5 Gems");
}

function startDungeon() {
  const confirmEntry = confirm("Are you ready to fight the dungeon boss?");
  if (confirmEntry) {
    alert("Dungeon started! Complete your task in 10 mins.");
  }
}
