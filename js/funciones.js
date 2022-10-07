const imprimirAlerta = (mensaje, tipo) => {

    const alerta = document.querySelector('.alerta');

    if(!alerta) {

        //crear alerta
        const alerta = document.createElement('div');
        alerta.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if (tipo === 'error') {
            alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }else {
            alerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }

        alerta.textContent = mensaje;
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}