const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.fields([{ name: 'minecraftTextures' }, { name: 'survivalcraftTexture' }]), (req, res) => {
    // Aquí iría la lógica para procesar las texturas
    // Descomprimir el ZIP, leer las texturas, redimensionar, etc.

    // Simulación de resultado
    const resultImagePath = path.join(__dirname, 'uploads', 'result.png');
    fs.createReadStream(resultImagePath).pipe(res);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
