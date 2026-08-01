document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formMovimentacao');
  const idMovimentacaoInput = document.getElementById('id_movimentacao');
  const tipoSelect = document.getElementById('tipo_movimentacao');
  const idAquisicaoInput = document.getElementById('id_aquisicao');
  const idDistribuicaoInput = document.getElementById('id_distribuicao');
  const dtInput = document.getElementById('dt_movimentacao');

  // Gera um ID de movimentação simulado assim que a página carrega
  gerarIdMovimentacao();

  // Preenche a data/hora atual como valor padrão (facilita o preenchimento)
  if (dtInput && !dtInput.value) {
    dtInput.value = obterDataHoraAtualLocal();
  }

  // Ajusta obrigatoriedade de ID Aquisição / ID Distribuição conforme o tipo
  tipoSelect.addEventListener('change', atualizarCamposConformeTipo);

  // Validação e envio do formulário
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const erro = validarRegrasDeNegocio();
    if (erro) {
      alert(erro);
      return;
    }

    const dados = coletarDadosDoFormulario();
    console.log('Movimentação a ser salva:', dados);

    alert('Movimentação salva com sucesso!\n\n' + JSON.stringify(dados, null, 2));

    // Simula reset após salvar (remover se quiser manter os dados na tela)
    form.reset();
    gerarIdMovimentacao();
    atualizarCamposConformeTipo();
    dtInput.value = obterDataHoraAtualLocal();
  });

  // Reset manual (botão "Limpar")
  form.addEventListener('reset', function () {
    // Espera o reset nativo terminar antes de reaplicar os padrões
    setTimeout(function () {
      gerarIdMovimentacao();
      atualizarCamposConformeTipo();
      dtInput.value = obterDataHoraAtualLocal();
    }, 0);
  });

  function gerarIdMovimentacao() {
    const timestamp = Date.now().toString().slice(-6);
    const aleatorio = Math.floor(Math.random() * 900 + 100);
    idMovimentacaoInput.value = 'MOV-' + timestamp + aleatorio;
  }

  function obterDataHoraAtualLocal() {
    const agora = new Date();
    agora.setSeconds(0, 0);
    agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
    return agora.toISOString().slice(0, 16);
  }

  function atualizarCamposConformeTipo() {
    const tipo = tipoSelect.value;

    // Entrada normalmente está ligada a uma aquisição
    // Saída normalmente está ligada a uma distribuição
    idAquisicaoInput.required = tipo === 'E';
    idDistribuicaoInput.required = tipo === 'S';

    idAquisicaoInput.disabled = tipo === 'S';
    idDistribuicaoInput.disabled = tipo === 'E';

    if (idAquisicaoInput.disabled) idAquisicaoInput.value = '';
    if (idDistribuicaoInput.disabled) idDistribuicaoInput.value = '';
  }

  function validarRegrasDeNegocio() {
    const tipo = tipoSelect.value;

    if (tipo === 'E' && !idAquisicaoInput.value.trim()) {
      return 'Para movimentações de Entrada, informe o ID da Aquisição.';
    }
    if (tipo === 'S' && !idDistribuicaoInput.value.trim()) {
      return 'Para movimentações de Saída, informe o ID da Distribuição.';
    }

    const quantidade = Number(document.getElementById('quantidade').value);
    if (quantidade <= 0) {
      return 'A quantidade deve ser maior que zero.';
    }

    const valor = Number(document.getElementById('vlr_movimentacao').value);
    if (valor < 0) {
      return 'O valor da movimentação não pode ser negativo.';
    }

    return null;
  }

  function coletarDadosDoFormulario() {
    return {
      id_movimentacao: idMovimentacaoInput.value,
      tipo_movimentacao: tipoSelect.value,
      dt_movimentacao: dtInput.value,
      quantidade: Number(document.getElementById('quantidade').value),
      medicamento: document.getElementById('id_medicamento').value.trim(),
      id_aquisicao: idAquisicaoInput.value.trim() || null,
      id_distribuicao: idDistribuicaoInput.value.trim() || null,
      vlr_movimentacao: Number(document.getElementById('vlr_movimentacao').value)
    };
  }

  // Estado inicial dos campos condicionais
  atualizarCamposConformeTipo();
});