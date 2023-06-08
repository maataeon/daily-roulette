import { Item } from "../models/item";
import { querySelector, toInt } from "../utils";
import { dibujarNombreSeleccionado, dibujarRuleta } from "./roulette";

const inputPalabras = querySelector('#inputPalabras') as HTMLInputElement;
const botonAgregarPalabras = querySelector('#botonAgregarPalabras') as HTMLButtonElement;
const listaPalabras = querySelector('#lista-palabras') as HTMLDivElement;

const randomColorOffset = Math.trunc(Math.random() * 147);

let options: Item[] = [];
let selectedItem: Item;
let colorPallete: any[];
const nombres = ["Juli", "Mati-S", "Dami", "Eze", "Maat", "Jose", "Gabi", "Mauricio", "Martin-F", "Agustin-J", "Gabriela", "Lucas", "Cele", "Mati-M", "Juli-M", "Dami-S", "Eze-G", "Diego"
];
const emojiFaces = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "👽", "👾", "🤖", "🎃"];

export const getItem = (index: number): Item => {
  return options[index];
};

export const getItems = () => {
  return options;
};

export const setSelectedItem = (item: Item) => selectedItem = item;

export const getSelectedItem = () => selectedItem

const getEmoji = () => {
  const emoji = emojiFaces[toInt(Math.abs(Math.random() * emojiFaces.length * 3)) % emojiFaces.length]
  return emoji;
};
export const getItemColor = (index: number) => {
  return colorPallete[index % colorPallete.length];
};

const createItemElement = (item: Item) => {
  const itemElement = document.createElement("div");
  itemElement.id = item.id;
  itemElement.className = "nombre";
  itemElement.innerHTML = `
    <div class="name-icon">${item.emoji}</div>
    <div class="name-text">${item.name}</div>
  `;
  itemElement.onclick = () => {
    deleteItem(item);
    dibujarRuleta();
    dibujarNombreSeleccionado();
  };
  return itemElement;
};

const addItem = (valor: string) => {
  const emoji = getEmoji();
  const name = valor.toUpperCase();
  const item = new Item(name, emoji);
  options.push(item);
  listaPalabras.appendChild(createItemElement(item));
};

export const deleteItem = async (item: Item) => {
  const itemsElements = [].slice.call(listaPalabras.children);
  const li = itemsElements.find((li: HTMLLIElement) => {
    return li.id == item.id;
  }) as HTMLLIElement | undefined;;

  if (li !== undefined) {
    const index = options.findIndex(i => i.id == item.id);
    console.log({ index });
    if (index > -1) {
      options.splice(index, 1);
      colorPallete.splice(index, 1);
    }
    listaPalabras.removeChild(li);
  } else {
    console.error({ message: 'li not found' })
  }
};


const shiftPositions = (arr: any[], offset: number) => {
  let shifted = [];
  for (let i = 0; i < arr.length; i++) {
    shifted.push(arr[(i + offset) % arr.length]);
  }
  return shifted;
};

const createColorPallete = (max: number) => {
  const initialOffset = Math.random() * 255;
  let colors = [];
  for (let acc = 0, n = 0; n < max; n += 1) {
    colors.push(`hsla(${(initialOffset + acc) % 360}deg, 69%, ${Math.random() * 20 + 50}%, 0.5)`);
    acc += toInt(Math.random() * 50 + 10);
  }
  return colors;
};
export const buildColorPallete = () => {
  colorPallete = shiftPositions(
    createColorPallete(nombres.length),
    randomColorOffset
  );
};

export const loadInitialItems = () => {
  nombres.forEach((nombre) => {
    addItem(nombre);
  });
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
    buildColorPallete();
    dibujarRuleta();
    dibujarNombreSeleccionado();
    inputPalabras.value = "";
  }
});

export const initItemList = () => {
  buildColorPallete();
  loadInitialItems();
}