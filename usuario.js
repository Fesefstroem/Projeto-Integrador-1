document.addEventListener('DOMContentLoaded', () => {
    const btnMovimento = document.querySelector('.btn-gmov');
    const btnEstoque = document.querySelector('.btn-gmed');

    btnMovimento.addEventListener('click', () => {
        gerarRelatorio('movimento');
    });

    btnEstoque.addEventListener('click', () => {
        gerarRelatorio('estoque');
    });

    function gerarRelatorio(tipo) {
        const botao = tipo === 'movimento' ? btnMovimento : btnEstoque;
        const textoOriginal = botao.textContent;

        // Feedback visual enquanto gera
        botao.disabled = true;
        botao.textContent = 'Gerando...';

        fetch(`/api/relatorios/${tipo}`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao gerar o relatório.');
            }
            return response.blob();
        })
        .then(blob => {
            // Cria um link temporário para baixar o arquivo
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            const dataAtual = new Date().toISOString().slice(0, 10);
            link.download = `relatorio-${tipo}-${dataAtual}.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(`Não foi possível gerar o relatório de ${tipo === 'movimento' ? 'movimento' : 'estoque'}. Tente novamente.`);
        })
        .finally(() => {
            botao.disabled = false;
            botao.textContent = textoOriginal;
        });
    }
});