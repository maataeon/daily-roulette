import { MousePosition } from '../models/MousePosition';
import { easeOut, querySelector, valueOf } from "../utils";
import { pushAlert } from './alertMsg';
import { playChangeItem, playLastName, playWink, selectEgyptianScale, selectMajorScale } from "./audio";
import { isCustomBackground } from './background';
import { deleteItem, disableItems, enableItems, finishSelectedItem, getItem, getItems, getSelectedItem, setSelectedItem } from "./itemList";
import { increaseCountName } from "./log";
import { clearCronometerText, resetCronometer } from "./time";

const wheelCanvas = querySelector('#wheelCanvas') as HTMLCanvasElement;
const spinButton = querySelector("#spinButton") as HTMLButtonElement;
const frictionRange = querySelector("#frictionRange") as HTMLInputElement;
const startThresholdRange = querySelector("#startThresholdRange") as HTMLInputElement;
const stopThresholdRange = querySelector("#stopThresholdRange") as HTMLInputElement;

const TWO_PI = Math.PI * 2;

const contrastThreshold = 24;

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
let showIntro = true;
let dragging = false;


const mousePosition = new MousePosition();

const gammaCorrection = (value: number) => {
  // Gamma value (adjust as needed)
  const gamma = 2.2;
  return Math.pow(value / 100, gamma) * 100;
}

const getRandomStartVelocity = () => {
  const multiplier = 2.2 - Math.random();
  return valueOf(startThresholdRange) * multiplier;
}

const drawMeasures = (radians: number) => {
  let degrees = radians * (180 / Math.PI);
  const rect = wheelCanvas.getBoundingClientRect();
  const x = mousePosition.x - rect.left;
  const y = mousePosition.y - rect.top;
  // Ajustar el rango de ángulos a [0, 360]
  if (degrees < 0) {
    degrees += 360;
  }
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el eje x
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(wheelCanvas.width, centerY);
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Dibujar el eje y
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, wheelCanvas.height);
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Dibujar la línea
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dibujar el arco
  const radius = Math.min(centerX, centerY);
  const startAngle = 0;
  const endAngle = radians;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.stroke();
}

export const drawWheel = () => {
  arc = Math.PI / (getItems().length / 2);

  ctx.fillStyle = "rgba(0,0,0,0.1)";
  //ctx.globalCompositeOperation = "difference";
  if (isCustomBackground()) {
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  } else {
    ctx.fillRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  }
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
    const correctedLuminosity = gammaCorrection(item.color.lightness);// Umbral para decidir el color del texto (ajusta según tus necesidades)

    const textColor = correctedLuminosity < contrastThreshold ? "#FEFEFE" : "#030303"
    ctx.fillStyle = textColor;
    ctx.strokeStyle = "rgba(255, 255, 255, .9)";
    ctx.lineWidth = 1;
    //ctx.strokeText(text, -ctx.measureText(text).width / 2, 0);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.closePath();
    ctx.restore();
  });

  cursorPosition();
  ctx.translate(-centerX, -centerY);

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
  if (showIntro) showIntro = false;
  setSpinning(true);
  spinButton.disabled = true;
  finishSelectedItem();
  clearCronometerText();
  rotateWheel();
};

const rotateWheel = () => {
  if (throwVelocity < valueOf(stopThresholdRange)) {
    stopRotateWheel();
  } else {
    throwVelocity *= valueOf(frictionRange);
    startAngle += throwVelocity;
    drawWheel();
    requestAnimationFrame(rotateWheel);
  }
};

const stopRotateWheel = () => {
  saveInitialState();
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
  spinButton.disabled = false;

  setTimeout(activateIntro, 0);
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


function calcularAngulo(): number {
  // Obtener la posición del mouse relativa al canvas
  const rect = wheelCanvas.getBoundingClientRect();
  const x = mousePosition.x - rect.left;
  const y = mousePosition.y - rect.top;

  // Obtener las coordenadas del centro del canvas
  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;

  // Calcular el ángulo en radianes utilizando atan2
  const radians = Math.atan2(y - centerY, x - centerX);

  return radians;
}
let throwVelocity = 0;
let initialPointerAngle = 0;
let initialStartAngle = 0;
const introAnimation = () => {
  if (!isSpinning()) {
    if (dragging) {
      const pointerAngle = calcularAngulo();
      startAngle = (pointerAngle - initialPointerAngle) + initialStartAngle;
      drawWheel();
      throwVelocity = (mousePosition.angle - pointerAngle) * -.7;
      mousePosition.angle = pointerAngle;
    } else {
      if (throwVelocity > valueOf(startThresholdRange)) {
        startRotateWheel();
        return;
      } else if (throwVelocity) {
        if (throwVelocity > valueOf(stopThresholdRange)) {
          throwVelocity *= valueOf(frictionRange);
          startAngle += throwVelocity;
          drawWheel();
        } else {
          throwVelocity = 0;
        }
      }
    }
  }
  if (showIntro) {
    requestAnimationFrame(introAnimation)
  }
}

const activateIntro = () => {
  showIntro = true;
  introAnimation();
}
const saveInitialState = () => {
  initialStartAngle = startAngle;
  initialPointerAngle = calcularAngulo();
}

const throwWheel = () => {
  if (!isSpinning()) {
    throwVelocity = getRandomStartVelocity();
  }
}

window.addEventListener("keydown", (e) => {
  if (e.code === 'KeyS' && e.target == document.body) {
    e.preventDefault();
    throwWheel();
  }
});

spinButton.addEventListener("click", () => {
  throwWheel();
});

wheelCanvas.addEventListener("mousedown", (event) => {
  dragging = true;
  saveInitialState();
  wheelCanvas.classList.add("grabbing");
});

window.addEventListener("mouseup", (event) => {
  dragging = false;
  wheelCanvas.classList.remove("grabbing");
});

window.addEventListener("mousemove", (event) => {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

export const initRoulette = () => {
  ctx = wheelCanvas.getContext("2d") as CanvasRenderingContext2D;
  outsideRadius = 255;
  textRadius = 180;
  insideRadius = 90;
  centerX = wheelCanvas.width / 2;
  centerY = wheelCanvas.height / 2;
  drawWheel();
  introAnimation();
}
