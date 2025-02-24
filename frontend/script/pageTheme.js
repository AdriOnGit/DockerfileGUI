const button = document.getElementById("theme-toggle");
const body = document.body;

// Controlla se il tema salvato in localStorage è "dark" e lo applica
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode"); // Aggiunge la classe per il tema scuro
  button.textContent = "☀️";
}

// Aggiunge un event listener per il click sul pulsante
button.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  //Il tema è scuro e viene salvato nel local storage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    button.textContent = "☀️";
  } else { //Il tema è chiaro e viene salvato nel local storage
    localStorage.setItem("theme", "light");
    button.textContent = "🌙";
  }
});