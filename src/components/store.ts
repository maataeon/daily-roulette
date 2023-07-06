type AppState = {
  items: string[],
  backgroundURL: string | null,
  frictionRange: number,
  startThresholdRange: number,
  stopThresholdRange: number
}

export const initialState: AppState = {
  items: ["default", "item"],
  backgroundURL: null,
  frictionRange: 0.981,
  startThresholdRange: 0.231,
  stopThresholdRange: 0.001
};

const getFromStorage = (storageKey: string) => {
  const storedItem = localStorage.getItem(storageKey);
  return storedItem ? JSON.parse(storedItem) : null;
}

export const storeObject = (key: string, object: any) => {
  localStorage.setItem(key, JSON.stringify(object));
}

let state: AppState = {
  items:  getFromStorage("items") as string[] ?? initialState.items,
  backgroundURL: getFromStorage("backgroundURL") ?? initialState.backgroundURL,
  frictionRange: getFromStorage("frictionRange") ?? initialState.frictionRange,
  startThresholdRange: getFromStorage("startThresholdRange") ?? initialState.startThresholdRange,
  stopThresholdRange: getFromStorage("stopThresholdRange") ?? initialState.stopThresholdRange
};

export const saveItems = (itemNames: string[]) => {
  storeObject("items", itemNames);
}

export const saveBackgroundURL = (url: string | null) => {
  state.backgroundURL = url;
  storeObject("backgroundURL", url);
}

export const saveInputValue = (input: HTMLInputElement) => {
  storeObject(input.id, input.value);
}


export default state;