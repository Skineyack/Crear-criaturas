const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

app.post('/convert', upload.fields([{ name: 'minecraftTextures' }, { name: 'survivalcraftTexture' }]), (req, res) => {
    // Aquí iría la lógica para procesar las texturas
    // Simulación de respuesta
    res.json({
        textureUrl: '/path/to/processed/texture.png',
        downloadUrl: '/path/to/download/texture.zip'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
