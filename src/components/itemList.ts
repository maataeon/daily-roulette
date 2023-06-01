import { querySelector, toInt } from "../utils";
import { dibujarNombreSeleccionado, dibujarRuleta } from "./roulette";

const inputPalabras = querySelector('#inputPalabras') as HTMLInputElement;
const botonAgregarPalabras = querySelector('#botonAgregarPalabras') as HTMLButtonElement;
const listaPalabras = querySelector('#lista-palabras') as HTMLDivElement;

const randomColorOffset = Math.trunc(Math.random() * 147);

let options: string[] = [];
let colorPallete: any[];
const nombres = ["Juli", "Mati-S", "Dami", "Eze", "Maat", "Jose", "Gabi", "Mauricio", "Martin-F", "Agustin-J", "Gabriela", "Lucas", "Cele", "Mati-M", "Juli-M", "Dami-S", "Eze-G", "Diego"
];
const emojiFaces = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "👽", "👾", "🤖", "🎃"];

export const getItem = (index: number) => {
  return options[index];
}

export const getItems = () => {
  return options;
}

const getEmoji = () => {
  const emoji = emojiFaces[toInt(Math.abs(Math.random() * emojiFaces.length * 3)) % emojiFaces.length]
  return emoji;
};
export const getItemColor = (index: number) => {
  return colorPallete[index % colorPallete.length];
};

const createItem = (emoji: string, name: any) => {
  const item = document.createElement("div");
  item.className = "nombre";
  item.innerHTML = `<div class="name-icon">${emoji}</div><div class="name-text">${name}</div>`;
  item.onclick = () => {
    deleteItem(name);
    dibujarRuleta();
    dibujarNombreSeleccionado();
  };
  return item;
};

const addItem = (valor: string) => {
  const emoji = getEmoji();
  const name = valor.toUpperCase();
  options.push(`${emoji} ${name}`);
  listaPalabras.appendChild(createItem(emoji, name));
};

export const deleteItem = async (name: string) => {
  const itemsElements = [].slice.call(listaPalabras.children);
  const li = itemsElements.find((li: HTMLLIElement) => {
    return li.lastChild?.textContent?.trim().toUpperCase().includes(name.trim());
  }) as HTMLLIElement | undefined;;

  if (li !== undefined) {
    const index = options.findIndex(item => item.includes(name.trim()));
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