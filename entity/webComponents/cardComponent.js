import { html,render} from "../../LIB/lit-html";


class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.categoria="comida"
    }
    connectedCallback(){
        this.render();
    }
    render(){
        render(htmml`<section class="cards">
        <div class="cardOne">
            <img src="https://th.bing.com/th/id/R.e1001e86903d5fccba2a7e83a0547bd4?rik=R9kX35vI9jZpVA&riu=http%3a%2f%2fdefinicionde.hugex.net%2fwp-content%2fuploads%2f2015%2f07%2fe1001e86903d5fccba2a7e83a0547bd4.jpg&ehk=OweRpsrwB8UdJuzOCSe6VsS7uhLIyCUHifhCb7dhiSc%3d&risl=&pid=ImgRaw&r=0" alt="Imagen de la tarjeta" alt="primera card">
            <h1>comida</h1>
        </div>
            
    </section>`,this.shadowRoot)
    }
}
customElements.define("cards-one",CardComponent)