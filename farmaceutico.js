document.addEventListener('DOMContentLoaded', () => {

    const btnCadMed = document.querySelector('.btn-cadmed');
    const btnCadFor = document.querySelector('.btn-cadfor');
    const btnReg = document.querySelector('.btn-reg');

    const rotas = {
        cadastroMedicamento: 'cadmed.html',
        cadastroFornecedor: 'cadfornecedor.html',
        registrar: 'registro.html',
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

    btnReg?.addEventListener('click', () => {
        irPara(rotas.registrar);
    });
});