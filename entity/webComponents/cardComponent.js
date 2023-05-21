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
      const response = await fetch("http://localhost:8080/Delivery/comerciohtml");
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verificar los datos devueltos en la consola
        this.data = data;
        this.render();
      } else {
        throw new Error("Error al obtener los datos del servicio REST");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
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
          ${this.data ? html`
            ${this.data.slice(0, 6).map((item, index) => html`
              <div class="grid-item${index === 5 ? ' grid-itemFinally' : ''}">
                <div class="cardOne">
                  <div></div>
                  <img src="${this.src}" alt="Imagen de la tarjeta" class="tarjeta" onclick="miFuncion()" />
                  <h1>${this.categoria}</h1>
                  <ul>
                    <li>
                      <strong>ID:</strong> ${item.idComercio}
                      <br>
                      <strong>Activo:</strong> ${item.activo}
                      <br>
                      <strong>Nombre:</strong> ${item.nombre}
                      <br>
                      <strong>Descripción:</strong> ${item.descripcion}
                    </li>
                    <br>
                  </ul>
                </div>
              </div>
            `)}
          ` : html``}
          ${this.data && this.data.length >= 6 ? html`
            <div class="grid-item grid-itemFinally">
              <div class="cardOne">
                <div></div>
                <img src="${this.src}" alt="Imagen de la tarjeta" class="tarjeta" onclick="miFuncion()" />
                <h1>${this.categoria}</h1>
                
              </div>
            </div>
          ` : html``}
        </div>
      `,
      this.shadowRoot
    );
  }
}

customElements.define("cards-one", CardComponent);

