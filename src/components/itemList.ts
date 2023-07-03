import { Item } from "../models/Item";
import { querySelector } from "../utils";
import { pushAlert } from "./alertMsg";
import { logTimeAndName } from "./log";
import { dibujarNombreSeleccionado, dibujarRuleta } from "./roulette";

const inputPalabras = querySelector('#inputPalabras') as HTMLInputElement;
const botonAgregarPalabras = querySelector('#botonAgregarPalabras') as HTMLButtonElement;
const listaPalabras = querySelector('#lista-palabras') as HTMLDivElement;
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

const getItemElements = () => [].slice.call(listaPalabras.children);

const addItem = (valor: string) => {
  const name = valor.toUpperCase();
  const item = new Item(name);
  options.push(item);
  item.element.onclick = () => {
    deleteItem(item);
    dibujarRuleta();
    dibujarNombreSeleccionado();
  };
  listaPalabras.appendChild(item.element);
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
    botonAgregarPalabras.click();
  }
});

botonAgregarPalabras.addEventListener("click", () => {
  if (inputPalabras.value != "" && getItems().length < 60) {
    let names = inputPalabras.value.split(",");
    names.forEach((name) => {
      if (name.length > 0) {
        addItem(name);
      }
    });
    dibujarRuleta();
    dibujarNombreSeleccionado();
    inputPalabras.value = "";
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