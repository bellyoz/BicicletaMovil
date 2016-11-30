var map,mar,marf;
var lat,lon;
var d;
//varibales para los servicios de rutas de google mpas
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
$(document).ready(function() {
    alert("Mueve el localizador rojo a tu destino para determinar la ruta");
    directionsDisplay = new google.maps.DirectionsRenderer();
    //cargamos el mapa
    map = cargarMapa(map,lat = 19.431924,lon = -99.133441);
    //cargamos los marcadores al mapa
    mar = cargarMarcador(mar,map,19.431924,-99.133441,true,'img/marker.png');
    marf = cargarMarcador(marf,map,19.431924,-99.133441,true,'img/marker2.png');
    //asignamos el mapa a la variable de visualizacion de rutas
    directionsDisplay.setMap(map);

    //agregamos evento para que al terminar de arrastrar los marcadores se marque la ruta
   
    google.maps.event.addListener(marf, 'dragend', function() {
        //inicializamos el punto de partida y de llegada con las posicicones de los marcadores
        start = new google.maps.LatLng(mar.position.lat(),mar.position.lng());
        end = new google.maps.LatLng(marf.position.lat(),marf.position.lng());
        //hacemos una peticion al servicio de rutas
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.TRANSIT
          };
          directionsService.route(request, function(result, status) {
            //si la peticion fue exitosa pintamos la ruta
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });
    });
    //llamar la funcion de geolocalizacion
    gps();    
    
});

//funcion para cargar el mapa
function cargarMapa(map,lat,lon){
    if(map == undefined){
        var mapOptions = {
            center: new google.maps.LatLng(lat, lon),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            scrollwheel: true,
            panControl:false,
            streetViewControl:false
        };
        map = new google.maps.Map(document.getElementById('map'),mapOptions);
    }
    else{
        centrarMapa(map,lat,lon);
    }
    return map;
}

//funcion que centra el mapa
function centrarMapa(map,lat,lon){
    map.panTo(new google.maps.LatLng(lat, lon));
}

//funcion para poner un marcador
function cargarMarcador(marker,map,lat,lon,dr,im){
    if(marker == undefined){
       var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        draggable:dr,
        icon: im,
    });
       marker.setMap(map);
   }
   else{
    console.log('entro');
    marker.setPosition(new google.maps.LatLng(lat, lon));
   }
    centrarMapa(map,lat,lon);
   return marker;
}


//funcion de geolocalizacion
function gps(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(pos){
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            mar = cargarMarcador(mar,map,lat,lon,true,'marker.png');
            marf = cargarMarcador(marf,map,lat,lon,true,'marker2.png');
        }, function(err){
            lat = 19.431924;
            lon = -99.133441;
            mar = cargarMarcador(mar,map,lat,lon,true,'marker.png');
            marf = cargarMarcador(marf,map,lat,lon,true,'marker2.png');
            alert("Error Al Localizar");
        }, {enableHighAccuracy:true, timeout: 10000,maximumAge: 500});
    }
    else
    {
        lat = 19.431924;
        lon = -99.133441;
        mar = cargarMarcador(mar,map,lat,lon,true,'marker.png');
        marf = cargarMarcador(marf,map,lat,lon,true,'marker2.png');
        alert("Error Al Localizar");
    }

}

function distancia(){
    var lat1 = mar.position.lat();
    var lon1 = mar.position.lng();
    var lat2 = marf.position.lat();
    var lon2 = marf.position.lng();
    rad = function(x) {return x*Math.PI/180;}

    var R     = 6378.137;                          //Radio de la tierra en km
    var dLat  = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    d = R * c;
    
    document.getElementById('distancia').innerHTML= d.toFixed(3)+ " Kilometros";
}









