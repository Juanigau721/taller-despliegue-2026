let miSistema = new Sistema()

miSistema.precargaAdmins()
miSistema.precargaPostulantes()
miSistema.precargaOfertas()
miSistema.precargaPostulaciones()

// INICIALIZACIÓN DEL SISTEMA
// Se crea el sistema y se cargan los datos de prueba.

// NAVEGACIÓN ENTRE LAS DISTINAS VISTAS
document.querySelector("#btnVistaPostulante").addEventListener("click", mostrarVistaPostulante)
document.querySelector("#btnVistaAdmin").addEventListener("click", mostrarVistaAdmin)
document.querySelector("#btnVolverPostulante").addEventListener("click", mostrarInicio)
document.querySelector("#btnVolverAdmin").addEventListener("click", mostrarInicio)

function mostrarVistaPostulante(){
    document.querySelector("#inicio").style.display = "none"
    document.querySelector("#seccionPostulante").style.display = "block"
    document.querySelector("#seccionAdministrador").style.display = "none"
}

function mostrarVistaAdmin(){
    document.querySelector("#inicio").style.display = "none"
    document.querySelector("#seccionPostulante").style.display = "none"
    document.querySelector("#seccionAdministrador").style.display = "block"
}

function mostrarInicio(){
    document.querySelector("#inicio").style.display = "flex"
    document.querySelector("#seccionPostulante").style.display = "none"
    document.querySelector("#seccionAdministrador").style.display = "none"
}

// FUNCIONALIDADES DEL POSTULANTE

//FUNCIONALIDAD 01
document.querySelector("#btnRegistro").addEventListener("click", registrarPostulante)
// Obtiene los datos ingresados, realiza las validaciones
// y solicita al sistema registrar un nuevo postulante.
function registrarPostulante(){
    let nombre = document.querySelector("#txtNombreCompleto").value
    let usuario = document.querySelector("#txtUsuarioRegistro").value
    let contrasenia = document.querySelector("#txtContraseniaRegistro").value
    let nivel = document.querySelector("#slcCategoria").value
    let area = document.querySelector("#slcArea").value

    let mayusculasContrasenia = 0
    let minusculasContrasenia = 0
    let numerosContrasenia = 0

    if(nombre === "" || usuario === "" || contrasenia === "" || nivel === "#" || area === "#"){
        document.querySelector("#pMensajeRegistro").innerHTML = "Debe completar todos los datos."
    }else if(usuario.length < 5){
        document.querySelector("#pMensajeRegistro").innerHTML = "El usuario debe tener al menos 5 caracteres."
    }else if(contrasenia.length < 5){
        document.querySelector("#pMensajeRegistro").innerHTML = "La contraseña debe tener al menos 5 caracteres."
    }else{
        for(let i = 0; i < contrasenia.length; i++){
            let caracter = contrasenia.charAt(i)

            if(!isNaN(caracter)){
                numerosContrasenia++
            }else if(caracter === caracter.toUpperCase()){
                mayusculasContrasenia++
            }else if(caracter === caracter.toLowerCase()){
                minusculasContrasenia++
            }
        }

        if(mayusculasContrasenia > 0 && minusculasContrasenia > 0 && numerosContrasenia > 0){
            let resultado = miSistema.registrarPostulante(usuario, contrasenia, nombre, nivel, area)

            if(resultado === true){
                document.querySelector("#pMensajeRegistro").innerHTML = "Postulante registrado correctamente."
            }else{
                document.querySelector("#pMensajeRegistro").innerHTML = "El nombre de usuario ya existe."
            }
        }else{
            document.querySelector("#pMensajeRegistro").innerHTML = "La contraseña no cumple con los requisitos mínimos."
        }
    }
}



//FUNCIONALIDAD 02
// Verifica los datos ingresados e inicia la sesión del postulante.
document.querySelector("#btnLoginPost").addEventListener("click", loginPostulante)

function loginPostulante(){
    let usuario = document.querySelector("#txtUsuarioLoginPost").value
    let contrasenia = document.querySelector("#txtPassLoginPost").value

    if(usuario === "" || contrasenia === ""){
        document.querySelector("#pMsgLoginPost").innerHTML = "Debe completar todos los datos."
    }else{
        let resultado = miSistema.loginPostulante(usuario, contrasenia)

        if(resultado === true){
            document.querySelector("#pMsgLoginPost").innerHTML = "Ingreso correcto."
        }else{
            document.querySelector("#pMsgLoginPost").innerHTML = "Usuario o contraseña incorrectos."
        }
    }
}



//FUNCIONALIDAD 03
document.querySelector("#btnCerrarSesionPost").addEventListener("click", cerrarSesionPostulante)

function cerrarSesionPostulante(){
    let resultado = miSistema.cerrarSesion()

    if(resultado === true){
        document.querySelector("#pCerrarSesionPost").innerHTML = "Sesión cerrada correctamente."
    }else{
        document.querySelector("#pCerrarSesionPost").innerHTML = "No hay ninguna sesión iniciada."
    }
}



//FUNCIONALIDAD 04
// Genera la tabla con las ofertas disponibles según
// las condiciones que debe cumplir el postulante.
document.querySelector("#btnVerTodas").addEventListener("click", visualizarOfertasDisponibles)

function visualizarOfertasDisponibles(){
    if(miSistema.usuarioLoggeado === null){
        document.querySelector("#pOfertasDisponibles").innerHTML = "No hay ningún usuario loggeado."
    }else{
        let tabla = ""
        let filtroArea = document.querySelector("#slcFiltroArea").value
        let postulanteLoggeado = miSistema.usuarioLoggeado

        for(let index = 0; index < miSistema.ofertas.length; index++){
            let oferta = miSistema.ofertas[index]

            if(oferta.estado === "Activa"){
                if(miSistema.esNivelCompatible(postulanteLoggeado, oferta)){
                    if(!miSistema.yaExistePostulacion(postulanteLoggeado, oferta)){
                        let pasaFiltroArea = false

                        if(filtroArea === "Todas"){
                            pasaFiltroArea = true
                        }else if(miSistema.esAreaCompatible(postulanteLoggeado, oferta)){
                            pasaFiltroArea = true
                        }

                        if(pasaFiltroArea){
                            tabla += `<tr>
                                <td>${oferta.titulo}</td>
                                <td>${oferta.empresa}</td>
                                <td>${oferta.nivelRequerido}</td>
                                <td>${oferta.area}</td>
                                <td><input type="button" value="Postularse" class="btnPostularOferta" data-id="${oferta.id}"></td>
                            </tr>`
                        }
                    }
                }
            }
        }

        document.querySelector("#tblOfertasDisponibles").innerHTML = tabla
        document.querySelector("#tablaOfertasDisponibles").style.display = "table"

        let botones = document.querySelectorAll(".btnPostularOferta")

        for(let i = 0; i < botones.length; i++){
            botones[i].addEventListener("click", postularseAOferta)
        }
    }
}



//FUNCIONALIDAD 05
// Procesa la postulación a la oferta seleccionada.
function postularseAOferta(){
    let idOferta = this.getAttribute("data-id")
    let oferta = miSistema.obtenerOferta(idOferta)
    let postulanteLoggeado = miSistema.usuarioLoggeado

    if(postulanteLoggeado === null){
        document.querySelector("#pPostulacion").innerHTML = "No hay ningún usuario loggeado."
    }else if(oferta.estado !== "Activa"){
        document.querySelector("#pPostulacion").innerHTML = "La oferta no se encuentra disponible."
    }else if(!miSistema.esNivelCompatible(postulanteLoggeado, oferta)){
        document.querySelector("#pPostulacion").innerHTML = "La oferta no es compatible con el nivel del postulante."
    }else if(miSistema.yaExistePostulacion(postulanteLoggeado, oferta)){
        document.querySelector("#pPostulacion").innerHTML = "Ya existe una postulación para esta oferta."
    }else{
        let resultado = miSistema.registrarPostulacion(postulanteLoggeado, oferta)

        if(resultado === true){
            document.querySelector("#pPostulacion").innerHTML = `Postulación realizada correctamente a la oferta "${oferta.titulo}".`
            visualizarOfertasDisponibles()
        }
    }
}



//FUNCIONALIDAD 06
// Muestra todas las postulaciones realizadas por el usuario logueado.
document.querySelector("#btnVerMisPostulaciones").addEventListener("click", verMisPostulaciones)
function verMisPostulaciones(){
    if(miSistema.usuarioLoggeado === null){
        document.querySelector("#pMisPostulaciones").innerHTML = "No hay ningún usuario loggeado."
    }else{
        let tabla = ""
        let misPostulaciones = miSistema.obtenerPostulacionesDePostulante(miSistema.usuarioLoggeado)

        for(let index = 0; index < misPostulaciones.length; index++){
            tabla += `<tr>
                <td>${misPostulaciones[index].oferta.titulo}</td>
                <td>${misPostulaciones[index].estado}</td>
            </tr>`
        }

        document.querySelector("#tblMisPostulaciones").innerHTML = tabla

        document.querySelector("#tablaMisPostulaciones").style.display = "table"
    }
}


// Carga únicamente las ofertas destacadas que se encuentran activas.
//FUNCIONALIDAD 07
document.querySelector("#btnVerOfertasDestacadas").addEventListener("click", verOfertasDestacadas)

function verOfertasDestacadas(){
    let tabla = ""

    let ofertasDestacadas = miSistema.obtenerOfertasDestacadasActivas()

    for(let i = 0; i < ofertasDestacadas.length; i++){
        tabla += `<tr>
            <td>${ofertasDestacadas[i].titulo}</td>
            <td>${ofertasDestacadas[i].empresa}</td>
            <td>${ofertasDestacadas[i].nivelRequerido}</td>
            <td>${ofertasDestacadas[i].descripcion}</td>
            <td><input type="button" value="Postular" class="btnPostularDestacada" data-id="${ofertasDestacadas[i].id}"></td>
        </tr>`
    }

    document.querySelector("#tblOfertasDestacadas").innerHTML = tabla
    document.querySelector("#tablaOfertasDestacadas").style.display = "table"

    let botones = document.querySelectorAll(".btnPostularDestacada")

    for(let i = 0; i < botones.length; i++){
        botones[i].addEventListener("click", postularseADestacada)
    }
}



//FUNCIONALIDAD 08
// Permite postularse a una oferta destacada.
function postularseADestacada(){
    let idOferta = this.getAttribute("data-id")
    let oferta = miSistema.obtenerOferta(idOferta)
    let postulanteLoggeado = miSistema.usuarioLoggeado

    if(postulanteLoggeado === null){
        document.querySelector("#pOfertaDestacada").innerHTML = "No hay ningún usuario loggeado."
    }else if(oferta.estado !== "Activa"){
        document.querySelector("#pOfertaDestacada").innerHTML = "La oferta no se encuentra disponible."
    }else if(!miSistema.esNivelCompatible(postulanteLoggeado, oferta)){
        document.querySelector("#pOfertaDestacada").innerHTML = "La oferta no es compatible con el nivel del postulante."
    }else if(miSistema.yaExistePostulacion(postulanteLoggeado, oferta)){
        document.querySelector("#pOfertaDestacada").innerHTML = "Ya existe una postulación para esta oferta."
    }else{
        let resultado = miSistema.registrarPostulacion(postulanteLoggeado, oferta)

        if(resultado === true){
            document.querySelector("#pOfertaDestacada").innerHTML = "Se ha procesado la postulación correctamente."
            verOfertasDestacadas()
        }
    }
}



// FUNCIONALIDADES DEL ADMINISTRADOR


//FUNCIONALIDAD 09
// Verifica las credenciales del administrador.
document.querySelector("#btnLoginAdmin").addEventListener("click", loginAdmin)

function loginAdmin(){
    let usuario = document.querySelector("#txtUsuarioAdmin").value
    let contrasenia = document.querySelector("#txtPassAdmin").value

    if(usuario === "" || contrasenia === ""){
        document.querySelector("#pLoginAdmin").innerHTML = "Todos los datos son obligatorios."
    }else{
        let resultado = miSistema.loginAdmin(usuario, contrasenia)

        if(resultado === true){
            document.querySelector("#pLoginAdmin").innerHTML = "Ingreso correcto."
        }else{
            document.querySelector("#pLoginAdmin").innerHTML = "Usuario o contraseña incorrectos."
        }
    }
}



//FUNCIONALIDAD 10
document.querySelector("#btnCerrarSesionAdmin").addEventListener("click", cerrarSesionAdmin)

function cerrarSesionAdmin(){
    if(miSistema.usuarioLoggeado !== null && miSistema.tipoUsuarioLoggeado === "admin"){
        let resultado = miSistema.cerrarSesion()

        if(resultado === true){
            document.querySelector("#pCerrarSesionAdmin").innerHTML = "Sesión cerrada correctamente."
        }
    }else{
        document.querySelector("#pCerrarSesionAdmin").innerHTML = "No existe una sesión de administrador iniciada."
    }
}


//FUNCIONALIDAD 11
// Obtiene los datos del formulario y crea una nueva oferta laboral.
document.querySelector("#btnCrearOferta").addEventListener("click", crearOferta)

function crearOferta(){
    if(miSistema.usuarioLoggeado === null || miSistema.tipoUsuarioLoggeado !== "admin"){
        document.querySelector("#pCrearOferta").innerHTML = "Debe iniciar sesión como administrador."
    }else{
        let titulo = document.querySelector("#txtTituloOferta").value
        let empresa = document.querySelector("#txtEmpresaOferta").value
        let descripcion = document.querySelector("#txtDescripcionOferta").value
        let nivelRequerido = document.querySelector("#slcNivelOferta").value
        let area = document.querySelector("#slcAreaOferta").value
        let limitePostulaciones = Number(document.querySelector("#txtLimitePost").value)
        let vacantes = Number(document.querySelector("#txtVacantes").value)
        let destacada = document.querySelector("#slcDestacada").value

        if(titulo === "" || empresa === "" || descripcion === "" || nivelRequerido === "#" || area === "#" || destacada === "#" || document.querySelector("#txtLimitePost").value === "" || document.querySelector("#txtVacantes").value === ""){
            document.querySelector("#pCrearOferta").innerHTML = "Debe completar todos los datos."
        }else if(vacantes <= 0){
            document.querySelector("#pCrearOferta").innerHTML = "La cantidad de vacantes debe ser mayor a 0."
        }else if(limitePostulaciones <= 0){
            document.querySelector("#pCrearOferta").innerHTML = "El límite de postulaciones debe ser mayor a 0."
        }else if(limitePostulaciones < vacantes){
            document.querySelector("#pCrearOferta").innerHTML = "El límite de postulaciones no puede ser menor a las vacantes."
        }else{

            if(destacada === "true"){
                destacada = true
            }else{
                destacada = false
            }

            let resultado = miSistema.registrarOferta(titulo, empresa, descripcion, nivelRequerido, area, limitePostulaciones, vacantes, destacada)

            if(resultado === true){
                document.querySelector("#pCrearOferta").innerHTML = "Oferta creada correctamente."
            }
        }
    }
}
//FUNCIONALIDAD 12
// Recorre todas las ofertas y genera el listado para el administrador.
document.querySelector("#btnVerListadoOfertas").addEventListener("click", verListadoOfertas)

function verListadoOfertas(){
    if(miSistema.usuarioLoggeado === null || miSistema.tipoUsuarioLoggeado !== "admin"){
        document.querySelector("#pListadoOfertas").innerHTML = "Debe iniciar sesión como administrador."
    }else{
        let tabla = ""

        for(let i = 0; i < miSistema.ofertas.length; i++){
            let oferta = miSistema.ofertas[i]

            tabla += `<tr>
                <td>${oferta.titulo}</td>
                <td>${oferta.empresa}</td>
                <td>${oferta.estado}</td>
            </tr>`
        }

        document.querySelector("#tblListadoOfertas").innerHTML = tabla
        document.querySelector("#tablaListadoOfertas").style.display = "table"
        document.querySelector("#pListadoOfertas").innerHTML = "Listado de ofertas cargado correctamente."
    }
}

//FUNCIONALIDAD 13
// Carga el selector con las ofertas disponibles para editar.
cargarComboEditarOferta()

function cargarComboEditarOferta(){
    let combo = `<option value="#">Seleccione una oferta</option>`

    for(let i = 0; i < miSistema.ofertas.length; i++){
        let oferta = miSistema.ofertas[i]

        combo += `<option value="${oferta.id}">${oferta.titulo}</option>`
    }

    document.querySelector("#slcEditarOferta").innerHTML = combo
}
// Valida la información ingresada y actualiza los datos de la oferta.
document.querySelector("#btnEditarOferta").addEventListener("click", editarOferta)

function editarOferta(){
    if(miSistema.usuarioLoggeado === null || miSistema.tipoUsuarioLoggeado !== "admin"){
        document.querySelector("#pEditarOferta").innerHTML = "Debe iniciar sesión como administrador."
    }else{
        let idOferta = document.querySelector("#slcEditarOferta").value
        let titulo = document.querySelector("#txtEditarTitulo").value
        let descripcion = document.querySelector("#txtEditarDescripcion").value
        let nivelRequerido = document.querySelector("#slcEditarNivel").value
        let area = document.querySelector("#slcEditarArea").value
        let limitePostulaciones = Number(document.querySelector("#txtEditarLimitePost").value)
        let vacantes = Number(document.querySelector("#txtEditarVacantes").value)
        let destacada = document.querySelector("#slcEditarDestacada").value

        if(idOferta === "#"){
            document.querySelector("#pEditarOferta").innerHTML = "Debe seleccionar una oferta."
        }else if(titulo === "" || descripcion === "" || nivelRequerido === "#" || area === "#" || destacada === "#" || document.querySelector("#txtEditarLimitePost").value === "" || document.querySelector("#txtEditarVacantes").value === ""){
            document.querySelector("#pEditarOferta").innerHTML = "Debe completar todos los datos."
        }else if(vacantes <= 0){
            document.querySelector("#pEditarOferta").innerHTML = "La cantidad de vacantes debe ser mayor a 0."
        }else if(limitePostulaciones <= 0){
            document.querySelector("#pEditarOferta").innerHTML = "El límite de postulaciones debe ser mayor a 0."
        }else if(limitePostulaciones < vacantes){
            document.querySelector("#pEditarOferta").innerHTML = "El límite de postulaciones no puede ser menor a las vacantes."
        }else{
            let oferta = miSistema.obtenerOferta(idOferta)
            let aceptadas = miSistema.contarPostulacionesAceptadasDeOferta(oferta)
            let totalPostulaciones = miSistema.contarPostulacionesDeOferta(oferta)

            if(vacantes < aceptadas){
                document.querySelector("#pEditarOferta").innerHTML = "La cantidad de vacantes no puede ser menor a las postulaciones aceptadas."
            }else if(limitePostulaciones < totalPostulaciones){
                document.querySelector("#pEditarOferta").innerHTML = "El límite de postulaciones no puede ser menor a las postulaciones existentes."
            }else{
                if(destacada === "true"){
                    destacada = true
                }else{
                    destacada = false
                }

                oferta.titulo = titulo
                oferta.descripcion = descripcion
                oferta.nivelRequerido = nivelRequerido
                oferta.area = area
                oferta.limitePostulaciones = limitePostulaciones
                oferta.vacantes = vacantes
                oferta.destacada = destacada

                document.querySelector("#pEditarOferta").innerHTML = "Oferta editada correctamente."

                cargarComboEditarOferta()
                verListadoOfertas()
            }
        }
    }
}

//FUNCIONALIDAD 14
// Carga el selector utilizado para cerrar ofertas.
cargarComboCerrarOferta()

function cargarComboCerrarOferta(){
    let combo = `<option value="#">Seleccione una oferta</option>`

    for(let i = 0; i < miSistema.ofertas.length; i++){
        let oferta = miSistema.ofertas[i]

        combo += `<option value="${oferta.id}">${oferta.titulo}</option>`
    }

    document.querySelector("#slcCerrarOferta").innerHTML = combo
}
// Cambia el estado de la oferta seleccionada a "Cerrada".
document.querySelector("#btnCerrarOferta").addEventListener("click", cerrarOferta)

function cerrarOferta(){
    if(miSistema.usuarioLoggeado === null || miSistema.tipoUsuarioLoggeado !== "admin"){
        document.querySelector("#pCerrarOferta").innerHTML = "Debe iniciar sesión como administrador."
    }else{
        let idOferta = document.querySelector("#slcCerrarOferta").value

        if(idOferta === "#"){
            document.querySelector("#pCerrarOferta").innerHTML = "Debe seleccionar una oferta."
        }else{
            let oferta = miSistema.obtenerOferta(idOferta)

            oferta.estado = "Cerrada"

            document.querySelector("#pCerrarOferta").innerHTML = "Oferta cerrada correctamente."

            cargarComboCerrarOferta()
            cargarComboEditarOferta()
            verListadoOfertas()
        }
    }
}

//FUNCIONALIDAD 15
// Genera el listado de postulaciones pendientes de resolución.
document.querySelector("#btnVerPostulacionesPendientes").addEventListener("click", verPostulacionesPendientes)

function verPostulacionesPendientes(){
    if(miSistema.usuarioLoggeado === null || miSistema.tipoUsuarioLoggeado !== "admin"){
        document.querySelector("#pPostulacionesPendientes").innerHTML = "Debe iniciar sesión como administrador."
    }else{
        let tabla = ""
        let pendientes = miSistema.obtenerPostulacionesPendientes()

        for(let i = 0; i < pendientes.length; i++){
            let postulacion = pendientes[i]

            tabla += `<tr>
                <td>${postulacion.postulante.nombre}</td>
                <td>${postulacion.oferta.titulo}</td>
                <td>${postulacion.estado}</td>
                <td>
                    <input type="button" value="Aceptar" class="btnAceptarPostulacion" data-id="${postulacion.id}">
                    <input type="button" value="Rechazar" class="btnRechazarPostulacion" data-id="${postulacion.id}">
                </td>
            </tr>`
        }

        document.querySelector("#tblPostulacionesPendientes").innerHTML = tabla
        document.querySelector("#tablaPostulacionesPendientes").style.display = "table"
        agregarEventosProcesarPostulaciones()
        document.querySelector("#pPostulacionesPendientes").innerHTML = "Postulaciones pendientes cargadas correctamente."
    }
}

//FUNCIONALIDAD 16
// Asocia los eventos a los botones de aceptar y rechazar.
function agregarEventosProcesarPostulaciones(){
    let botonesAceptar = document.querySelectorAll(".btnAceptarPostulacion")
    let botonesRechazar = document.querySelectorAll(".btnRechazarPostulacion")

    for(let i = 0; i < botonesAceptar.length; i++){
        botonesAceptar[i].addEventListener("click", aceptarPostulacion)
    }

    for(let i = 0; i < botonesRechazar.length; i++){
        botonesRechazar[i].addEventListener("click", rechazarPostulacion)
    }
}
// Procesa la aceptación de una postulación.
function aceptarPostulacion(){
    let idPostulacion = this.getAttribute("data-id")

    let mensaje = miSistema.aceptarPostulacion(idPostulacion)

    document.querySelector("#pProcesarPost").innerHTML = mensaje

    verPostulacionesPendientes()
    verListadoOfertas()
}
// Procesa el rechazo de una postulación.
function rechazarPostulacion(){
    let idPostulacion = this.getAttribute("data-id")

    let resultado = miSistema.rechazarPostulacion(idPostulacion)

    if(resultado === true){
        document.querySelector("#pProcesarPost").innerHTML = "La postulación fue rechazada correctamente."
    }else{
        document.querySelector("#pProcesarPost").innerHTML = "No se pudo procesar la postulación."
    }

    verPostulacionesPendientes()
}

//FUNCIONALIDAD 17
// Calcula y muestra los indicadores generales del sistema.
document.querySelector("#btnVerEstadisticas").addEventListener("click", verEstadisticas)

function verEstadisticas(){
    if(miSistema.usuarioLoggeado === null || miSistema.tipoUsuarioLoggeado !== "admin"){
        document.querySelector("#pPostulanteMasPostulaciones").innerHTML = "Debe iniciar sesión como administrador."
    }else{
        let tabla = ""

        for(let i = 0; i < miSistema.ofertas.length; i++){
            let oferta = miSistema.ofertas[i]

            let pendientes = miSistema.contarPostulacionesPorEstadoDeOferta(oferta, "Pendiente")
            let aceptadas = miSistema.contarPostulacionesPorEstadoDeOferta(oferta, "Aceptada")
            let rechazadas = miSistema.contarPostulacionesPorEstadoDeOferta(oferta, "Rechazada")
            let total = pendientes + aceptadas + rechazadas

            tabla += `<tr>
                <td>${oferta.titulo}</td>
                <td>${pendientes}</td>
                <td>${aceptadas}</td>
                <td>${rechazadas}</td>
                <td>${total}</td>
            </tr>`
        }

        document.querySelector("#tblEstadisticas").innerHTML = tabla
        document.querySelector("#tablaEstadisticas").style.display = "table"

        document.querySelector("#pTotalActivas").innerHTML = "Total ofertas activas: " + miSistema.contarOfertasPorEstado("Activa")
        document.querySelector("#pTotalInactivas").innerHTML = "Total ofertas inactivas: " + miSistema.contarOfertasPorEstado("Inactiva")
        document.querySelector("#pTotalCerradas").innerHTML = "Total ofertas cerradas: " + miSistema.contarOfertasPorEstado("Cerrada")

        let porcentaje = miSistema.calcularPorcentajeVacantesCubiertas()
        document.querySelector("#pPorcentajeVacantes").innerHTML = "Porcentaje de vacantes cubiertas: " + porcentaje.toFixed(2) + "%"

        let postulantesConMas = miSistema.obtenerPostulantesConMasPostulacionesActivas()
        let textoPostulantes = ""

        for(let i = 0; i < postulantesConMas.length; i++){
            textoPostulantes += postulantesConMas[i].nombre

            if(i < postulantesConMas.length - 1){
                textoPostulantes += ", "
            }
        }

        if(textoPostulantes === ""){
            document.querySelector("#pPostulanteMasPostulaciones").innerHTML = "No hay postulantes con postulaciones activas."
        }else{
            document.querySelector("#pPostulanteMasPostulaciones").innerHTML = "Postulante con más postulaciones activas: " + textoPostulantes
        }
    }
}

//FUNCIONALIDAD 18
// Busca ofertas por título dentro de las estadísticas.
document.querySelector("#btnBuscarOferta").addEventListener("click", buscarOfertaEnEstadisticas)

function buscarOfertaEnEstadisticas(){
    if(miSistema.usuarioLoggeado === null || miSistema.tipoUsuarioLoggeado !== "admin"){
        document.querySelector("#pBuscarOferta").innerHTML = "Debe iniciar sesión como administrador."
    }else{
        let busqueda = document.querySelector("#txtBuscarOferta").value.toLowerCase()
        let tabla = ""
        let encontre = false

        for(let i = 0; i < miSistema.ofertas.length; i++){
            let oferta = miSistema.ofertas[i]

            if(oferta.titulo.toLowerCase().indexOf(busqueda) !== -1){
                let pendientes = miSistema.contarPostulacionesPorEstadoDeOferta(oferta, "Pendiente")
                let aceptadas = miSistema.contarPostulacionesPorEstadoDeOferta(oferta, "Aceptada")
                let rechazadas = miSistema.contarPostulacionesPorEstadoDeOferta(oferta, "Rechazada")
                let total = pendientes + aceptadas + rechazadas

                tabla += `<tr>
                    <td>${oferta.titulo}</td>
                    <td>${pendientes}</td>
                    <td>${aceptadas}</td>
                    <td>${rechazadas}</td>
                    <td>${total}</td>
                </tr>`

                encontre = true
            }
        }

        document.querySelector("#tblEstadisticas").innerHTML = tabla
        document.querySelector("#tablaEstadisticas").style.display = "table"

        if(encontre){
            document.querySelector("#pBuscarOferta").innerHTML = "Búsqueda realizada correctamente."
        }else{
            document.querySelector("#pBuscarOferta").innerHTML = "No se encontraron ofertas."
        }
    }
}
