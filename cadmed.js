// cadmed.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-medicamento');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const codigoInput = document.getElementById('codigo');
    const idFabricanteInput = document.getElementById('id_fabricante');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const dadosMedicamento = coletarDadosFormulario();
        salvarMedicamento(dadosMedicamento);
    });

    btnCancelar.addEventListener('click', (event) => {
        const confirmar = confirm('Tem certeza que deseja limpar todos os campos?');
        if (!confirmar) {
            event.preventDefault();
        }
    });

    function validarFormulario() {
        const nome = document.getElementById('nome').value.trim();
        const codigo = codigoInput.value.trim();
        const idFabricante = idFabricanteInput.value.trim();

        if (!nome) {
            alert('Por favor, informe o nome do medicamento.');
            document.getElementById('nome').focus();
            return false;
        }

        if (!codigo) {
            alert('Por favor, informe o código do medicamento.');
            codigoInput.focus();
            return false;
        }

        if (!idFabricante || isNaN(idFabricante) || Number(idFabricante) <= 0) {
            alert('Por favor, informe um ID de fabricante válido.');
            idFabricanteInput.focus();
            return false;
        }

        return true;
    }

    function coletarDadosFormulario() {
        return {
            nome: document.getElementById('nome').value.trim(),
            classificacao: document.getElementById('classificacao').value.trim(),
            codigo: document.getElementById('codigo').value.trim(),
            via_uso: document.getElementById('uso').value,
            apresentacao: document.getElementById('apres').value,
            id_fabricante: parseInt(document.getElementById('id_fabricante').value.trim())
        };
    }

    function salvarMedicamento(dados) {
        fetch('/api/medicamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    throw new Error(data.erro || 'Erro ao salvar o medicamento.');
                }
                return data;
            });
        })
        .then(data => {
            console.log('Medicamento salvo com sucesso:', data);
            document.getElementById('id_medicamento').placeholder = 'MED-' + data.id;
            alert('Medicamento cadastrado com sucesso!');
            form.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(error.message || 'Não foi possível cadastrar o medicamento. Tente novamente.');
        });
    }
});