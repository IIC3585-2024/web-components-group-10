import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js'; 
import { repeat } from 'lit/directives/repeat.js'; //Para renderizar más eficiente porque porque ayuda a Lit a reutilizar los elementos del DOM siempre que sea posible, en lugar de destruirlos y recrearlos

export class TodoListLit extends LitElement {
    static get styles() {
        return css`
        .container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          margin: 10px;
          color: black;
        }
    
        .title {
          margin-top: 0px;
          color: red;
        }
    
        .new-todo-input {
          background-color: #fff;
          color: black;
          padding: 10px;
          margin-right: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
    
        .add-todo-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }
    
        .todo-list {
          list-style-type: none;
          padding: 0;
        }
    
        .todo-list li {
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
        `;
      }

  static get properties() {
    return {
      todos: { type: Array},
      currentInput: { type: String },
      todoTitle: { type: String },
      placeholder: { type: String }
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.currentInput = '';
    this.todoTitle = 'Todo Lit List';
    this.placeholder = 'Add a new task';
  }
  
  set todos(value) {
    const oldValue = this._todos;
    this._todos = (value || []).map(todo =>
        typeof todo === 'string' ? { text: todo, completed: false, id: Date.now() + Math.random() } : todo
    );
    this.requestUpdate('todos', oldValue);
}

get todos() {
    return this._todos;
}


  render() {
    return html`
      <div class="container">
        <h1 class="title">${this.todoTitle}</h1>
        <input class="new-todo-input" .value="${this.currentInput}" @input="${this.updateInput}" placeholder="${this.placeholder}">
        <button class="add-todo-button" @click="${this.addTodo}">Add</button>
        <ul class="todo-list">
          ${repeat(this.todos, (todo) => todo.id, (todo, index) => html`
            <li>
              ${todo.text}
              <button class="delete-todo-button" @click="${() => this.removeTodo(index)}">X</button>
            </li>
          `)}
        </ul>
      </div>
    `;
  }

  updateInput(e) {
    this.currentInput = e.target.value;
    console.log(this.currentInput);
  }

  addTodo() {
    if (this.currentInput.trim()) {
      this.todos = [...this.todos, { text: this.currentInput, completed: false, id: Date.now() }];
    }
    this.currentInput = '';

  }

  removeTodo(index) {
    this.todos = [...this.todos.slice(0, index), ...this.todos.slice(index + 1)];
  }
}

customElements.define('todo-list-lit', TodoListLit);
