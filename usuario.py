import sqlite3

conexao = sqlite3.connect("usuario.db")
cursor = conexao.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS usuario(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT NOT NULL,
    perfil TEXT NOT NULL,
    email TEXT NOT NULL
)
""")

conexao.commit()

def cadastrar():
    id = entry_id.get()
    nome = entry_nome.get()