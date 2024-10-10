// Opciones de geolocalización
const options = {
    enableHighAccuracy: true, // Mejorar precisión
    timeout: 5000,            // Tiempo máximo para obtener la ubicación
    maximumAge: 0             // No usar ubicaciones almacenadas en caché
};

// Función para obtener la geolocalización
function obtenerUbicacion() {
    if (navigator.geolocation) {
        // Obtener la ubicación actual con las opciones avanzadas
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError, options);
    } else {
        alert("La geolocalización no es soportada por este navegador.");
    }
}

// Función para mostrar la posición obtenida
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

        // Mostrar detalles de precisión y coordenadas
        console.log("Ubicación obtenida con éxito:");
        console.log(`Latitud: ${latitud}`);
        console.log(`Longitud: ${longitud}`);
        console.log(`Precisión aproximada: ${position.coords.accuracy} metros.`);
    } else {
        console.error("No se encontró el campo de coordenadas 'ox_geolocalizacion_Ubicacion__ubicacion'");
    }

    // Llamar a la función para obtener la huella digital después de la geolocalización
    obtenerFingerprint();
}

// Función para mostrar los errores de geolocalización
function mostrarError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario denegó la solicitud de geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de la ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud de geolocalización ha expirado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido.");
            break;
    }
}

// Función para obtener la huella digital del navegador usando Fingerprint.js
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
                console.error("No se encontró el campo de huella digital 'ox_geolocalizacion_Ubicacion__fingerprint'");
            }
        });
}

// Llamar a la función para obtener la ubicación y la huella digital al cargar la página
window.onload = function() {
    obtenerUbicacion();
};
