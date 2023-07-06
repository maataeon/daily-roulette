import { querySelector } from "../utils";

const inputImagen = querySelector('#inputImagen') as HTMLAudioElement;
const stars = querySelector('#stars') as HTMLAudioElement;
const customFileLabel = querySelector('#customFileLabel') as HTMLLabelElement;

let loadedCustomBackground = false;

export const isCustomBackground = () => loadedCustomBackground;

inputImagen.addEventListener('change', function (e: any) {
  const file = e.target?.files[0];

  if (file) {
    customFileLabel.textContent = `Custom background (${file.name})` ;

    const reader = new FileReader();

    reader.onload = function (e) {
      const imagenURL = e.target?.result;
      stars.style.backgroundImage = "url('" + imagenURL + "')";
    };

    reader.readAsDataURL(file);
    loadedCustomBackground = true;
  }
});


export const initBackground = () => {
}