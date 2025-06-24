document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("bt-logout");
    console.log("Logout button found:", logoutBtn);

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async function (e) {
            e.preventDefault();

            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/login";
                return;
            }

            try {
                await fetch("http://localhost:8080/custom-logout", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                localStorage.removeItem("token");
                window.location.href = "/login";
            } catch (error) {
                console.error("Erro ao fazer logout:", error);
                alert("Erro ao sair. Tente novamente.");
            }
        });
    }
});
