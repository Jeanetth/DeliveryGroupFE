import { html,render} from "../../LIB/lit-html.js";


class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.categoria = "comida"
        this.src = "https://th.bing.com/th/id/R.e1001e86903d5fccba2a7e83a0547bd4?rik=R9kX35vI9jZpVA&riu=http%3a%2f%2fdefinicionde.hugex.net%2fwp-content%2fuploads%2f2015%2f07%2fe1001e86903d5fccba2a7e83a0547bd4.jpg&ehk=OweRpsrwB8UdJuzOCSe6VsS7uhLIyCUHifhCb7dhiSc%3d&risl=&pid=ImgRaw&r=0"
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
            background-color: rgb(179, 113, 113);
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
                <img src="${this.src}" alt="Imagen de la tarjeta">
                <h1>${this.categoria}</h1>
            </div>
        </section>`,this.shadowRoot)
    }
}
customElements.define("cards-one",CardComponent)