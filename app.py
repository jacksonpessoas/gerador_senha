from flask import Flask, render_template, request, jsonify
import secrets
import string
import unicodedata

app = Flask(__name__)

# Função para remover acentos
def remover_acentos(texto):
    return ''.join(
        c for c in unicodedata.normalize('NFD', texto)
        if unicodedata.category(c) != 'Mn'
    )

# Função principal de geração de senha
def gerar_senha(tamanho=16, usar_simbolos=True, nome_usuario=""):
    nome_usuario = remover_acentos(nome_usuario).strip()
    partes = nome_usuario.split()

    # Pega as iniciais do nome e sobrenome
    letra_nome = partes[0][0].lower() if len(partes) > 0 and partes[0] else ''
    letra_sobrenome = partes[1][0].lower() if len(partes) > 1 and partes[1] else ''

    # Gera um pequeno prefixo embaralhado com as letras
    prefixo_embutido = ''.join(secrets.choice([letra_nome, letra_sobrenome]) for _ in range(2))

    letras_maiusculas = string.ascii_uppercase
    letras_minusculas = string.ascii_lowercase
    digitos = string.digits
    simbolos = string.punctuation.replace("'", "").replace('"', "").replace("`", "").replace("´", "").replace("^", "").replace("~", "")

    todos_caracteres = letras_maiusculas + letras_minusculas + digitos + (simbolos if usar_simbolos else "")

    # Garante presença de pelo menos um caractere de cada tipo
    senha = [
        secrets.choice(letras_maiusculas),
        secrets.choice(letras_minusculas),
        secrets.choice(digitos)
    ]
    if usar_simbolos:
        senha.append(secrets.choice(simbolos))

    restante = tamanho - len(senha) - len(prefixo_embutido)
    senha += [secrets.choice(todos_caracteres) for _ in range(restante)]

    # Adiciona o prefixo personalizado
    senha += list(prefixo_embutido)

    # Embaralha tudo para deixar imprevisível
    secrets.SystemRandom().shuffle(senha)

    return ''.join(senha)

# Rota principal
@app.route('/')
def index():
    return render_template('index.html')

# Rota para gerar senha via POST
@app.route('/gerar', methods=['POST'])
def gerar():
    dados = request.json
    tamanho = int(dados.get('tamanho', 16))
    usar_simbolos = dados.get('usar_simbolos', True)
    nome_usuario = dados.get('nome_usuario', '')
    senha = gerar_senha(tamanho, usar_simbolos, nome_usuario)
    return jsonify({'senha': senha})

if __name__ == '__main__':
    app.run(debug=True)
