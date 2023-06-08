import { Item } from "../models/item";
import { querySelector } from "../utils";
import { calculateTimeDiffCronometer } from "./time";

const log = querySelector('#log') as HTMLDivElement;

let itemCounter = 0;

export const getItemCounter = () => itemCounter;

export const resetCounterNames = () => itemCounter = 0;

export const increaseCountName = () => itemCounter++;

export const logTimeAndName = (item: Item) => {
  if (item) {
    log.innerHTML += `
      <div class="logEntry">
        <div>${item.name}</div>
        <div>${calculateTimeDiffCronometer()}</div>
      </div>`;
  }
};