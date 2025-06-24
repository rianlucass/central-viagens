document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const navPublica = document.getElementById("nav-publica");
  const navLogada = document.getElementById("nav-logada");
  const bemVindo = document.getElementById("bem-vindo");
  const btnLogout = document.getElementById("btn-logout");

  if (token) {
    // Usuário está logado
    navLogada.style.display = "flex";
    navPublica.style.display = "none";

    if (username && bemVindo) {
      bemVindo.textContent = `Olá, ${username}`;
    }

    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "/login";
      });
    }
  } else {
    // Usuário não está logado
    navPublica.style.display = "flex";
    navLogada.style.display = "none";
  }
});
