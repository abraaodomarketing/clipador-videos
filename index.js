const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/cut', (req, res) => {
    const { url, start, duration } = req.body;
    const outputFile = `/tmp/cut-${Date.now()}.mp4`;

    ffmpeg(url)
        .setStartTime(start)
        .setDuration(duration)
        .output(outputFile)
        .on('end', () => {
            res.download(outputFile); // Envia o vídeo cortado de volta
        })
        .on('error', (err) => {
            res.status(500).send("Erro no processamento: " + err.message);
        })
        .run();
});

app.listen(3000, () => console.log('Servidor de corte rodando na porta 3000'));
