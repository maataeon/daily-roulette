import { Item } from "../models/Item";
import { disableButtonTemporarily, querySelector } from "../utils";
import { pushAlert } from "./alertMsg";
import { logTimeAndName } from "./log";
import state, { saveItems, storeObject } from "./store";
import { dibujarNombreSeleccionado, drawWheel } from "./wheel";

const inputPalabras = querySelector('#itemInput') as HTMLInputElement;
const addItemButton = querySelector('#addItem-button') as HTMLButtonElement;
const itemListElement = querySelector('#itemList') as HTMLDivElement;
const saveAsDefaultButton = querySelector('#saveAsDefault') as HTMLButtonElement;
const copyList = querySelector('#copyList') as HTMLButtonElement;

let options: Item[] = [];
let selectedItem: Item | null;
let nombres: string[];
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
    if (options.length > 1) {
      deleteItem(item);
      drawWheel();
      dibujarNombreSeleccionado();
    } else {
      pushAlert("must exist at least one name");
    }
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
  disableButtonTemporarily(saveAsDefaultButton);
  const namesArray = getItems().map(item => item.name);
  console.log({ namesArray });
  state.items = namesArray;
  saveItems(namesArray);
  pushAlert("saved 👍");
});

copyList.addEventListener("click", () => {
  const namesArray = getItems().map(item => item.name).join(",");
  navigator.clipboard.writeText(namesArray)
    .then(() => {
      pushAlert("copied to clipboard !")
    })
    .catch(() => {
      pushAlert("copy failed")
    });
});

export const initItemList = () => {
  nombres = state.items;
  loadInitialItems();
}