/* Clase que modela y define las bicicletas */
class Bicis {
  constructor(id, clase, rodado, precio) {
    this.id = id;
    this.clase = clase;
    this.rodado = rodado;
    this.precio = precio;
  }

  mostrarDescripcionCompleta() {
    return (
      "#" +
      this.id +
      " - " +
      this.clase +
      " Rodado: " +
      this.rodado +
      " $ " +
      this.precio.toLocaleString("es-AR")
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

const botones = document.querySelectorAll(".seleccion");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const contenedor = boton.closest(".foto-producto");
    const resultado = contenedor.querySelector(".resultado");

    resultado.textContent = "Producto seleccionado";

    boton.style.display = "none";
  });
});

const toggleMenu = document.getElementById("toggleMenu");
const padre = document.querySelector(".padre");

toggleMenu.addEventListener("click", () => {
  padre.classList.toggle("activo");
  padre.classList.toggle("oculto");

  if (padre.classList.contains("activo")) {
    toggleMenu.textContent = "✖ CATALOGO DE BICICLETAS";
  } else {
    toggleMenu.textContent = "☰ CATALOGO DE BICICLETAS";
  }
});
// Mostrar el menú inicialmente como oculto
padre.classList.add("oculto");

const gif = document.querySelector(".gif");
let x = -200;
const velocidad = 4;

function moverG() {
  x += velocidad;
  gif.style.left = x + "px";
  if (x > window.innerWidth) {
    x = -200; // Reiniciar la posición al salir de la pantalla
  }
  requestAnimationFrame(moverG);
}
moverG();

// BASE DE DATOS DE LAS BICICLETAS
const arregloBicis = new Array();
arregloBicis.push(new Bicis(1, "Carrera", 29, 500000));
arregloBicis.push(new Bicis(2, "Montaña", 28, 420000));
arregloBicis.push(new Bicis(3, "Paseo", 26, 280000));
arregloBicis.push(new Bicis(4, "Playera", 26, 200000));
arregloBicis.push(new Bicis(5, "Niños", 16, 150000));
arregloBicis.push(new Bicis(6, "Plegable", 20, 340000));

let respuesta = true;
while (respuesta != "5" && respuesta) {
  respuesta = mostrarMenu();
}

/* function mostrarMenu() {
  let respuesta = prompt(
    "Elija una opcion:\n" +
      "1) Ver las bicicletas\n" +
      "2) Asignar nuevo precio\n" +
      "3) Ordenar por precio\n" +
      "4) Buscar por clase\n" +
      "5) Salir"
  );
 
  if (respuesta == "1") {
    alert("Las bicicletas son:\n" + mostrarStock());
  } else if (respuesta == "2") {
    actualizarPrecio();
  } else if (respuesta == "3") {
    ordenarPorPrecio();
  } else if (respuesta == "4") {
    buscarPorClase();
  } else if (respuesta.toLowerCase() == "5") {
    return respuesta.toLowerCase();
  } else {
    alert("Opción inválida");
  }
  return respuesta;
}
*/
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

// ORDENAR DE MENOR A MAYOR
function ordenarPorPrecio() {
  arregloBicis.sort((a, b) => a.getPrecio() - b.getPrecio());
  alert("Las bicicletas ordenadas por precio son:\n" + mostrarStock());
}

//FORMA DE HACERLO DE MAYOR A MENOR
/* function ordenarPorPrecio() {
  arregloBicis.sort((a, b) => b.getPrecio() - a.getPrecio());
  alert("Las bicicletas ordenadas por precio son: \n" + mostrarStock());
} */

// ACTUALIZAR PRECIO
function actualizarPrecio() {
  let bici = Number(prompt("Ingrese el ID de la bicicleta a actualizar"));
  if (isNaN(bici)) {
    alert("Debe ingresar un número válido");
    return;
  }

  let indice = buscarBici(bici);
  if (indice >= 0) {
    let nuevo_precio = Number(prompt("Ingrese un nuevo precio"));
    if (!isNaN(nuevo_precio) && nuevo_precio > 0) {
      arregloBicis[indice].setPrecio(nuevo_precio);
      alert("Ahora la lista es:\n" + mostrarStock());
    } else {
      alert("Precio inválido. Debe ser un número mayor a 0.");
    }
  } else {
    alert("No ingresaste un ID de bicicleta válido en stock");
  }
}

// BUSCAR POR CLASE
function buscarPorClase() {
  let clase = prompt("Ingrese la clase de bicicleta a buscar:").toLowerCase();
  let resultado = arregloBicis.filter(
    (b) => b.getClase().toLowerCase() === clase
  );

  if (resultado.length > 0) {
    alert(
      "Resultados:\n" +
        resultado.map((b) => b.mostrarDescripcionCompleta()).join("\n")
    );
  } else {
    alert("No se encontraron bicicletas de esa clase");
  }
}
