const template = document.createElement("template");

template.innerHTML = `
  <div class="container">
    <input type="text" id="new-todo" placeholder="Add a new task">
    <button id="add-todo-button">Add</button>
    <ul id="todo-list"></ul>
  </div>
  <style>
    .container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
    }

    #new-todo {
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

    this.$newTodoInput = shadowRoot.querySelector("#new-todo");
    this.$todoList = shadowRoot.querySelector("#todo-list");
    this.$addTodoButton = shadowRoot.querySelector("#add-todo-button");

    this.$addTodoButton?.addEventListener("click", () => this.addTodo());

    this.render();
  }

  addTodo() {
    const newTodoText = this.$newTodoInput.value.trim();

    if (newTodoText === "") {
      alert("Please enter a task!");
      return;
    }

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

    this.$newTodoInput.value = "";
  }

  render() {}
}

window.customElements.define("todo-list", TodoList);
