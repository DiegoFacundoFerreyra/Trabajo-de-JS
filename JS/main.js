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
      this.precio
    );
  }
}
