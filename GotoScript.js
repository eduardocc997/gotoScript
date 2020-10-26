/*--------INFO-----------
Este framework necesita:
Jquery, SweetAlert2, Bootstrap y SemanticUI
para poder funcionar correctamente en todas sus funciones

Algunas funciones de este framework estan pensadas para recibir datos en formatos
de SQL Server y MVC C#.

Desarrollado por Eduardo Enrique Camacho Castro
la modificación de este archivo deja bajo su responsabilidad
las acciones que éste pueda desencadenar en el futuro.
-----------------------*/

//------Mensajes--------//
function msjExito(titulo, mensaje) {
  Swal.fire(
    titulo,
    mensaje,
    'success'
  )
}
function msjError(titulo, mensaje) {
  Swal.fire(
    titulo,
    mensaje,
    'error'
  )
}
function msjInfo(titulo, mensaje) {
  Swal.fire(
    titulo,
    mensaje,
    'info'
  )
}
function msjCargando() {
  $('#zonaMensajes').append(`
    <div class="alert alert-light" role="alert" id="msjCargando">
  <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Cargando datos...
</div>
  `);
}
function elimMsjCargando() {
  $('#msjCargando').remove();
}

//-----DataTables--------//
function formatTabla(idTabla) {
  $(idTabla).DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "responsive": true,
  });
}
function resetTabla(idTabla) {
    $(idTabla).DataTable().clear().destroy();
}

//--------Funciones para Formatear Datos---------
//Numeros con millares separados por comas
function formatNumber(num) {
  if (!num || num == 'NaN') return '-';
  if (num == 'Infinity') return '&#x221e;';
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

//Fecha formato DD/MM/YYYY HH:MM:SS
function formatDateTime(cadenaDateSqlServer) {
  temp = cadenaDateSqlServer;
  temp = temp.substring(6, (temp.length - 2))
  var d = new Date(Number(temp)),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hours.length < 2)
    hours = '0' + hours;
  if (minutes.length < 2)
    minutes = '0' + minutes;
  if (seconds.length < 0)
    seconds = '0' + seconds
  return (`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
}

//Fecha formato DD/MM/YYYY
function formatDate(cadenaDateSqlServer) {
  temp = cadenaDateSqlServer;
  temp = temp.substring(6, (temp.length - 2))
  var d = new Date(Number(temp)),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return (`${day}/${month}/${year}`);
}

//---------Propiedades a objetos----------//
function deshabilitar(idElemento) {
  $(idElemento).prop("disabled", true);
}
function habilitar(idElemento) {
  $(idElemento).prop("disabled", false);
}


//------ Controles Semantic UI -----//
function dropdownSUI(idSelect) {
  $(idSelect).dropdown();
}
//--------Carga de Ajax-------//
function cargarAJAX(url, metodo, parametros) {
  var resp;
  $.ajax({
    url: url,
    type: metodo,
    data: parametros,
    async: false,
    success: function (respuesta) {
      resp = respuesta;
    },
    error: function () {
      resp = 0;
    }
  });
  return(resp)
}
