import "./style.css";
import javascriptLogo from "./javascript.svg";
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

// function renderInitPage() {
//   document.querySelector("#app").innerHTML = `
//     ${renderColorButtons()}

//     <p class="title">
//       Soy un texto con clase "title" del DOM Principal! Soy ... (Presiona un botón)
//     </p>
//       `;
//   applyTitleColor();
// }

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

    <my-button id="reset-todos" label="Change todos" no-padding></my-button>
    <todo-list
      id="todo-list"
      todoTitle="My Todos"
      placeholder="What needs to be done?"
      todos='["first todo", "second todo", "third todo", "fourth todo"]'
    ></todo-list>
    ${renderColorButtons()}

    <p class="title">
      Soy un texto con clase "title" del DOM Principal! Soy ... (Presiona un botón)
    </p>
  `;
  document.querySelector("#reset-todos")?.addEventListener("click", () => {
    const sellItemJs = document.querySelector("#javascript");
    sellItemJs.rating = "1.0";

    const todoList = document.querySelector("#todo-list");
    todoList.todos = ["first todo (button pressed)", "second todo (button pressed)"];
  });
  applyTitleColor();
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

  ${renderColorButtons()}

  <p class="title">
    Soy un texto con clase "title" del DOM Principal! Soy ... (Presiona un botón)
  </p>
`;
  applyTitleColor();
}

document.querySelector("navbar-lit").addEventListener("navigate", (e) => {
  if (e.detail === "vanilla") {
    renderVanillaPage();
  } else if (e.detail === "lit") {
    renderLitPage();
  }
});

applyTitleColor();
renderVanillaPage();
