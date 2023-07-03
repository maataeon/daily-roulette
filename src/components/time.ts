import { fixedStartTime, querySelector, toInt } from "../utils";
import { getSelectedItem } from "./itemList";
import { getItemCounter } from "./log";

const cronometer = querySelector('#cronometer') as HTMLDivElement;
const time = querySelector('#time') as HTMLDivElement;

let cronometerTime = fixedStartTime();

export const clearCronometerText = () => cronometer.innerText = "";

export const resetCronometer = () => cronometerTime = new Date().getTime();

export const calculateTimeDiffCronometer = () => {
  const difference = new Date().getTime() - cronometerTime;
  const seconds =
    toInt(difference / 1000) >= 60
      ? (toInt(difference / 1000) % 60).toString().padStart(2, "0")
      : toInt(difference / 1000) % 60;
  const minutes = toInt(difference / 1000 / 60);
  const out = `${minutes > 0 ? minutes + "m" : ""}${seconds}s`;
  return out;
};


export const initTime = () => {
  const date = new Date();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  time.innerText = `${hour}:${minutes}`;

  if (getItemCounter() > 0 && getSelectedItem() != null) {
    cronometer.innerText = `+ ${calculateTimeDiffCronometer()}`;
  }

  requestAnimationFrame(initTime);
};
