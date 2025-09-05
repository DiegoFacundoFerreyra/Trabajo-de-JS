/* Clase que modela y define las bicicletas */
class Bicis {
  /**
   *
   * @param {*} id
   * @param {*} clase
   * @param {*} rodado
   * @param {*} precio
   */

  constructor(id, clase, rodado, precio) {
    this.id = id;
    this.clase = clase;
    this.rodado = rodado;
    this.precio = precio;
  }
  /*FUNCION PARA MOSTRAR LA DESCRIPCION COMPLETA DE LA BICI */
  /**
   *
   * @returns
   */
  mostrarDescripcionCompleta() {
    return (
      "#" +
      this.id +
      " - " +
      this.clase +
      " Rodado: " +
      this.rodado +
      " $ " +
      this.precio
    );
  }

  getId() {
    return this.id;
  }
  setId(nuevo_id) {
    this.id = nuevo_id;
  }
  getClase() {
    return this.clase;
  }
  setClase(nueva_clase) {
    this.clase = nueva_clase;
  }
  getRodado() {
    return this.rodado;
  }
  setRodado(nuevo_rodado) {
    this.rodado = nuevo_rodado;
  }
  getPrecio() {
    return this.precio;
  }
  setPrecio(nuevo_precio) {
    this.precio = nuevo_precio;
  }
}

//BASE DE DATOS DE LAS BIBICLETAS
const arregloBicis = new Array();
arregloBicis.push(new Bicis(1, "Carrera", 29, 500000));
arregloBicis.push(new Bicis(2, "Montaña", 28, 420000));
arregloBicis.push(new Bicis(3, "Paseo", 26, 280000));
arregloBicis.push(new Bicis(4, "Playera", 26, 200000));
arregloBicis.push(new Bicis(5, "Niños", 16, 150000));
arregloBicis.push(new Bicis(6, "Plegable", 20, 340000));
let respuesta = true;

// SI NO FUNCA, CABMBIAR EL 4 DE ABAJO POR SALIR
while (respuesta != "4" && respuesta) {
  respuesta = mostrarMenu();
}

function mostrarMenu() {
  let respuesta = prompt(
    "Elija una opcion: \n 1) Ver las bicicletas \n 2) Asignar nuevo precio \n 3) Ordenar por precio \n 4) Salir"
  );
  if (respuesta == "1") {
    alert("Las bicicletas son: \n " + mostrarStock());
  } else if (respuesta == "2") {
    actualizarPrecio();
  } else if (respuesta == "3") {
    ordenarPorPrecio();
  } else if (respuesta.toLocaleLowerCase() == "4") {
    return respuesta.toLowerCase();
  } else {
    alert("Opcion invalida");
  }
  return respuesta;
}

function buscarBici(id) {
  let i = 0;
  while (i < arregloBicis.length) {
    if (arregloBicis[i].getId() == id) {
      return i;
    }
    i++;
  }
  return -1;
}

function mostrarStock() {
  let stock = "";
  for (const b of arregloBicis) {
    stock += b.mostrarDescripcionCompleta() + "\n";
  }
  return stock;
}

//FORMA DE HACERLO DE MENOR A MAYOR
function ordenarPorPrecio() {
  arregloBicis.sort((a, b) => a.getPrecio() - b.getPrecio());
  alert("Las bicicletas ordenadas por precio son: \n" + mostrarStock());
}

//FORMA DE HACERLO DE MAYOR A MENOR
/* function ordenarPorPrecio() {
  arregloBicis.sort((a, b) => b.getPrecio() - a.getPrecio());
  alert("Las bicicletas ordenadas por precio son: \n" + mostrarStock());
} */

function actualizarPrecio() {
  let bici = prompt("Ingrese la bicicleta a actualizar");
  let indice = buscarBici(bici);
  if (indice >= 0) {
    let nuevo_precio = prompt("Ingrese un nuevo precio");
    arregloBicis[indice].setPrecio(nuevo_precio);
    alert("Ahora la lista es: \n" + mostrarStock());
  } else {
    alert("No ingresaste una bicicleta en stock");
  }
}
