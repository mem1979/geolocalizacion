// Opciones de geolocalizaci�n
const options = {
    enableHighAccuracy: true, // Mejorar precisi�n
    timeout: 5000,            // Tiempo m�ximo para obtener la ubicaci�n
    maximumAge: 0             // No usar ubicaciones almacenadas en cach�
};

// Funci�n para obtener la geolocalizaci�n
function obtenerUbicacion() {
    if (navigator.geolocation) {
        // Obtener la ubicaci�n actual con las opciones avanzadas
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError, options);
    } else {
        alert("La geolocalizaci�n no es soportada por este navegador.");
    }
}

// Funci�n para mostrar la posici�n obtenida
function mostrarPosicion(position) {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;

    // Formatear las coordenadas como un string
    const coordenadas = latitud + ", " + longitud;

    // Obtener el campo de coordenadas en OpenXava
    const ubicacionInput = document.getElementById("ox_geolocalizacion_Ubicacion__ubicacion");

    // Verificar si el campo existe antes de asignarle el valor
    if (ubicacionInput) {
        ubicacionInput.value = coordenadas;

        // Disparar el evento de cambio para actualizar la vista
        const event = new Event('change');
        ubicacionInput.dispatchEvent(event);

        // Mostrar detalles de precisi�n y coordenadas
        console.log("Ubicaci�n obtenida con �xito:");
        console.log(`Latitud: ${latitud}`);
        console.log(`Longitud: ${longitud}`);
        console.log(`Precisi�n aproximada: ${position.coords.accuracy} metros.`);
    } else {
        console.error("No se encontr� el campo de coordenadas 'ox_geolocalizacion_Ubicacion__ubicacion'");
    }

    // Llamar a la funci�n para obtener la huella digital despu�s de la geolocalizaci�n
    obtenerFingerprint();
}

// Funci�n para mostrar los errores de geolocalizaci�n
function mostrarError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario deneg� la solicitud de geolocalizaci�n.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La informaci�n de la ubicaci�n no est� disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud de geolocalizaci�n ha expirado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido.");
            break;
    }
}

// Funci�n para obtener la huella digital del navegador usando Fingerprint.js
function obtenerFingerprint() {
    // Inicializar Fingerprint.js
    const fpPromise = FingerprintJS.load();

    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId;
            console.log("Huella digital del visitante:", visitorId);

            // Obtener el campo de huella digital en OpenXava
            const fingerprintInput = document.getElementById("ox_geolocalizacion_Ubicacion__fingerprint");

            // Verificar si el campo existe antes de asignarle el valor
            if (fingerprintInput) {
                fingerprintInput.value = visitorId;

                // Disparar el evento de cambio para actualizar la vista
                const event = new Event('change');
                fingerprintInput.dispatchEvent(event);
            } else {
                console.error("No se encontr� el campo de huella digital 'ox_geolocalizacion_Ubicacion__fingerprint'");
            }
        });
}

// Llamar a la funci�n para obtener la ubicaci�n y la huella digital al cargar la p�gina
window.onload = function() {
    obtenerUbicacion();
};
