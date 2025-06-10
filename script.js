// Espera o HTML carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos importantes do HTML
    const loginSection = document.getElementById('login-section');
    const cadastroSection = document.getElementById('cadastro-section');
    const showCadastroLink = document.getElementById('show-cadastro');
    const showLoginLink = document.getElementById('show-login');

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
