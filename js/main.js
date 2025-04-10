
 //1.- Validar los campos 
 //se cambio el tipo de variable de let a const ya que mis elementos no cambian.
 const txtName = document.getElementById("Name");//NOmbre
 const txtNumber = document.getElementById("Number");//Cantidad
 const btnAgregar =document.getElementById("btnAgregar");
 const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
 const alertValidaciones = document.getElementById("alertValidaciones");
 const tablaListaCompras = document.getElementById("tablaListaCompras");
 const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
 const contadorProductos = document.getElementById("contadorProductos");
 const productosTotal = document.getElementById("productosTotal");
 const precioTotal= document.getElementById("precioTotal");
 //Numeracion de la primera columna de la tabla

 let cont = 0;
 let costoTotal = 0;
 let totalEnProductos = 0;
 let datos = new Array(); //almacena los elementos de la tabla 


 function validarCantidad(){
   if(txtNumber.value.trim().legth<=0){
    return false;
   }//length <=0
  
if (isNaN(txtNumber.value)){
    return false;
}
if(Number(txtNumber.value)<=0){
   return false;
}
return false;
} //validar la cantidad 

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
}

btnAgregar.addEventListener("click", function(event){
      event.preventDefault();
//Cada vez que entre voy a limpiar todo todo lo del campo 
  let isValid = true;//Es una bandera que permite pasar o no si pasa los datos pasan la validacion
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display= "none";
    txtName.style.border="";
    txtNumber.style.border="";

    txtName.value = txtName.value.trim(); //txtName hace referencia al input estamos declarando que el valor va hacer igual a lo que ya se tenia pero sin espacios.
    txtNumber.value = txtNumber.value.trim();

if(txtName.value.legth <3 ){  //evaluamos si es mayor que 3 la longitud
    txtName.style.border="solid medium red";
    alertValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto </strong>";
    alertValidaciones.style.display= "block";
    isValid = false;
}//length -3 

if (! validarCantidad()){
    txtNumber.style.border="solid medium red";
    alertValidacionesTexto.innerHTML+="<br/><strong>El válor de la cantidad es incorrecto </strong>";
    alertValidaciones.style.display= "block";
    isValid = false;
} 

if(isValid){//if isValid si es valido ya puedo agregar los elemmentos de la tabla
cont++;
let precio = getPrecio();
let row =  `<tr>
<td>${cont}</td>
<td>${txtName.value}</td>
<td>${txtNumber.value}</td>
<td>${precio}</td> </tr>`;

let elemento = {
        "cont": cont,
        "nombre": txtName.value,
        "cantidad": txtNumber.value,
        "precio" : precio
};

 datos.push(elemento);
 localStorage.setItem("datos" , JSON.stringify(datos));
 
cuerpoTabla.insertAdjacentHTML("beforeend",row);
costoTotal += precio * Number(txtNumber.value)
contadorProductos.innerText = "$" + costoTotal.toFixed(2);
totalEnProductos+= Number(txtNumber.value);
productosTotal.innerText = totalEnProductos;
contadorProductos.innerText = cont;
let resumen ={
    "cont": cont,
    "totalEnProductos" : totalEnProductos,
    "costoTotal":costoTotal
 };
localStorage.setItem("resumen",JSON.stringify(resumen));


txtName.value = "";
txtNumber.value ="";
txtName.focus();
}//iF isValid

});//validarCantidad



window.addEventListener("load",function(event){
  event.preventDefault();
  if(this.localStorage.getItem("datos")!= null){
    datos = JSON.parse(this.localStorage.getItem("datos"));
  }//datos != null
  datos.forEach((d) => {
         let row = `<tr>
         <td>${d.cont}</td>
         <td>${d.nombre}</td>
         <td>${d.cantidad}</td>
        <td>${d.precio}</td> </tr>`;

    cuerpoTabla.insertAdjacentHTML("beforeend",row);

  });

  if(this.localStorage.getItem("resumen")!=null){
    let resumen = JSON.parse(this.localStorage.getItem("resumen"));
    costoTotal = resumen.costoTotal;
    totalEnProductos= resumen.totalEnProductos;
    cont = resumen.cont;
  }//resumen != null

  precioTotal.innerText = "$" + costoTotal.toFixed(2);
  productosTotal.innerText=totalEnProductos;
  contadorProductos.innerText = cont;
}); //window.addEvenListener load 



