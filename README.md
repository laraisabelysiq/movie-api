# 🎬 API de Filmes

API REST desenvolvida com **Node.js**, **Express** e **MySQL** para consulta e gerenciamento de filmes, atores, gêneros e participações.

O projeto foi originalmente desenvolvido durante minha formação técnica e posteriormente revisitado e reorganizado para compor meu portfólio, recebendo melhorias na estrutura, validações, tratamento de erros, testes automatizados e interface web para consumo da API.

## ✨ Funcionalidades

### Filmes

* Listagem paginada;
* Busca por ID;
* Busca por título;
* Busca por gênero;
* Cadastro de filmes;
* Atualização de filmes;
* Exclusão de filmes;
* Validação dos dados enviados;
* Prevenção de filmes duplicados por IMDb ID.

### Atores

* Busca de atores e seus filmes;
* Cadastro de novos atores;
* Atualização de atores;
* Exclusão de atores e suas participações;
* Validação dos dados enviados.

### Participações

* Cadastro de participações entre atores e filmes;
* Remoção de participações;
* Validação de atores e filmes existentes;
* Prevenção de participações duplicadas.

### Frontend

* Interface web para consulta dos filmes;
* Busca por título;
* Filtro por gênero;
* Listagem de filmes em cards;
* Paginação;
* Exibição de detalhes dos filmes;
* Integração com a API REST;
* Interface responsiva;
* Estados de carregamento, erro e ausência de resultados.

### Testes

* Coleção de testes desenvolvida no Postman;
* Testes automatizados para validação das respostas;
* Uso de variáveis para testes dinâmicos;
* Testes dos fluxos de filmes, atores e participações.

## 🛠️ Tecnologias

### Backend

* Node.js
* Express
* MySQL
* serverless-mysql
* dotenv
* CORS
* Nodemon

### Frontend

* HTML
* CSS
* JavaScript

### Testes e ferramentas

* Postman
* XAMPP
* phpMyAdmin
* Git
* GitHub

## 🏫 Origem do projeto

O banco de dados utilizado possui o nome `iftm_filmes`.

A sigla **IFTM** faz referência ao **Instituto Federal do Triângulo Mineiro**, instituição onde cursei o ensino médio integrado ao curso Técnico em Informática.

O projeto foi originalmente desenvolvido durante esse período e posteriormente revisitado, reorganizado e aprimorado como parte da construção do meu portfólio.

## 📁 Estrutura do projeto

```text
movie-api/

│
├── database/
│   └── iftm_filmes.sql
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   └── index.html
│
├── postman/
│   └── Movie API.postman_collection.json
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
git clone https://github.com/laraisabelysiq/movie-api.git
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

### 6. Execute o frontend

Com a API em execução, abra o arquivo:

```text
frontend/index.html
```

O frontend pode ser executado utilizando uma extensão como **Live Server** no Visual Studio Code.

A interface utiliza a API local disponível em:

```text
http://localhost:3000
```

## 📌 Rotas da API

### 🎬 Filmes

| Método | Rota                     | Descrição                      |
| ------ | ------------------------ | ------------------------------ |
| GET    | `/filmes/:pagina`        | Lista filmes de forma paginada |
| GET    | `/filme/:id`             | Busca um filme pelo ID         |
| GET    | `/filmes/busca/:palavra` | Busca filmes pelo título       |
| GET    | `/generos/:genero`       | Busca filmes por gênero        |
| POST   | `/filmes`                | Adiciona um novo filme         |
| PUT    | `/filmes`                | Atualiza um filme              |
| DELETE | `/filmes/:id`            | Remove um filme                |

### 🎭 Atores

| Método | Rota                     | Descrição                              |
| ------ | ------------------------ | -------------------------------------- |
| GET    | `/ator/:id`              | Busca os filmes relacionados a um ator |
| GET    | `/atores/busca/:palavra` | Busca atores pelo nome e seus filmes   |
| POST   | `/atores`                | Adiciona um novo ator                  |
| PUT    | `/atores`                | Atualiza o nome de um ator             |
| DELETE | `/atores/:id`            | Remove um ator e suas participações    |

### 🔗 Participações

| Método | Rota             | Descrição                                      |
| ------ | ---------------- | ---------------------------------------------- |
| POST   | `/participacoes` | Adiciona a participação de um ator em um filme |
| DELETE | `/participacoes` | Remove a participação de um ator em um filme   |

## 📨 Exemplos de requisições

### Adicionar um filme

```http
POST /filmes
```

```json
{
    "titulo": "Novo Filme",
    "ano": 2025,
    "duracao": 120,
    "sinopse": "Descrição do filme.",
    "poster": "https://exemplo.com/poster.jpg",
    "nota": 8.5,
    "votos": 1000,
    "imdb_id": "tt1234567"
}
```

### Atualizar um filme

```http
PUT /filmes
```

```json
{
    "id": 1,
    "titulo": "Filme Atualizado",
    "ano": 2025,
    "duracao": 125,
    "sinopse": "Nova descrição do filme.",
    "poster": "https://exemplo.com/poster.jpg",
    "nota": 9,
    "votos": 1500,
    "imdb_id": "tt1234567"
}
```

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

## 🧪 Testes com Postman

O projeto possui uma coleção do **Postman** com testes automatizados para os principais endpoints da API.

A coleção está disponível em:

```text
postman/Movie API.postman_collection.json
```

Os testes utilizam variáveis para criar um fluxo dinâmico entre as requisições, permitindo que IDs gerados durante os testes sejam reutilizados posteriormente.

Os fluxos testados incluem:

* Listagem de filmes;
* Busca de filmes;
* Cadastro de filmes;
* Atualização de filmes;
* Exclusão de filmes;
* Cadastro de atores;
* Atualização de atores;
* Exclusão de atores;
* Cadastro de participações;
* Remoção de participações;
* Validações e respostas de erro.

## ⚠️ Validações e respostas

A API realiza validações para evitar operações inválidas, incluindo:

* IDs devem ser números inteiros maiores que zero;
* Campos obrigatórios são validados;
* Ano, duração, nota e quantidade de votos possuem validações específicas;
* O IMDb ID deve seguir o formato esperado;
* Filmes duplicados não podem ser cadastrados;
* Recursos inexistentes retornam erro;
* Participações duplicadas não podem ser cadastradas;
* Participações inexistentes não podem ser removidas;
* Erros internos são tratados e retornam respostas apropriadas.

Principais códigos HTTP utilizados:

| Código | Significado                      |
| ------ | -------------------------------- |
| `200`  | Requisição realizada com sucesso |
| `201`  | Recurso criado com sucesso       |
| `400`  | Dados inválidos                  |
| `404`  | Recurso não encontrado           |
| `409`  | Conflito                         |
| `500`  | Erro interno do servidor         |

## 🚀 Próximas melhorias

* Deploy da API e do frontend;
* Documentação interativa com Swagger;
* Melhorias na arquitetura, com separação entre controllers e serviços;
* Expansão da cobertura de testes automatizados;
* Novos recursos para gerenciamento de filmes, atores e gêneros.

## 👩‍💻 Autora

Desenvolvido por **Lara Isabely**.

Projeto revisitado e reorganizado como parte da construção do meu portfólio na área de desenvolvimento de software.
