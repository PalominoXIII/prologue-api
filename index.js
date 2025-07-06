const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/argumentacao', (req, res) => {
    const { categoria, pergunta, valor } = req.query;

    if (!categoria || !pergunta || !valor) {
        return res.status(400).send('Parâmetros obrigatórios: categoria, pergunta, valor');
    }

    const sql = `
        SELECT frase 
        FROM argumentacoes_iniciais 
        WHERE categoria = ? AND pergunta = ? AND valor_resposta = ?
    `;

    db.query(sql, [categoria, pergunta, valor], (err, result) => {
        if (err) {
            console.error('Erro ao buscar frase:', err);
            return res.status(500).send('Erro no banco de dados');
        }

        if (result.length === 0) {
            return res.status(404).send('Frase não encontrada');
        }

        res.json({ frase: result[0].frase });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});

app.get('/motivos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT argumentacao FROM motivos_cancelamento WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar motivo:', err);
            return res.status(500).send('Erro no banco de dados');
        }

        if (result.length === 0) {
            return res.status(404).send('Motivo não encontrado');
        }

        res.json({ argumentacao: result[0].argumentacao });
    });
});

app.get('/recapitulacao/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT recapitulacao FROM recapitulacoes_motivos WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar recapitulação:', err);
            return res.status(500).send('Erro no banco de dados');
        }

        if (result.length === 0) {
            return res.status(404).send('Motivo não encontrado');
        }

        res.json({ recapitulacao: result[0].recapitulacao });
    });
});
