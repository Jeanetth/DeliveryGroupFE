import { html,render} from "../../LIB/lit-html.js";


class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.categoria = "comida"
        this.src = "https://1.bp.blogspot.com/-aES0E44Jtsc/YFjDS-IU0pI/AAAAAAAACjg/u5tmvEtOD-g1xPqf9gAlaBWrywtqEsylwCLcBGAsYHQ/s1920/25790.jpg"
    }
    connectedCallback(){
        this.render();
    }
    render(){
        render(html`

        <style>
        .cardOne  {
            width: 20%;
            height: auto;
            border-radius: 14px 14px;
            background-color: rgb(246,246,68);
            cursor: pointer;
          }
          .cardOne img {
            width: 100%;
            border-radius: 10px;
            
          }
          .cardOne h1{
            text-align: center;
          }
          .card-content {
            padding: 16px;
          }
        </style>
        <section class="cards">
            <div class="cardOne">
            <div </div>
                <img src="${this.src}" alt="Imagen de la tarjeta" class="tarjeta" onclick="miFuncion()">
                <h1>${this.categoria}</h1>   
            </div>
            </section>`,this.shadowRoot)
    }
}
customElements.define("cards-one",CardComponent)