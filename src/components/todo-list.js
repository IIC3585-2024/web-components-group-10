const template = document.createElement("template");

template.innerHTML = `
  <div class="container">
    <p>todo list</p>
  </div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("todo-list", TodoList);
