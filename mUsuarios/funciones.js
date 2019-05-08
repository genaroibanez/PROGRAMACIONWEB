function llenar_lista(){
     // console.log("Se ha llenado lista");
    preCarga(1000,4);
    $.ajax({
        url:"llenarLista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#lista").html(respuesta);
            $("#lista").slideDown("fast");
        },
        error:function(xhr,status){
            alert("no se muestra");
        }
    }); 
}

function ver_alta(){
    preCarga(800,4);
    $("#lista").slideUp('low');
    $("#alta").slideDown('low');
    $("#nombre").focus();
}

function ver_lista(){
    $("#alta").slideUp('low');
    $("#lista").slideDown('low');
}

$('#btnLista').on('click',function(){
    llenar_lista();
    ver_lista();
});

$("#frmAlta").submit(function(e){
  
    var idPersona = $("#idPersona").val();
    var usuario   = $("#usuario").val();
    var contra    = $("#contra").val();
    var vContra   = $("#vContra").val();
  


    if(idPersona==0){
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Información',
            'label':'Salir',
            'message': 'Debes seleccionar el dato de una persona.' ,
            'onok': function(){ alertify.message('Gracias !');}
        }).show();
        return false;       
    }
 //vlidacion para que en nombre de usuario sea minimo de 5 caracteres
    if(usuario.length<5){
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Información',
            'label':'Salir',
            'message': 'El usuario debe de contener 5 caracteres.' ,
            'onok': function(){ alertify.message('Gracias !');}
        }).show();
        $("#contra").focus();
         return false;       
    }


    if(contra != vContra){
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Información',
            'label':'Salir',
            'message': 'Las contraseñas deben de ser iguales.' ,
            'onok': function(){ alertify.message('Gracias !');}
        }).show();
        $("#contra").focus();
         return false;       
    }

       


    // console.log(nombreCompleto);

        $.ajax({
            url:"guardar.php",
            type:"POST",
            dateType:"html",
            data:{
                    'idPersona':idPersona,
                    'usuario':usuario,
                    'contra':contra
                 },
            success:function(respuesta){
              
            alertify.set('notifier','position', 'bottom-right');
            alertify.success('Se ha guardado el registro' );
            $("#frmAlta")[0].reset();
            llenar_persona();
            },
            error:function(xhr,status){
                alert(xhr);
            },
        });
        e.preventDefault();
        return false;
});

function abrirModalEditar(idUsuario,idPersona,usuario,contra){
   
    $("#frmActuliza")[0].reset();

    llenar_personaU(idPersona);

    $("#idE").val(idUsuario);
 
    $("#usuarioE").val(usuario);
    $("#contraE").val(contra);
    $("#vContraE").val(contra);

     

    $("#modalEditar").modal("show");

     $('#modalEditar').on('shown.bs.modal', function () {
         $('#usuarioE').focus();
     });      
}

$("#frmActuliza").submit(function(e){
    var usuario   = $("#usuarioE").val();
    var contra    = $("#contraE").val();
    var vContra    = $("#vContraE").val();

    //vlidacion para que en nombre de usuario sea minimo de 5 caracteres

    caracteres=$("#usuarioE").val().length;
    if(caracteres < 5){
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Información',
            'label':'Salir',
            'message': 'El usuario debe de contener 5 caracteres.' ,
            'onok': function(){ alertify.message('Gracias !');}
        }).show();
        $("#usuarioE").focus();
         return false;       
    }


    if(contra != vContra){
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Información',
            'label':'Salir',
            'message': 'Las contraseñas deben de ser iguales.' ,
            'onok': function(){ alertify.message('Gracias !');}
        }).show();
        $("#contra").focus();
         return false;       
    }

    var ide       = $("#idE").val();

        $.ajax({
            url:"actualizar.php",
            type:"POST",
            dateType:"html",
            data:{
                    'usuario':usuario ,
                    'contra':contra,
                 
                    'ide':ide
                 },
            success:function(respuesta){

            alertify.set('notifier','position', 'bottom-right');
            alertify.success('Se ha actualizado el registro' );
            $("#frmActuliza")[0].reset();
            $("#modalEditar").modal("hide");
            llenar_lista();
            },
            error:function(xhr,status){
                alert(xhr);
            },
        });
        e.preventDefault();
        return false;
});

function status(concecutivo,id){
    var nomToggle = "#interruptor"+concecutivo;
    var nomBoton  = "#boton"+concecutivo;
    var numero    = "#tConsecutivo"+concecutivo;
    var nCompleto  = "#tNcompleto"+concecutivo;
    var usuario    = "#tUsuario"+concecutivo;
    var registro  = "#tRegistro"+concecutivo;
    var nomBotonR  = "#botonR"+concecutivo;

 

    if( $(nomToggle).is(':checked') ) {
        // console.log("activado");
        var valor=0;
        alertify.success('Registro habilitado' );
        $(nomBoton).removeAttr("disabled");
        $(numero).removeClass("desabilita");
        $( nCompleto).removeClass("desabilita");
        $( usuario).removeClass("desabilita");
        $( registro).removeClass("desabilita");
        $(nomBotonR).removeAttr("disabled");

     
    }else{
        console.log("desactivado");
        var valor=1;
        alertify.error('Registro deshabilitado' );
        $(nomBoton).attr("disabled", "disabled");
        $(numero).addClass("desabilita");
        $(nCompleto).addClass("desabilita");
        $(usuario).addClass("desabilita");
        $( registro).addClass("desabilita");
        $(nomBotonR).attr("disabled", "disabled");
    }
    // console.log(concecutivo+' | '+id);
    $.ajax({
        url:"status.php",
        type:"POST",
        dateType:"html",
        data:{
                'valor':valor,
                'id':id
             },
        success:function(respuesta){
            // console.log(respuesta);
        },
        error:function(xhr,status){
            alert(xhr);
        },
    });
}

function llenar_persona()
{

    //alert(id)
    $.ajax({
        url:'comboPersonas.php',
        // data:{'id':id},
        type:"POST",
        dateType:'html',
        success:function(respuesta) {
           $("#idPersona").empty(); //borrar el combo empty
           $("#idPersona").html(respuesta);  //llenar la respuera que nos trae
        },
        error:function(xhr,status){
            alert('Disculpe, existió un problema');
        },
    });
}

function restaurarContra(idUser){
    console.log(idUser);
      $.ajax({
        url:"restaurarContra.php",
        type:"POST",
        dateType:"html",
        data:{
                'idUser':idUser
             },
        success:function(respuesta){
        // console.log("Se ha restaurado la constraseña");
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Información',
            'label':'Salir',
            'message': 'Se ha restaurado la contraseña.' ,
            'onok': function(){ alertify.message('Gracias !');}
        }).show();
       

        },
        error:function(xhr,status){
            alert(xhr);
        },
    });
}

function mostrarContra(){
    var btnMostrar=$('#btnMostrar').val();
   // console.log(btnMostrar);
    preCarga(3000);
    if (btnMostrar=='oculto') {
     $("#contraE").attr("type","text");
    $("#vContraE").attr("type","text");
    $("#btnMostrar").attr("value","visto");
    $("#icoMostrar").removeClass("far fa-eye fa-lg");
    $("#icoMostrar").addClass("far fa-eye-slash fa-lg");
    }
    else{
    $("#contraE").attr("type","password");
    $("#vContraE").attr("type","password");
    $("#btnMostrar").attr("value","oculto");
    $("#icoMostrar").removeClass("far fa-eye-slash fa-lg");
    $("#icoMostrar").addClass("far fa-eye fa-lg");
    }
  


}

function llenar_personaU(idPersona)
{

    //alert(id)
    $.ajax({
        url:'comboPersonasU.php',
        // data:{'id':id},
        type:"POST",
        dateType:'html',
        success:function(respuesta) {
          $("#nombreE").empty(); //borrar el combo empty
          $("#nombreE").html(respuesta);  //llenar la respuera que nos trae
          $("#nombreE").val(idPersona);
          $("#nombreE").select2();
        },
        error:function(xhr,status){
            alert('Disculpe, existió un problema');
        },
    });
}