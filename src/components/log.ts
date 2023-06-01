import { querySelector } from "../utils";
import { calculateTimeDiffCronometer } from "./time";

const log = querySelector('#log') as HTMLDivElement;

let itemCounter = 0;

export const getItemCounter = () => itemCounter;

export const resetCounterNames = () => itemCounter = 0;

export const increaseCountName = () => itemCounter++;

export const logTimeAndName = (selectedName: string) => {
  if (!!selectedName) {
    log.innerHTML += `
      <div class="logEntry">
        <div>${selectedName}</div>
        <div>${calculateTimeDiffCronometer()}</div>
      </div>`;
  }
};