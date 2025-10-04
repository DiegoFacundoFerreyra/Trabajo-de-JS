/* Clase que modela y define las bicicletas */
const contenedorTarjetas = document.getElementsByClassName("hijos");

function crearTarjetasProductos(productos) {
  productos.forEach((producto) => {
    const nuevaBici = document.createElement("div");
    nuevaBici.classList = "tarjeta-producto";
    nuevaBici.innerHTML = ` 
      <div class="foto-producto">
        <img src="../img/montaña.png/${producto.id}.png" />
        <h3 class="bicicleta">${producto.clase}</h3>
        <p class="precio">${producto.precio.toLocaleString()}</p>
        <button class="seleccion">Seleccionar</button>`;

    contenedorTarjetas.appendChild(nuevaBici);
  });
}

crearTarjetasProductos(productos);

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
const velocidad = 8;

function moverG() {
  x += velocidad;
  gif.style.left = x + "px";
  if (x > window.innerWidth) {
    x = -200; // Reiniciar la posición al salir de la pantalla
  }
  requestAnimationFrame(moverG);
}
moverG();
// Clase Bicicleta
let respuesta = true;
while (respuesta != "5" && respuesta) {
  respuesta = mostrarMenu();
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
