const express = require("express");
const bancoDados = require("../config/database");

const router = express.Router();

//buscar por ator pelo id
router.get("/ator/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "ID inválido."
        });
    }

    try {
        const filmes = await bancoDados.query(
            `SELECT 
                atores.titulo AS ator,
                filmes.titulo AS filme
             FROM atores_filmes
             INNER JOIN atores ON atores.id = atores_filmes.ator_id
             INNER JOIN filmes ON filmes.id = atores_filmes.filme_id
             WHERE atores.id = ?`,
            [id]
        );

        if (filmes.length === 0) { //se o ator existe
            return res.status(404).json({
                message: "Ator não encontrado ou sem filmes cadastrados."
            });
        }

        res.status(200).json(filmes);

    } catch (error) {
        console.error("Erro ao buscar filmes do ator:", error);

        res.status(500).json({
            message: "Erro interno ao buscar filmes do ator."
        });
    }
});

//buscar ator pelo nome e listar os filmes
router.get("/atores/busca/:palavra", async (req, res) => {
    const palavra = req.params.palavra.trim();
    if (!palavra) {
        return res.status(400).json({
            message: "A palavra de busca não pode estar vazia."
        });
    }

    try {
        const resultados = await bancoDados.query(
            `SELECT atores.titulo AS ator, filmes.titulo AS filme
             FROM atores_filmes
             INNER JOIN atores ON atores.id = atores_filmes.ator_id
             INNER JOIN filmes ON filmes.id = atores_filmes.filme_id
             WHERE atores.titulo LIKE ?`,
            [`%${palavra}%`]
        );

        if (resultados.length === 0) { //verifica se encontrou algum resultado
            return res.status(404).json({
                message: "Nenhum ator encontrado para essa busca."
            });
        }

        const info = {}; //organizando
        for (const item of resultados) {
            const ator = item.ator;
            const filme = item.filme;

            if (!info[ator]) {
                info[ator] = [];
            }
            info[ator].push(filme);
        }

        //resposta
        const resposta = Object.keys(info).map((ator) => ({ //transforma o objeto em um array
            ator,
            filmes: info[ator]
        }));

        res.status(200).json(resposta);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);

        res.status(500).json({
            message: "Erro interno ao buscar atores."
        });
    }
});

//adicionar um novo ator ao banco de dados
router.post("/atores", async (req, res) => {
    const titulo = req.body.titulo?.trim(); //título do ator
    if (!titulo) {
        return res.status(400).json({
            message: "O nome do ator é obrigatório."
        });
    }

    try {
        const ator = await bancoDados.query( // insere no banco de dados
            `INSERT INTO atores (titulo) VALUES ( ? )`, 
            [titulo]
        );
        const atorID = ator.insertId; // id do ator adicionado
        console.log(`ID do ator adicionado: ${atorID}`);
         res.status(201).json({ //resposta
            message: "Ator adicionado com sucesso.",
            atorID: atorID
        });
    } catch (error) {
        console.error("Erro ao adicionar ator:", error);

        res.status(500).json({
            message: "Erro interno ao adicionar ator."
        });
    }
});

//atualiza o nome de um ator existente
router.put("/atores", async (req, res) => {
    const id = Number(req.body.id);
    const titulo = req.body.titulo?.trim();

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "ID inválido."
        });
    }
    if (!titulo) {
        return res.status(400).json({
            message: "O nome do ator é obrigatório."
        });
    }

    try {
        const resultado = await bancoDados.query( // atualiza o nome do ator
            `UPDATE atores SET titulo = ? WHERE id = ?`, 
            [titulo, id]
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                message: "Ator não encontrado."
            });
        }

        console.log(`ID do ator atualizado: ${id}`);
        res.status(200).json({
            message: "Ator atualizado com sucesso",
            atorID: id,
        });
    } catch (error) {
        console.error("Erro ao atualizar ator:", error);

        res.status(500).json({
            message: "Erro interno ao atualizar ator."
        });
    }
});

//deletar um ator e suas participações
router.delete("/atores/:id", async (req, res) => {
    const ator_id = Number(req.params.id);
    if (!Number.isInteger(ator_id) || ator_id < 1) {
        return res.status(400).json({
            message: "ID inválido."
        });
    }

    try {
        const ator = await bancoDados.query(
            `SELECT id FROM atores WHERE id = ?`,
            [ator_id]
        );
        if (ator.length === 0) {
            return res.status(404).json({
                message: "Ator não encontrado."
            });
        }

        // deleta o ator
        const atorRemovido = await bancoDados.query(
            `DELETE FROM atores WHERE id = ?`, 
            [ator_id]
        );
        console.log(`ID do ator removido: ${ator_id}`);

        // resultados
        res.status(200).json({
            message: "Ator e participações removidos com sucesso.",
            atorRemovido: atorRemovido.affectedRows
        });
    } catch (error) {
        console.error("Erro ao remover ator:", error);

        res.status(500).json({
            message: "Erro interno ao remover ator."
        });
    }
});

module.exports = router;
