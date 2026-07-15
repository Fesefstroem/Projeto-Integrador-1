# app.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/medicamentos', methods=['POST'])
def cadastrar_medicamento():
    dados = request.get_json()

    # Validação básica no backend (nunca confie só no frontend)
    if not dados.get('nome') or not dados.get('codigo') or not dados.get('id_fabricante'):
        return jsonify({'erro': 'Campos obrigatórios ausentes.'}), 400

    try:
        conexao = sqlite3.connect("ib_saude.db")
        conexao.execute("PRAGMA foreign_keys = ON")
        cursor = conexao.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS medicamentos(
            id_medicamento INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            classificacao TEXT NOT NULL,
            codigo TEXT NOT NULL,
            uso TEXT NOT NULL,
            apresentacao TEXT NOT NULL,
            id_fabricante TEXT NOT NULL,
            principio_ativo TEXT NOT NULL,
            id_usuario TEXT NOT NULL
        )
        """)

        novo_id = 1234  # placeholder — substitua pelo ID real retornado pelo banco

        return jsonify({
            'id': novo_id,
            'mensagem': 'Medicamento cadastrado com sucesso.'
        }), 201

    except Exception as e:
        return jsonify({'erro': str(e)}), 500

if __name__ == '__cadmed__':
    app.run(debug=True)