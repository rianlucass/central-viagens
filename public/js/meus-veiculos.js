document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("containerVeiculos");
    const mensagemErro = document.getElementById("mensagemErro");

    fetch('http://localhost:8080/motorista/veiculos', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao buscar veículos");
        }
        return res.json();
    })
    .then(veiculos => {
        if (veiculos.length === 0) {
            container.innerHTML = "<p>Nenhum veículo cadastrado ainda.</p>";
            return;
        }

        veiculos.forEach(veiculo => {
            const card = criarCardVeiculo(veiculo);
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar veículos:", error);
        mensagemErro.classList.remove("d-none");
    });
});

function criarCardVeiculo(veiculo) {
    const card = document.createElement("div");
    card.className = "card-veiculo";

    card.innerHTML = `
        <h5>${veiculo.modelo} - ${veiculo.marca}</h5>
        <p><strong>Tipo:</strong> ${veiculo.tipo}</p>
        <p><strong>Placa:</strong> ${veiculo.placa}</p>
        <p><strong>Ano:</strong> ${veiculo.ano}</p>
        <p><strong>Capacidade:</strong> ${veiculo.capacidade} passageiros</p>
        <small><strong>Proprietário:</strong> ${veiculo.proprietario}</small>
        <div>
            <button class="btn btn-outline-secondary btn-sm btn-editar">Gerenciar</button>
        </div>
    `;

    return card;
}
