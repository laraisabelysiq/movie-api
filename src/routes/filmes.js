const express = require("express");
const bancoDados = require("../config/database");

const router = express.Router();

//listar os filmes por página
router.get("/filmes/:pagina", async (req, res) => {
    const pagina = Number(req.params.pagina, 10); // número da página da URL
    if (!Number.isInteger(pagina) || pagina < 1) {
    return res.status(400).json({
        message: "Página inválida."
    });
    }
    const filmesPorPagina = 10; //constante
    const offset = (pagina - 1) * filmesPorPagina; // número fixo de filmes por página
    
    try {
        const filmes = await bancoDados.query( // consulta no banco de dados para pegar os filmes
            `SELECT * FROM filmes ORDER BY nota DESC LIMIT ? OFFSET ?`,
            [filmesPorPagina, offset] // ajustado para usar o valor fixo de 10 filmes por página
        );

        if (filmes.length === 0) { //verifica se existem filmes nessa página
        return res.status(404).json({
            message: "Nenhum filme encontrado nesta página."
        });
    }
        res.status(200).json(filmes); // resposta da pesquisa, desenvolvendo json
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);

        res.status(500).json({
            message: "Erro interno ao buscar filmes."
        });
    }
});

//buscar filmes pelo id
router.get("/filme/:id", async (req, res) => {
    const id = Number(req.params.id); // id do filme

    if (!Number.isInteger(id) || id < 1) { //validação do ID
        return res.status(400).json({
            message: "ID inválido."
        });
    }

    try {
        const filmes = await bancoDados.query(
            `SELECT * FROM filmes WHERE id = ?`,
            [id]
        );

        if (filmes.length === 0) { //verifica se o filme existe
            return res.status(404).json({
                message: "Filme não encontrado."
            });
        }

        res.status(200).json(filmes[0]);

    } catch (error) {
        console.error("Erro ao buscar filme:", error);

        res.status(500).json({
            message: "Erro interno ao buscar filme."
        });
    }
});

//buscar filmes pelo título
router.get("/filmes/busca/:palavra", async (req, res) => {
    const palavra = req.params.palavra.trim(); // palavra-chave para busca
    if (!palavra) { //validando da busca
        return res.status(400).json({
            message: "A palavra de busca não pode estar vazia."
        });
    }
    
    try {
        const filmes = await bancoDados.query(
            `SELECT * FROM filmes WHERE filmes.titulo LIKE ?`, 
            [`%${palavra}%`]
        );

        if (filmes.length === 0) { //verificando se encontrou algum filme
            return res.status(404).json({
                message: "Nenhum filme encontrado para essa busca."
            });
        }

        res.status(200).json(filmes);
    } catch (error) {
        console.error("Erro ao buscar filme:", error);

        res.status(500).json({
            message: "Erro interno ao buscar filmes."
        });
    }
});

//buscar por gênero
router.get("/generos/:genero", async (req, res) => {
    const genero = req.params.genero.trim(); // gênero específico para buscar os filmes
    if (!genero) { //validando
        return res.status(400).json({
            message: "O gênero não pode estar vazio."
        });
    }
    
    try {
        const filmes = await bancoDados.query(
            `SELECT filmes.titulo AS filme
            FROM ((filmes_generos 
                    INNER JOIN filmes ON filmes.id = filmes_generos.filme_id)
                    INNER JOIN generos ON generos.id = filmes_generos.genero_id)
            WHERE generos.titulo = ?`, 
            [genero]
        );

        if (filmes.length === 0) { //verificação
            return res.status(404).json({
                message: "Nenhum filme encontrado para esse gênero."
            });
        }
        res.status(200).json(filmes);
    } catch (error) {
        console.error("Erro ao buscar filmes por gênero:", error);

        res.status(500).json({
            message: "Erro interno ao buscar filmes por gênero."
        });
    }
});

module.exports = router;