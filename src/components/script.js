function change() {

    var centralni = document.getElementById("centralni");
    var tijelo = document.getElementById("tijelo");
    var kontakt = document.getElementById("kontakt");
    var novosti = document.getElementById("novosti");

    if (centralni.style.display === "none") {
        $("#novosti").fadeOut(300);
        setTimeout(function(){ centralni.style.display = "grid"; kontakt.style.display = "block"; }, 250);
        tijelo.style.overflow = "visible";
        novosti.style.display = "none";
    } 
    else {
        centralni.style.display = "none";
        $("#novosti").fadeIn(300);
        tijelo.style.overflow = "hidden";
        kontakt.style.display ="none";
        novosti.style.display = "grid";
    }
}

function bug(){
	$("#pop-up-ask").fadeIn(500);
	document.getElementById("pop-up-ask").style.display = "grid";
}

function zatvoribug(){
	$("#pop-up-ask").fadeOut(300);
}

document.getElementById("kemal_sam2").setAttribute("disabled", true);
document.getElementById("kemal_sam3").setAttribute("disabled", true);


	/*
	popUp.style.display = "grid"; 
	popUp.style.width = "100%";
	popUp.style.height = "100%";
	popUp.style.position = "fixed";
	popUp.style.background = "rgba(0, 0, 0, 0.5)";
	popUp.style.z-index = "2000";
	popUp.style.top = "0";
	popUp.style.justify-content = "center";
*/