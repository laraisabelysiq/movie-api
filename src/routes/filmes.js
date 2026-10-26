const express = require("express");
const bancoDados = require("../config/database");

const router = express.Router();

//listar os filmes por página
router.get("/filmes/:pagina", async (req, res) => {
    const pagina = Number(req.params.pagina); // número da página da URL
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

        const resultadoTotal = await bancoDados.query(
            `SELECT COUNT(*) AS total FROM filmes`
        );

        const totalFilmes = resultadoTotal[0].total;
        const totalPaginas = Math.ceil(totalFilmes / filmesPorPagina);

        if (filmes.length === 0) { //verifica se existem filmes nessa página
        return res.status(404).json({
            message: "Nenhum filme encontrado nesta página."
        });
    }
        res.status(200).json({ // resposta da pesquisa, desenvolvendo json
            pagina,
            filmesPorPagina,
            totalFilmes,
            totalPaginas,
            filmes
        });
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
            `SELECT * 
            FROM filmes 
            WHERE filmes.titulo LIKE ?
            ORDER BY titulo ASC`, 
            [`%${palavra}%`]
        );

        if (filmes.length === 0) { //verificando se encontrou algum filme
            return res.status(404).json({
                message: "Nenhum filme encontrado para essa busca."
            });
        }

        res.status(200).json({
            busca: palavra,
            totalResultados: filmes.length,
            filmes
        });
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
            `SELECT filmes.*
            FROM filmes_generos
            INNER JOIN filmes ON filmes.id = filmes_generos.filme_id
            INNER JOIN generos ON generos.id = filmes_generos.genero_id
            WHERE generos.titulo = ?
            ORDER BY filmes.titulo ASC`,
            [genero]
        );

        if (filmes.length === 0) { //verificação
            return res.status(404).json({
                message: "Nenhum filme encontrado para esse gênero."
            });
        }
        res.status(200).json({
            genero,
            totalResultados: filmes.length,
            filmes
        });
    } catch (error) {
        console.error("Erro ao buscar filmes por gênero:", error);

        res.status(500).json({
            message: "Erro interno ao buscar filmes por gênero."
        });
    }
});

//adicionar um novo filme
router.post("/filmes", async (req, res) => {
    const {
        titulo,
        ano,
        duracao,
        sinopse,
        poster,
        nota,
        votos,
        imdb_id
    } = req.body;

    if (typeof titulo !== "string" || !titulo.trim()) {
        return res.status(400).json({
            message: "O título do filme é obrigatório."
        });
    }

    if (typeof sinopse !== "string" || !sinopse.trim()) {
        return res.status(400).json({
            message: "A sinopse do filme é obrigatória."
        });
    }

    if (typeof poster !== "string" || !poster.trim()) {
        return res.status(400).json({
            message: "O poster do filme é obrigatório."
        });
    }

    if (typeof imdb_id !== "string" || !imdb_id.trim()) {
        return res.status(400).json({
            message: "O ID do IMDb é obrigatório."
        });
    }

    if (!/^tt\d+$/.test(imdb_id)) {
        return res.status(400).json({
            message: "O ID do IMDb é inválido."
        });
    }

     if (!Number.isInteger(ano) || ano < 1888 || ano > new Date().getFullYear()) {
        return res.status(400).json({
            message: "O ano do filme é inválido."
        });
    }

    if (!Number.isInteger(duracao) || duracao < 1) {
        return res.status(400).json({
            message: "A duração do filme é inválida."
        });
    }

    if (typeof nota !== "number" || nota < 0 || nota > 10) {
        return res.status(400).json({
            message: "A nota deve ser um número entre 0 e 10."
        });
    }

    if (!Number.isInteger(votos) || votos < 0) {
        return res.status(400).json({
            message: "A quantidade de votos é inválida."
        });
    }

    try {
        const filmeExistente = await bancoDados.query(
            `SELECT id FROM filmes WHERE imdb_id = ?`,
            [imdb_id]
        );

        if (filmeExistente.length > 0) {
            return res.status(409).json({
                message: "Esse filme já está cadastrado."
            });
        }

        const filme = await bancoDados.query(
            `INSERT INTO filmes 
            (titulo, ano, duracao, sinopse, poster, nota, votos, imdb_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [titulo, ano, duracao, sinopse, poster, nota, votos, imdb_id]
        );

        res.status(201).json({
            message: "Filme adicionado com sucesso.",
            filmeID: filme.insertId
        });
    } catch (error) {
        console.error("Erro ao adicionar filme:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Esse filme já está cadastrado."
            });
        }

        return res.status(500).json({
            message: "Erro interno ao adicionar filme."
        });
    }
});

//atualizar um filme
router.put("/filmes", async (req, res) => {
    const {
        id,
        titulo,
        ano,
        duracao,
        sinopse,
        poster,
        nota,
        votos,
        imdb_id
    } = req.body;
    const filmeId = Number(id);

    if (!Number.isInteger(filmeId) || filmeId < 1) {
        return res.status(400).json({
            message: "ID do filme inválido."
        });
    }

    if (typeof titulo !== "string" || !titulo.trim()) {
        return res.status(400).json({
            message: "O título do filme é obrigatório."
        });
    }

    if (typeof sinopse !== "string" || !sinopse.trim()) {        
        return res.status(400).json({
            message: "A sinopse do filme é obrigatória."
        });
    }

    if (typeof poster !== "string" || !poster.trim()) {
        return res.status(400).json({
            message: "O poster do filme é obrigatório."
        });
    }

    if (typeof imdb_id !== "string" || !imdb_id.trim()) {
        return res.status(400).json({
            message: "O ID do IMDb é obrigatório."
        });
    }

    if (!/^tt\d+$/.test(imdb_id)) {
        return res.status(400).json({
            message: "O ID do IMDb é inválido."
        });
    }

    if (!Number.isInteger(ano) || ano < 1888 || ano > new Date().getFullYear()) {
        return res.status(400).json({
            message: "O ano do filme é inválido."
        });
    }

    if (!Number.isInteger(duracao) || duracao < 1) {
        return res.status(400).json({
            message: "A duração do filme é inválida."
        });
    }

    if (typeof nota !== "number" || nota < 0 || nota > 10) {
        return res.status(400).json({
            message: "A nota deve ser um número entre 0 e 10."
        });
    }

    if (!Number.isInteger(votos) || votos < 0) {
        return res.status(400).json({
            message: "A quantidade de votos é inválida."
        });
    }

    try {
        const filmeExistente = await bancoDados.query(
            `SELECT id FROM filmes WHERE id = ?`,
            [filmeId]
        );

        if (filmeExistente.length === 0) {
            return res.status(404).json({
                message: "Filme não encontrado."
            });
        }

        const filme = await bancoDados.query(
            `UPDATE filmes
            SET titulo = ?, ano = ?, duracao = ?, sinopse = ?, poster = ?, nota = ?, votos = ?, imdb_id = ?
            WHERE id = ?`,
            [titulo, ano, duracao, sinopse, poster, nota, votos, imdb_id, filmeId]
        );

        res.status(200).json({
            message: "Filme atualizado com sucesso."
        });
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);

        res.status(500).json({
            message: "Erro interno ao atualizar filme."
        });
    }
});

//deletar um filme
router.delete("/filmes/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "ID do filme inválido."
        });
    }

    try {
         const filme = await bancoDados.query(
            `DELETE FROM filmes WHERE id = ?`,
            [id]
        );

        if (filme.affectedRows === 0) {
        return res.status(404).json({
            message: "Filme não encontrado."
        });
    }

        res.status(200).json({
            message: "Filme deletado com sucesso."
        });
    } catch (error) {
        console.error("Erro ao deletar filme:", error);

        res.status(500).json({
            message: "Erro interno ao deletar filme."
        });
    }
});

module.exports = router;
