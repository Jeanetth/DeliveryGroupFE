
import '../../boundary/webComponents/cardFetchComponent.js'; 
import { html, render } from "../../LIB/lit-html.js";
import { getCategoriasPopulares } from '../../control/webComponents/CategoriasPopulares.js'; 
class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.src = "https://i.pinimg.com/564x/a5/71/74/a571741063f7b6e354d67fba4db8d517.jpg";
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
          const data3 = event.detail.data3;
          const data4 = event.detail.data4;
  
          // Asignar los datos a las propiedades del componente CardComponent
          this.data = data1;
          this.data2 = data2;
          this.data3 = data3;
          this.data4 = data4;
          // Renderizar el componente
          this.render();
        });
      }
    });
  }

//muestra las 6 categorias mas populares(las que mas comercios tiene)

  render() {
    const categoriasPopulares = getCategoriasPopulares(this.data);
    render(
      
      html`
      
      <!-- OBTENEMOS EL CSS DE BOUNDARY/WEBCOMPONENTS-->
      <link rel="stylesheet" href="boundary/webComponents/stilospaginaprincial.css">

<!-- MOSTRAR CATEGORIAS POPULARES -->
      <div class="grid-container">
      
      ${this.data && this.data2 ? html`
      
        ${categoriasPopulares.map((categoria, index) => {
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
    <br>


    <!-- CARD ONE (BOTON DE TODAS LAS CATEGORIAS) -->
    <div class="grid-container2">
    ${this.data2 && this.data2? html`
      <div class="grid-item grid-itemFinally">
        <div class="cardOne" onclick="mostrartodaslascategorias()">
          <div></div>
          <img src="${this.src}" alt="Imagen de la tarjeta" class="tarjeta" />
          <h1>Todas las Categorias</h1>
        </div>
      </div>
    ` : html``}
  </div>


  <!-- OBTIENE TODAS LAS CATEGORIAS -->
  <div class="containerSelect">
  <div id="messageContainer">
    <p>Todas</p>
  </div>
  <div class="dropdown">
  <select onclick="mostrarcomercios(this.value)">
    ${this.tiposcomercios && this.tiposcom && this.urlcomen ? html`
      ${this.tiposcomercios.map(({ nombre, descripcion }, index) => {
        const categoria = this.tiposcom[index];
        const urlTP = this.urlcomen[index];

        return html`
        
          <option value="${categoria}">${categoria}</option>
        `;
      })}
    ` : html``}
  </select>
  </div>
</div>
<br><br><br>

    <!-- OBTIENE TODOS LOS COMERCIOS SEGUN LA CATEGORIA SELECCIONADA -->

    <div id="scrollContainer">
    <div id="messageContainer"><p>COMERCIOS</p></div>
    <div class="grid-container">
      ${this.comerciosFiltrados && this.nombresComercios && this.urldescripcion? html`
        ${this.comerciosFiltrados.map(({ nombre, descripcion }, index) => {
          const nombreComercio = this.nombresComercios[index];
          const url = this.urldescripcion[index];
          
          return html`
            <div class="grid-item">
              <div class="cardOne">
                <div></div>
                <img src="${url}" alt="Imagen de la tarjeta" class="tarjeta" onclick="mostrarproductos('${nombreComercio}')"  />
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
  

  <!-- OBTIENE TODOS LOS PRODUCTOS DE UN COMERCIO SELECCIONADO-->

  <div id="scrollContainer">
  <div id="messageContainer"><p>PRODUCTOS</p></div>
    <div class="grid-container">
      ${this.productosFiltrados && this.nombresProductos && this.urldescripcionP? html`
        ${this.productosFiltrados.map(({ nombre, descripcion }, index) => {
          const nombreProducto = this.nombresProductos[index];
          const url = this.urldescripcionP[index];
          
          return html`
            <div class="grid-item">
              <div class="cardOne">
                <div></div>
                <img src="${url}" alt="Imagen de la tarjeta" class="tarjeta" )"  />
                <h1>${nombreProducto}</h1>
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


  <!-- OBTIENE LAS SUCURSALES -->

  <div class="containerSelect">
  <div id="messageContainer">
    <p>SUCURSALES</p>
  </div>
  <div class="dropdown">
  <select onchange="redirectToUrl(this)">
      ${this.sucursalesFiltradas && this.nombreSucursal && this.linkSucursal ? html`
        ${this.sucursalesFiltradas.map(({ nombre, pathLogo }, index) => {
          const nombreSU = this.nombreSucursal[index];
          const urlSU = this.linkSucursal[index];
          
          return html`
            <option value="${urlSU}">${nombreSU}</option>
          `;
        })}
      ` : html``}
    </select>
  </div>
</div>

 
  `,
  this.shadowRoot);
}
}


window.mostrartodaslascategorias = function () {
  const cardComponent = document.querySelector("cards-one");
  const tiposcomercios = cardComponent.data2.filter(tipo => tipo.nombre );
  
  // Ordenar los comercios alfabéticamente por nombre
  tiposcomercios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
  const tiposcom = tiposcomercios.map(data2 => data2.nombre);
  const urlcomen= tiposcomercios.map(data2 => data2.comentarios);
  cardComponent.tiposcomercios = tiposcomercios;
  cardComponent.tiposcom = tiposcom;
  cardComponent.urlcomen = urlcomen;
  cardComponent.render();
  console.log(tiposcomercios);
  console.log(tiposcom);
  console.log(urlcomen);
};



window.mostrarcomercios = function (categoria) {
  const cardComponent = document.querySelector("cards-one");
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
};


//funcion para mostrar productos de los comercios 
window.mostrarproductos = function (nombreComercio) {
  const cardComponent = document.querySelector("cards-one");
  const productosFiltrados = cardComponent.data3.filter(comercioproductos => comercioproductos.comercio.nombre === nombreComercio);
  const sucursalesFiltradas =cardComponent.data4.filter(sucursales => sucursales.idComercio.nombre === nombreComercio);

  // Ordenar los comercios alfabéticamente por nombre
  productosFiltrados.sort((a, b) => a.comercio.nombre.localeCompare(b.comercio.nombre));
  sucursalesFiltradas.sort((a, b) => a.nombre .localeCompare(b.nombre));
  
  const nombresProductos = productosFiltrados.map(data3 => data3.producto.nombre);
  const urldescripcionP = productosFiltrados.map(data3 => data3.producto.descripcion);
  const nombreSucursal =sucursalesFiltradas.map(data4 => data4.nombre)
  const linkSucursal =sucursalesFiltradas.map(data4 => data4.pathLogo)

  cardComponent.productosFiltrados = productosFiltrados;
  cardComponent.sucursalesFiltradas = sucursalesFiltradas;
  cardComponent.nombresProductos = nombresProductos;
  cardComponent.urldescripcionP = urldescripcionP;
  cardComponent.nombreSucursal = nombreSucursal;
  cardComponent.linkSucursal = linkSucursal;

  cardComponent.render();
  console.log(productosFiltrados);
  console.log(sucursalesFiltradas);
  console.log(nombresProductos);
  console.log(urldescripcionP);
  console.log(nombreSucursal);
  console.log(linkSucursal);
};

//funcion para mandar que direccionar al waze
window.redirectToUrl = function(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const encodedUrl = selectedOption.value;
  const url = decodeURIComponent(encodedUrl);
  window.open(url, '_blank');
}





customElements.define("cards-one", CardComponent);