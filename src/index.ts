import { createStarrySky } from "./components/starrySky";
import { querySelector, toInt } from "./utils";

const inputPalabras = querySelector('#inputPalabras') as HTMLInputElement;
const botonAgregarPalabras = querySelector('#botonAgregarPalabras') as HTMLButtonElement;
const listaPalabras = querySelector('#lista-palabras') as HTMLDivElement;
const nombreSeleccionado = querySelector('#nombre-seleccionado') as HTMLDivElement;
const wink = querySelector('#wink') as HTMLAudioElement;
const spinSound = querySelector('#spin-sound') as HTMLAudioElement;
const whoosh = querySelector('#whoosh') as HTMLAudioElement;
const lastName = querySelector('#last-name') as HTMLAudioElement;
const tic = querySelector('#tic') as HTMLAudioElement;
const time = querySelector('#time') as HTMLDivElement;
const log = querySelector('#log') as HTMLDivElement;
const cronometer = querySelector('#cronometer') as HTMLDivElement;
const botonLimpiarOpciones = querySelector('#limpiar-opciones') as HTMLButtonElement;
const alerta = querySelector('#alerta') as HTMLDivElement;
const canvas = querySelector('#canvas') as HTMLCanvasElement;
const spin = querySelector("#spin") as HTMLButtonElement;

const randomColorOffset = Math.trunc(Math.random() * 147);

let options: string[] = [];
let startAngle = (Math.random() * 360) | 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;
let spinAngleStart: number;
let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
let ctx: CanvasRenderingContext2D;
let counterNames = 0;
let centerX: number;
let centerY: number;
let outsideRadius: number;
let textRadius: number;
let insideRadius: number;
let colorPallete: any[];

const emojiFaces = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "👽", "👾", "🤖", "🎃"];


const nombres = ["Juli", "Mati-S", "Dami", "Eze", "Maat", "Jose", "Gabi", "Mauricio", "Martin-F", "Agustin-J", "Gabriela", "Lucas", "Cele", "Mati-M", "Juli-M", "Dami-S", "Eze-G", "Diego"
];


const fixedStartTime = () => Math.trunc(new Date().getTime() / 1000) * 1000

let cronometerTime = fixedStartTime();

const resetCronometer = () => cronometerTime = new Date().getTime();

const resetCounterNames = () => counterNames = 0;

const increaseCountName = () => counterNames++;

const clearCronometerText = () => cronometer.innerText = "";

const calculateTimeDiffCronometer = () => {
  const difference = new Date().getTime() - cronometerTime;
  const seconds =
    toInt(difference / 1000) >= 60
      ? (toInt(difference / 1000) % 60).toString().padStart(2, "0")
      : toInt(difference / 1000) % 60;
  const minutes = toInt(difference / 1000 / 60);
  const out = `${minutes > 0 ? minutes + "m" : ""}${seconds}s`;
  return out;
};

const renderTime = () => {
  const date = new Date();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  time.innerText = `${hour}:${minutes}`;

  if (counterNames > 0) {
    cronometer.innerText = `+ ${calculateTimeDiffCronometer()}`;
  }

  requestAnimationFrame(renderTime);
};
renderTime();


const shiftPositions = (arr: any[], offset: number) => {
  let shifted = [];
  for (let i = 0; i < arr.length; i++) {
    shifted.push(arr[(i + offset) % arr.length]);
  }
  return shifted;
};

const createColorPallete = (max: number) => {
  const initialOffset = Math.random() * 255;
  let colors = [];
  for (let acc = 0, n = 0; n < max; n += 1) {
    colors.push(`hsla(${(initialOffset + acc) % 360}deg, 69%, ${Math.random() * 20 + 50}%, 0.5)`);
    acc += toInt(Math.random() * 50 + 10);
  }
  return colors;
};

const buildColorPallete = () => {
  colorPallete = shiftPositions(
    createColorPallete(nombres.length),
    randomColorOffset
  );
};
buildColorPallete();

const getEmoji = () => {
  const emoji = emojiFaces[toInt(Math.abs(Math.random() * emojiFaces.length * 3)) % emojiFaces.length]
  return emoji;
};

const createItem = (emoji: string, name: any) => {
  const item = document.createElement("div");
  item.className = "nombre";
  item.innerHTML = `<div class="name-icon">${emoji}</div><div class="name-text">${name}</div>`;
  item.onclick = () => {
    deleteItem(name);
    dibujarRuleta();
    dibujarNombreSeleccionado();
  };
  return item;
};

const addItem = (valor: string) => {
  const emoji = getEmoji();
  const name = valor.toUpperCase();
  options.push(`${emoji} ${name}`);
  listaPalabras.appendChild(createItem(emoji, name));
};

const deleteItem = async (name: string) => {
  const itemsElements = [].slice.call(listaPalabras.children);
  const li = itemsElements.find((li: HTMLLIElement) => {
    return li.lastChild?.textContent?.trim().toUpperCase().includes(name.trim());
  }) as HTMLLIElement | undefined;;

  if (li !== undefined) {
    const index = options.findIndex(item => item.includes(name.trim()));
    console.log({ index });
    if (index > -1) {
      options.splice(index, 1);
      colorPallete.splice(index, 1);
    }
    listaPalabras.removeChild(li);
    whoosh.pause();
    whoosh.currentTime = 0;
    await whoosh.play();
  } else {
    console.error({ message: 'li not found' })
  }
};

const getColor = (index: number) => {
  return colorPallete[index % colorPallete.length];
};

const dibujarRuleta = () => {
  arc = Math.PI / (options.length / 2);

  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.globalCompositeOperation = "multiply";
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

  options.forEach((item, i) => {
    const angle = startAngle + i * arc;
    ctx.fillStyle = getColor(i);
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

    ctx.font = "bold 14px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const text = options[i].slice(2).split('').join(' ').padEnd(20, ' ');

    ctx.fillStyle = "#222";
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.closePath();
    ctx.restore();
  });

  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, -(outsideRadius + 14), 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

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


  ctx.restore();

  cursorPosition();
};
const logTimeAndName = () => {
  const selectedName = nombreSeleccionado.innerText;
  if (!!selectedName) {
    log.innerHTML += `<div class="logEntry"><div>${selectedName}</div><div>${calculateTimeDiffCronometer()}</div></div>`;
  }
};

const spinWheel = () => {
  if (spinTime >= spinTimeTotal) {
    //spinSound.currentTime = 0;
    //spinSound.play();
    if (options.length < 1) {
      alerta.style.display = "block";
      alerta.innerText = "Debe haber al menos 2 opciones";
    } else {
      spinAngleStart = Math.random() * (Math.PI * 2) + Math.PI * 2.5;
      spinTime = 0;
      spinTimeTotal = Math.abs(Math.random() * 500) + 5000;
      logTimeAndName();
      resetCounterNames();
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

const dibujarNombreSeleccionado = () => {
  const name = nombreSeleccionado.innerText;
  if (!!name) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "bold 32px Arial";
    ctx.fillText(name, 0 - ctx.measureText(name).width / 2, 0 + 10);
    ctx.fillStyle = "#eee";
    ctx.restore();
  }
};

const stopRotateWheel = () => {
  setNombreSeleccionado();
  dibujarNombreSeleccionado();
  resetCronometer();
  increaseCountName();



  spinSound.pause();
  spinSound.currentTime = 0;

  if (options.length == 1) {
    lastName.play();
  } else if (options.length > 1) {
    wink.play();
    setTimeout(() => deleteItem(getSelectedName().slice(2)), 750);
  }
};

const easeOut = (t: number, b: number, c: number, d: number) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  //console.log("in: ",t, b, c, d);
  const eased = b + c * (tc + -3 * ts + 3 * t);
  ///console.log("out: ", eased);
  return eased;
};

const getSelectedName = () => {
  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcd = (arc * 180) / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  return options[index];
};

const setNombreSeleccionado = () => {
  nombreSeleccionado.innerText = getSelectedName();
};

const position = {
  degrees: 0,
  arcd: 0,
  index: 0,
  name: ''
};

const acorde = [
  523.25, 659.25, 783.99, // I (Tónico) - C-E-G
  698.46, 880.00, 1046.50, // IV (Subdominante) - F-A-C
  783.99, 987.77, 1174.66
];

const escalaBach = [
  587.33, // D
  659.25, // E
  698.46, // F
  783.99, // G
  880.00, // A
  932.33, // Bb
  1046.50 // C
];

const escalaMayor = [
  523.25, // C
  587.33, // D
  659.25, // E
  698.46, // F
  783.99, // G
  880.00, // A
  987.77  // B
];
const notasEgipcias = [
  587.33, // D
  622.25, // D#
  739.99, // F#
  783.99, // G
  880.00  // A
];

let indiceNota = 0;

function getNote() {
  const nota = notasEgipcias[indiceNota];
  indiceNota = (indiceNota + 1) % notasEgipcias.length;
  return nota;
}

const audioContext = new (window.AudioContext)();

// Función para reproducir una nota
function reproducirNota(frecuencia: number, duracion: number) {
  // Crear oscilador
  const oscilador = audioContext.createOscillator();
  oscilador.type = 'sine'; // Forma de onda del oscilador (sine, square, sawtooth, triangle)
  oscilador.frequency.value = frecuencia; // Frecuencia de la nota

  // Crear nodo de ganancia para controlar el volumen
  const ganancia = audioContext.createGain();

  // Conectar oscilador al nodo de ganancia
  oscilador.connect(ganancia);

  // Conectar el nodo de ganancia al destino de audio (altavoces)
  ganancia.connect(audioContext.destination);

  // Iniciar el oscilador
  oscilador.start();

  // Establecer el tiempo de inicio del desvanecimiento
  const fadeOutStartTime = audioContext.currentTime + duracion - 0.1; // Desvanecimiento de 0.1 segundos antes del final

  // Aplicar desvanecimiento
  ganancia.gain.setValueAtTime(.04, audioContext.currentTime); // Volumen inicial
  ganancia.gain.linearRampToValueAtTime(0, fadeOutStartTime); // Desvanecimiento lineal hacia 0

  // Detener el oscilador después de la duración especificada
  oscilador.stop(audioContext.currentTime + duracion);
}


const cursorPosition = function () {
  position.degrees = (startAngle * 180) / Math.PI + 90;
  position.arcd = (arc * 180) / Math.PI;
  let newIndex = Math.floor((360 - (position.degrees % 360)) / position.arcd);
  if (newIndex !== position.index) {
    position.index = newIndex;
    position.name = options[position.index];
    //console.log(position);
    /* performance issues, how can i reduce latency?
       -> find exact init time
    tic.currentTime = 0;
    if (tic.paused) {
      tic.play();
    }*/
    reproducirNota(getNote(), 0.2)
  }
};


spin.addEventListener("click", spinWheel);

inputPalabras.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    botonAgregarPalabras.click();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.code === 'KeyS' && e.target == document.body) {
    e.preventDefault();
    spinWheel();
  }
});

botonAgregarPalabras.addEventListener("click", () => {
  if (inputPalabras.value != "" && options.length < 60) {
    let names = inputPalabras.value.split(",");
    names.forEach((name) => {
      if (name.length > 0) {
        addItem(name);
      }
    });
    buildColorPallete();
    dibujarRuleta();
    dibujarNombreSeleccionado();
    inputPalabras.value = "";
    alerta.style.display = "none";
  }
  if (options.length >= 35) {
    alerta.innerHTML = "Ya agregaste demasiadas palabras.";
    alerta.style.display = "block";
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
});

botonLimpiarOpciones.addEventListener("click", function () {
  lastName.play();
  if (window.confirm("¿Borrar todas las opciones?")) {
    listaPalabras.innerHTML = '';
    options = [];
    addItem('default');
    dibujarRuleta();
  }
});

window.onload = function () {
  createStarrySky();
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  outsideRadius = 255;
  textRadius = 180;
  insideRadius = 90;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  console.log(centerX, centerY);

  nombres.forEach((nombre) => {
    addItem(nombre);
  });

  dibujarRuleta();
  wink.volume = 0.11;
  spinSound.volume = 0.29;
  whoosh.volume = 0.001;
  lastName.volume = 0.3;
  tic.volume = 0.29;

  document.body.style.backgroundColor = `hsl(${toInt(Math.random() * 8745) % 255}deg 70% 0%)`;
};

