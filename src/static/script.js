// Espera o HTML carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos importantes do HTML
    const loginSection = document.getElementById('login-section');
    const cadastroSection = document.getElementById('cadastro-section');
    const showCadastroLink = document.getElementById('show-cadastro');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    // URL base da API (ajuste se necessário)
    const API_BASE_URL = '/api';

    // Função que aplica a animação antes de trocar os formulários
    function animarTroca(formularioParaEsconder, formularioParaMostrar) {
        // Adiciona a classe de animação ao formulário que será escondido
        formularioParaEsconder.classList.add('flip-scale-2-ver-left');

        // Aguarda o fim da animação de saída (0.5s) para trocar a visibilidade
        setTimeout(() => {
            // Esconde o formulário atual
            formularioParaEsconder.classList.remove('flip-scale-2-ver-left');
            formularioParaEsconder.style.display = 'none';

            // Mostra o novo formulário e aplica a animação de entrada
            formularioParaMostrar.style.display = 'block';
            formularioParaMostrar.classList.add('fade-slide-in-right');

            // Remove a animação de entrada depois que ela termina
            setTimeout(() => {
                formularioParaMostrar.classList.remove('fade-slide-in-right');
            }, 600); // tempo da animação de entrada
        }, 700); // tempo da animação de saída
    }

    // Função para exibir mensagens de erro ou sucesso
    function exibirMensagem(elemento, mensagem, tipo = 'erro') {
        // Remove mensagens anteriores
        const mensagemAnterior = elemento.querySelector('.mensagem');
        if (mensagemAnterior) {
            mensagemAnterior.remove();
        }

        // Cria nova mensagem
        const divMensagem = document.createElement('div');
        divMensagem.className = `mensagem ${tipo}`;
        divMensagem.style.cssText = `
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            ${tipo === 'erro' ? 'background-color: #ffebee; color: #c62828; border: 1px solid #ef5350;' : 'background-color: #e8f5e8; color: #2e7d32; border: 1px solid #4caf50;'}
        `;
        divMensagem.textContent = mensagem;

        // Insere a mensagem no início do formulário
        elemento.insertBefore(divMensagem, elemento.firstChild);

        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            if (divMensagem.parentNode) {
                divMensagem.remove();
            }
        }, 5000);
    }

    // Função para fazer requisições à API
    async function fazerRequisicao(url, dados) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });

            const resultado = await response.json();
            return { sucesso: response.ok, dados: resultado };
        } catch (error) {
            console.error('Erro na requisição:', error);
            return { sucesso: false, dados: { erro: 'Erro de conexão com o servidor' } };
        }
    }

    // Função para processar login
    async function processarLogin(event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        const resultado = await fazerRequisicao(`${API_BASE_URL}/login`, {
            email: email,
            senha: senha
        });

        if (resultado.sucesso) {
            exibirMensagem(loginForm, resultado.dados.mensagem, 'sucesso');
            console.log('Usuário logado:', resultado.dados.usuario);
            
            // Aqui você pode redirecionar o usuário ou fazer outras ações
            // Por exemplo: window.location.href = '/dashboard';
        } else {
            exibirMensagem(loginForm, resultado.dados.erro, 'erro');
        }
    }

    // Função para processar cadastro
    async function processarCadastro(event) {
        event.preventDefault();

        const nome = document.getElementById('cadastro-nome').value;
        const email = document.getElementById('cadastro-email').value;
        const dataNascimento = document.getElementById('cadastro-Nascimento').value;
        const estado = document.getElementById('cadastro-localidade').value;
        const senha = document.getElementById('cadastro-senha').value;
        const confirmaSenha = document.getElementById('cadastro-confirma-senha').value;

        const resultado = await fazerRequisicao(`${API_BASE_URL}/cadastro`, {
            nome: nome,
            email: email,
            data_nascimento: dataNascimento,
            estado: estado,
            senha: senha,
            confirma_senha: confirmaSenha
        });

        if (resultado.sucesso) {
            exibirMensagem(cadastroForm, resultado.dados.mensagem, 'sucesso');
            console.log('Usuário cadastrado:', resultado.dados.usuario);
            
            // Limpar formulário após sucesso
            cadastroForm.reset();
            
            // Opcional: trocar para tela de login após cadastro bem-sucedido
            setTimeout(() => {
                animarTroca(cadastroSection, loginSection);
            }, 2000);
        } else {
            exibirMensagem(cadastroForm, resultado.dados.erro, 'erro');
        }
    }

    // Verifica se todos os elementos foram encontrados antes de adicionar os eventos
    if (loginSection && cadastroSection && showCadastroLink && showLoginLink) {

        // Adiciona um evento de clique ao link "Cadastre-se"
        showCadastroLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link navegue para a âncora #cadastro-section
            animarTroca(loginSection, cadastroSection); // Aplica animação e troca as seções
        });

        // Adiciona um evento de clique ao link "Faça Login"
        showLoginLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link navegue para a âncora #login-section
            animarTroca(cadastroSection, loginSection); // Aplica animação e troca as seções
        });

    } else {
        console.error("Erro: Não foi possível encontrar um ou mais elementos necessários para a troca de formulários.");
    }

    // Adiciona eventos de submit aos formulários
    if (loginForm) {
        loginForm.addEventListener('submit', processarLogin);
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', processarCadastro);
    }

    // Inicia o select customizado de localidade com Choices.js
    const selectEstado = document.getElementById('cadastro-localidade');
    if (selectEstado) {
        new Choices(selectEstado, {
            searchEnabled: false,
            itemSelectText: '', // Remove texto de seleção
            shouldSort: false   // Mantém a ordem dos estados
        });
    }

});

