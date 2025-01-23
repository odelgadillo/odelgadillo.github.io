Zebra = {};

Zebra.ZPRINTER_DIS_SERVICE_UUID = "0000180a-0000-1000-8000-00805f9b34fb" // Or "180A". Device Information Services UUID
Zebra.ZPRINTER_SERVICE_UUID = "38eb4a80-c570-11e3-9507-0002a5d5c51b"       // Zebra Bluetooth LE Parser Service
Zebra.READ_FROM_ZPRINTER_CHARACTERISTIC_UUID = "38eb4a81-c570-11e3-9507-0002a5d5c51b" // Read from printer characteristic
Zebra.WRITE_TO_ZPRINTER_CHARACTERISTIC_UUID = "38eb4a82-c570-11e3-9507-0002a5d5c51b" // Write to printer characteristic

function ab2str(buf) {

    var strResult = Array.prototype.map.call(new Uint8Array(buf), x => ('00' + x.toString(16)).slice(-2)).join('');
    //return strResult.substring(16, 40).toUpperCase();
    //return strResult.toUpperCase();
    return strResult.trim().toUpperCase();

}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

Zebra.Connect = function () {

    if (!navigator.bluetooth) {
        alert("Su navegador no soporta conexión a dispositivos bluetooth, debe usar Google Chrome bajo el protocolo https.")
        return false;
    }

    var a = 0;
    var idTimer = 0;
    var DataToSend;
    DataToSend = str2ab(Zebra.zpl);


    var tiempoEspera = 100;
    var bytesToSend = 512;

    if (Zebra.server) {
        if (Zebra.server.connected) {
            if (Zebra.write) {
                idTimer = setInterval(function () {
                    if (a <= DataToSend.byteLength) {
                        Zebra.write.writeValueWithoutResponse(DataToSend.slice(a, a + bytesToSend))
                            .then(function (variable) {
                                console.log("Impresión Correcta.");
                            });
                        a = a + bytesToSend;
                    } else {
                        clearInterval(idTimer);
                    }
                }, tiempoEspera)
            }
        }
    }

    navigator.bluetooth.requestDevice({
        filters: [
            {
                //services: ['38eb4a81-c570-11e3-9507-0002a5d5c51b'] 
                namePrefix: 'X'
            }
        ],
        //acceptAllDevices: true,
        optionalServices: [Zebra.ZPRINTER_SERVICE_UUID]
    })
        .then(device => {
            Zebra.gatt = device.gatt;
            console.log('Connecting to GATT Server...');
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Getting Services...');
            Zebra.server = server;
            return server.getPrimaryServices(Zebra.ZPRINTER_SERVICE_UUID);
        })
        .then(services => {
            return services[0].getCharacteristics(Zebra.WRITE_TO_ZPRINTER_CHARACTERISTIC_UUID);
        })
        .then(Caracteristicas => {

            Zebra.write = Caracteristicas[0];

            //tiempoEspera = prompt("Tiempo de espera");

            //console.log(DataToSend);
            //return false;

            idTimer = setInterval(function () {
                if (a <= DataToSend.byteLength) {
                    Zebra.write.writeValueWithoutResponse(DataToSend.slice(a, a + bytesToSend))
                        .then(function (variable) {
                            console.log("Impresión Correcta.");
                        });
                    a = a + bytesToSend;
                } else {
                    clearInterval(idTimer);
                }
            }, tiempoEspera)

        })
        .catch(error => {
            console.log(error);
        });
}

Zebra.ImprimirPrueba = function () {
    var urlRep = "../PlantillaZebra/Prueba.txt";
    fetch(urlRep,
        {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/text'
            },
        })
        .then(function (page) {
            if (page.status === 404) {
                console.log("Archivo Prueba.txt No encontrado.");
                return false;
            }
            return page.text();
        })
        .then(function (respuesta) {
            Zebra.zpl = respuesta;
            console.log('Codigo ZPL recuperado:');
            try {
                Zebra.Connect();
            } catch (e) {
                console.log("Error al mandar la nota de venta a la impresora.");
                return false
            }
        })
        .catch(function (par1, par2, par3) {
            console.log("Error al obtener el archivo de impresión de nota de venta.");
            return false
        }
        )
}