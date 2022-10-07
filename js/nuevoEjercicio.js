(function() {

    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();
        formulario.addEventListener('submit', validarEjercicio);

    });

    const conectarDB = () => {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = () => {
            console.log('Hubo un error');
        }

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;
        }
    }

    const validarEjercicio = (event) => {
        event.preventDefault();

        // Leer todos los inputs
        const nombre_ejercicio = document.querySelector('#nombre_ejercicio').value,
            grupo_muscular = document.querySelector('#grupo_muscular').value,
            maquina = document.querySelector('#maquina').value,
            talla = document.querySelector('#talla').value,
            banca = document.querySelector('#banca').value,
            espaldar = document.querySelector('#espaldar').value,
            rango = document.querySelector('#rango').value,
            peso = document.querySelector('#peso').value,
            repeticiones = document.querySelector('#repeticiones').value,
            series = document.querySelector('#series').value
            recomendaciones = document.querySelector('#recomendaciones').value;


            if (nombre_ejercicio === '' || grupo_muscular === '' || peso === '' || repeticiones === '' || series === '') {
                imprimirAlerta('Los campos son obligatorios', 'error');
                return;
            }

            // Crear un objeto con la información
            const ejercicio = {
                id: Date.now(),
                nombre_ejercicio,
                grupo_muscular,
                maquina,
                talla,
                banca,
                espaldar,
                rango,
                peso,
                repeticiones,
                series,
                recomendaciones
            }

            crearNuevoEjercicio(ejercicio);
    };

    const crearNuevoEjercicio = (ejercicio) => {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');
        objectStore.add(ejercicio);

        transaction.onerror = () => {
            imprimirAlerta('Hubo un error', 'error');
        }

        transaction.oncomplete = () => {
            imprimirAlerta('Ejercicio agregado correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4000);
        }

    }


})();