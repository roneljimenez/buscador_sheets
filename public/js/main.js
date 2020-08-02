$(document).ready(function() { 

    let urlActual = window.location.href;
    urlActual = urlActual.split('?');
    if(urlActual.length > 1){
      let busqueda = urlActual[1].split('=');
      console.log(busqueda[1]);
      busquedaSinEspacios = busqueda[1].replace(/\+/g, ' ');
      document.getElementById('searchinterno').value = busquedaSinEspacios;
      funcionBuscar();
    }
    $('#btnsearch').click(function() {
       funcionBuscar();
    });
    $('#searchinterno').keypress(function(e) {
      var keycode = (e.keyCode ? e.keyCode : e.which);
      if (keycode == '13') {
          funcionBuscar();
          e.preventDefault();
          return false;
      }
    });
  });

  function funcionBuscar (){
    document.getElementById("section-01").style.maxHeight = "300px";
    $("#icobanner").addClass('noactiva');
    $("#icobanner").removeClass('activa');
    $('.ui-menu-item').hide();
    $('.ui-autocomplete').hide();
    document.getElementById("busquedafinal").style.display = "block";
     // id de la hoja de calculo
     idSheets = 'xxxxxxxxxxxx';
     //// nuestra      APIKey
     apiKey = 'zzzzzzzzzzzzzzzz'; 
   // fetch es un método nativo para hacer peticiones http
   // en el navegador 
     fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/A2:E?access_token="+ apiKey +"&key="+  apiKey)
     .then((lista)=>{
       return lista.json();
     }).then((valores)=>{
        const datosDisponibles = valores.values;
        var busqueda = $("#searchinterno").val().toLowerCase();
        busqueda = busqueda.split(' '); 
        var resultados = [];
        busqueda.forEach(element => {
            resultados = datosDisponibles.filter(datosDisponibles => {
                return datosDisponibles[4].toLowerCase().includes(element);
            });
        });
        var contFinal = 'Resultados: '+resultados.length;
        var caja = '';
        resultados.forEach(resultado => {
            caja += `<div class="col-lg-4 col-sm-6 col-md-6 col-12 pr-5 pl-5 mt-3">
            <div class="box">
            <a href="${resultado[1]}">
            <span class="busquedaid">
            <div class="d-flex align-items-center">
            <img class="ico-vineta pr-3" src="public/img/ico/ico-triangulo.svg" />
            <p class="txt-busqueda">${resultado[3]}</p>
            </div>
            </span>
            </a>
            </div>
            </div>`
        });
        $("#contresultados").html(contFinal);
        $("#busqueda").html(caja);

     }).catch(err=>{
       console.log(err);
     })
  }

