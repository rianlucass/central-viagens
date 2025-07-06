document.addEventListener("DOMContentLoaded", () => {
    const selectVeiculo = document.getElementById("veiculoIdSelect");
    const form = document.getElementById("formCadastroViagem");
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Usuário não autenticado!");
        return;
    }

    // Carrega veículos
    fetch("http://localhost:8080/motorista/veiculos", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(res => res.json())
        .then(veiculos => {
            veiculos.forEach(veiculo => {
                const option = document.createElement("option");
                option.value = veiculo.id;
                option.text = `${veiculo.modelo} (${veiculo.placa}) - ${veiculo.capacidade} lugares`;
                option.dataset.capacidade = veiculo.capacidade;
                selectVeiculo.appendChild(option);
            });
        })
        .catch(err => {
            mostrarMensagem("Erro ao carregar veículos", "danger");
        });

    // Preenche capacidade automaticamente
    selectVeiculo.addEventListener("change", (e) => {
        const capacidade = e.target.selectedOptions[0].dataset.capacidade;
        const inputCapacidade = document.getElementById("capacidadeDisponivel");
        if (capacidade) {
            inputCapacidade.value = capacidade;
        }
    });

    // Envia o formulário
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const estadoOrigem = formData.get("estadoOrigem");
        const cidadeOrigem = formData.get("cidadeOrigem");
        const estadoDestino = formData.get("estadoDestino");
        const cidadeDestino = formData.get("cidadeDestino");

        if (estadoOrigem === estadoDestino && cidadeOrigem === cidadeDestino) {
            mostrarMensagem("Origem e destino não podem ser iguais!", "danger");
            return;
        }

        const dadosViagem = {
            estadoOrigem,
            cidadeOrigem,
            estadoDestino,
            cidadeDestino,
            dataPartida: montarDataHora(formData.get("dataPartida"), formData.get("horario")),
            valor: parseFloat(formData.get("valor")),
            bagagemGrande: formData.get("bagagemGrande") === "on",
            animaisEstimacao: formData.get("animaisEstimacao") === "on",
            observacoes: formData.get("observacoes") || "",
            veiculoId: formData.get("veiculoId"),
            capacidadeDisponivel: parseInt(formData.get("capacidadeDisponivel"))
        };


        try {
            const resposta = await fetch("http://localhost:8080/motorista/viagem/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(dadosViagem)
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                throw new Error(erro.message || "Erro ao cadastrar viagem");
            }

            mostrarMensagem("Viagem cadastrada com sucesso!", "success");
            form.reset();
            selectVeiculo.selectedIndex = 0;

        } catch (err) {
            mostrarMensagem(err.message, "danger");
        }
    });

    // Função para juntar data e hora em formato ISO
    function montarDataHora(data, hora) {
        return `${data}T${hora}:00`;
    }

    // Cria e exibe alertas Bootstrap
    function mostrarMensagem(mensagem, tipo) {
        const alerta = document.createElement("div");
        alerta.className = `alert alert-${tipo} alert-dismissible fade show mt-3`;
        alerta.role = "alert";
        alerta.innerHTML = `
      ${mensagem}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    `;

        const formBox = document.querySelector(".form-box");
        formBox.prepend(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 6000);
    }
});

async function carregarEstados(selectElement) {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
    const estados = await response.json();

    estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado.sigla;
        option.textContent = estado.nome;
        selectElement.appendChild(option);
    });
}

async function carregarCidades(estadoSigla, selectCidades) {
    selectCidades.innerHTML = "<option value=''>Carregando...</option>";
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`);
    const cidades = await response.json();

    selectCidades.innerHTML = "<option value=''>Selecione a cidade</option>";
    cidades.forEach(cidade => {
        const option = document.createElement("option");
        option.value = cidade.nome;
        option.textContent = cidade.nome;
        selectCidades.appendChild(option);
    });
}

// Ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const estadoOrigem = document.getElementById("estadoOrigem");
    const cidadeOrigem = document.getElementById("cidadeOrigem");
    const estadoDestino = document.getElementById("estadoDestino");
    const cidadeDestino = document.getElementById("cidadeDestino");

    carregarEstados(estadoOrigem);
    carregarEstados(estadoDestino);

    estadoOrigem.addEventListener("change", (e) => {
        carregarCidades(e.target.value, cidadeOrigem);
    });

    estadoDestino.addEventListener("change", (e) => {
        carregarCidades(e.target.value, cidadeDestino);
    });
});
