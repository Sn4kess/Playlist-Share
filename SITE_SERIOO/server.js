const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importando o CORS
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());  // Habilita o CORS para todas as origens (portas diferentes)
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir arquivos estáticos

// Rota para salvar o conteúdo da playlist
app.post('/savePlaylist', (req, res) => {
    console.log('Recebendo dados do POST:', req.body);
    const { playlist1, playlist2, playlist3, nome } = req.body;

    if (!playlist1 || !playlist2 || !playlist3 || !nome) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    // Conteúdo do arquivo HTML
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Playlist de: ${nome}</title>
        <link rel="stylesheet" href="musga.css">
    <link rel="stylesheet" href="estrelas.css">
    </head>
    <body>
        
        
    
        <div class="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
    </div>
    <div class="box">
    <img id="imagem" src="../Spotify_icon.svg.png">
    <h1 id="Titulo">Playlist de: ${nome}</h1>
    
    
</div>
<div class="box2">
    <a id="voltar" href="index.html">VOLTAR</a>
</div>
<div class="carousel-container">
    <div class="carousel-slide active">
        <iframe src="${playlist1}" allow="encrypted-media"></iframe>
    </div>
    <div class="carousel-slide">
        <iframe src="${playlist2}" allow="encrypted-media"></iframe>
    </div>
    <div class="carousel-slide">
        <iframe src="${playlist3}" allow="encrypted-media"></iframe>
    </div>

    <div class="carousel-controls">
        <button id="bot1" onclick="prevSlide()">❮</button>
        <button id="bot2" onclick="nextSlide()">❯</button>
    </div>
</div>

<!-- Importando o script JS -->
<script src="script.js"></script>




        </body>
    </html>
    `;

    // Caminho do arquivo HTML
    const filePath = path.join(__dirname, 'savePlaylist', `${nome}.html`);
    console.log('Salvando arquivo em:', filePath);

    // Tentar salvar o arquivo
    try {
        fs.writeFileSync(filePath, htmlContent);
        return res.json({ message: 'Página criada com sucesso!', filePath });
    } catch (error) {
        console.error('Erro ao criar o arquivo:', error);
        return res.status(500).json({ message: 'Erro ao criar a página', error: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
