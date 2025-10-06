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

const contadorCarrito = document.getElementById("contador-carrito");

// Cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los botones existentes del HTML
  const botones = document.querySelectorAll(".foto-producto button");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const tarjeta = e.target.closest(".foto-producto");
      const nombre = tarjeta.querySelector("h3").textContent;
      const precioTexto = tarjeta
        .querySelector(".precio")
        .textContent.replace(/\./g, "")
        .replace("$", "");
      const precio = parseFloat(precioTexto);

      // Creamos el objeto producto
      const producto = {
        id: nombre, // podés usar un id distinto si querés
        nombre,
        precio,
        cantidad: 1,
      };

      agregarAlCarrito(producto);
    });
  });

  // Al cargar, actualizamos el contador
  actualizarContador();
});

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find((p) => p.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contadorCarrito.textContent = total;
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
