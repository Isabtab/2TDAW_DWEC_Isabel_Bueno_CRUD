"use strict"
//------------------------------------------------------------------------------------------------------
const portada = document.querySelector("#portada");
const titulo = document.querySelector("#titulo");
const genero = document.querySelector("#genero");
const descripcion = document.querySelector("#descripcion");
const plataformas = document.querySelector("#plataformas");
const guia = document.querySelector("#guia");
const lanzamiento = document.querySelector("#lanzamiento");
const valoracion = document.querySelector("#valoracion");
const b_nuevo= document.querySelector("#nuevo");

const form_añadir = document.querySelector("#juego-formu");
const b_añadir = document.querySelector("#m_añadir");

const b_buscar = document.querySelector("#m_buscar");
const form_buscar = document.querySelector("#juego-busqueda");
const busqueda = document.querySelector("#busqueda");
const buscar = document.querySelector("#buscar");
const criterio = document.querySelector("#criterio");

const form_editar = document.querySelector("#juego-editar");
const editar_modal = document.querySelector("#editarModal");
const editar_portada = document.querySelector("#editarPortada");
const editar_titulo = document.querySelector("#editarTitulo");
const editar_genero = document.querySelector("#editarGenero");
const editar_descripcion = document.querySelector("#editarDescripcion");
const editar_plataformas = document.querySelector("#editarPlataformas");
const editar_guia = document.querySelector("#editarGuia");
const editar_lanzamiento = document.querySelector("#editarLanzamiento");
const editar_valoracion = document.querySelector("#editarValoracion");
const editar_clave_juego = document.querySelector("#claveJuego")
const b_editar = document.querySelector("#editar");

const ord_desc_titulo = document.querySelector("#ordenar_desc");
const ord_asc_valoracion = document.querySelector("#ordenar_asc");

const tabla_juegos = document.querySelector("#juegos-list");


//-------------------------------------------------------------------------------------------------------------

//Añadir
b_añadir.addEventListener("click",
	() => {
		if (form_añadir.classList.contains("d-none")) {
			form_buscar.classList.add("d-none");
			form_añadir.classList.remove("d-none");
			b_buscar.disabled = "disabled";
			b_añadir.value = "Quitar formulario";
		} 
		else {
			form_añadir.classList.add("d-none");
			b_buscar.disabled = "";
			b_añadir.value = "Añadir juego";
		}
	});

//----------------------------------------------------------------------------------------------------------------

//Buscar
b_buscar.addEventListener("click",
	() => {
		if (form_buscar.classList.contains("d-none")) {
			form_añadir.classList.add("d-none");
			form_buscar.classList.remove("d-none");
			b_añadir.disabled = "disabled";
			b_buscar.value = "Quitar formulario";
		} 
		else {
			form_buscar.classList.add("d-none");
			b_añadir.disabled = "";
			b_buscar.value = "Buscar juego";
		}
	});

buscar.addEventListener("click",
	(evento) => {
		evento.preventDefault();

		const juegos=Object.values(sessionStorage).map(
			(juego)=>{
				return JSON.parse(juego);
			}
		);
		const juegos_filtrados=juegos.filter(
			(juego)=>{
				return juego[criterio.value].includes(busqueda.value.trim());
			}
		);
		
		tabla_juegos.innerHTML="";
		juegos_filtrados.forEach(
			(juego)=>{
				tabla_juegos.appendChild(nuevoJuego(juego));
			}
		)

	});

//----------------------------------------------------------------------------------------------------

//Ordenar por valoracion ascendente
ord_asc_valoracion.addEventListener("click",
	(evento) => {
		evento.preventDefault();

		const juegos=Object.values(sessionStorage).map(
			(juego)=>{
				return JSON.parse(juego);
			}
		);
		
		const juegos_filtrados=juegos.filter(
			(juego)=>{
				return juego[criterio.value].includes(busqueda.value.trim());
			}
		);
		
		const juegos_ordenados=juegos_filtrados.sort(
			(a,b)=>{
				return a["valoracion"]-b["valoracion"];
			}
		)

		
		tabla_juegos.innerHTML="";
		juegos_ordenados.forEach(
			(juego)=>{
				tabla_juegos.appendChild(nuevoJuego(juego));
			}
		)
	});

//------------------------------------------------------------------------------------

//Ordenar por orden alfabético
ord_desc_titulo.addEventListener("click",
	(evento) => {
		evento.preventDefault();
		const juegos=Object.values(sessionStorage).map(
			(juego)=>{
				return JSON.parse(juego);
			}
		);
		
		const juegos_filtrados=juegos.filter(
			(juego)=>{
				return juego[criterio.value].includes(busqueda.value.trim());
			}
		);
		
		const juegos_ordenados=juegos_filtrados.sort(
			(a,b)=>{
				return b["titulo"].localeCompare(a["titulo"]);
			}
		)
		
		tabla_juegos.innerHTML="";
		juegos_ordenados.forEach(
			(juego)=>{
				tabla_juegos.appendChild(nuevoJuego(juego));
			}
		)
	});
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//Funciones

//Borrar Juego
const borrarJuego = (clave_juego) => {
	return () => {
		const fila_a_borrar = document.querySelector("#" + clave_juego)
		fila_a_borrar.remove();
		sessionStorage.removeItem(clave_juego);
	}
}

//Editar Juego
const modalEditarJuego = (clave_juego) => {
	return () => {
		const juego=JSON.parse(sessionStorage.getItem(clave_juego));
		editar_portada.value=juego["portada"];
		editar_titulo.value=juego["titulo"];
		editar_genero.value=juego["genero"];
		editar_descripcion.value=juego["descripcion"];
		editar_plataformas.value=juego["plataformas"];
		editar_guia.value=juego["guia"];
		editar_lanzamiento.value=juego["lanzamiento"];
		editar_valoracion.value=juego["valoracion"];
		editar_clave_juego.value=clave_juego;		

		$(editar_modal).modal("toggle");
	}
}

//Crear una fila en la tabla
const nuevoJuego = (json) => {
	let nueva_fila = document.createElement("tr");
	nueva_fila.id = "ID_" + json["titulo"].toUpperCase().replaceAll(" ", "");

	//Portada
	let portada = document.createElement("img");
	portada.src = json["portada"];
	portada.classList.add("w-75");
	let td_portada = document.createElement("td");
	portada.classList.add("w-25");
	td_portada.appendChild(portada);
	td_portada.classList.add("text-center");
	nueva_fila.appendChild(td_portada);

	//Titulo
	let td_titulo = document.createElement("td");
	td_titulo.innerText = json["titulo"];
	td_titulo.classList.add("text-center");
	nueva_fila.appendChild(td_titulo);

	//Genero
	let td_genero = document.createElement("td");
	td_genero.innerText = json["genero"];
	td_genero.classList.add("text-center");
	nueva_fila.appendChild(td_genero);

	//Descripcion
	let td_descripcion = document.createElement("td");
	td_descripcion.innerText = json["descripcion"];
	td_descripcion.classList.add("text-center");
	nueva_fila.appendChild(td_descripcion);

	//Plataformas
	let td_plataformas = document.createElement("td");
	td_plataformas.innerText = json["plataformas"];
	td_plataformas.classList.add("text-center");
	nueva_fila.appendChild(td_plataformas);

	//Guia
	let enlace_guia = document.createElement("a");
	enlace_guia.innerText = "Guia";
	enlace_guia.href = json["guia"];
	enlace_guia.classList.add("btn", "btn-primary");
	let td_guia = document.createElement("td");
	td_guia.classList.add("text-center");
	td_guia.appendChild(enlace_guia);
	nueva_fila.appendChild(td_guia);

	//Lanzamiento
	let td_lanzamiento = document.createElement("td");
	td_lanzamiento.innerText = json["lanzamiento"];
	td_lanzamiento.classList.add("text-center");
	nueva_fila.appendChild(td_lanzamiento);

	//Valoracion
	let td_valoracion = document.createElement("td");
	td_valoracion.innerText = json["valoracion"];
	td_valoracion.classList.add("text-center");
	nueva_fila.appendChild(td_valoracion);

	//Boton Editar
	let editar = document.createElement("a");
	editar.innerText = "Editar";
	editar.href = "#";

	//console.log(nueva_fila.id);
	editar.addEventListener("click", modalEditarJuego(nueva_fila.id))
	editar.classList.add("btn", "btn-success");

	let td_editar = document.createElement("td");
	td_editar.appendChild(editar);
	td_editar.classList.add("text-center");
	nueva_fila.appendChild(td_editar);

	//Boton Borrar
	let borrar = document.createElement("a");
	borrar.innerText = "Eliminar";
	borrar.href = "#";
	borrar.classList.add("btn", "btn-danger");

	borrar.addEventListener("click", borrarJuego(nueva_fila.id))
	let td_borrar = document.createElement("td");
	td_borrar.appendChild(borrar);
	td_borrar.classList.add("text-center");
	nueva_fila.appendChild(td_borrar);
	
	return nueva_fila;
}

//----------------------------------------------------------------------------------------------------

//Añadir Juego
b_nuevo.addEventListener("click",
	(evento) => {
		evento.preventDefault();
		if (portada.value.trim() === "") {
			mensajeError("Portada incorrecta");
		}
		else if (titulo.value.trim().length < 2) {
			mensajeError("Titulo incorrecto");
		} 
		else if (genero.value.trim().length < 2) {
			mensajeError("Genero incorrecto");
		}
		else if (descripcion.value.trim().length < 2) {
			mensajeError("Descripcion incorrecto");
		}
		else if (plataformas.value.trim().length < 2) {
			mensajeError("Plataforma incorrecto");
		}
		else if (guia.value.trim() === "") {
			mensajeError("Enlace incorrecto");
		}
		else if (lanzamiento.value.trim() === "") {
			mensajeError("Fecha no válida");
		}
		else if (valoracion.value.trim() === "" || isNaN(valoracion.value.trim()) || parseInt(valoracion.value.trim()) <= 0) {
			mensajeError("Valoracion no válida");
		}		 
		else if (sessionStorage.getItem("ID_" + titulo.value.trim().toUpperCase().replaceAll(" ", "")) !== null) {
			mensajeError("El juego ya existe");
		} 
		else {

			const datos_juego = {
				"portada": portada.value.trim(),
				"titulo": titulo.value.trim(),
				"genero": genero.value.trim(),
				"descripcion": descripcion.value.trim(),
				"plataformas": plataformas.value.trim(),
				"guia": guia.value.trim(),
				"lanzamiento": lanzamiento.value.trim(),
				"valoracion": descripcion.value.trim(),
			};
			const nuevo = nuevoJuego(datos_juego);
			tabla_juegos.appendChild(nuevo);
			sessionStorage.setItem("ID_" + titulo.value.trim().toUpperCase().replaceAll(" ", ""), JSON.stringify(datos_juego));
			form_añadir.reset();
			document.documentElement.scrollTop = document.documentElement.scrollHeight;
			mensajeOk("Añadido correctamente");
		}
	});

//Editar Juego
b_editar.addEventListener("click",
	(evento) => {
		evento.preventDefault();
		
		const nueva_clave_juego = "ID_" + editar_titulo.value.trim().toUpperCase().replaceAll("","");

		if (editar_portada.value.trim() === "") {
			mensajeError("Portada incorrecta");
		} 
		else if (editar_titulo.value.trim().length < 2) {
			mensajeError("Nombre incorrecto");
		} 
		else if (editar_genero.value.trim().length < 2) {
			mensajeError("Genero incorrecto");
		}
		else if (editar_descripcion.value.trim().length < 2) {
			mensajeError("Descripcion incorrecta");
		}
		else if (editar_plataformas.value.trim().length < 2) {
			mensajeError("Plataforma incorrecta");
		}
		else if (editar_guia.value.trim() === "") {
			mensajeError("Guia incorrecto");
		}
		else if (editar_lanzamiento.value.trim() === "") {
			mensajeError("Enlace para comprar incorrecto");
		} 
		else if (editar_valoracion.value.trim() === "" || isNaN(valoracion.value.trim()) || parseInt(valoracion.value.trim()) <= 0) {
			mensajeError("Valoracion incorrecto");
		}		
		else if (editar_clave_juego.value!==nueva_clave_juego && sessionStorage.getItem(nueva_clave_juego)!==null) {
			mensajeError("El juego ya existe");
		} 
		else {

			const datos_juego={
				"portada": portada.value.trim(),
				"titulo": titulo.value.trim(),
				"genero": genero.value.trim(),
				"descripcion": descripcion.value.trim(),
				"plataformas": plataformas.value.trim(),
				"guia": guia.value.trim(),
				"lanzamiento": lanzamiento.value.trim(),
				"valoracion": descripcion.value.trim(),
			};
			
			const juego_editado=nuevoJuego(datos_juego);
			
			const fila_a_editar=document.querySelector("#" + editar_clave_juego.value);
			
			fila_a_editar.replaceWith(juego_editado);
			
			sessionStorage.removeItem(editar_clave_juego.value); //Poner antes del setitem para que no lo borre
			sessionStorage.setItem(nueva_clave_juego,JSON.stringify(datos_juego));

			form_editar.reset();
			$(editar_modal).modal("toggle");
			mensajeOk("Editado correctamente");
		}
	});

//-------------------------------------------------------------------------------------------------------
//Mostrar todo al cargar la página
if (sessionStorage.length===0) {
	juegos_retro.forEach(
		(juego) => {
			sessionStorage.setItem("ID_" + juego["titulo"].toUpperCase().replaceAll(" ", ""),JSON.stringify(juego))
		});
}


Object.values(sessionStorage).forEach(
	(juego) => {
		tabla_juegos.appendChild(nuevoJuego(JSON.parse(juego)));
	}
)

