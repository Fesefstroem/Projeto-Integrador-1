import sqlite3

# BANCO DE DADOS
conexao = sqlite3.connect("biblioteca.db")
cursor = conexao.cursor()

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    perfil TEXT NOT NULL CHECK(perfil IN ('A', 'F', 'G', 'U')) 
);

CREATE TABLE IF NOT EXISTS fabricante (
    id_fabricante INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT,
    cnpj TEXT UNIQUE,
    email TEXT,
    telefone TEXT
);

CREATE TABLE IF NOT EXISTS fornecedor (
    id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT,
    cnpj TEXT UNIQUE,
    email TEXT,
    telefone TEXT
);

CREATE TABLE IF NOT EXISTS unidade_destino (
    id_destino INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT,
    cnpj TEXT UNIQUE,
    email TEXT,
    telefone TEXT
);

-- 2. Criação das tabelas dependentes (Com chaves estrangeiras)

CREATE TABLE IF NOT EXISTS medicamentos (
    id_medicamento INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    classificacao TEXT,
    codigo TEXT UNIQUE,
    uso TEXT,
    apresentacao TEXT,
    principio_ativo TEXT,
    id_fabricante INTEGER,
    id_usuario INTEGER, -- responsável pelo cadastro
    FOREIGN KEY (id_fabricante) REFERENCES fabricante(id_fabricante),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS aquisicao (
    id_aquisicao INTEGER PRIMARY KEY AUTOINCREMENT,
    dt_compra DATE NOT NULL,
    quantidade INTEGER NOT NULL,
    vlr_unitario REAL NOT NULL,
    vlr_total REAL NOT NULL,
    notafiscal TEXT,
    lote TEXT,
    dt_validade DATE,
    id_fornecedor INTEGER,
    id_usuario INTEGER,
    id_medicamento INTEGER,
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id_fornecedor),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento)
);

CREATE TABLE IF NOT EXISTS estoque (
    id_medicamento INTEGER,
    id_aquisicao INTEGER,
    quantidade INTEGER NOT NULL,
    PRIMARY KEY (id_medicamento, id_aquisicao),
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento),
    FOREIGN KEY (id_aquisicao) REFERENCES aquisicao(id_aquisicao)
);

CREATE TABLE IF NOT EXISTS distribuicao (
    id_distribuicao INTEGER PRIMARY KEY AUTOINCREMENT,
    quantidade INTEGER NOT NULL,
    lote TEXT,
    dt_validade DATE,
    dt_distribuicao DATE NOT NULL,
    vlr_saida REAL,
    id_medicamento INTEGER,
    resp_distribuicao INTEGER, -- id_usuario
    resp_liberacao INTEGER,    -- id_usuario
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento),
    FOREIGN KEY (resp_distribuicao) REFERENCES usuario(id_usuario),
    FOREIGN KEY (resp_liberacao) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS movimentacao (
    id_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_movimentacao TEXT NOT NULL CHECK(tipo_movimentacao IN ('E', 'S', 'D')), 
    -- (E)ntrada, (S)aida, (D)evolucao
    dt_movimentacao DATE NOT NULL,
    quantidade INTEGER NOT NULL,
    vlr_movimentacao REAL,
    id_medicamento INTEGER,
    id_aquisicao INTEGER,
    id_distribuicao INTEGER,
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento),
    FOREIGN KEY (id_aquisicao) REFERENCES aquisicao(id_aquisicao),
    FOREIGN KEY (id_distribuicao) REFERENCES distribuicao(id_distribuicao)
);