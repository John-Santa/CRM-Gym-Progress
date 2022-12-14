(function() {

    let DB;
    const listadoEjercicios = document.querySelector('#listado-ejercicios');

    document.addEventListener('DOMContentLoaded', function() {
        crearDB();

        if (window.indexedDB.open('crm', 1)) {
            obtenerEjercicios();
        }

        listadoEjercicios.addEventListener('click', eliminarRegistro);
    });

    const eliminarRegistro = (event) => {

        if (event.target.classList.contains('eliminar')) {
            const idEliminar = Number(event.target.dataset.ejercicio);

            const confirmar = confirm('¿Deseas eliminar este ejercicio?');

            if (confirmar) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function() {
                    console.log('Eliminado');
                    event.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    console.log('Hubo un error');
                }
            }
        }

    }

    const crearDB = () => {
        const db = window.indexedDB.open('crm', 1);

        db.onerror = function() {
            console.log('Hubo un error');
        };

        db.onsuccess = function() {
            DB = db.result;
        };

        db.onupgradeneeded = function(event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('nombre_ejercicio', 'nombre_ejercicio', { unique: false });
            objectStore.createIndex('grupo_muscular', 'grupo_muscular', { unique: false });
            objectStore.createIndex('maquina', 'maquina', { unique: false });
            objectStore.createIndex('talla', 'talla', { unique: false });
            objectStore.createIndex('banca', 'banca', { unique: false });
            objectStore.createIndex('espaldar', 'espaldar', { unique: false });
            objectStore.createIndex('rango', 'rango', { unique: false });
            objectStore.createIndex('peso', 'peso', { unique: false });
            objectStore.createIndex('repeticiones', 'repeticiones', { unique: false });
            objectStore.createIndex('series', 'series', { unique: false });

            console.log('DB creada y lista');
        }
    };

    const obtenerEjercicios = () => {
        //abrir conexion
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        }

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(event) {
                const cursor = event.target.result;

                if (cursor) {
                    const { id, nombre_ejercicio, grupo_muscular, maquina, talla, banca, espaldar, rango, peso, repeticiones, series, recomendaciones } = cursor.value;


                    listadoEjercicios.innerHTML += `
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre_ejercicio} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${grupo_muscular} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${maquina} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${talla} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${banca} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${espaldar} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${rango} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${peso} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${repeticiones} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${series} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-gray-200">
                                <p class="text-sm leading-5 text-gray-700"> ${recomendaciones} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-right border-gray-200 text-sm leading-5 font-medium">
                                <a href="editar-ejercicio.html?id=${id}" class="text-orange-600 hover:text-orange-900 mr-5">Editar</a>
                                <a href="#" data-ejercicio="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>
                    `;

                    cursor.continue();
                } else {
                    console.log('No hay mas registros');
                }

            }
        }

    }

})();
