import sqlite3
import re
import customtkinter as ctk
from tkinter import  messagebox

# CONFIGURAÇÕES
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("red")

# banco de dados
conexao = sqlite3.connect("ib_saude.db")
conexao.execute("PRAGMA foreign_keys = ON")
cursor = conexao.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT NOT NULL,
    email TEXT NOT NULL,
    perfil TEXT NOT NULL
)
""")

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

cursor.execute("""
CREATE TABLE IF NOT EXISTS aquisicao(
    id_aquisicao INTEGER PRIMARY KEY AUTOINCREMENT,
    data_compra TEXT NOT NULL,
    id_fornecedor TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    vlr_unitario REAL NOT NULL,
    vlr_total REAL NOT NULL,
    nota_fiscal TEXT NOT NULL,
    id_usuario TEXT NOT NULL,
    id_medicamento TEXT NOT NULL,
    lote TEXT NOT NULL,
    data_validade TEXT NOT NULL
 )
""")              

cursor.execute("""
CREATE TABLE IF NOT EXISTS estoque(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_medicamento INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    id_usuario TEXT NOT NULL,
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos (id_medicamento)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS distribuicao(
    id_distribuicao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_medicamento TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    lote TEXT NOT NULL,
    data_validade TEXT NOT NULL,
    data_distribuicao TEXT NOT NULL,
    responsavel TEXT NOT NULL,
    responsavel_liberacao TEXT NOT NULL,
    vlr_saida REAL NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS movimentacao(
    id_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_movimentacao TEXT NOT NULL,
    data_hora_mov TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    id_aquisicao TEXT NOT NULL,
    id_distribuicao TEXT NOT NULL,
    vlr_movimentacao REAL NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS fabricante(
    id_fabricante INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL               
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS fornecedor(
    id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL
)        
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS destino(
    id_destino INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    codigo TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    id_usuario TEXT NOT NULL,
    responsavel TEXT NOT NULL,
    responsavel_liberacao TEXT NOT NULL
)               
""")

conexao.commit()