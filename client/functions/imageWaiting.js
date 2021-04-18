/*function testsFunkcijasSkolai( teksts ) {
  alert( teksts );
}*/

// Funkcijai gaida, kad norādītie attēli ir ielādējušies no tīkla un tad izsauc pirmajā parametrā norādīto funkciju.
// Gaidīšanas laikā lapas apakšā (pēc visiem elementiem) uzrādās "Attēlu ielāde ...", kas pazūd brīdī, kad visi attēli ir ielādēti.
// Autors:: 2018-2019 Ojārs Krūmiņš
// Versija 1.3
function gaidaAtteluIeladi() {
    var images = [].slice.call(arguments); var num = arguments.length;
    var l = document.createElement('div'); l.id = "loading_div"; l.innerHTML = "Attēlu ielāde "; document.body.appendChild(l); var lcount = 1;
    var interval = setInterval(function(){ var n = 1; for (var i = 1; i < images.length; i++){ if( images[i].complete ) { n++; } }
        if( n == num ) { clearInterval(interval); document.getElementById("loading_div").remove(); images[0](); }
        lcount = (lcount+1)%50+1; l.innerHTML = "Attēlu ielāde "+".".repeat(lcount/10);
    }, 10);
}