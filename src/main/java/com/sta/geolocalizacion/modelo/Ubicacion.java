package com.sta.geolocalizacion.modelo;

import java.time.*;

import javax.persistence.*;

import org.openxava.annotations.*;
import org.openxava.model.*;

import lombok.*;

@Entity @Getter @Setter
@View(members = 
    "datosGenerales [ fechaHora;fingerprint; nombre; direccion; ciudad; pais; ], "
    + "ubicacion "
   
)

public class Ubicacion extends Identifiable {
	
	@ReadOnly
    @Column(length = 50)
    @Coordinates
    private String ubicacion; // Coordenadas en formato "latitud, longitud"
	
	private String fingerprint; // Para almacenar la huella digital del navegador
    
    
    private LocalDateTime fechaHora;

    @Column(length = 100)
    private String nombre;

    @Column(length = 200)
    private String direccion;

    @Column(length = 50)
    private String ciudad;

    @Column(length = 50)
    private String pais;

 

	
}
