import { LitElement, html, css } from 'lit';

export class SellItemLit extends LitElement {
  static get properties() {
    return {
      imgUrl: { type: String, attribute: 'image' },
      itemTitle: { type: String },
      discountPrice: { type: String },
      normalPrice: { type: String },
      discount: { type: String },
      rating: { type: String }
    };
  }

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        color: black;
        margin: 10px;
        border-radius: 5px;
        overflow: hidden;
      }
      .image {
        width: 200px;
        height: 200px;
        object-fit: cover;
        margin: 0px;
      }
      .item-title, .rating {
        width: 200px;
        height: 40px;
        margin-top: 0px;
        padding: 0px;
        margin-bottom: 10px;
      }
      .prices-discount-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 200px;
        height: 20px;
        margin-bottom: 10px;
      }
      .prices {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: 20px;
        margin-left: 5px;
      }
      .discount-price {
        font-weight: bold;
        margin: 0px;
        color: blue;
      }
      .normal-price {
        margin: 0px;
      }
      .discount {
        background-color: #7d0505;
        border-radius: 5px;
        color: white;
        padding: 0px 5px;
        margin-right: 5px;
      }
    `;
  }

  constructor() {
    super(); // Llama al constructor de la clase padre (que es LitElement)
    this.imgUrl = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg';
    this.itemTitle = 'Title Lit';
    this.discountPrice = '79.990';
    this.normalPrice = '175.990';
    this.discount = '55';
    this.rating = '4.5';
  }

  render() {
    console.log("Rendering image with URL:", this.imgUrl); 
    return html`
      <div class="container">
        <img class="image" src="${this.imgUrl}" alt="Item Image">
        <p class="item-title">${this.itemTitle}</p>
        <div class="prices-discount-container">
          <div class="prices">
            <p class="discount-price">$${this.discountPrice}</p>
            <p class="normal-price">Normal: <s>$${this.normalPrice}</s></p>
          </div>
          <div class="discount">-${this.discount}%</div>
        </div>
        <div>
          <p class="rating">⭐ ${this.rating}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('sell-item-lit', SellItemLit);
