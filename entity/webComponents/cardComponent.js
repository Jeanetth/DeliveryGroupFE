import { html, render } from "../../LIB/lit-html.js";

class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.categoria = "comida";
    this.src ="https://i.pinimg.com/564x/b9/2b/52/b92b52dd2bb281eaa010138f1dd805dc.jpg";
    this.data = null; // Variable para almacenar los datos recibidos del servicio REST
  }

  connectedCallback() {
    this.loadData(); // Cargar los datos del servicio REST al iniciar el componente
  }

 

  async loadData() {
    try {
      const response1 = await fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/comercio_tipocomercio/all");
      const response2 = await fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/tipocomercio/all");
      if (response1.ok && response2.ok) {
        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log(data1); // Verificar los datos devueltos en la consola
        console.log(data2); // Verificar los datos devueltos en la consola
        this.data = data1;
        this.data2 = data2;
      } else {
        throw new Error("Error al obtener los datos de uno o ambos servicios REST");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
    this.render(); // Renderizar la vista después de cargar los datos
  }

  // Mostrar categorias en orden alfabetico
  getCategoriasOrdenadas() {
    const categorias = this.getCategorias();
    return categorias.sort();
  }

  //obteniendo las categorias con un foreach e ingresando al json dentro de otro json
  getCategorias() {
    const categorias = new Set();
    if (this.data2) {
      this.data2.forEach(item => {
        categorias.add(item.nombre);
      });
    }
    return Array.from(categorias);
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
</style>

    
        <div class="grid-container">
        ${this.data && this.data2 ? html`
          ${this.getCategoriasPopulares().map((categoria, index) => {
            // Obtener el objeto de la categoría correspondiente
            const categoriaObj = this.data2.find(item => item.nombre === categoria);
            // Obtener la URL de imagen desde el atributo "comentario" del objeto de la categoría
            const imageUrl = categoriaObj?.comentarios || this.src;

            return html`
              <div class="grid-item${index === 5 ? ' grid-itemFinally' : ''}">
                <div class="cardOne">
                  <div></div>
                  <img src="${imageUrl}" alt="Imagen de la tarjeta" class="tarjeta" onclick="miFuncion()" />
                  <h1>${categoria}</h1>
                  <ul>
                  
                    <br>
                  </ul>
                </div>
              </div>
            `;
          })}
        ` : html``}
          ${this.data2 && this.data2.length >= 6 ? html`
            <div class="grid-item grid-itemFinally">
              <div class="cardOne" onclick="mostrarCategorias()">
                <div></div>
                <img src="${this.src}" alt="Imagen de la tarjeta" class="tarjeta" />
                <h1>TODAS</h1>
              </div>
            </div>
          ` : html``}
        </div>
      `,
      this.shadowRoot
    );
  }
}

window.mostrarCategorias = function() {
  const cardComponent = document.querySelector("cards-one");
  if (cardComponent) {
    const categorias = cardComponent.getCategoriasOrdenadas();

    const table = document.createElement("table");
    table.classList.add("categorias-table");

    categorias.forEach(categoria => {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = categoria;
      row.appendChild(cell);
      table.appendChild(row);
    });

    const container = document.getElementById("categorias-container");
    container.innerHTML = "";
    container.appendChild(table);
  }
};
customElements.define("cards-one", CardComponent);