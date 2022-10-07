
(function() {

    let DB;
    let idEjercicio;

    let nombre_ejercicio_input = document.querySelector('#nombre_ejercicio');
    let grupo_muscular_input = document.querySelector('#grupo_muscular');
    let maquina_input = document.querySelector('#maquina');
    let talla_input = document.querySelector('#talla');
    let banca_input = document.querySelector('#banca');
    let espaldar_input = document.querySelector('#espaldar');
    let rango_input = document.querySelector('#rango');
    let peso_input = document.querySelector('#peso');
    let repeticiones_input = document.querySelector('#repeticiones');
    let series_input = document.querySelector('#series');
    let recomendaciones_input = document.querySelector('#recomendaciones');

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        //actualizar
        formulario.addEventListener('submit', actualizarEjercicio);


        //verificar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search);
        idEjercicio = parseInt(parametrosURL.get('id'));

        if (idEjercicio) {
            setTimeout(() => {
                obtenerEjercicio(idEjercicio);
            }, 100);

        }
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

    const actualizarEjercicio = (event) => {
        event.preventDefault();

        if (nombre_ejercicio_input.value === '' || grupo_muscular_input.value === '' || peso_input.value === '' || repeticiones_input.value === '' || series_input.value === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        } else {
            //actualizar el registro
            const ejercicioActualizado = {
                nombre_ejercicio: nombre_ejercicio_input.value,
                grupo_muscular: grupo_muscular_input.value,
                maquina: maquina_input.value,
                talla: talla_input.value,
                banca: banca_input.value,
                espaldar: espaldar_input.value,
                rango: rango_input.value,
                peso: peso_input.value,
                repeticiones: repeticiones_input.value,
                series: series_input.value,
                recomendaciones: recomendaciones_input.value,
                id: idEjercicio
            }

            const transaction = DB.transaction(['crm'], 'readwrite');
            const objectStore = transaction.objectStore('crm');

            objectStore.put(ejercicioActualizado);

            transaction.oncomplete = () => {
                imprimirAlerta('Ejercicio actualizado correctamente');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            }

            transaction.onerror = () => {
                imprimirAlerta('Hubo un error', 'error');
            }
        }
    }

    const obtenerEjercicio = (id) => {
        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');

        const ejercicio = objectStore.openCursor();
        ejercicio.onsuccess = function(event) {
            const cursor = event.target.result;

            if (cursor) {
                if (cursor.value.id === id) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    const llenarFormulario = (datosEjercicio) => {
        const { nombre_ejercicio, grupo_muscular, maquina, talla, banca, espaldar, rango, peso, repeticiones, series, recomendaciones } = datosEjercicio;

        nombre_ejercicio_input.value = nombre_ejercicio;
        grupo_muscular_input.value = grupo_muscular;
        maquina_input.value = maquina;
        talla_input.value = talla;
        banca_input.value = banca;
        espaldar_input.value = espaldar;
        rango_input.value = rango;
        peso_input.value = peso;
        repeticiones_input.value = repeticiones;
        series_input.value = series;
        recomendaciones_input.value = recomendaciones;

    }

})();