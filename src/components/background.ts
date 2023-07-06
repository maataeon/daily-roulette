import { querySelector } from "../utils";
import { pushAlert } from "./alertMsg";
import state, { saveBackgroundURL } from "./store";
import { drawWheel } from "./wheel";

const inputImagen = querySelector('#inputImagen') as HTMLAudioElement;
const stars = querySelector('#stars') as HTMLAudioElement;
const customFileLabel = querySelector('#customFileLabel #labelText') as HTMLDivElement;
const deleteBackground = querySelector('#deleteBackground') as HTMLButtonElement;

let loadedCustomBackground = false;

export const isCustomBackground = () => loadedCustomBackground;

const setBackgroundImage = () => {
  stars.style.backgroundImage = "url('" + state.backgroundURL + "')";
  loadedCustomBackground = true;
}

const setLabel = (fileName: string) => {
  customFileLabel.textContent = `File: ${fileName}` ;
}

const restoreBackground = () => {
  stars.style.backgroundImage = "";
  customFileLabel.textContent = 'Select file...' ;
  saveBackgroundURL(null);
}

inputImagen.addEventListener('change', function (e: any) {
  const file = e.target?.files[0];

  if (file) {

    if (file.size > 2 * 1024 * 1024) {
      pushAlert("The selected file exceeds the maximum allowed size (2 MB).");
      return;
    }

    setLabel(file.name);

    const reader = new FileReader();

    reader.onload = function (e) {
      const imagenURL = e.target?.result;
      saveBackgroundURL(imagenURL as string);
      setBackgroundImage();
    };

    reader.readAsDataURL(file);
  }
});

deleteBackground.addEventListener("click", restoreBackground);


export const initBackground = () => {
  if (state.backgroundURL) {
    setLabel(state.backgroundURL);
    setBackgroundImage();
    drawWheel();
  }
}