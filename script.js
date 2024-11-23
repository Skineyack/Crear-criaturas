document.getElementById('textureForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const minecraftTextures = document.getElementById('minecraftTextures').files[0];
    const survivalcraftTexture = document.getElementById('survivalcraftTexture').files[0];
    const resolution = document.getElementById('resolution').value;

    const formData = new FormData();
    formData.append('minecraftTextures', minecraftTextures);
    formData.append('survivalcraftTexture', survivalcraftTexture);
    formData.append('resolution', resolution);

    document.getElementById('loading').style.display = 'block';

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Error en el procesamiento');

        const result = await response.blob();
        const url = URL.createObjectURL(result);
        document.getElementById('resultImage').src = url;
        document.getElementById('downloadLink').href = url;
        document.getElementById('result').style.display = 'block';
    } catch (error) {
        alert('Ocurrió un error: ' + error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});
