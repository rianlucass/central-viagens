const form = document.getElementById('formLogin');
if (!form) {
  console.error('Formulário de login não encontrado.');
  throw new Error('Formulário de login não encontrado.');
}    

function removerErro(input) {
  input.classList.remove('is-invalid');
  const feedback = input.parentNode.querySelector('.invalid-feedback');
  if (feedback) feedback.remove();
}

function mostrarErro(input, mensagem) {
  removerErro(input);
  input.classList.add('is-invalid');
  const feedback = document.createElement('div');
  feedback.className = 'invalid-feedback';
  feedback.textContent = mensagem;
  input.parentNode.appendChild(feedback);
}

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  removerErro(usernameInput);
  removerErro(passwordInput);

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  let temErro = false;

  if (!password && !username) {
    mostrarErro(passwordInput, 'Informe o nome de usuário e a senha');
    temErro = true;
  } else if (!username) {
    mostrarErro(usernameInput, 'Informe o nome de usuário');
    temErro = true;
  } else if (!password) {
    mostrarErro(passwordInput, 'Informe a senha');
    temErro = true;
  }

  if (temErro) return;

  const dados = { username, password };

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      const result = await response.json();

      localStorage.setItem('token', result.token);
      localStorage.setItem('tipoUsuario', result.userType); 

      if (result.userType === 'MOTORISTA') {
        window.location.href = '/dashboard';
      } else if (result.userType === 'PASSAGEIRO') {
        window.location.href = '/home';
      } else {
        window.location.href = '/login?erro=Tipo de usuário inválido';
      }
    } else {
      const error = await response.json();
      window.location.href = `/login?erro=${encodeURIComponent(error.message || 'Usuário ou senha inválidos')}`;
    }
  } catch (error) {
    window.location.href = '/login?erro=Erro de conexão com o servidor';
  }
}); 
