document.addEventListener('DOMContentLoaded', () => {

    const btnCadMed = document.querySelector('.btn-cadmed');
    const btnCadFor = document.querySelector('.btn-cadfor');
    const btnReg = document.querySelector('.btn-reg');
    const btnCadUsuario = document.querySelector('.btn-cadusuario');
    const btnGerar = document.querySelector('.btn-gerar');

    const rotas = {
        cadastroMedicamento: 'cadmed.html',
        cadastroFornecedor: 'cadfornecedor.html',
        registrar: 'registro.html',
        cadastroUsuario: 'cadusuario.html',
        relatorio: 'relatorio.html',
    };

    function irPara(pagina) {
        window.location.href = pagina;
    }

    btnCadMed?.addEventListener('click', () => {
        irPara(rotas.cadastroMedicamento);
    });

    btnCadFor?.addEventListener('click', () => {
        irPara(rotas.cadastroFornecedor);
    });

    btnReg?.addEventListener('click', () => {
        irPara(rotas.registrar);
    });

    btnCadUsuario?.addEventListener('click', () => {
        irPara(rotas.cadastroUsuario);
    });

    btnGerar?.addEventListener('click', () => {
        irPara(rotas.relatorio);
    });
});
