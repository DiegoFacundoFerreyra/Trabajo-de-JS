class Auto {
  constructor(id, descripcion, precio, color) {
    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.color = color;
  }
  mostrar_descripcion_completa() {
    return "#" + this.id + " - " + this.descripcion + " $ " + this.precio;
  }
  getPrecio() {
    return this.precio;
  }
  setPrecio(nuevo_precio) {
    this.precio = nuevo_precio;
  }
  getId() {
    return this.id;
  }
  setId(nuevo_id) {
    this.id = nuevo_id;
  }
}

//hago mi base de datos
let arreglo_autos = new Array();
arreglo_autos.push(new Auto(1, "Fiat Uno", 500000, "Blanco"));
arreglo_autos.push(new Auto(2, "Audi A4", 1200000, "Negro"));
arreglo_autos.push(new Auto(3, "Peugeot408", 760000, "Rojo"));
arreglo_autos.push(new Auto(4, "Audi w8", 1200000, "Negro"));
arreglo_autos.push(new Auto(5, "BMW ", 22760000, "Azul"));
arreglo_autos.push(new Auto(6, "Audi A7", 7200000, "Negro"));
arreglo_autos.push(new Auto(7, "Fiat 500", 9000000, "Rojo"));
let respuesta = true;

while (respuesta != "salir" && respuesta) {
  respuesta = mostrarMenu();
}
function mostrarMenu() {
  let respuesta = prompt(
    "Que accion desea realizar ? \n 1) Ver los autos \n 2) asignar nuevo precio \n3)ordenar los autos por precio \n4)salir"
  );

  if (respuesta == "1") {
    //alert ("Los autos son: "+ arreglo_autos.join(" \n "));
    alert("Los autos son: " + mostrar_stock());
  } else if (respuesta == "2") {
    actualizarPrecio();
  } else if (respuesta == "3") {
    alert("Tarea para casa ;)");
    // alert("Los autos son: " + mostrar_stock());
  } else if (respuesta.toLowerCase() == "salir") {
    return respuesta.toLowerCase();
  } else {
    alert("Opcion invalida");
  }
  return respuesta;
}

function buscarAuto(id) {
  let i = 0;
  while (i < arreglo_autos.length) {
    if (arreglo_autos[i].getId() == id) {
      return i;
    }
    i++;
  }
  return -1;
}

function actualizarPrecio() {
  let auto = prompt("Ingrese el auto a actualizar");
  let indice = buscarAuto(auto);

  if (indice >= 0) {
    let nuevo_valor = prompt("Ingrese un nuevo valor");
    arreglo_autos[indice].setPrecio(nuevo_valor);
    alert("Ahora la lista es: \n" + mostrar_stock());
  } else {
    alert("No ingresaste un auto valido");
  }
}

function mostrar_stock() {
  let stock = "";
  for (let i = 0; i < arreglo_autos.length; i++) {
    stock += "\n" + arreglo_autos[i].mostrar_descripcion_completa();
  }
  return stock;
}

function mostrar_stock2() {
  let stock = "";
  for (const a of arreglo_autos) {
    stock += "\n" + a.mostrar_descripcion_completa();
  }
  return stock;
}
