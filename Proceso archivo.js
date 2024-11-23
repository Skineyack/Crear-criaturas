document.getElementById('texture-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.classList.remove('hidden');

    const minecraftTextures = document.getElementById('minecraft-textures').files[0];
    const survivalcraftTexture = document.getElementById('survivalcraft-texture').files[0];
    const resolution = parseInt(document.getElementById('resolution').value);

    const formData = new FormData();
    formData.append('minecraftTextures', minecraftTextures);
    formData.append('survivalcraftTexture', survivalcraftTexture);
    formData.append('resolution', resolution);

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la conversión de texturas.');
        }

        const resultBlob = await response.blob();
        const url = URL.createObjectURL(resultBlob);
        document.getElementById('result').innerHTML = `<a href="${url}" download="resultado.png">Descargar textura combinada</a>`;
    } catch (error) {
        alert(error.message);
    } finally {
        loadingIndicator.classList.add('hidden');
    }
});
