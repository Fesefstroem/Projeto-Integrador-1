// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const eyeIcon = document.querySelector('ion-icon[name="eye-outline"]');

    eyeIcon.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeIcon.setAttribute('name', isPassword ? 'eye-off-outline' : 'eye-outline');
    });

    // Validação e envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // impede o reload da página

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!validarEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Aqui você faria a chamada à sua API de autenticação
        autenticarUsuario(email, password);
    });

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function autenticarUsuario(email, senha) {
        // Exemplo de requisição usando fetch — ajuste a URL para o seu backend
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Credenciais inválidas ou erro no servidor.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login realizado com sucesso:', data);
            // Redirecionar após login bem-sucedido
            window.location.href = 'dashboard.html';
        })
        .catch(error => {
            console.error('Erro ao autenticar:', error);
            alert('Não foi possível fazer login. Verifique suas credenciais.');
        });
    }
});