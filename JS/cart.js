// --- Referencias a elementos del DOM ---
const contenedorCarrito = document.createElement("div");
contenedorCarrito.classList.add("carrito-contenedor");
document.body.insertBefore(contenedorCarrito, document.querySelector("footer"));

const contadorCarrito = document.getElementById("contador-carrito");

// --- Mostrar carrito al cargar la página ---
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
  actualizarContador();
});

// --- Renderizar productos del carrito ---
function renderizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = `<p class="vacio">Tu carrito está vacío 🛒</p>`;
    return;
  }

  carrito.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("item-carrito");

    item.innerHTML = `
      <div class="info">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toLocaleString()}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Subtotal: $${(
          producto.precio * producto.cantidad
        ).toLocaleString()}</p>
      </div>
      <div class="acciones">
        <button class="sumar">+</button>
        <button class="restar">−</button>
        <button class="eliminar">🗑️</button>
      </div>
    `;

    contenedorCarrito.appendChild(item);

    // --- Eventos ---
    item.querySelector(".sumar").addEventListener("click", () => {
      producto.cantidad++;
      guardarYActualizar(carrito);
    });

    item.querySelector(".restar").addEventListener("click", () => {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        const index = carrito.indexOf(producto);
        carrito.splice(index, 1);
      }
      guardarYActualizar(carrito);
    });

    item.querySelector(".eliminar").addEventListener("click", () => {
      const index = carrito.indexOf(producto);
      carrito.splice(index, 1);
      guardarYActualizar(carrito);
    });
  });

  // --- Total ---
  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  const resumen = document.createElement("div");
  resumen.classList.add("resumen-carrito");
  resumen.innerHTML = `
    <hr>
    <p><strong>Total:</strong> $${total.toLocaleString()}</p>
    <button id="vaciar-carrito">Vaciar carrito</button>
  `;

  contenedorCarrito.appendChild(resumen);

  document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    renderizarCarrito();
    actualizarContador();
  });
}

// --- Guardar cambios y refrescar ---
function guardarYActualizar(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
  actualizarContador();
}

// --- Actualizar contador ---
function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contadorCarrito.textContent = total;
}
