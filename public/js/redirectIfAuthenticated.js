document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        const userRole = payload.role;

        if (userRole === "ROLE_MOTORISTA") {
            window.location.href = "/dashboard";
        } else if (userRole === "ROLE_PASSAGEIRO") {
            window.location.href = "/home";
        }

    } catch (e) {
        console.error("Token inválido:", e);
    }
});
