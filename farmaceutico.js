// farmaceutico.js
// Script responsável pelas ações dos botões do painel do farmacêutico

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os botões pela classe
    const btnCadMed = document.querySelector('.btn-cadmed');
    const btnCadFor = document.querySelector('.btn-cadfor');
    const btnRegSaida = document.querySelector('.btn-regsaida');
    const btnRegEntrada = document.querySelector('.btn-regentrada');

    // Mapeia cada botão para sua página/rota correspondente
    // Ajuste os caminhos conforme a estrutura real do seu projeto
    const rotas = {
        cadastroMedicamento: 'cadmed.html',
        cadastroFornecedor: 'cadfornecedor.html',
        registrarSaida: 'registrar-saida.html',
        registrarEntrada: 'registrar-entrada.html',
    };

    // Função de navegação
    function irPara(pagina) {
        window.location.href = pagina;
    }

    // Eventos de clique
    btnCadMed?.addEventListener('click', () => {
        irPara(rotas.cadastroMedicamento);
    });

    btnCadFor?.addEventListener('click', () => {
        irPara(rotas.cadastroFornecedor);
    });

    btnRegSaida?.addEventListener('click', () => {
        irPara(rotas.registrarSaida);
    });

    btnRegEntrada?.addEventListener('click', () => {
        irPara(rotas.registrarEntrada);
    });
});