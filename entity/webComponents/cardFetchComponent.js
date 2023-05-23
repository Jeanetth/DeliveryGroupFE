class CardFetchComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.categoria = "comida";

      this.data1 = null;
      this.data2 = null;
    }
  
    connectedCallback() {
      this.loadData();
    }
  
    async loadData() {
      try {
        const response1 = await fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/comercio_tipocomercio/all");
        const response2 = await fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/tipocomercio/all");
        if (response1.ok && response2.ok) {
          this.data1 = await response1.json();
          this.data2 = await response2.json();
          console.log(this.data1);
          console.log(this.data2);
          
          const event = new CustomEvent('data-updated', { detail: { data1: this.data1, data2: this.data2 } });
          this.dispatchEvent(event);
          
          this.render();
        } else {
          throw new Error("Error al obtener los datos de uno o ambos servicios REST");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }
  
    render() {
      // Implementa la lógica de renderizado aquí
      // Puedes acceder a this.data1, this.data2, this.categoria, this.src para mostrar los datos en el componente
      // Utiliza this.shadowRoot para renderizar el contenido en el shadow DOM
    }
  }
  
  customElements.define('card-fetch', CardFetchComponent);
  