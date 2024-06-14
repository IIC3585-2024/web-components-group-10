import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import "./src/components/button-test.js";
import "./src/components/sell-item.js";
import "./src/components/sell-itemLit.js"
import "./src/components/todo-list.js";


document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <my-button id="counter" label="Change other components"></my-button>
      </div>
      <div style="display: flex;">
      <sell-item></sell-item>
      <sell-item
        id="javascript"
        imgUrl="${javascriptLogo}"
        itemTitle="JavaScript"
        discountPrice="1.500"
        normalPrice="2.000"
        discount="25"
        rating="4.0"
      >
      </sell-item>
    </div>

    <div style="display: flex;">
    <sell-item-lit></sell-item-lit>
    <sell-item-lit
        image="${javascriptLogo}"
        itemTitle="JavaScript Lit"
        discountPrice="1.500"
        normalPrice="2.000"
        discount="25"
        rating="4.0"
      >
      </sell-item-lit>
    </div>


    <my-button id="reset-todos" no-padding></my-button>
    <todo-list
      id="todo-list"
      todoTitle="My Todos"
      placeholder="What needs to be done?"
      todos='["first todo", "second todo"]'
    ></todo-list>

    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>

  
`;

setupCounter(document.querySelector("#counter"));
document.querySelector("#reset-todos")?.addEventListener("click", () => {
  const sellItemJs = document.querySelector("#javascript");
  sellItemJs.rating = "1.0";

  const todoList = document.querySelector("#todo-list");
  todoList.todos = ["first todo (button pressed)", "second todo (button pressed)"];
  todoList.placeholder = "new placeholder";
});
