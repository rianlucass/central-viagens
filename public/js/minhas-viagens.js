document.addEventListener("DOMContentLoaded", () => {
    const btnProgramadas = document.getElementById("btn-programadas");
    const btnHistorico = document.getElementById("btn-historico");
    const programadasContainer = document.getElementById("viagensProgramadas");
    const historicoContainer = document.getElementById("historicoViagens");
    const mensagemErro = document.getElementById("mensagemErro");
    const btnEmAndamento = document.getElementById("btn-em-andamento");
    const andamentoContainer = document.getElementById("viagensEmAndamento");

    btnEmAndamento.addEventListener("click", () => {
        btnEmAndamento.classList.add("active");
        btnProgramadas.classList.remove("active");
        btnHistorico.classList.remove("active");

        andamentoContainer.classList.remove("d-none");
        programadasContainer.classList.add("d-none");
        historicoContainer.classList.add("d-none");
    });

    btnProgramadas.addEventListener("click", () => {
        btnProgramadas.classList.add("active");
        btnHistorico.classList.remove("active");
        btnEmAndamento.classList.remove("active"); // Adicionado aqui

        programadasContainer.classList.remove("d-none");
        historicoContainer.classList.add("d-none");
        andamentoContainer.classList.add("d-none"); // Adicionado aqui
    });

    btnHistorico.addEventListener("click", () => {
        btnHistorico.classList.add("active");
        btnProgramadas.classList.remove("active");
        btnEmAndamento.classList.remove("active"); // Adicionado aqui

        historicoContainer.classList.remove("d-none");
        programadasContainer.classList.add("d-none");
        andamentoContainer.classList.add("d-none"); // Adicionado aqui
    });


    fetch('http://localhost:8080/motorista/viagem', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao buscar viagens");
            }
            return res.json();
        })
        .then(viagens => {

            carregando.style.display = "none";

            viagens.forEach(viagem => {
                const card = criarCardViagem(viagem);

                if (viagem.viagemStatus === 'DISPONIVEL') {
                    programadasContainer.appendChild(card);
                } else if (viagem.viagemStatus === 'EM_ANDAMENTO') {
                    andamentoContainer.appendChild(card);
                } else if (viagem.viagemStatus === 'CONCLUIDA' || viagem.viagemStatus === 'CANCELADA') {
                    historicoContainer.appendChild(card);
                }
            });
        })
        .catch(error => {
            carregando.style.display = "none";
            console.error("Erro ao buscar viagens:", error);
            mensagemErro.classList.remove("d-none");
        });
});

function criarCardViagem(viagem) {
    const card = document.createElement("div");
    card.className = "card-viagem";

    const dataFormatada = new Date(viagem.dataPartida).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });

    card.innerHTML = `
        <div>
            <span><i class="bi bi-clock"></i> ${dataFormatada}</span>
            <span class="status ${viagem.viagemStatus}">${formatarStatus(viagem.viagemStatus)}</span>
        </div>
        <h5>${viagem.cidadeOrigem}, ${viagem.estadoOrigem} → ${viagem.cidadeDestino}, ${viagem.estadoDestino}</h5>
        <small>Preço por passageiro</small>
        <p><strong>R$ ${viagem.valor.toFixed(2)}</strong></p>
        <small>Veículo</small>
        <p><strong>${viagem.detalhesVeiculo}</strong></p>
        <small>Ocupação</small>
        <p><strong>${viagem.capacidadeDisponivel}</strong></p>
        <button class="btn btn-outline-secondary btn-sm btn-gerenciar">Gerenciar</button>
    `;

    return card;


}

function formatarStatus(status) {
    if (status === 'DISPONIVEL') return 'Disponível';
    if (status === 'CONCLUIDA') return 'Concluída';
    if (status === 'EM_ANDAMENTO') return 'Em Andamento';
    if (status === 'CANCELADA') return 'Cancelada';
    return status;
}



