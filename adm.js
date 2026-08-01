document.addEventListener('DOMContentLoaded', function () {

  const rotas = {
    'btn-cadmed': 'cadmed.html',
    'btn-cadfor': 'cadfornecedor.html',
    'btn-reg': 'registro.html',
    'btn-cadusuario': 'cadusuario.html',
    'btn-gerar': 'relatorio.html'
  };

  Object.keys(rotas).forEach(function (classeBotao) {
    const botao = document.querySelector('.' + classeBotao);
    if (!botao) return;

    botao.addEventListener('click', function () {
      navegarPara(classeBotao, rotas[classeBotao]);
    });
  });

  function navegarPara(origem, destino) {

    if (origem === 'btn-gerar') {
      const confirmar = confirm('Deseja gerar o relatório agora?');
      if (!confirmar) return;
    }

    console.log('Navegando de "' + origem + '" para: ' + destino);
    window.location.href = destino;
  }

});