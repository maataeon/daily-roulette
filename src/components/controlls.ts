import { querySelector } from "../utils";
import state, { initialState, saveInputValue } from "./store";

const rangeInputs = Array.from(document.querySelectorAll('.inputController input[type="range"]')) as HTMLInputElement[];
const restoreControllsButton = querySelector("#restoreControllsButton") as HTMLButtonElement;

const getValueById = (id: string): number => {
  switch (id) {
    case "frictionRange": return state.frictionRange;
    case "startThresholdRange": return state.startThresholdRange;
    case "stopThresholdRange": return state.stopThresholdRange;
    default: return 0;
  }
}
const getDefaultValueById = (id: string): number => {
  switch (id) {
    case "frictionRange": return initialState.frictionRange;
    case "startThresholdRange": return initialState.startThresholdRange;
    case "stopThresholdRange": return initialState.stopThresholdRange;
    default: return 0;
  }
}

const restoreValues = () => {
  rangeInputs.forEach((input) => {
    input.value = getDefaultValueById(input.id).toString();
    const label = document.getElementById(input.dataset.displayId ?? "") as HTMLSpanElement;
    label.textContent = parseFloat(input.value).toFixed(3);
    saveInputValue(input);
  });
}


restoreControllsButton?.addEventListener("click", restoreValues);

export const initControls = () => {
  rangeInputs.forEach((input) => {
    input.value = getValueById(input.id).toString();
    const label = document.getElementById(input.dataset.displayId ?? "") as HTMLDivElement;
    label.textContent = parseFloat(input.value).toFixed(3);
    input.addEventListener("input", () => {
      saveInputValue(input);
      if (label) {
        label.textContent = parseFloat(input.value).toFixed(3);
      }
    });
  });
}