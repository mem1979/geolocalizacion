function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
    } else {
        alert("La geolocalizaci�n no es soportada por este navegador.");
    }
}

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
        var event = new Event('change');
        ubicacionInput.dispatchEvent(event);
    } else {
        console.error("No se encontr� el campo de coordenadas 'ox_geolocalizacion_Ubicacion__ubicacion'");
    }
}

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
