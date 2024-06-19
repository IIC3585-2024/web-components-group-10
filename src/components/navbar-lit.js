//Navbar hecha con ayuda de ChatGpt
import { LitElement, html, css } from "lit";

export class NavbarLit extends LitElement {
  static get styles() {
    return css`
      .navbar {
        display: flex;
        background-color: #333;
        overflow: hidden;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
      }

      .navbar a {
        flex: 1;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }

      .navbar a:hover {
        background-color: #ddd;
        color: black;
      }
    `;
  }

  render() {
    return html`
      <div class="navbar">
        <a href="#" @click="${this.showVanillaPage}">Vanilla Components</a>
        <a href="#" @click="${this.showLitPage}">Lit Components</a>
      </div>
    `;
  }

  showVanillaPage(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("navigate", { detail: "vanilla" }));
  }

  showLitPage(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("navigate", { detail: "lit" }));
  }
}

customElements.define("navbar-lit", NavbarLit);
