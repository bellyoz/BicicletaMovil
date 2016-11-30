$(document).ready(function(){
    cargarBicis();
    $("#add").click(function(){
        addBici();
    });
    $("#calcular").click(function(){
        calcular();
    });
});
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
}
//arreglo de bicis
var arreglo = [{
    "nombre":"RAPID",
    "bateria":"20",
    "amperios":"12",
    "motor":"500"},
    {
    "nombre":"IMPULSE",
    "bateria":"48",
    "amperios":"16",
    "motor":"522"},
    {
    "nombre":"X-MAN",
    "bateria":"80",
    "amperios":"10",
    "motor":"100"},
    {
    "nombre":"NEW",
    "bateria":"50",
    "amperios":"22",
    "motor":"524"}
    ];

// cargar bicis a la tabla
var stored = "";
var cargarBicis = function(){
    if(localStorage.length == 0){
    localStorage['bici']=JSON.stringify(arreglo);
    }
    stored= JSON.parse(localStorage['bici']);
    html = "";
   for (var i = 0; i < stored.length; i++) {
       
        html+="<tr>";
        html+="<td>"+stored[i].nombre+"</td>";
        html+="<td>"+stored[i].bateria+"</td>";
        html+="<td>"+stored[i].amperios+"</td>";
        html+="<td>"+stored[i].motor+"</td>";
        html+='</tr>';     
    };
    localStorage['bici']=JSON.stringify(stored);

    $("#tablaBicis").html(html);

}

//añadir bici nueva
var addBici = function(){
    stored= JSON.parse(localStorage['bici']);
    stored.push({
        "nombre": $('#name').val(),
        "bateria": $('#bateria').val(),
        "amperios": $('#amperio').val(),
        "motor": $('#motor').val()
    });
   
    localStorage['bici']=JSON.stringify(stored);
    bici = JSON.parse(localStorage['bici']);
   cargarBicis();
    window.location.assign('bike.html');
}

var calcular = function(){
    var distan = localStorage.getItem("distancia");
    var cicla = [];
    var html ="";
    var menor = 0;
    var opc = "";
    for(var i = 0 ; i < stored.length ;i++){
        var formula = ((stored[i].bateria*stored[i].amperios)*25)/stored[i].motor;
   
        if(formula >= distan && i+1<=stored.length){
     
                    cicla.push(stored[i]);
            
            
        }
    }
    menor= ((cicla[0].bateria*cicla[0].amperios)*25)/cicla[0].motor;
    for(var i = 0 ; i < cicla.length ;i++){
         var formula = ((cicla[i].bateria*cicla[i].amperios)*25)/cicla[i].motor;
        if(menor >= formula){

            opc = cicla[i];
            menor = formula;
        }
    }
    html +="<br><br><h3>La Bicicleta indicada es :"+opc.nombre+" con bateria de "+opc.bateria+" corriente de "+opc.amperios+" y el motor "+opc.motor+"</h3>"
    $("#cicla").html(html);
}
