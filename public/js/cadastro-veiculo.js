document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formCadastroVeiculo');
    const cancelarBtn = document.querySelector('.btn-cancelar');

    // Função auxiliar para exibir mensagens na tela
    function showAlert(message, type = 'success') {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove(); // remove alert anterior

        const div = document.createElement('div');
        div.className = `alert alert-${type} mt-3`;
        div.role = 'alert';
        div.innerText = message;
        form.parentElement.insertBefore(div, form.nextSibling);
    }

    // Cancelar
    cancelarBtn.addEventListener('click', function () {
        if (confirm("Deseja realmente cancelar o cadastro?")) {
            form.reset();
        }
    });

    // Envio do formulário
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const veiculo = {
            modelo: form.modelo.value.trim(),
            tipo: form.tipo.value,
            marca: form.marca.value.trim(),
            placa: form.placa.value.trim().toUpperCase(),
            ano: parseInt(form.ano.value),
            capacidade: parseInt(form.capacidade.value)
        };

        try {
            const token = localStorage.getItem('token'); // Verifique se o token está sendo armazenado corretamente

            const response = await fetch('http://localhost:8080/motorista/veiculo/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(veiculo)
            });

            const result = await response.json();

            if (response.ok) {
                showAlert('Veículo cadastrado com sucesso!', 'success');
                form.reset();
            } else {
                const msg = result.message || 'Erro ao cadastrar o veículo.';
                showAlert(msg, 'danger');
            }

        } catch (err) {
            console.error('Erro ao enviar requisição:', err);
            showAlert('Erro ao conectar com o servidor. Tente novamente mais tarde.', 'danger');
        }
    });
});
