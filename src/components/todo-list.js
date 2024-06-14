const template = document.createElement("template");

template.innerHTML = `
  <div class="container">
    <h1 id="title"></h1>
    <input type="text" id="new-todo-input" placeholder="">
    <button id="add-todo-button">Add</button>
    <ul id="todo-list"></ul>
  </div>

  <style>
    .container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      margin: 10px;
      color: black;
    }

    #title {
      margin-top: 0px;
    }

    #new-todo-input {
      background-color: #fff;
      color: black;
      padding: 10px;
      margin-right: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    #add-todo-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    #todo-list {
      list-style-type: none;
      padding: 0;
    }

    #todo-list li {
      background-color: #fff;
      color: black;
      margin: 5px 0;
      padding: 10px;
      border: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .delete-todo-button {
      background-color: red;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
  </style>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.$todoTitle = shadowRoot.querySelector("#title");
    this.$newTodoInput = shadowRoot.querySelector("#new-todo-input");
    this.$todoList = shadowRoot.querySelector("#todo-list");
    this.$addTodoButton = shadowRoot.querySelector("#add-todo-button");

    this.$addTodoButton?.addEventListener("click", () => this.tryToAddTodo());
  }

  tryToAddTodo() {
    const newTodoText = this.$newTodoInput.value.trim();

    if (newTodoText === "") {
      alert("Please enter a task!");
      return;
    }

    this.addTodo(newTodoText);

    this.$newTodoInput.value = "";
  }

  addTodo(newTodoText) {
    const newTodo = document.createElement("li");
    newTodo.innerText = newTodoText;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add("delete-todo-button");
    deleteButton.addEventListener("click", () => {
      this.$todoList.removeChild(newTodo);
    });

    newTodo.appendChild(deleteButton);
    this.$todoList.appendChild(newTodo);
  }

  get todoTitle() {
    return this.getAttribute("todoTitle") || "Title";
  }

  set todoTitle(value) {
    this.setAttribute("todoTitle", value);
  }

  get placeholder() {
    return this.getAttribute("placeholder") || "Placeholder";
  }

  set placeholder(value) {
    this.setAttribute("placeholder", value);
  }

  get todos() {
    return JSON.parse(this.getAttribute("todos") || "[]");
  }

  set todos(value) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  static get observedAttributes() {
    return ["todoTitle", "placeholder", "todos"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.$todoTitle.innerText = this.todoTitle;
    this.$newTodoInput.placeholder = this.placeholder;
    this.$todoList.innerHTML = "";
    this.todos.forEach((todo) => {
      this.addTodo(todo);
    });
  }
}

window.customElements.define("todo-list", TodoList);
