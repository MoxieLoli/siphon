// Elements
const usernameInput = document.getElementById("usernameInput");
const loginScreen = document.getElementById("loginScreen");
const systemUI = document.getElementById("systemUI");
const playerName = document.getElementById("playerName");
const playerLevel = document.getElementById("playerLevel");
const expFill = document.getElementById("expFill");
const questList = document.getElementById("questList");
const dungeonTimer = document.getElementById("dungeonTimer");
const lootResult = document.getElementById("lootResult");

// Audio
const clickSound = document.getElementById("sfxClick");
const levelUpSound = document.getElementById("levelUpSound");
const lootSound = document.getElementById("lootSound");
const dungeonSound = document.getElementById("dungeonSound");

let user = {
  name: "",
  level: 1,
  exp: 0,
  inventory: [],
  stats: {
    str: 1,
    agi: 1,
    end: 1,
    spd: 1,
    vit: 1,
  },
};

// Handle Login
function login() {
  const name = usernameInput.value.trim();
  if (name) {
    user.name = name;
    localStorage.setItem("user", JSON.stringify(user));
    playerName.textContent = name;
    playerLevel.textContent = "Lv. 1";
    loginScreen.classList.add("hidden");
    systemUI.classList.remove("hidden");
    playSound();
    generateQuests();
  } else {
    alert("Enter your name to continue.");
  }
}

// Play Click Sound
function playSound() {
  clickSound.volume = 0.6;
  clickSound.play();
}

// Generate Random Quests
function generateQuests() {
  const quests = [
    "Do 10 push-ups 💪",
    "Run in place for 1 minute 🏃",
    "20 jumping jacks 🦘",
    "15 sit-ups 🧘",
    "Hold plank for 30s 🤸",
  ];

  questList.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const quest = document.createElement("div");
    quest.className = "quest";
    quest.textContent = quests[Math.floor(Math.random() * quests.length)];
    questList.appendChild(quest);
  }
}

// Start Dungeon
function startDungeon() {
  dungeonSound.play();
  let timeLeft = 10;
  dungeonTimer.textContent = `Dungeon starts in ${timeLeft}s`;
  const timer = setInterval(() => {
    timeLeft--;
    dungeonTimer.textContent = `Dungeon starts in ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      dungeonTimer.textContent = "💥 Dungeon Challenge Started!";
      gainEXP(10);
    }
  }, 1000);
}

// Gain EXP and Handle Level Up
function gainEXP(amount) {
  user.exp += amount;
  if (user.exp >= 100) {
    user.exp = 0;
    user.level++;
    playerLevel.textContent = `Lv. ${user.level}`;
    levelUpSound.play();
  }
  expFill.style.width = `${user.exp}%`;
}

// Open Loot Box
function openLootBox() {
  lootSound.play();
  const loot = ["🔥 Fire Glove", "⚡ Speed Boots", "💎 Health Potion", "🔮 XP Orb"];
  const reward = loot[Math.floor(Math.random() * loot.length)];
  user.inventory.push(reward);
  lootResult.textContent = `You received: ${reward}`;
}

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.reload();
}