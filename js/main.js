leerDatos = ()=> {
    var ruta = "https://phpservicios.000webhostapp.com/categorias.php";
    fetch(ruta)
    .then(response => response.json())
    .then(datos => {
        console.log(datos);

        llenarTabla(datos);
    })
}

leerDatos();

llenarTabla = (datos) => {
    $("#tbody-categorias").html("");

    $(datos).each((index,value) => {
        var fila = "<tr>";
        fila += "<td>" + value.idmascota + "</td>";
        fila += "<td>" + value.nombre + "</td>";
        fila += "<td>" + value.edad + "</td>";
        fila += "<td>" + value.propietario + "</td>";
        fila += "<td>" + value.distrito + "</td>";
        fila += "<td><i class='bi bi-x-lg boton-eliminar'></i></td>";
        fila += "<td><i class='bi bi-pencil-fill boton-actualizar' data-bs-toggle='modal' data-bs-target='#modal-actualizar'></i></td>";
        fila += "</tr>";
        $("#tbody-categorias").append(fila);
    });

    $(".boton-eliminar").click(function() {
        var filaActual =$(this).parent().parent();
        var posicion = filaActual.index();
        console.log(posicion);
        console.log(datos[posicion]);
        console.log(datos[posicion].nombre);

        var idmascota = datos[posicion].idmascota;

        var respuesta = confirm("¿Está seguro que desea eliminar la categoria "+ datos[posicion].nombre +" ?")
        if( respuesta == true){
            eliminarCategoria(idmascota);
            
        }
    });

    $(".boton-actualizar").click(function() {
        var filaActual =$(this).parent().parent();
        var posicion = filaActual.index();
        $("#txtIdMascotaActualizar").val(datos[posicion].idmascota);
        $("#txtNombreActualizar").val(datos[posicion].nombre);
        $("#txtEdadActualizar").val(datos[posicion].edad);
        $("#txtPropietarioActualizar").val(datos[posicion].propietario);
        $("#txtDistritoActualizar").val(datos[posicion].distrito);
    });
}


eliminarCategoria = (idmascota) => {
    var ruta = "http://phpservicios.000webhostapp.com/categoria-eliminar.php";

    var formData = new FormData();
    formData.append("IdMascota",idmascota);

    fetch(ruta,{
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(() => {
        leerDatos();
    })
}

$("#btnGuardar").click(()=>{
    //leer el contenidoo de la caja de texto
    var nombre = $("#txtNombre").val();
    var edad = $("#txtEdad").val();
    var propietario = $("#txtPropietario").val();
    var distrito = $("#txtDistrito").val();

    $("#txtNombre").val("");
    $("#txtEdad").val("");
    $("#txtPropietario").val("");
    $("#txtDistrito").val("");

    var ruta = "http://phpservicios.000webhostapp.com/categoria-insertar.php";

    //usamos una clase que nos va ayudar a guardar los nombre y descripcion
    var formData = new FormData();
    formData.append("nombre",nombre);
    formData.append("edad",edad);
    formData.append("propietario",propietario);
    formData.append("distrito",distrito);

    fetch(ruta,{
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(datos => {
        console.log(datos);
        leerDatos();//para que aparezca el datos se necesitaria volver a cargar la pagina
    })
});

$("#btnActualizar").click(()=>{
    var idmascota = $("#txtIdMascotaActualizar").val();
    var nombre = $("#txtNombreActualizar").val();
    var edad = $("#txtEdadActualizar").val();
    var propietario = $("#txtPropietarioActualizar").val();
    var distrito = $("#txtDistritoActualizar").val();

    var ruta = "http://phpservicios.000webhostapp.com/categoria-actualizar.php";

    var formData = new FormData();
    formData.append("idmascota",idmascota);
    formData.append("nombre",nombre);
    formData.append("edad",edad);
    formData.append("propietario",propietario);
    formData.append("distrito",distrito);

    fetch(ruta,{
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(() => {
        leerDatos();
    })
})

