require("dotenv").config();

//importações para o trabalho
const express = require("express");
const cors = require("cors");

//rotas
const filmesRoutes = require("./src/routes/filmes");
const atoresRoutes = require("./src/routes/atores");
const participacoesRoutes = require("./src/routes/participacoes");

//configuração da porta do servidor
const porta = process.env.PORT || 3000;
const app = express();

//lidando com CORS e JSON (middlewares)
app.use(cors());
app.use(express.json());

//rotas filmes
app.use(filmesRoutes);
//rotas atores
app.use(atoresRoutes);
//rotas participacoes
app.use(participacoesRoutes);

//rota inicial - verifica se o servidor está ativo (http://127.0.0.1:3000/)
app.get("/", (req, res) => {
    res.json({
        message: "API de filmes funcionando!"
    });
});

//inicialização do servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${porta}`);
});