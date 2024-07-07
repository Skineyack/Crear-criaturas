const form = document.getElementById('criatura-form');
const nombreInput = document.getElementById('nombre');
const tipoSelect = document.getElementById('tipo');
const guardarButton = document.getElementById('guardar');

guardarButton.addEventListener('click', (e) => {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const tipo = tipoSelect.value;

    if (nombre && tipo) {
        const datos = `Nombre: ${nombre}\nTipo: ${tipo}`;
        const blob = new Blob([datos], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `criatura_${nombre}.txt`;
        a.click();
    } else {
        alert('Por favor, complete todos los campos');
    }
});
