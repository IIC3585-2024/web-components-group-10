const template = document.createElement("template");

template.innerHTML = `
<div class="container">
  <img
    id="image"
    alt="Item Image"
    src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
  />
  <p id="item-title">Title</p>
  <div id="prices-discount-container">
    <div id="prices">
      <p id="discount-price">$79.990</p>
      <p id="normal-price"><s>$175.990</s></p>
    </div>
    <div id="discount">-55%</div>
  </div>
  <div>
    <p id="rating">Rating: 4.5</p>
  </div>
</div>

<style>
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

  #image {
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
    object-fit: cover;
    margin: 0px;
  }

  #item-title {
    width: 200px;
    height: 40px;
    margin-top: 0px;
    padding: 0px;
    margin-bottom: 10px;
  }

  #prices-discount-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    height: 20px;
    margin-bottom: 10px;
  }

  #prices {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 20px;
    margin-left: 5px;
  }

  #discount-price {
    font-weight: bold;
    margin: 0px;
    color: blue;
  }

  #normal-price {
    margin: 0px;
  }

  #discount {
    background-color: #7d0505;
    border-radius: 5px;
    color: white;
    padding: 0px 5px;
    margin-right: 5px;
  }

  #rating {
    width: 200px;
    height: 20px;
    background-color: #f0f0f0;
    margin-bottom: 10px;
  }
</style>
`;

class SellItem extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.$image = shadowRoot.querySelector("#image");
    this.$itemTitle = shadowRoot.querySelector("#item-title");
    this.$discountPrice = shadowRoot.querySelector("#discount-price");
    this.$normalPrice = shadowRoot.querySelector("#normal-price");
    this.$discount = shadowRoot.querySelector("#discount");
    this.$rating = shadowRoot.querySelector("#rating");
  }

  static get observedAttributes() {
    return ["imgUrl", "itemTitle", "discountPrice", "normalPrice", "discount", "rating"];
  }

  get imgUrl() {
    return (
      this.getAttribute("imgUrl") || "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
    );
  }

  set imgUrl(value) {
    this.setAttribute("imgUrl", value);
  }

  get itemTitle() {
    return this.getAttribute("itemTitle") || "Title";
  }

  set itemTitle(value) {
    this.setAttribute("itemTitle", value);
  }

  get discountPrice() {
    return this.getAttribute("discountPrice") || "79.990";
  }

  set discountPrice(value) {
    this.setAttribute("discountPrice", value);
  }

  get normalPrice() {
    return this.getAttribute("normalPrice") || "175.990";
  }

  set normalPrice(value) {
    this.setAttribute("normalPrice", value);
  }

  get discount() {
    return this.getAttribute("discount") || "55";
  }

  set discount(value) {
    this.setAttribute("discount", value);
  }

  get rating() {
    return this.getAttribute("rating") || "4.5";
  }

  set rating(value) {
    this.setAttribute("rating", value);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.$image.src = this.imgUrl;
    this.$itemTitle.innerHTML = this.itemTitle;
    this.$discountPrice.innerHTML = `$${this.discountPrice}`;
    this.$normalPrice.innerHTML = `Normal: <s>$${this.normalPrice}<s/>`;
    this.$discount.innerHTML = `-${this.discount}%`;
    this.$rating.innerHTML = `⭐ ${this.rating}`;
  }
}

window.customElements.define("sell-item", SellItem);
