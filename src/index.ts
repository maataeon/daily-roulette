import { initAudio } from "./components/audio";
import { initControls } from "./components/controlls";
import { initItemList } from "./components/itemList";
import { initRoulette } from "./components/wheel";
import { initStarrySky } from "./components/starrySky";
import { initTime } from "./components/time";
import { initBackground } from "./components/background";

window.onload = function () {
  initStarrySky();
  initTime();
  initItemList();
  initRoulette();
  initAudio();
  initControls();
  initBackground();
};

