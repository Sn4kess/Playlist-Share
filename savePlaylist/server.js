const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.static('public'));  // Para servir os arquivos estáticos

// Rota para listar os arquivos HTML na pasta 'savePlaylist'
app.get('/listPages', (req, res) => {
    const savePlaylistDir = path.join(__dirname, 'public', 'savePlaylist');
    
    fs.readdir(savePlaylistDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao ler a pasta', error: err.message });
        }

        // Filtrando arquivos com extensão .html
        const htmlFiles = files.filter(file => file.endsWith('.html')).map(file => {
            // Extrair o nome do arquivo sem a extensão
            const name = path.basename(file, '.html');
            return { name, filePath: `/savePlaylist/${file}` };
        });

        res.json(htmlFiles); // Envia a lista de arquivos para o front-end
    });
});

// Servindo arquivos da pasta 'savePlaylist'
app.use('/savePlaylist', express.static(path.join(__dirname, 'public', 'savePlaylist')));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
