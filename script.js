const inputPalabras = document.getElementById("inputPalabras");
const botonAgregarPalabras = document.getElementById("botonAgregarPalabras");
const listaPalabras = document.getElementById("lista-palabras");
const nombreSeleccionado = document.getElementById("nombre-seleccionado");
const wink = document.getElementById("wink");
const spinSound = document.getElementById("spin-sound");
const whoosh = document.getElementById("whoosh");
const lastName = document.getElementById("last-name");
const tic = document.getElementById("tic");
const time = document.getElementById("time");
const log = document.getElementById("log");
const cronometer = document.getElementById("cronometer");
const botonLimpiarOpciones = document.getElementById("limpiar-opciones");
const alerta = document.getElementById("alerta");
const canvas = document.getElementById("canvas");
const randomColorOffset = parseInt(Math.random() * 147);

let options = [];
let startAngle = (Math.random() * 360) | 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;
let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
let ctx;
let counterNames = 0;
let centerX;
let centerY;
let outsideRadius;
let textRadius;
let insideRadius;
let colorPallete;

const emojiFaces = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "👽", "👾", "🤖", "🎃"];


const nombres = [ "Juli", "Mati-S", "Dami", "Eze", "Maat", "Jose", "Gabi", "Mauricio", "Martin-F", "Agustin-J", "Gabriela", "Lucas", "Cele", "Mati-M", "Juli-M", "Dami-S", "Eze-G", "Diego"
];


const fixedStartTime = () => parseInt(new Date().getTime() / 1000) * 1000

let cronometerTime = fixedStartTime();

const resetCronometer = () => cronometerTime = new Date().getTime();

const resetCounterNames = () => counterNames = 0;

const increaseCountName = () => counterNames++;

const clearCronometerText = () => cronometer.innerText = "";

const calculateTimeDiffCronometer = () => {
  const difference = new Date().getTime() - cronometerTime;
  const seconds =
    parseInt(difference / 1000) >= 60
      ? (parseInt(difference / 1000) % 60).toString().padStart(2, "0")
      : parseInt(difference / 1000) % 60;
  const minutes = parseInt(difference / 1000 / 60);
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

const shuffleList = (arr) => {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const shiftPositions = (arr, offset) => {
  let shifted = [];
  for (let i = 0; i < arr.length; i++) {
    shifted.push(arr[(i + offset) % arr.length]);
  }
  return shifted;
};

const createColorPallete = (max) => {
  const initialOffset = Math.random() * 255;
  let colors = [];
  for (let acc = 0, n = 0; n < max; n += 1) {
    console.log(n);
    colors.push(`hsla(${(initialOffset + acc) % 360}deg, 69%, ${Math.random() * 20 + 50}%, 0.5)`);
    acc += parseInt(Math.random() * 50 + 10);
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
  const emoji = emojiFaces[parseInt(Math.abs(Math.random() * emojiFaces.length * 3)) % emojiFaces.length]
  return emoji;
};

const createItem = (emoji, name) => {
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

const addItem = (valor) => {
  const emoji = getEmoji();
  const name = valor.toUpperCase();
  options.push(`${emoji} ${name}`);
  listaPalabras.appendChild(createItem(emoji, name));
};

const deleteItem = (name) => {
  const itemsElements = [].slice.call(listaPalabras.children);
  const li = itemsElements.find((li) => {
    console.log({li: li.lastChild.innerText, name})
    return li.lastChild.innerText.trim().toUpperCase().includes(name.trim())
  });

  const index = options.findIndex(item => item.includes(name.trim()));
  console.log({index});
  if (index > -1) {
    options.splice(index, 1);
    colorPallete.splice(index, 1);
  }
  listaPalabras.removeChild(li);
  whoosh.pause();
  whoosh.currentTime = 0;
  whoosh.play();
};

const getColor = (index, maxItem) => {
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
  ctx.arc(0, 0, outsideRadius, 0, Math.PI*2);
  ctx.stroke()
  ctx.closePath();

  options.forEach((item, i) => {
    const angle = startAngle + i * arc;
    ctx.fillStyle = getColor(i, options.length);
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
  ctx.arc(0, -(outsideRadius + 14), 7, 0, Math.PI*2);
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

const spin = () => {
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
  const name = getSelectedName();
  setNombreSeleccionado(name);
  dibujarNombreSeleccionado();
  resetCronometer();
  increaseCountName();



  spinSound.pause();
  spinSound.currentTime = 0;

  if (options.length == 1) {
    lastName.play();
  } else if (options.length > 1) {
    wink.play();
    setTimeout(() => deleteItem(name.slice(2)), 750);
  }
};

const easeOut = (t, b, c, d) => {
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

const setNombreSeleccionado = (name) => {
  nombreSeleccionado.innerText = getSelectedName();
};

const position = {
  degrees: 0,
  arcd: 0,
  index: 0,
  name: 0
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

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Función para reproducir una nota
function reproducirNota(frecuencia, duracion) {
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
  ganancia.gain.setValueAtTime(.1, audioContext.currentTime); // Volumen inicial
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

/* STARS*/
const randomStarColor = () => {
  return `hsl(${parseInt(Math.random() * 8745) % 255}deg 70% 60%)`;
};

const stars = document.querySelector("#stars");
const maxStars = Math.abs(Math.random() * 293);
for (let i = 0; i < maxStars; i++) {
  stars.appendChild(
    (() => {
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.innerHTML = `<defs><filter id="glow"><feGaussianBlur stdDeviation="1.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
      let radius = Math.random() * 2.5 + 3;
      svg.setAttribute("class", "star");
      svg.setAttribute("viewBox", "0 0 240 240");
      svg.style.width = radius + "px";
      svg.style.height = radius + "px";
      svg.style.transform = "rotate(" + ((Math.random() * 100) | 0) + "deg)";
      svg.style.left = ((Math.random() * 120) | 0) + "vw";
      svg.style.top = ((Math.random() * 120) | 0) + "vh";
      svg.style.opacity = Math.random() * 0.214 + 0.657;
      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      //svg.setAttribute("transform", "rotate(120, 120 "+((Math.random() * 360) | 0)+")");
      path.setAttribute("d", "m48,234 73-226 73,226-192-140h238z");
      path.setAttribute("fill", randomStarColor());
      path.setAttribute("filter", "url(#glow)");
      svg.appendChild(path);
      return svg;
    })()
  );
}
window.onmouseup = function () {
  document.querySelectorAll(".seccion").forEach(function (seccion) {
    seccion.classList.remove("buttonDown");
  });
};

document.querySelectorAll(".seccion").forEach(function (seccion) {
  seccion.onmousedown = function () {
    this.classList.add("buttonDown");
  };
});

document.getElementById("spin").addEventListener("click", spin);

inputPalabras.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    botonAgregarPalabras.click();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.code === 'KeyS' && e.target == document.body) {
    e.preventDefault();
    spin();
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
  ctx = canvas.getContext("2d");
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

  document.body.style.backgroundColor = `hsl(${parseInt(Math.random() * 8745) % 255}deg 70% 0%)`;
};

