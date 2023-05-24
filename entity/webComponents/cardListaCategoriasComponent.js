import '../../boundary/webComponents/cardFetchComponent.js'; 
import { html, render } from "../../LIB/lit-html.js";
class cardListaCategoriasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.src = "https://i.pinimg.com/564x/a5/71/74/a571741063f7b6e354d67fba4db8d517.jpg";
    // Resto del código del constructor...
  }

  //Manda a llamar el componente cardFetchComponent.js y 
  connectedCallback() {
    // Esperar a que se cargue completamente el contenido de la página
    document.addEventListener("DOMContentLoaded", () => {
      // Obtener una referencia al componente CardFetch
      const cardFetchComponent = document.querySelector("card-fetch");
  
      if (cardFetchComponent) {
        // Escuchar el evento personalizado 'data-updated' del componente CardFetch
        cardFetchComponent.addEventListener('data-updated', (event) => {
          // Obtener los datos del evento
          const data1 = event.detail.data1;
          const data2 = event.detail.data2;
  
          // Asignar los datos a las propiedades del componente CardComponent
          this.data = data1;
          this.data2 = data2;
  
          // Renderizar el componente
          this.render();
        });
      }
    });
  }

  
  getCategorias() {
    const categorias = [];
    const urlImagenes = new Map();
    if (this.data2) {
      this.data2.forEach(item => {
        const categoria = item.nombre;
        const comentarios = item.comentarios;
        if (categoria && comentarios && comentarios) {
          categorias.push({ categoria, imagen: comentarios });
        }
      });
    }
    return categorias;
  }

  // Mostrar categorias en orden alfabetico
  getCategoriasOrdenadas() {
    const categorias = this.getCategorias();
    categorias.sort((a, b) => a.categoria.localeCompare(b.categoria));
    return categorias;
  }


  render() {
    render(
      html`
      <style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Crea 3 columnas de igual ancho */
    grid-gap: 10px; /* Espacio entre las celdas */
  }

  .grid-item {
    background-color: #FFFFFF;
    padding: 10px;
  }

  .grid-item:last-child {
    grid-column-start: 3; /* La última celda comenzará en la columna 3 */
  }

  .grid-itemFinally {
    grid-column-start: 3; /* El cardOne comenzará en la columna 3 */
  }
  .cardOne {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    border-radius: 14px;
    background-color: #0D258F; /* Color de fondo principal donde va el nombre de la categoria*/
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Borde sombreado alrededor */
  }

  .cardOne:hover {
    transform: scale(1.05); /* Efecto de escala al pasar el cursor */
  }

  .cardOne::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2); /* Color de superposición */
    mix-blend-mode: overlay;
    pointer-events: none;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  .cardOne:hover::before {
    opacity: 1; /* Opacidad de la superposición al pasar el cursor */
  }

  .cardOne img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 10px;
    filter: brightness(0.9); /* Nivel de brillo de la imagen */
  }

  .cardOne h1 {
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
    color: #fff; /* Color del texto */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Sombra del texto */
  }

  .card-content {
    padding: 16px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .grid-container2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    justify-content: flex-end; 
  }
  
  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .cardOne {
    width: 100%;
    text-align: left;
  }

  .cardOne2 {
    width: 100%;
    text-align: left;
  }
  
  
  .tarjeta {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }

  #scrollContainer {
    max-height: 600px; /* Altura máxima del contenedor con desplazamiento */
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #888888 #f1f1f1;
  }
  

  /* Estilo personalizado para la barra de desplazamiento */
  #scrollContainer::-webkit-scrollbar {
    width: 8px;
  }
  
  #scrollContainer::-webkit-scrollbar-thumb {
    background-color: #888888;
  }
  
  #scrollContainer::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
</style>




    
        <div class="grid-container2">
          ${this.data2 && this.data2.length >= 6 ? html`
            <div class="grid-item grid-itemFinally">
              <div class="cardOne" onclick="mostrarCategorias()">
                <div></div>
                <img src="${this.src}" alt="Imagen de la tarjeta" class="tarjeta" />
                <h1>Todas las Categorias</h1>
              </div>
            </div>
          ` : html``}
        </div>

        
        <div id="scrollContainer">
        <div class="grid-container">
        ${this.comerciosFiltrados && this.nombresComercios && this.urldescripcion? html`
        ${this.comerciosFiltrados.map(({ nombre, descripcion }, index) => {
          const nombreComercio = this.nombresComercios[index];
          const url = this.urldescripcion[index];
          
          return html`
            <div class="grid-item">
              <div class="cardOne">
                <div></div>
                <img src="${url}" alt="Imagen de la tarjeta" class="tarjeta" />
                <h1>${nombreComercio}</h1>
                <ul>
                  <!-- Agrega aquí los detalles adicionales del comercio si deseas -->
                </ul>
              </div>
            </div>
          `;
        })}
        ` : html``}
        </div>
        </div>
        
      `,
      this.shadowRoot
    );
  }
}

window.mostrarCategorias = function () {
  const cardComponent = document.querySelector("cards-lista-categorias");
  if (cardComponent) {
    const categorias = cardComponent.getCategoriasOrdenadas();

    const categoriasContainer = document.createElement("div");
    categoriasContainer.classList.add("grid-container");

    categorias.forEach((categoriaObj, index) => {
      const cardOne = document.createElement("div");
      cardOne.classList.add("cardOne");

      const nombreCategoria = document.createElement("h1");
      nombreCategoria.textContent = categoriaObj.categoria;

      const imagenCategoria = document.createElement("img");
      imagenCategoria.src = categoriaObj.imagen;

      // Agregar evento onclick para almacenar la categoría
      cardOne.addEventListener("click", () => {
        almacenarCategoria(categoriaObj.categoria);
      });

      cardOne.appendChild(imagenCategoria);
      cardOne.appendChild(nombreCategoria);

      categoriasContainer.appendChild(cardOne);
    });

    const container = document.getElementById("categorias-container");
    container.innerHTML = "";
    container.appendChild(categoriasContainer);
  }
};

function almacenarCategoria(categoria) {
  const cardComponent = document.querySelector("cards-lista-categorias");
  const comerciosFiltrados = cardComponent.data.filter(comercio => comercio.tipoComercio.nombre === categoria);
  
  // Ordenar los comercios alfabéticamente por nombre
  comerciosFiltrados.sort((a, b) => a.comercio.nombre.localeCompare(b.comercio.nombre));
  
  const nombresComercios = comerciosFiltrados.map(data1 => data1.comercio.nombre);
  const urldescripcion = comerciosFiltrados.map(data1 => data1.comercio.descripcion);
  cardComponent.comerciosFiltrados = comerciosFiltrados;
  cardComponent.nombresComercios = nombresComercios;
  cardComponent.urldescripcion = urldescripcion;
  cardComponent.render();
  console.log(comerciosFiltrados);
  console.log(nombresComercios);
  console.log(urldescripcion);
}


//funcion para mostrar comercios 




customElements.define("cards-lista-categorias", cardListaCategoriasComponent);