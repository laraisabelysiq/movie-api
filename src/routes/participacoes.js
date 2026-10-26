const express = require("express");
const bancoDados = require("../config/database");

const router = express.Router();

// adicionar participação de ator em um filme
router.post("/participacoes", async (req, res) => {
    const ator_id = Number(req.body.ator_id);
    const filme_id = Number(req.body.filme_id);

    if (!Number.isInteger(ator_id) || ator_id < 1) {
        return res.status(400).json({
            message: "ID do ator inválido."
        });
    }

    if (!Number.isInteger(filme_id) || filme_id < 1) {
        return res.status(400).json({
            message: "ID do filme inválido."
        });
    }

    try {
        const atorExistente = await bancoDados.query(
            `SELECT id FROM atores WHERE id = ?`,
            [ator_id]
        );

        if (atorExistente.length === 0) {
            return res.status(404).json({
                message: "Ator não encontrado."
            });
        }

        const filmeExistente = await bancoDados.query(
            `SELECT id FROM filmes WHERE id = ?`,
            [filme_id]
        );

        if (filmeExistente.length === 0) {
            return res.status(404).json({
                message: "Filme não encontrado."
            });
        }

        const participacaoExistente = await bancoDados.query(
            `SELECT ator_id
             FROM atores_filmes
             WHERE ator_id = ? AND filme_id = ?`,
            [ator_id, filme_id]
        );

        if (participacaoExistente.length > 0) {
            return res.status(409).json({
                message: "Essa participação já está cadastrada."
            });
        }

        const participacao = await bancoDados.query(
            `INSERT INTO atores_filmes (ator_id, filme_id)
             VALUES (?, ?)`,
            [ator_id, filme_id]
        );

        console.log(
            `Participação adicionada - Ator ID: ${ator_id}, Filme ID: ${filme_id}`
        );

        return res.status(201).json({
            message: "Participação adicionada com sucesso.",
            participacaoID: participacao.insertId
        });

    } catch (error) {
        console.error("Erro ao adicionar participação:", error);

        return res.status(500).json({
            message: "Erro interno ao adicionar participação."
        });
    }
});

// remover participação de um ator em um filme
router.delete("/participacoes", async (req, res) => {
    const ator_id = Number(req.body.ator_id);
    const filme_id = Number(req.body.filme_id);

    if (!Number.isInteger(ator_id) || ator_id < 1) {
        return res.status(400).json({
            message: "ID do ator inválido."
        });
    }

    if (!Number.isInteger(filme_id) || filme_id < 1) {
        return res.status(400).json({
            message: "ID do filme inválido."
        });
    }

    try {
        const resultado = await bancoDados.query(
            `DELETE FROM atores_filmes
             WHERE ator_id = ? AND filme_id = ?`,
            [ator_id, filme_id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                message: "Participação não encontrada."
            });
        }

        return res.status(200).json({
            message: "Participação removida com sucesso."
        });

    } catch (error) {
        console.error("Erro ao remover participação:", error);

        return res.status(500).json({
            message: "Erro interno ao remover participação."
        });
    }
});

module.exports = router;
