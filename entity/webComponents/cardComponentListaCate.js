import { html, render } from "../../LIB/lit-html.js";

class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.categoria = "comida";
    this.src =
      "https://1.bp.blogspot.com/-aES0E44Jtsc/YFjDS-IU0pI/AAAAAAAACjg/u5tmvEtOD-g1xPqf9gAlaBWrywtqEsylwCLcBGAsYHQ/s1920/25790.jpg";
    this.data = null; // Variable para almacenar los datos recibidos del servicio REST
  }

  connectedCallback() {
    this.loadData(); // Cargar los datos del servicio REST al iniciar el componente
  }

  async loadData() {
    try {
      const response = await fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/tipocomercio/all");
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verificar los datos devueltos en la consola
        this.data = data;
      } else {
        throw new Error("Error al obtener los datos del servicio REST");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
    this.render(); // Renderizar la vista después de cargar los datos
  }

  getCategoriasOrdenadas() {
    const categorias = this.getCategorias();
    return categorias.sort();
  }

  getCategorias() {
    const categorias = new Set();
    if (this.data) {
      this.data.forEach(item => {
        categorias.add(item.nombre);
      });
    }
    return Array.from(categorias);
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
            background-color: #ccc;
            padding: 10px;
          }

          .grid-item:last-child {
            grid-column-start: 3; /* La última celda comenzará en la columna 3 */
          }

          .grid-itemFinally {
            grid-column-start: 3; /* El cardOne comenzará en la columna 3 */
          }

          .cardOne {
            width: 100%;
            height: auto;
            border-radius: 14px 14px;
            background-color: rgb(246, 246, 68);
            cursor: pointer;
          }
          .cardOne img {
            width: 100%;
            border-radius: 10px;
          }
          .cardOne h1 {
            text-align: center;
          }
          .card-content {
            padding: 16px;
          }
        </style>
        <div class="grid-container">
          
          ${this.data && this.data.length >= 6 ? html`
            <div class="grid-item grid-itemFinally">
              <div class="cardOne" onclick="mostrarCategorias()">
                <div></div>
                <img src="${this.src}" alt="Imagen de la tarjeta" class="tarjeta" />
                <h1>Categorías</h1>
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
  const cardComponent = document.querySelector("cards-lista-categoria");
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
customElements.define("cards-lista-categoria", CardComponent);