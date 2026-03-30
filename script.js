const form = document.getElementById("entryForm");
const entriesContainer = document.getElementById("entries");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

// Render entries
function renderEntries() {
  entriesContainer.innerHTML = "";

  entries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "entry";

    div.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      <small>${entry.date}</small>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;

    entriesContainer.appendChild(div);
  });
}

// Add entry
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newEntry = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    date: document.getElementById("date").value
  };

  entries.push(newEntry);
  localStorage.setItem("entries", JSON.stringify(entries));

  form.reset();
  renderEntries();
});

// Delete entry
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
}

// Initial load
renderEntries();

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

// Install prompt
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  installBtn.hidden = true;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
});