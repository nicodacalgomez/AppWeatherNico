$(document).on("mobileinit",function(){
	$(function(){
		var horactual = new Date();
		var datos = [];
		var ciudad = [];
		var pais = [];
		var temperatura = [];
		var temperaturamin = [];
		var temperaturamax = [];
		var tiempo = [];
		var amanecer = [];
		var atardecer = [];
		var fecha = [];
		var humedad = [];
		var viento = [];
		ultima();

		
		

function ultima(){
	if(typeof(localStorage.actual)=="undefined"){
			
			console.log(0);
			navigator.geolocation.getCurrentPosition(successF, errorF);

			function successF(position){
				let lat = position.coords.latitude;
				let long = position.coords.longitude;

				var url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&APPID=e7e482e299f46d23a6b5e5dbea06bf87&units=metric';
				var url2 = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=e7e482e299f46d23a6b5e5dbea06bf87&units=metric';
				
				cargarDatos(url, url2);
			}
		}else{
			console.log(1);
			var ciudadActual = localStorage.actual;
			var url = 'http://api.openweathermap.org/data/2.5/forecast?q='+ciudadActual+'&APPID=e7e482e299f46d23a6b5e5dbea06bf87&units=metric';
			var url2 = 'http://api.openweathermap.org/data/2.5/weather?q='+ciudadActual+'&APPID=e7e482e299f46d23a6b5e5dbea06bf87&units=metric';
		
			cargarDatos(url, url2);
			delete localStorage.actual;
				
		}
}

		
		function calculardiaactual(actualidad){


			switch (actualidad%7){
				case 0: diasemana = "Domingo"; break;
				case 1: diasemana = "Lunes"; break;
				case 2: diasemana = "Martes"; break;
				case 3: diasemana = "Miércoles"; break;
				case 4: diasemana = "Jueves"; break;
				case 5: diasemana = "Viernes"; break;
				case 6: diasemana = "Sábado"; break;
			} return diasemana;
		}

		function errorF(position){
			alert("Error!");
		}

		function calcularmediodia(amanecer,atardecer){
			var tiempomediodia = (amanecer + atardecer) / 2
			return tiempomediodia;
		}


		function calculardia(calculodia){
			var dia = calculodia.split("-")[2];
			var mes = calculodia.split("-")[1];
			
			switch(mes){
				case "01": nombremes="Enero";break;
				case "02": nombremes="Febrero";break;
				case "03": nombremes="Marzo";break;
				case "04": nombremes="Abril";break;
				case "05": nombremes="Mayo";break;
				case "06": nombremes="Junio";break;
				case "07": nombremes="Julio";break;
				case "08": nombremes="Agosto";break;
				case "09": nombremes="Septiembre";break;
				case "10": nombremes="Octubre";break;
				case "11": nombremes="Noviembre";break;
				case "12": nombremes="Diciembre";break;
			}

			return dia+" de " + nombremes;

		}

		function calcularmovimiento(){
			var d = new Date();
			var instante = d.getHours();
			if (instante < 4 || instante > 20){
				momento = "Noche";
				$(".estilo").html('<link rel="stylesheet" type="text/css" href="theme-c.css">');
			}

			else if (instante < 12)
				momento = "Mañana"
			
			
			else {
				momento = "Tarde"
			}
			
		}

		function calcularhoras(milisegundos){
			var mili = new Date(milisegundos * 1000);
			var horas = mili.getHours();
			var minutos = mili.getMinutes();
			
			if (horas<10){
				horas="0"+horas;
			}

			if (minutos<10){
				minutos="0"+minutos;
			}

			return horas + ":" + minutos;
		}


		function generarContenido(){
			var exactohora = horactual.getHours();

				if (exactohora<4 || exactohora>19){
					var momento = "noche";

				} else if(exactohora<12){
					var momento = "manana"
				} else var momento = "tarde";

			
			var diasemana = new Date();
			actualidad = diasemana.getDay();

			if(tiempo[0] == 'clear'){
				if(momento  == 'noche'){
					letra = 'n';

				}else{
					letra = 'd'
			$(".estilo").html('<link rel="stylesheet" type="text/css" href="theme-d.css">');

				}
			}else{
				letra = '';
				if(momento != "noche"){

							$(".estilo").html('<link rel="stylesheet" type="text/css" href="theme-e.css">');
				}

			}

var contenido = '<div class="paisciudad">'+
				'<h1>'+ciudad[0]+'</h1>'+
				'<h2>'+pais[0]+'</h2>'+
				'</div>'+

				'<div class="tiempogrados">'+
				'<h3>'+temperatura[0]+'º</h3>'+
				'<img src="'+tiempo[0]+letra+'.png" alt ="'+tiempo[0]+'">'+
				'</div>'+

				'<div class="fecha">'+
				'<h4>'+calculardiaactual(actualidad)+', '+calculardia(fecha[0])+'</h4>'+
				'</div>'+

				'<div class="amaneceratardecer">'+
					'<div class="amanecer '+momento+'">'+
					'<h5>'+calcularhoras(amanecer[0])+'</h5>'+
					'<div id="amanecer"><div></div></div>' +
					'</div>'+

					'<div class="mediodia '+momento+'">'+
					'<div id="mediodia"><h5>'+calcularhoras(calcularmediodia(amanecer[0],atardecer[0]))+'</h5></div>' +
					'</div>'+

					'<div class="atardecer '+momento+'">'+
					'<div id="atardecer"><div></div></div>' +
					'<h5>'+calcularhoras(atardecer[0])+'</h5>'+
					'</div>'+
				'</div>'+
				
				'<div class="dias">';
					
					for (i=1; i<temperaturamax.length;i++){actualidad ++
					contenido+='<div class ="dia">'+
						'<h6 class="fechasmall">'+calculardiaactual(actualidad)+'</h6>'+
						'<div><img src ="'+tiempo[i]+'.png" alt ="'+tiempo[i]+'"></div>'+
						'<h6 class="maxtemp">'+temperaturamax[i]+'º</h6>'+
						'<h6 class="mintemp">'+temperaturamin[i]+'º</h6>'+
					'</div>';
					}
				contenido+='</div>'+

			'<div class="humeviento">'+
				'<div class="humedad"><p>HUMEDAD</p><p>'+humedad[0]+'%</p></div>'+
				'<div class="viento"><p>VIENTO</p><p>'+viento[0]+'km/h</p></div>'+
			'</div>'

			$("#contenido").html(contenido);
		}
		function cargarDatos(url, url2){
			$.ajax({
				  url: url2,
				  context: document.body
				}).done(function(datos) {
				 
				 
				

				 ciudad[0] = datos.name;
				 pais[0] = datos.sys.country;
				 temperatura[0] = Math.round(datos.main.temp);
				 temperaturamin[0] = datos.main.temp_min;
				 temperaturamax[0] = datos.main.temp_max;
				 tiempo[0] = datos.weather[0].main;
				 amanecer[0] = datos.sys.sunrise;
				 atardecer[0] = datos.sys.sunset;
				 humedad[0] = datos.main.humidity;
				 viento[0] = datos.wind.speed;
				 

				 if(typeof(localStorage.localizaciones)!= "undefined"){
				 	if(localStorage.localizaciones.indexOf(ciudad[0]) < 0){
				 		localStorage.localizaciones += ","+ciudad[0];
				 	}
				 }else localStorage.setItem("localizaciones",[ciudad[0]]);
				
			});	

			$.ajax({
				  url: url,
				  context: document.body
				}).success(function(dato) {
 				
 				fecha[0] = dato.list[0].dt_txt.split(" ")[0];


					for (i=1; i<6;i++){
				 datos = dato.list[i];
				 temperaturamin[i] = Math.round(datos.main.temp_min);
				 temperaturamax[i] = Math.round(datos.main.temp_max);
				 tiempo[i] = datos.weather[0].main;
				 fecha[i] = datos.dt_txt.split(" ")[0];


			}
				
			}).done(function() {
				generarContenido();
			});
		}

// JQUERY 2

	    $( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ){
			
	        var $ul = $( this ),
	            $input = $( data.input ),
	            value = $input.val(),
	            html = "";
	        $ul.html( "" );
	        if ( value && value.length > 2 )
			{
		            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
		            $ul.listview( "refresh" );
		            $.ajax({
		                url: "http://gd.geobytes.com/AutoCompleteCity",
		                dataType: "jsonp",
		                crossDomain: true,
		                data: {
		                    q: $input.val()
		                }
		            })
		            .then( function ( response ) {
	                $.each( response, function ( i, val ) {
						var ciudad = val.split(",")[0];

	                    html += '<li onclick = "if (localStorage.localizaciones.indexOf(\''+ciudad+'\')<0)localStorage.localizaciones += \','+ciudad+'\';">'+val+'</li>';
	                });
					console.log(html)
	                $("#autocomplete").html( html );
					// var val = $(this);
				    
				    $ul.listview( "refresh" );
	                $ul.trigger( "updatelayout");
	            });
					

	        }
	    });

$("#buscar").on('click', 'li', function(){
						
					contenidos = "";	
					ultimalista();	
					window.location.href="index.html#lista";

					console.log("lluvia");
					})
$("#listarandom").on('click', 'a', function(){
					
					ultima();
					
					console.log("lluvia");
					})


// JQUERY 3

	var contenidos = "";

function ultimalista(){

	
	var localizaciones = localStorage.localizaciones.split (",");
	for(var i=0; i<localizaciones.length; i++){
			var ciudadActual = localizaciones[i];
			var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ciudadActual+'&APPID=e7e482e299f46d23a6b5e5dbea06bf87&units=metric';
			listado(url);
	}
	}

function listado(url){
		$.ajax({
				  url: url,
				  context: document.body
				}).done(function(datos) {
				 
				 
				 var ciudad = datos.name;
				 var temperatura = Math.round(datos.main.temp);
				 var tiempo = datos.weather[0].main;

		contenidos+='<div class ="dia" onclick="localStorage.actual=\''+ciudad+'\'">'+
						'<div><a href="#home"><h5>'+ciudad+'</h5></a></div>'+
						'<div><a href="#home"><img src ="'+tiempo+'.png" alt ="'+tiempo+'"></a></div>'+
						'<div><a href="#home"><h6>'+temperatura+'º</h6></a></div>'+
				'</div>';
							
			 $("#listarandom").html(contenidos);

			});	
			}
     });

});