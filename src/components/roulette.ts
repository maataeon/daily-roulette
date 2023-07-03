import { easeOut, querySelector } from "../utils";
import { playChangeItem, playLastName, playWink } from "./audio";
import { deleteItem, disableItems, enableItems, finishSelectedItem, getItem, getItems, getSelectedItem, setSelectedItem } from "./itemList";
import { increaseCountName } from "./log";
import { clearCronometerText, resetCronometer } from "./time";

const canvas = querySelector('#canvas') as HTMLCanvasElement;
const spin = querySelector("#spin") as HTMLButtonElement;

let startAngle = (Math.random() * 360) | 0;
let arc = 0;
let spinAngleStart: number;
let spinTime = 0;
let spinTimeTotal = 0;
let ctx: CanvasRenderingContext2D;
let centerX: number;
let centerY: number;
let outsideRadius: number;
let textRadius: number;
let insideRadius: number;
let spining = false;
let lastIndex: number;

export const dibujarRuleta = () => {
  arc = Math.PI / (getItems().length / 2);

  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.globalCompositeOperation = "difference";
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.font = "13px Helvetica, Arial";

  ctx.strokeStyle = "#999";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, outsideRadius, 0, Math.PI * 2);
  ctx.stroke()
  ctx.closePath();

  getItems().forEach((item, i) => {
    const angle = startAngle + i * arc;
    ctx.fillStyle = item.color.toString();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);
    ctx.arc(0, 0, insideRadius, angle + arc, angle, true);
    ctx.stroke();
    ctx.fill();

    ctx.save();
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur = 0;
    ctx.translate(
      0 + Math.cos(angle + arc / 2) * textRadius,
      0 + Math.sin(angle + arc / 2) * textRadius
    );
    ctx.rotate(angle + arc / 2 + Math.PI);

    ctx.font = "regular 16px 'Roboto'";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const text = getItem(i).name.split('').join(' ').padEnd(20, ' ');

    ctx.fillStyle = item.color.lightness < 50 ? "#FEFEFE" : "#030303";
    ctx.strokeStyle = "rgba(255, 255, 255, .9)";
    ctx.lineWidth = 1;
    //ctx.strokeText(text, -ctx.measureText(text).width / 2, 0);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.closePath();
    ctx.restore();
  });

  cursorPosition();
  ctx.restore();

};

const cursorPosition = function () {
  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.lineTo(0 + 4, 0 - (outsideRadius + 10));
  ctx.lineTo(0 + 4, 0 - (outsideRadius - 10));
  ctx.lineTo(0 + 9, 0 - (outsideRadius - 10));
  ctx.lineTo(0 + 0, 0 - (outsideRadius - 18));
  ctx.lineTo(0 - 9, 0 - (outsideRadius - 10));
  ctx.lineTo(0 - 4, 0 - (outsideRadius - 10));
  ctx.lineTo(0 - 4, 0 - (outsideRadius + 10));
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcd = (arc * 180) / Math.PI;
  let currentIndex = Math.floor((360 - (degrees % 360)) / arcd);
  if (currentIndex !== lastIndex) {
    lastIndex = currentIndex;
    playChangeItem();
  }
};

export const dibujarNombreSeleccionado = () => {
  const item = getSelectedItem();
  if (item) {
    const text = `${item.emoji} ${item.name}`

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "bold 32px Arial";
    ctx.fillText(text, 0 - ctx.measureText(text).width / 2, 0 + 10);
    ctx.fillStyle = "#eee";
    ctx.restore();
  }
};

const startRotateWheel = () => {
  if (spinTime >= spinTimeTotal) {
    if (getItems().length < 1) {
      console.info('Debe haber al menos 2 opciones');
    } else {
      setSpinning(true);
      spin.disabled = true;
      finishSelectedItem();
      spinAngleStart = Math.random() * (Math.PI * 2) + Math.PI * 2.5;
      spinTime = 0;
      spinTimeTotal = Math.abs(Math.random() * 500) + 5000;
      clearCronometerText();
      rotateWheel();
    }
  }
};

const rotateWheel = () => {
  spinTime += 19;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
  } else {
    const spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    dibujarRuleta();
    requestAnimationFrame(rotateWheel);
  }
};

const stopRotateWheel = () => {
  setSpinning(false);
  const item = getFocusedItem();
  setSelectedItem(item);
  resetCronometer();
  dibujarNombreSeleccionado();
  increaseCountName();
  if (getItems().length == 1) {
    playLastName();
  } else if (getItems().length > 1) {
    playWink();
    deleteItem(item);
  }
  spin.disabled = false;
};

export const setSpinning = (state: boolean) => {
  if (state) {
    spining = state;
    disableItems();
  } else {
    spining = state;
    enableItems();
  }
}  

export const isSpinning = () => !!spining;

const getFocusedItem = () => {
  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcd = (arc * 180) / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  return getItem(index);
};

window.addEventListener("keydown", function (e) {
  if (e.code === 'KeyS' && e.target == document.body) {
    e.preventDefault();
    if (!isSpinning()) { 
      startRotateWheel()
    };
  }
});

spin.addEventListener("click", startRotateWheel);

export const initRoulette = () => {
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  outsideRadius = 255;
  textRadius = 180;
  insideRadius = 90;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  dibujarRuleta();
}
