import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import "./src/components/button-test.js";
import "./src/components/sell-item.js";
import "./src/components/sell-itemLit.js";
import "./src/components/todo-list.js";
import "./src/components/todo-listLit.js";
import "./src/components/navbar-lit.js";

function applyTitleColor() {
  const color = localStorage.getItem("titleColor") || "blue";
  document.documentElement.style.setProperty("--title-color", color);
  const titleElement = document.querySelector(".title");
  if (titleElement) {
    titleElement.textContent = `Soy un texto con clase "title" del DOM Principal! Soy ${color}.`;
  }
}

function setColor(color) {
  localStorage.setItem("titleColor", color);
  applyTitleColor();
}

function renderColorButtons() {
  return `
    <div>
      <button onclick="setColor('red')">Red</button>
      <button onclick="setColor('blue')">Blue</button>
      <button onclick="setColor('orange')">Orange</button>
      <button onclick="setColor('violet')">Violet</button>
    </div>
  `;
}
window.setColor = setColor;

function renderInitPage() {
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
    
    ${renderColorButtons()}

    <p class="title">
      Soy un texto con clase "title" del DOM Principal! Soy ... (Presiona un botón)
    </p>
      `;
  setupCounter(document.querySelector("#counter"));
  applyTitleColor();
}

function renderVanillaPage() {
  document.querySelector("#app").innerHTML = `
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

    <my-button id="reset-todos" no-padding></my-button>
    <todo-list
      id="todo-list"
      todoTitle="My Todos"
      placeholder="What needs to be done?"
      todos='["first todo", "second todo", "third todo", "fourth todo"]'
    ></todo-list>
  `;
  document.querySelector("#reset-todos")?.addEventListener("click", () => {
    const sellItemJs = document.querySelector("#javascript");
    sellItemJs.rating = "1.0";

    const todoList = document.querySelector("#todo-list");
    todoList.todos = ["first todo (button pressed)", "second todo (button pressed)"];
  });
}

function renderLitPage() {
  document.querySelector("#app").innerHTML = `
  
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

    <todo-list-lit
      todoTitle="My Todos Lit"
      placeholder="What needs to be done?"
      todos='["first todo Lit", "second todo Lit"]'
    ></todo-list-lit>
  </div>
`;
}

document.querySelector("navbar-lit").addEventListener("navigate", (e) => {
  if (e.detail === "vanilla") {
    renderVanillaPage();
  } else if (e.detail === "lit") {
    renderLitPage();
  } else if (e.detail === "init") {
    renderInitPage();
  }
});

applyTitleColor();
renderInitPage();
