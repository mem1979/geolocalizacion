package com.sta.geolocalizacion.acciones;

import java.time.*;

import org.openxava.actions.*;

public class ObtenerUbicacionAction extends ViewBaseAction implements IJavaScriptPostAction {

    @Override
    public void execute() throws Exception {
        // Puedes agregar cualquier l�gica del lado del servidor aqu� si es necesario
    	getView().setValue("fechaHora", LocalDateTime.now());
        addMessage("GEOLOCALIZACION REGISTRADA...");
    }


    @Override
	public String getPostJavaScript() {
        // Este c�digo JavaScript ser� ejecutado en el cliente despu�s de la acci�n
        return "obtenerUbicacion();";
    }


	
}
