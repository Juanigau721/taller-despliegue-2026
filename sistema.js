// CLASE SISTEMA
// Contiene los datos principales de la aplicación
// y los métodos utilizados por las funcionalidades.
class Sistema{
    // Inicializa los arreglos principales y las variables
    // necesarias para el funcionamiento del sistema.
    constructor(){
        this.postulantes = []
        this.admins = []
        this.ofertas = []
        this.postulaciones = []

        this.proximoIdAdmin = 4
        this.proximoIdOferta = 11
        this.proximoIdPostulacion = 21

        this.usuarioLoggeado = null
        this.tipoUsuarioLoggeado = null
    }

    // PRECARGAS
    // Carga los administradores de prueba.
    precargaAdmins(){
        this.admins.push(new Admin(1, "Pedro Pérez", "pedroperez01", "AdminPedroPerez01"))
        this.admins.push(new Admin(2, "Mario González", "mariogonzalez02", "AdminMarioGonzalez02"))
        this.admins.push(new Admin(3, "Maria Calcaterra", "mariacalcaterra03", "AdminMariaCalcaterra03"))
    }
    // Carga los postulantes utilizados para las pruebas.
    precargaPostulantes(){
        this.postulantes.push(new Postulante("martindiaz", "MartinDiaz01", "Martin Diaz", "Senior", "Tecnología"))
        this.postulantes.push(new Postulante("luismartinez", "LuisMartinez02", "Luis Martínez", "Junior", "Marketing"))
        this.postulantes.push(new Postulante("sofiagarcia", "SofiaGarcia03", "Sofia Garcia", "Semi-Senior", "Otros"))
        this.postulantes.push(new Postulante("victoriadominguez", "VictoriaDominguez04", "Victoria Dominguez", "Senior", "Diseño"))
        this.postulantes.push(new Postulante("ignaciomedina", "IgnacioMedina05", "Ignacio Medina", "Junior", "Administración"))
        this.postulantes.push(new Postulante("anaperez", "AnaPerez06", "Ana Perez", "Semi-Senior", "Tecnología"))
        this.postulantes.push(new Postulante("carlosruiz", "CarlosRuiz07", "Carlos Ruiz", "Senior", "Marketing"))
        this.postulantes.push(new Postulante("valentinasosa", "ValentinaSosa08", "Valentina Sosa", "Junior", "Diseño"))
        this.postulantes.push(new Postulante("diegolopez", "DiegoLopez09", "Diego Lopez", "Semi-Senior", "Administración"))
        this.postulantes.push(new Postulante("camilaferrer", "CamilaFerrer10", "Camila Ferrer", "Senior", "Otros"))
        this.postulantes.push(new Postulante("joaquinmendez", "JoaquinMendez11", "Joaquin Mendez", "Junior", "Tecnología"))
        this.postulantes.push(new Postulante("florenciapaz", "FlorenciaPaz12", "Florencia Paz", "Semi-Senior", "Marketing"))
        this.postulantes.push(new Postulante("nicolasgomez", "NicolasGomez13", "Nicolas Gomez", "Senior", "Administración"))
        this.postulantes.push(new Postulante("paularodriguez", "PaulaRodriguez14", "Paula Rodriguez", "Junior", "Diseño"))
        this.postulantes.push(new Postulante("federicotorres", "FedericoTorres15", "Federico Torres", "Semi-Senior", "Otros"))
    }
    // Carga las ofertas laborales iniciales.
    precargaOfertas(){
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_1", "Oferta de Diseño UX/UI", "Tech Solutions", "Empresa tecnológica busca diseñador UX/UI para colaborar en proyectos digitales. Participará en el diseño de pantallas, elaboración de prototipos y mejora de la experiencia de usuario junto a un equipo multidisciplinario.", "Junior", "Diseño", 30, 10, true, "Activa"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_2", "Desarrollador Web Frontend", "Web Studio", "Empresa de desarrollo busca programador frontend para crear interfaces web modernas. Participará en el armado de páginas, corrección de errores visuales y trabajo junto al equipo de diseño.", "Junior", "Tecnología", 25, 8, true, "Activa"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_3", "Analista de Marketing Digital", "MarketPro", "Agencia de marketing busca analista para colaborar en campañas digitales, seguimiento de métricas y creación de reportes para clientes de distintos rubros.", "Semi-Senior", "Marketing", 20, 5, false, "Activa"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_4", "Asistente Administrativo", "Gestión Total", "Empresa nacional busca asistente administrativo para tareas de organización documental, atención interna y apoyo en procesos de facturación y seguimiento de clientes.", "Junior", "Administración", 15, 4, false, "Activa"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_5", "Desarrollador Backend", "CodeLab", "Empresa tecnológica busca desarrollador backend para trabajar en mantenimiento de servicios, creación de funcionalidades y conexión con bases de datos.", "Semi-Senior", "Tecnología", 18, 6, true, "Activa"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_6", "Diseñador Gráfico", "Creativa Agency", "Agencia creativa busca diseñador gráfico para liderar propuestas visuales, crear piezas para redes sociales y colaborar en campañas de comunicación.", "Senior", "Diseño", 12, 3, false, "Inactiva"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_7", "Especialista SEO", "Digital Boost", "Empresa de marketing busca especialista SEO para optimizar contenidos, analizar posicionamiento web y proponer mejoras para aumentar el tráfico orgánico.", "Senior", "Marketing", 10, 2, false, "Inactiva"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_8", "Coordinador Administrativo", "Oficina Central", "Empresa de servicios busca coordinador administrativo para supervisar tareas internas, organizar procesos y colaborar con distintas áreas de gestión.", "Semi-Senior", "Administración", 14, 4, false, "Cerrada"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_9", "Soporte Técnico", "Tech Help", "Empresa tecnológica busca persona para brindar soporte técnico a usuarios, resolver incidencias básicas y registrar solicitudes en el sistema interno.", "Junior", "Tecnología", 30, 10, false, "Activa"))
        this.ofertas.push(new OfertaLaboral("JOB_OFFER_10", "Asistente de Proyectos", "Soluciones Integrales", "Empresa busca asistente de proyectos para colaborar en tareas variadas, seguimiento de actividades y comunicación entre equipos de diferentes áreas.", "Semi-Senior", "Otros", 16, 5, false, "Cerrada"))
    }
    // Relaciona postulantes y ofertas mediante postulaciones precargadas.
    precargaPostulaciones(){
        this.postulaciones.push(new Postulacion("JOB_1", this.obtenerPostulante("ignaciomedina"), this.obtenerOferta("JOB_OFFER_4"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_2", this.obtenerPostulante("valentinasosa"), this.obtenerOferta("JOB_OFFER_1"), "Aceptada"))
        this.postulaciones.push(new Postulacion("JOB_3", this.obtenerPostulante("joaquinmendez"), this.obtenerOferta("JOB_OFFER_2"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_4", this.obtenerPostulante("luismartinez"), this.obtenerOferta("JOB_OFFER_9"), "Rechazada"))
        this.postulaciones.push(new Postulacion("JOB_5", this.obtenerPostulante("anaperez"), this.obtenerOferta("JOB_OFFER_3"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_6", this.obtenerPostulante("diegolopez"), this.obtenerOferta("JOB_OFFER_8"), "Aceptada"))
        this.postulaciones.push(new Postulacion("JOB_7", this.obtenerPostulante("federicotorres"), this.obtenerOferta("JOB_OFFER_10"), "Rechazada"))
        this.postulaciones.push(new Postulacion("JOB_8", this.obtenerPostulante("martindiaz"), this.obtenerOferta("JOB_OFFER_5"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_9", this.obtenerPostulante("carlosruiz"), this.obtenerOferta("JOB_OFFER_7"), "Aceptada"))
        this.postulaciones.push(new Postulacion("JOB_10", this.obtenerPostulante("victoriadominguez"), this.obtenerOferta("JOB_OFFER_6"), "Rechazada"))
        this.postulaciones.push(new Postulacion("JOB_11", this.obtenerPostulante("paularodriguez"), this.obtenerOferta("JOB_OFFER_1"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_12", this.obtenerPostulante("sofiagarcia"), this.obtenerOferta("JOB_OFFER_10"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_13", this.obtenerPostulante("nicolasgomez"), this.obtenerOferta("JOB_OFFER_8"), "Aceptada"))
        this.postulaciones.push(new Postulacion("JOB_14", this.obtenerPostulante("camilaferrer"), this.obtenerOferta("JOB_OFFER_5"), "Rechazada"))
        this.postulaciones.push(new Postulacion("JOB_15", this.obtenerPostulante("florenciapaz"), this.obtenerOferta("JOB_OFFER_3"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_16", this.obtenerPostulante("martindiaz"), this.obtenerOferta("JOB_OFFER_2"), "Aceptada"))
        this.postulaciones.push(new Postulacion("JOB_17", this.obtenerPostulante("anaperez"), this.obtenerOferta("JOB_OFFER_5"), "Pendiente"))
        this.postulaciones.push(new Postulacion("JOB_18", this.obtenerPostulante("carlosruiz"), this.obtenerOferta("JOB_OFFER_3"), "Rechazada"))
        this.postulaciones.push(new Postulacion("JOB_19", this.obtenerPostulante("victoriadominguez"), this.obtenerOferta("JOB_OFFER_1"), "Aceptada"))
        this.postulaciones.push(new Postulacion("JOB_20", this.obtenerPostulante("joaquinmendez"), this.obtenerOferta("JOB_OFFER_9"), "Pendiente"))
    }



    // OBTENER INFO
    // MÉTODOS DE BÚSQUEDA
    // Devuelven objetos almacenados en el sistema.

    // Busca un postulante según su nombre de usuario.
    obtenerPostulante(usuario){
        let postulanteEncontrado = null
        let encontrePostulante = false
        let i = 0

        while(i < this.postulantes.length && !encontrePostulante){
            if(this.postulantes[i].usuario.toLowerCase() === usuario.toLowerCase()){
                postulanteEncontrado = this.postulantes[i]
                encontrePostulante = true
            }
            i++
        }

        return postulanteEncontrado
    }
    // Busca una oferta utilizando su identificador.
    obtenerOferta(id){
        let ofertaEncontrada = null
        let encontreOferta = false
        let i = 0

        while(i < this.ofertas.length && !encontreOferta){
            if(this.ofertas[i].id === id){
                ofertaEncontrada = this.ofertas[i]
                encontreOferta = true
            }
            i++
        }

        return ofertaEncontrada
    }
    // Busca un administrador por su usuario.
    obtenerAdminPorUsuario(usuario){
        let adminEncontrado = null
        let encontreAdmin = false
        let i = 0

        while(i < this.admins.length && !encontreAdmin){
            if(this.admins[i].usuario === usuario){
                adminEncontrado = this.admins[i]
                encontreAdmin = true
            }
            i++
        }

        return adminEncontrado
    }
    // Busca una postulación mediante su identificador.
    obtenerPostulacion(id){
        let postulacionEncontrada = null
        let encontrePostulacion = false
        let i = 0

        while(i < this.postulaciones.length && !encontrePostulacion){
            if(this.postulaciones[i].id === id){
                postulacionEncontrada = this.postulaciones[i]
                encontrePostulacion = true
            }
            i++
        }

        return postulacionEncontrada
    }

    // FUNCIONALIDAD 01
    registrarPostulante(usuario, contrasenia, nombre, nivel, area){
        let postulante = this.obtenerPostulante(usuario)

        if(postulante !== null){
            return false
        }else{
            let nuevoPostulante = new Postulante(usuario, contrasenia, nombre, nivel, area)
            this.postulantes.push(nuevoPostulante)
            return true
        }
    }

    // FUNCIONALIDAD 02
    loginPostulante(usuario, contrasenia){
        let postulanteLoggeado = this.obtenerPostulante(usuario)

        if(postulanteLoggeado !== null && postulanteLoggeado.contrasenia === contrasenia){
            this.usuarioLoggeado = postulanteLoggeado
            this.tipoUsuarioLoggeado = "postulante"
            return true
        }

        return false
    }

    // FUNCIONALIDAD 03 Y 10
    cerrarSesion(){
        if(this.usuarioLoggeado !== null){
            this.usuarioLoggeado = null
            this.tipoUsuarioLoggeado = null
            return true
        }

        return false
    }

    // FUNCIONALIDAD 04
    // Comprueba si el postulante cumple el nivel requerido.
    esNivelCompatible(postulante, oferta){
        let compatible = false

        if(postulante.nivel === "Senior"){
            compatible = true
        }else if(postulante.nivel === oferta.nivelRequerido){
            compatible = true
        }

        return compatible
    }
    // Comprueba si el área coincide con la oferta.
    esAreaCompatible(postulante, oferta){
        let compatible = false

        if(postulante.area === oferta.area){
            compatible = true
        }

        return compatible
    }
    // Verifica que el postulante no se haya postulado previamente.
    yaExistePostulacion(postulante, oferta){
        let existe = false
        let i = 0

        while(i < this.postulaciones.length && !existe){
            if(this.postulaciones[i].postulante === postulante && this.postulaciones[i].oferta === oferta){
                existe = true
            }
            i++
        }

        return existe
    }

    // FUNCIONALIDAD 05
    registrarPostulacion(postulante, oferta){
        let nuevaPostulacion = new Postulacion(`JOB_${this.proximoIdPostulacion}`, postulante, oferta, "Pendiente")

        this.postulaciones.push(nuevaPostulacion)
        this.proximoIdPostulacion++

        return true
    }

    // FUNCIONALIDAD 06
    obtenerPostulacionesDePostulante(postulante){
        let postulacionesDelPostulante = []

        for(let i = 0; i < this.postulaciones.length; i++){
            if(this.postulaciones[i].postulante === postulante){
                postulacionesDelPostulante.push(this.postulaciones[i])
            }
        }

        return postulacionesDelPostulante
    }

    // FUNCIONALIDAD 07
    obtenerOfertasDestacadasActivas(){
        let ofertasDestacadas = []

        for(let i = 0; i < this.ofertas.length; i++){
            if(this.ofertas[i].destacada === true && this.ofertas[i].estado === "Activa"){
                ofertasDestacadas.push(this.ofertas[i])
            }
        }

        return ofertasDestacadas
    }

    // FUNCIONALIDAD 09
    loginAdmin(usuario, contrasenia){
        let adminEncontrado = this.obtenerAdminPorUsuario(usuario)

        if(adminEncontrado !== null && adminEncontrado.contrasenia === contrasenia){
            this.usuarioLoggeado = adminEncontrado
            this.tipoUsuarioLoggeado = "admin"
            return true
        }

        return false
    }

    // FUNCIONALIDAD 11
    registrarOferta(titulo, empresa, descripcion, nivelRequerido, area, limitePostulaciones, vacantes, destacada){
        let id = `JOB_OFFER_${this.proximoIdOferta}`
        let nuevaOferta = new OfertaLaboral(id, titulo, empresa, descripcion, nivelRequerido, area, limitePostulaciones, vacantes, destacada, "Activa")

        this.ofertas.push(nuevaOferta)
        this.proximoIdOferta++

        return true
    }

    // FUNCIONALIDAD 15
    // Obtiene únicamente las postulaciones con estado pendiente.
    obtenerPostulacionesPendientes(){
    let pendientes = []

    for(let i = 0; i < this.postulaciones.length; i++){
        if(this.postulaciones[i].estado === "Pendiente"){
            pendientes.push(this.postulaciones[i])
        }
    }

    return pendientes
    }

    // FUNCIONALIDAD 16
    // Métodos auxiliares utilizados durante el procesamiento
// de postulaciones y actualización de ofertas.
contarPostulacionesAceptadasDeOferta(oferta){
    let cantidad = 0

    for(let i = 0; i < this.postulaciones.length; i++){
        if(this.postulaciones[i].oferta === oferta && this.postulaciones[i].estado === "Aceptada"){
            cantidad++
        }
    }

    return cantidad
}
// Métodos utilizados para generar las estadísticas del sistema.
contarPostulacionesDeOferta(oferta){
    let cantidad = 0

    for(let i = 0; i < this.postulaciones.length; i++){
        if(this.postulaciones[i].oferta === oferta){
            cantidad++
        }
    }

    return cantidad
}

rechazarPendientesDeOferta(oferta){
    let rechazadasAutomaticamente = 0

    for(let i = 0; i < this.postulaciones.length; i++){
        if(this.postulaciones[i].oferta === oferta && this.postulaciones[i].estado === "Pendiente"){
            this.postulaciones[i].estado = "Rechazada"
            rechazadasAutomaticamente++
        }
    }

    return rechazadasAutomaticamente
}

rechazarPostulacion(idPostulacion){
    let postulacion = this.obtenerPostulacion(idPostulacion)

    if(postulacion !== null && postulacion.estado === "Pendiente"){
        postulacion.estado = "Rechazada"
        return true
    }

    return false
}

aceptarPostulacion(idPostulacion){
    let postulacion = this.obtenerPostulacion(idPostulacion)
    let mensaje = ""

    if(postulacion !== null && postulacion.estado === "Pendiente"){
        postulacion.estado = "Aceptada"

        let oferta = postulacion.oferta
        let aceptadas = this.contarPostulacionesAceptadasDeOferta(oferta)
        let totalPostulaciones = this.contarPostulacionesDeOferta(oferta)
        let rechazadasAutomaticamente = 0

        mensaje = "La postulación fue aprobada correctamente."

        if(aceptadas >= oferta.vacantes){
            oferta.estado = "Inactiva"
            rechazadasAutomaticamente = this.rechazarPendientesDeOferta(oferta)
            mensaje += ` La oferta pasó a Inactiva porque se cubrieron todas las vacantes. Postulaciones rechazadas automáticamente: ${rechazadasAutomaticamente}.`
        }else if(totalPostulaciones >= oferta.limitePostulaciones){
            oferta.estado = "Inactiva"
            mensaje += " La oferta pasó a Inactiva porque alcanzó el límite de postulaciones."
        }

        return mensaje
    }

    return "No se pudo procesar la postulación."
    }

// FUNCIONALIDAD 17
contarPostulacionesPorEstadoDeOferta(oferta, estado){
    let cantidad = 0

    for(let i = 0; i < this.postulaciones.length; i++){
        if(this.postulaciones[i].oferta === oferta && this.postulaciones[i].estado === estado){
            cantidad++
        }
    }

    return cantidad
}

contarOfertasPorEstado(estado){
    let cantidad = 0

    for(let i = 0; i < this.ofertas.length; i++){
        if(this.ofertas[i].estado === estado){
            cantidad++
        }
    }

    return cantidad
}

calcularPorcentajeVacantesCubiertas(){
    let totalVacantes = 0
    let totalAceptadas = 0

    for(let i = 0; i < this.ofertas.length; i++){
        let oferta = this.ofertas[i]

        totalVacantes += oferta.vacantes
        totalAceptadas += this.contarPostulacionesAceptadasDeOferta(oferta)
    }

    if(totalVacantes === 0){
        return 0
    }

    return (totalAceptadas * 100) / totalVacantes
}

obtenerPostulantesConMasPostulacionesActivas(){
    let mayorCantidad = 0
    let postulantesConMas = []

    for(let i = 0; i < this.postulantes.length; i++){
        let postulante = this.postulantes[i]
        let cantidad = 0

        for(let j = 0; j < this.postulaciones.length; j++){
            if(this.postulaciones[j].postulante === postulante && this.postulaciones[j].estado !== "Rechazada"){
                cantidad++
            }
        }

        if(cantidad > mayorCantidad){
            mayorCantidad = cantidad
            postulantesConMas = []
            postulantesConMas.push(postulante)
        }else if(cantidad === mayorCantidad && cantidad > 0){
            postulantesConMas.push(postulante)
        }
    }

    return postulantesConMas
}
}