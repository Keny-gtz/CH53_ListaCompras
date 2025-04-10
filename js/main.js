
 //1.- Validar los campos 
 let txtName = document.getElementById("Name");
 let txtNumber = document.getElementById("Number");
 let btntnAgregar =document.getElementById("btnAgrear");
 let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
 let alertValidaciones = document.getElementById("alertValidaciones");

 
btnAgregar.addEventListener("click", function(event){
      event.preventDefault();
txtName.value = txtName.value.trim();
//txtName hace referencia al input estamos declarando que el valor va hacer igual a lo que ya se tenia pero sin espacios.
txtNumber.value = txtNumber.value.trim();

//evaluamos si es mayor que 3 la longitud
if(txtName.value.legth <3){
    txtName.style.border= "solid medium red";
    alertValidacionesTexto.innerHTML="<strong> El Nombre del producto no es correcto </strong>";
    alertValidaciones.style.display= "block";
}

});