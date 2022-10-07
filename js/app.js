(function() {

    let DB;

    document.addEventListener('DOMContentLoaded', function() {
        crearDB();
    });

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

})();
