document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const tipo = localStorage.getItem("tipoUsuario");

  if (!token) {
    window.location.href = "/login";
  }

  if (window.location.pathname === "/dashboard" && tipo !== "MOTORISTA") {
    window.location.href = "/login";
  }

  if (window.location.pathname === "/home" && tipo !== "PASSAGEIRO") {
    window.location.href = "/login";
  }
});
