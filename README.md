# 🎬 API de Filmes

API REST desenvolvida com **Node.js**, **Express** e **MySQL** para consulta e gerenciamento de filmes, atores, gêneros e participações.

O projeto foi originalmente desenvolvido durante minha formação técnica e posteriormente revisitado e reorganizado para compor meu portfólio, recebendo melhorias na estrutura, validações, tratamento de erros e configuração do ambiente.

## ✨ Funcionalidades

### Filmes

- Listagem paginada;
- Busca por ID;
- Busca por título;
- Busca por gênero.

### Atores

- Busca de atores e seus filmes;
- Cadastro de novos atores;
- Atualização de atores;
- Exclusão de atores e suas participações.

### Participações

- Cadastro de participações entre atores e filmes;
- Remoção de participações;
- Validação de atores e filmes;
- Prevenção de participações duplicadas.

## 🛠️ Tecnologias

- Node.js
- Express
- MySQL
- serverless-mysql
- dotenv
- CORS
- Nodemon
- XAMPP
- phpMyAdmin

## 🏫 Origem do projeto

O banco de dados utilizado possui o nome `iftm_filmes`.

A sigla **IFTM** faz referência ao **Instituto Federal do Triângulo Mineiro**, instituição onde cursei o ensino médio integrado ao curso Técnico em Informática.

O projeto foi originalmente desenvolvido durante esse período e posteriormente revisitado e reorganizado como parte da construção do meu portfólio.

## 📁 Estrutura do projeto

```text
iftm_filmes/
│
├── database/
│   └── iftm_filmes.sql
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   └── routes/
│       ├── filmes.js
│       ├── atores.js
│       └── participacoes.js
│
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd movie-api
```

### 2. Configure o banco de dados

O projeto utiliza **MySQL**.

Durante o desenvolvimento, foi utilizado o **XAMPP** para executar o servidor MySQL e o **phpMyAdmin** para administrar o banco de dados.

Após instalar o XAMPP:

1. Abra o **XAMPP Control Panel**;
2. Inicie os serviços **Apache** e **MySQL**;
3. Acesse:

```text
http://localhost/phpmyadmin
```

4. No phpMyAdmin, clique em **Importar**;
5. Selecione o arquivo:

```text
database/iftm_filmes.sql
```

Após a importação, o banco `iftm_filmes` estará disponível.

### 3. Instale as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo chamado `.env` utilizando o `.env.example` como modelo:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_NAME=iftm_filmes
DB_USER=root
DB_PASSWORD=
```

As configurações podem variar de acordo com o ambiente e a instalação do MySQL.

### 5. Execute a aplicação

Para iniciar normalmente:

```bash
npm start
```

Para executar em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em:

```text
http://127.0.0.1:3000
```

A rota inicial retorna:

```json
{
    "message": "API de filmes funcionando!"
}
```

## 📌 Rotas da API

### 🎬 Filmes

| Método | Rota | Descrição |
|---|---|---|
| GET | `/filmes/:pagina` | Lista filmes de forma paginada |
| GET | `/filme/:id` | Busca um filme pelo ID |
| GET | `/filmes/busca/:palavra` | Busca filmes pelo título |
| GET | `/generos/:genero` | Busca filmes por gênero |

### 🎭 Atores

| Método | Rota | Descrição |
|---|---|---|
| GET | `/ator/:id` | Busca os filmes relacionados a um ator |
| GET | `/atores/busca/:palavra` | Busca atores pelo nome e seus filmes |
| POST | `/atores` | Adiciona um novo ator |
| PUT | `/atores` | Atualiza o nome de um ator |
| DELETE | `/atores/:id` | Remove um ator e suas participações |

### 🔗 Participações

| Método | Rota | Descrição |
|---|---|---|
| POST | `/participacoes` | Adiciona a participação de um ator em um filme |
| DELETE | `/participacoes` | Remove a participação de um ator em um filme |

## 📨 Exemplos de requisições

### Adicionar um ator

```http
POST /atores
```

```json
{
    "titulo": "Novo Ator"
}
```

### Atualizar um ator

```http
PUT /atores
```

```json
{
    "id": 1,
    "titulo": "Nome Atualizado"
}
```

### Adicionar uma participação

```http
POST /participacoes
```

```json
{
    "ator_id": 1,
    "filme_id": 1
}
```

### Remover uma participação

```http
DELETE /participacoes
```

```json
{
    "ator_id": 1,
    "filme_id": 1
}
```

## ⚠️ Validações e respostas

A API realiza validações para evitar operações inválidas, incluindo:

- IDs devem ser números inteiros maiores que zero;
- Recursos inexistentes retornam erro;
- Campos obrigatórios são validados;
- Participações duplicadas não podem ser cadastradas;
- Participações inexistentes não podem ser removidas.

Principais códigos HTTP utilizados:

| Código | Significado |
|---|---|
| `200` | Requisição realizada com sucesso |
| `201` | Recurso criado com sucesso |
| `400` | Dados inválidos |
| `404` | Recurso não encontrado |
| `409` | Conflito |
| `500` | Erro interno do servidor |

## 🚀 Possíveis melhorias

- CRUD completo para filmes e gêneros;
- Paginação com informações sobre quantidade total de páginas;
- Documentação interativa com Swagger;
- Testes automatizados;
- Separação entre rotas, controllers e serviços;
- Desenvolvimento de um frontend para consumir a API;
- Deploy da aplicação.

## 👩‍💻 Autora

Desenvolvido por **Lara Isabely**.

Projeto revisitado e reorganizado como parte da construção do meu portfólio na área de desenvolvimento de software.