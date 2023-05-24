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
        const response3 = await fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/comercio_productos/all");
        const response4 = await fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/comercio_sucursales/all");
        if (response1.ok && response2.ok && response3.ok) {
          this.data1 = await response1.json();
          this.data2 = await response2.json();
          this.data3 = await response3.json();
          this.data4 = await response4.json();
          console.log(this.data1);
          console.log(this.data2);
          console.log(this.data3);
          console.log(this.data4);
          
          const event = new CustomEvent('data-updated', { detail: { data1: this.data1, data2: this.data2, data3: this.data3, data4: this.data4 } });
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

    }
  }
  
  customElements.define('card-fetch', CardFetchComponent);
  