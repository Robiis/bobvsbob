/*function testsFunkcijasSkolai( teksts ) {
  alert( teksts );
}*/

// Funkcijai gaida, kad norādītie attēli ir ielādējušies no tīkla un tad izsauc pirmajā parametrā norādīto funkciju.
// Gaidīšanas laikā lapas apakšā (pēc visiem elementiem) uzrādās "Attēlu ielāde ...", kas pazūd brīdī, kad visi attēli ir ielādēti.
// Autors:: 2018-2019 Ojārs Krūmiņš
// Versija 1.3
// Noņemts "Attēlu ielāde" teksts, samainīts ar "loader" animāciju (Roberts)
function gaidaAtteluIeladi() {
  var images = [].slice.call(arguments); var num = arguments.length;
  var interval = setInterval(function(){ var n = 1; for (var i = 1; i < images.length; i++){ if( images[i].complete ) { n++; } }
      if( n == num ) { clearInterval(interval); images[0](); }
  }, 10);
}