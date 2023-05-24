
import './cardFetchComponent.js'; 
import { html, render } from "../../LIB/lit-html.js";
class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.src = "https://i.pinimg.com/564x/b9/2b/52/b92b52dd2bb281eaa010138f1dd805dc.jpg";
    // Resto del código del constructor...
      this.comerciosFiltrados = []; // Comercios filtrados
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

//muestra las 6 categorias mas populares(las que mas comercios tiene)
//
  getCategoriasPopulares() {
    const categoriasCount = new Map();
    if (this.data) {
      this.data.forEach(item => {
        const comercioNombre = item.tipoComercio.nombre;
        if (categoriasCount.has(comercioNombre)) {
          categoriasCount.set(comercioNombre, categoriasCount.get(comercioNombre) + 1);
        } else {
          categoriasCount.set(comercioNombre, 1);
        }
      });
    }
    const categoriasSorted = Array.from(categoriasCount.entries()).sort((a, b) => b[1] - a[1]);
    return categoriasSorted.slice(0, 6).map(entry => entry[0]);
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

  #scrollContainer {
    max-height: 600px; /* Altura máxima del contenedor con desplazamiento */
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #888888 #f1f1f1;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
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
    text-align: center;
  }
  
  .tarjeta {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
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

    
        
      <div class="grid-container">
      ${this.data && this.data2 ? html`
        ${this.getCategoriasPopulares().map((categoria, index) => {
          const categoriaObj = this.data2.find(item => item.nombre === categoria);
          const imageUrl = categoriaObj?.comentarios || this.src;

          return html`
            <div class="grid-item${index === 5 ? ' grid-itemFinally' : ''}">
              <div class="cardOne">
                <div></div>
                <img src="${imageUrl}" alt="Imagen de la tarjeta" class="tarjeta" onclick="mostrarcomercios('${categoria}')" />
                <h1>${categoria}</h1>
                <ul>
                  <!-- Agrega aquí los detalles adicionales de la categoría si deseas -->
                </ul>
              </div>
            </div>
          `;
        })}
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
  this.shadowRoot);
}
}

//funcion para mostrar comercios 
window.mostrarcomercios = function (categoria) {
  const cardComponent = document.querySelector("cards-one");
  const comerciosFiltrados = cardComponent.data.filter(comercio => comercio.tipoComercio.nombre === categoria);
  const nombresComercios = comerciosFiltrados.map(data1 => data1.comercio.nombre);
  const urldescripcion = comerciosFiltrados.map(data1 => data1.comercio.descripcion);
  cardComponent.comerciosFiltrados = comerciosFiltrados;
  cardComponent.nombresComercios = nombresComercios;
  cardComponent.urldescripcion = urldescripcion;
  cardComponent.render();
  console.log(comerciosFiltrados);
  console.log(nombresComercios);
  console.log(urldescripcion);
};


customElements.define("cards-one", CardComponent);