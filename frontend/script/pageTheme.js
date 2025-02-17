const button = document.getElementById("theme-toggle");
const body = document.body;

// Controlla se l'utente ha già scelto un tema
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  button.textContent = "☀️";
}

// Quando l'utente clicca, cambia tema
button.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Salva la scelta nel localStorage
    if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    button.textContent = "☀️";
    } else {
    localStorage.setItem("theme", "light");
    button.textContent = "🌙";
    }
});