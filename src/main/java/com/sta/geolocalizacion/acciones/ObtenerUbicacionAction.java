package com.sta.geolocalizacion.acciones;

import java.time.*;

import org.openxava.actions.*;

public class ObtenerUbicacionAction extends ViewBaseAction implements IJavaScriptPostAction {

    @Override
    public void execute() throws Exception {
        // Puedes agregar cualquier lógica del lado del servidor aquí si es necesario
    	getView().setValue("fechaHora", LocalDateTime.now());
        addMessage("GEOLOCALIZACION REGISTRADA...");
    }


    @Override
	public String getPostJavaScript() {
        // Este código JavaScript será ejecutado en el cliente después de la acción
        return "obtenerUbicacion();";
    }


	
}
