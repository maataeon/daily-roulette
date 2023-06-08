import { initAudio } from "./components/audio";
import { initItemList } from "./components/itemList";
import { initRoulette } from "./components/roulette";
import { initStarrySky } from "./components/starrySky";
import { initTime } from "./components/time";

window.onload = function () {
  initStarrySky();
  initTime();
  initItemList();
  initRoulette();
  initAudio();
};

