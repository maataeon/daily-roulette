import { Item } from "../models/Item";
import { querySelector } from "../utils";
import { pushAlert } from "./alertMsg";
import { logTimeAndName } from "./log";
import { dibujarNombreSeleccionado, drawWheel } from "./wheel";

const inputPalabras = querySelector('#itemInput') as HTMLInputElement;
const addItemButton = querySelector('#addItem-button') as HTMLButtonElement;
const itemListElement = querySelector('#itemList') as HTMLDivElement;
const saveAsDefaultButton = querySelector('#saveAsDefault') as HTMLButtonElement;


let options: Item[] = [];
let selectedItem: Item | null;
let nombres: string[] | null;
const defaultNameJSON = `{
  "items":[
     "default",
     "empty"
  ]
}`;

export const getItems = () => options;

export const getItem = (index: number): Item => options[index];

export const setSelectedItem = (item: Item) => selectedItem = item;

export const getSelectedItem = () => selectedItem

const getItemElements = () => [].slice.call(itemListElement.children);

const addItem = (valor: string) => {
  const name = valor.toUpperCase();
  const item = new Item(name);
  options.push(item);
  item.element.onclick = () => {
    deleteItem(item);
    drawWheel();
    dibujarNombreSeleccionado();
  };
  itemListElement.appendChild(item.element);
};


export const deleteItem = async (item: Item) => {
  item.element.remove();
  options = options.filter(i => i.id != item.id)
};

export const disableItems = () => getItemElements().forEach(
  (item: HTMLButtonElement) => item.disabled = true
);

export const enableItems = () => getItemElements().forEach(
  (item: HTMLButtonElement) => item.disabled = false
);

export const loadInitialItems = () => {
  nombres?.forEach((nombre) => {
    addItem(nombre);
  });
}

export const finishSelectedItem = () => {
  if (selectedItem) {
    logTimeAndName(selectedItem);
    selectedItem = null;
  }
}

inputPalabras.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItemButton.click();
  }
});
inputPalabras.addEventListener("keyup", function (event) {
  addItemButton.disabled = !(event.target as HTMLInputElement).value.trim();
});

addItemButton.addEventListener("click", () => {
  if (inputPalabras.value != "" && getItems().length < 60) {
    let names = inputPalabras.value.split(",");
    names.forEach((name) => {
      if (name.length > 0) {
        addItem(name);
      }
    });
    drawWheel();
    dibujarNombreSeleccionado();
    inputPalabras.value = "";
  } else if (getItems().length == 60) {
    pushAlert("you reached the items limit")
  }
});

saveAsDefaultButton.addEventListener("click", () => {
  const namesArray = getItems().map(item => item.name);
  console.log({namesArray});
  localStorage.setItem("defaultNames", JSON.stringify({ items: namesArray}));
  pushAlert("saved 👍")
});

export const initItemList = () => {
  const defaultNames = JSON.parse(localStorage.getItem("defaultNames") ?? defaultNameJSON);
  nombres = defaultNames.items;
  loadInitialItems();
}