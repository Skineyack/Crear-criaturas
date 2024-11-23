from flask import Flask, request, jsonify, send_file
import zipfile
import os
from PIL import Image

app = Flask(__name__)

# Lista predefinida de bloques
block_list = [
    {"name": "arena", "file": "arena.png", "cell": (0, 0)},
    {"name": "tierra", "file": "tierra.png", "cell": (1, 0)},
    {"name": "piedra", "file": "piedra.png", "cell": (2, 0)},
    # Agrega más bloques según sea necesario
]

@app.route('/convert', methods=['POST'])
def convert_textures():
    minecraft_zip = request.files['minecraftTextures']
    survivalcraft_texture = request.files['survivalcraftTexture']
    resolution = int(request.form['resolution'])

    # Guardar los archivos subidos
    minecraft_zip.save('minecraft_textures.zip')
    survivalcraft_texture.save('survivalcraft_texture.png')

    # Descomprimir el ZIP y filtrar archivos PNG
    with zipfile.ZipFile('minecraft_textures.zip', 'r') as zip_ref:
        zip_ref.extractall('minecraft_textures')

    # Leer la primera textura para determinar su resolución
    first_texture_path = os.path.join('minecraft_textures', os.listdir('minecraft_textures')[0])
    first_texture = Image.open(first_texture_path)
    texture_width, texture_height = first_texture.size

    # Crear una nueva imagen para la textura de Survivalcraft
    survivalcraft_texture = Image.open('survivalcraft_texture.png')
    new_texture = Image.new('RGBA', (resolution, resolution))

    # Redimensionar y colocar las texturas de Minecraft en la textura de Survivalcraft
    for block in block_list:
        block_texture_path = os.path.join('minecraft_textures', block['file'])
        if os.path.exists(block_texture_path):
            block_texture = Image.open(block_texture_path)
            # Redimensionar la textura del bloque
            block_texture = block_texture.resize((resolution // len(block_list), resolution // len(block_list)))
            # Calcular la posición en la textura de Survivalcraft
            cell_x, cell_y = block['cell']
            new_texture.paste(block_texture, (cell_x * (resolution // len(block_list)), cell_y * (resolution // len(block_list))))

    # Guardar la nueva textura
    output_texture_path = 'output_texture.png'
    new_texture.save(output_texture_path)

    return jsonify({
        'textureUrl': output_texture_path,
        'downloadUrl': output_texture_path
    })

if __name__ == '__main__':
    app.run(debug=True)
