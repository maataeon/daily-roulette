/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/starrySky.ts":
/*!*************************************!*\
  !*** ./src/components/starrySky.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createStarrySky = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst randomStarColor = () => {\n    return `hsl(${Math.trunc(Math.random() * 8745) % 255}deg 70% 60%)`;\n};\nfunction createStarrySky() {\n    const maxStars = Math.abs(Math.random() * 293);\n    const stars = (0, utils_1.querySelector)(\"#stars\");\n    for (let i = 0; i < maxStars; i++) {\n        stars.appendChild((() => {\n            let svg = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n            svg.innerHTML = `<defs><filter id=\"glow\"><feGaussianBlur stdDeviation=\"1.5\" result=\"coloredBlur\"/><feMerge><feMergeNode in=\"coloredBlur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter></defs>`;\n            let radius = Math.random() * 2.5 + 3;\n            svg.setAttribute(\"class\", \"star\");\n            svg.setAttribute(\"viewBox\", \"0 0 240 240\");\n            svg.style.width = radius + \"px\";\n            svg.style.height = radius + \"px\";\n            svg.style.transform = \"rotate(\" + ((Math.random() * 100) | 0) + \"deg)\";\n            svg.style.left = ((Math.random() * 120) | 0) + \"vw\";\n            svg.style.top = ((Math.random() * 120) | 0) + \"vh\";\n            svg.style.opacity = (Math.random() * 0.214 + 0.657).toString();\n            let path = document.createElementNS(\"http://www.w3.org/2000/svg\", \"path\");\n            path.setAttribute(\"d\", \"m48,234 73-226 73,226-192-140h238z\");\n            path.setAttribute(\"fill\", randomStarColor());\n            path.setAttribute(\"filter\", \"url(#glow)\");\n            svg.appendChild(path);\n            return svg;\n        })());\n    }\n}\nexports.createStarrySky = createStarrySky;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/starrySky.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst starrySky_1 = __webpack_require__(/*! ./components/starrySky */ \"./src/components/starrySky.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\nconst inputPalabras = (0, utils_1.querySelector)('#inputPalabras');\nconst botonAgregarPalabras = (0, utils_1.querySelector)('#botonAgregarPalabras');\nconst listaPalabras = (0, utils_1.querySelector)('#lista-palabras');\nconst nombreSeleccionado = (0, utils_1.querySelector)('#nombre-seleccionado');\nconst wink = (0, utils_1.querySelector)('#wink');\nconst spinSound = (0, utils_1.querySelector)('#spin-sound');\nconst whoosh = (0, utils_1.querySelector)('#whoosh');\nconst lastName = (0, utils_1.querySelector)('#last-name');\nconst tic = (0, utils_1.querySelector)('#tic');\nconst time = (0, utils_1.querySelector)('#time');\nconst log = (0, utils_1.querySelector)('#log');\nconst cronometer = (0, utils_1.querySelector)('#cronometer');\nconst botonLimpiarOpciones = (0, utils_1.querySelector)('#limpiar-opciones');\nconst alerta = (0, utils_1.querySelector)('#alerta');\nconst canvas = (0, utils_1.querySelector)('#canvas');\nconst spin = (0, utils_1.querySelector)(\"#spin\");\nconst randomColorOffset = Math.trunc(Math.random() * 147);\nlet options = [];\nlet startAngle = (Math.random() * 360) | 0;\nlet arc = Math.PI / (options.length / 2);\nlet spinTimeout = null;\nlet spinAngleStart;\nlet spinArcStart = 10;\nlet spinTime = 0;\nlet spinTimeTotal = 0;\nlet ctx;\nlet counterNames = 0;\nlet centerX;\nlet centerY;\nlet outsideRadius;\nlet textRadius;\nlet insideRadius;\nlet colorPallete;\nconst emojiFaces = [\"😀\", \"😃\", \"😄\", \"😁\", \"😆\", \"😅\", \"😂\", \"🤣\", \"😊\", \"😇\", \"🙂\", \"🙃\", \"😉\", \"😌\", \"😍\", \"🥰\", \"😘\", \"😗\", \"😙\", \"😚\", \"😋\", \"😛\", \"😝\", \"😜\", \"🤪\", \"🤨\", \"🧐\", \"🤓\", \"😎\", \"🤩\", \"🥳\", \"😏\", \"😒\", \"😞\", \"😔\", \"😟\", \"😕\", \"🙁\", \"☹️\", \"😣\", \"😖\", \"😫\", \"😩\", \"🥺\", \"😢\", \"😭\", \"😤\", \"😠\", \"😡\", \"🤬\", \"🤯\", \"😳\", \"🥵\", \"🥶\", \"😱\", \"😨\", \"😰\", \"😥\", \"😓\", \"🤗\", \"🤔\", \"🤭\", \"🤫\", \"🤥\", \"😶\", \"😐\", \"😑\", \"😬\", \"🙄\", \"😯\", \"😦\", \"😧\", \"😮\", \"😲\", \"😴\", \"🤤\", \"😪\", \"😵\", \"🤐\", \"🥴\", \"🤢\", \"🤮\", \"🤧\", \"😷\", \"🤒\", \"🤕\", \"🤑\", \"🤠\", \"😈\", \"👿\", \"👹\", \"👺\", \"🤡\", \"💩\", \"👻\", \"👽\", \"👾\", \"🤖\", \"🎃\"];\nconst nombres = [\"Juli\", \"Mati-S\", \"Dami\", \"Eze\", \"Maat\", \"Jose\", \"Gabi\", \"Mauricio\", \"Martin-F\", \"Agustin-J\", \"Gabriela\", \"Lucas\", \"Cele\", \"Mati-M\", \"Juli-M\", \"Dami-S\", \"Eze-G\", \"Diego\"\n];\nconst fixedStartTime = () => Math.trunc(new Date().getTime() / 1000) * 1000;\nlet cronometerTime = fixedStartTime();\nconst resetCronometer = () => cronometerTime = new Date().getTime();\nconst resetCounterNames = () => counterNames = 0;\nconst increaseCountName = () => counterNames++;\nconst clearCronometerText = () => cronometer.innerText = \"\";\nconst calculateTimeDiffCronometer = () => {\n    const difference = new Date().getTime() - cronometerTime;\n    const seconds = (0, utils_1.toInt)(difference / 1000) >= 60\n        ? ((0, utils_1.toInt)(difference / 1000) % 60).toString().padStart(2, \"0\")\n        : (0, utils_1.toInt)(difference / 1000) % 60;\n    const minutes = (0, utils_1.toInt)(difference / 1000 / 60);\n    const out = `${minutes > 0 ? minutes + \"m\" : \"\"}${seconds}s`;\n    return out;\n};\nconst renderTime = () => {\n    const date = new Date();\n    const minutes = (\"0\" + date.getMinutes()).slice(-2);\n    const hour = (\"0\" + date.getHours()).slice(-2);\n    time.innerText = `${hour}:${minutes}`;\n    if (counterNames > 0) {\n        cronometer.innerText = `+ ${calculateTimeDiffCronometer()}`;\n    }\n    requestAnimationFrame(renderTime);\n};\nrenderTime();\nconst shiftPositions = (arr, offset) => {\n    let shifted = [];\n    for (let i = 0; i < arr.length; i++) {\n        shifted.push(arr[(i + offset) % arr.length]);\n    }\n    return shifted;\n};\nconst createColorPallete = (max) => {\n    const initialOffset = Math.random() * 255;\n    let colors = [];\n    for (let acc = 0, n = 0; n < max; n += 1) {\n        colors.push(`hsla(${(initialOffset + acc) % 360}deg, 69%, ${Math.random() * 20 + 50}%, 0.9)`);\n        acc += (0, utils_1.toInt)(Math.random() * 50 + 10);\n    }\n    return colors;\n};\nconst buildColorPallete = () => {\n    colorPallete = shiftPositions(createColorPallete(nombres.length), randomColorOffset);\n};\nbuildColorPallete();\nconst getEmoji = () => {\n    const emoji = emojiFaces[(0, utils_1.toInt)(Math.abs(Math.random() * emojiFaces.length * 3)) % emojiFaces.length];\n    return emoji;\n};\nconst createItem = (emoji, name) => {\n    const item = document.createElement(\"div\");\n    item.className = \"nombre\";\n    item.innerHTML = `<div class=\"name-icon\">${emoji}</div><div class=\"name-text\">${name}</div>`;\n    item.onclick = () => {\n        deleteItem(name);\n        dibujarRuleta();\n        dibujarNombreSeleccionado();\n    };\n    return item;\n};\nconst addItem = (valor) => {\n    const emoji = getEmoji();\n    const name = valor.toUpperCase();\n    options.push(`${emoji} ${name}`);\n    listaPalabras.appendChild(createItem(emoji, name));\n};\nconst deleteItem = (name) => __awaiter(void 0, void 0, void 0, function* () {\n    const itemsElements = [].slice.call(listaPalabras.children);\n    const li = itemsElements.find((li) => {\n        var _a, _b;\n        return (_b = (_a = li.lastChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim().toUpperCase().includes(name.trim());\n    });\n    ;\n    if (li !== undefined) {\n        const index = options.findIndex(item => item.includes(name.trim()));\n        console.log({ index });\n        if (index > -1) {\n            options.splice(index, 1);\n            colorPallete.splice(index, 1);\n        }\n        listaPalabras.removeChild(li);\n        whoosh.pause();\n        whoosh.currentTime = 0;\n        yield whoosh.play();\n    }\n    else {\n        console.error({ message: 'li not found' });\n    }\n});\nconst getColor = (index) => {\n    return colorPallete[index % colorPallete.length];\n};\nconst dibujarRuleta = () => {\n    arc = Math.PI / (options.length / 2);\n    ctx.fillStyle = \"rgba(0,0,0,0.1)\";\n    //ctx.fillRect(0, 0, canvas.width, canvas.height);\n    //ctx.globalCompositeOperation = \"multiply\";\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.save();\n    ctx.translate(centerX, centerY);\n    ctx.strokeStyle = \"white\";\n    ctx.lineWidth = 1;\n    ctx.font = \"13px Helvetica, Arial\";\n    ctx.strokeStyle = \"#999\";\n    ctx.lineWidth = 4;\n    ctx.beginPath();\n    ctx.arc(0, 0, outsideRadius, 0, Math.PI * 2);\n    ctx.stroke();\n    ctx.closePath();\n    options.forEach((item, i) => {\n        const angle = startAngle + i * arc;\n        ctx.fillStyle = getColor(i);\n        ctx.strokeStyle = \"#333\";\n        ctx.lineWidth = 2;\n        ctx.lineCap = \"round\";\n        ctx.lineJoin = \"round\";\n        ctx.beginPath();\n        ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);\n        ctx.arc(0, 0, insideRadius, angle + arc, angle, true);\n        ctx.stroke();\n        ctx.fill();\n        ctx.save();\n        ctx.shadowOffsetX = -1;\n        ctx.shadowOffsetY = -1;\n        ctx.shadowBlur = 0;\n        ctx.translate(0 + Math.cos(angle + arc / 2) * textRadius, 0 + Math.sin(angle + arc / 2) * textRadius);\n        ctx.rotate(angle + arc / 2 + Math.PI);\n        ctx.font = \"bold 14px Arial\";\n        ctx.textAlign = \"left\";\n        ctx.textBaseline = \"middle\";\n        const text = options[i].slice(2).split('').join(' ').padEnd(20, ' ');\n        ctx.fillStyle = \"#222\";\n        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);\n        ctx.closePath();\n        ctx.restore();\n    });\n    ctx.fillStyle = \"#ccc\";\n    ctx.strokeStyle = \"#222\";\n    ctx.lineWidth = 1;\n    ctx.beginPath();\n    ctx.arc(0, -(outsideRadius + 14), 7, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.stroke();\n    ctx.closePath();\n    ctx.fillStyle = \"#ccc\";\n    ctx.strokeStyle = \"#222\";\n    ctx.lineWidth = 1;\n    ctx.beginPath();\n    ctx.lineTo(0 + 4, 0 - (outsideRadius + 10));\n    ctx.lineTo(0 + 4, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 + 9, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 + 0, 0 - (outsideRadius - 18));\n    ctx.lineTo(0 - 9, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 - 4, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 - 4, 0 - (outsideRadius + 10));\n    ctx.fill();\n    ctx.stroke();\n    ctx.closePath();\n    ctx.restore();\n    cursorPosition();\n};\nconst logTimeAndName = () => {\n    const selectedName = nombreSeleccionado.innerText;\n    if (!!selectedName) {\n        log.innerHTML += `<div class=\"logEntry\"><div>${selectedName}</div><div>${calculateTimeDiffCronometer()}</div></div>`;\n    }\n};\nconst spinWheel = () => {\n    if (spinTime >= spinTimeTotal) {\n        //spinSound.currentTime = 0;\n        //spinSound.play();\n        if (options.length < 1) {\n            alerta.style.display = \"block\";\n            alerta.innerText = \"Debe haber al menos 2 opciones\";\n        }\n        else {\n            spinAngleStart = Math.random() * (Math.PI * 2) + Math.PI * 2.5;\n            spinTime = 0;\n            spinTimeTotal = Math.abs(Math.random() * 500) + 5000;\n            logTimeAndName();\n            resetCounterNames();\n            clearCronometerText();\n            rotateWheel();\n        }\n    }\n};\nconst rotateWheel = () => {\n    spinTime += 19;\n    if (spinTime >= spinTimeTotal) {\n        stopRotateWheel();\n    }\n    else {\n        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);\n        startAngle += (spinAngle * Math.PI) / 180;\n        dibujarRuleta();\n        requestAnimationFrame(rotateWheel);\n    }\n};\nconst dibujarNombreSeleccionado = () => {\n    const name = nombreSeleccionado.innerText;\n    if (!!name) {\n        ctx.save();\n        ctx.translate(centerX, centerY);\n        ctx.fillStyle = \"#f2f2f2\";\n        ctx.font = \"bold 32px Arial\";\n        ctx.fillText(name, 0 - ctx.measureText(name).width / 2, 0 + 10);\n        ctx.fillStyle = \"#eee\";\n        ctx.restore();\n    }\n};\nconst stopRotateWheel = () => {\n    setNombreSeleccionado();\n    dibujarNombreSeleccionado();\n    resetCronometer();\n    increaseCountName();\n    spinSound.pause();\n    spinSound.currentTime = 0;\n    if (options.length == 1) {\n        lastName.play();\n    }\n    else if (options.length > 1) {\n        wink.play();\n        setTimeout(() => deleteItem(getSelectedName().slice(2)), 750);\n    }\n};\nconst easeOut = (t, b, c, d) => {\n    const ts = (t /= d) * t;\n    const tc = ts * t;\n    //console.log(\"in: \",t, b, c, d);\n    const eased = b + c * (tc + -3 * ts + 3 * t);\n    ///console.log(\"out: \", eased);\n    return eased;\n};\nconst getSelectedName = () => {\n    const degrees = (startAngle * 180) / Math.PI + 90;\n    const arcd = (arc * 180) / Math.PI;\n    const index = Math.floor((360 - (degrees % 360)) / arcd);\n    return options[index];\n};\nconst setNombreSeleccionado = () => {\n    nombreSeleccionado.innerText = getSelectedName();\n};\nconst position = {\n    degrees: 0,\n    arcd: 0,\n    index: 0,\n    name: ''\n};\nconst acorde = [\n    523.25, 659.25, 783.99,\n    698.46, 880.00, 1046.50,\n    783.99, 987.77, 1174.66\n];\nconst escalaBach = [\n    587.33,\n    659.25,\n    698.46,\n    783.99,\n    880.00,\n    932.33,\n    1046.50 // C\n];\nconst escalaMayor = [\n    523.25,\n    587.33,\n    659.25,\n    698.46,\n    783.99,\n    880.00,\n    987.77 // B\n];\nconst notasEgipcias = [\n    587.33,\n    622.25,\n    739.99,\n    783.99,\n    880.00 // A\n];\nlet indiceNota = 0;\nfunction getNote() {\n    const nota = notasEgipcias[indiceNota];\n    indiceNota = (indiceNota + 1) % notasEgipcias.length;\n    return nota;\n}\nconst audioContext = new (window.AudioContext)();\n// Función para reproducir una nota\nfunction reproducirNota(frecuencia, duracion) {\n    // Crear oscilador\n    const oscilador = audioContext.createOscillator();\n    oscilador.type = 'sine'; // Forma de onda del oscilador (sine, square, sawtooth, triangle)\n    oscilador.frequency.value = frecuencia; // Frecuencia de la nota\n    // Crear nodo de ganancia para controlar el volumen\n    const ganancia = audioContext.createGain();\n    // Conectar oscilador al nodo de ganancia\n    oscilador.connect(ganancia);\n    // Conectar el nodo de ganancia al destino de audio (altavoces)\n    ganancia.connect(audioContext.destination);\n    // Iniciar el oscilador\n    oscilador.start();\n    // Establecer el tiempo de inicio del desvanecimiento\n    const fadeOutStartTime = audioContext.currentTime + duracion - 0.1; // Desvanecimiento de 0.1 segundos antes del final\n    // Aplicar desvanecimiento\n    ganancia.gain.setValueAtTime(.04, audioContext.currentTime); // Volumen inicial\n    ganancia.gain.linearRampToValueAtTime(0, fadeOutStartTime); // Desvanecimiento lineal hacia 0\n    // Detener el oscilador después de la duración especificada\n    oscilador.stop(audioContext.currentTime + duracion);\n}\nconst cursorPosition = function () {\n    position.degrees = (startAngle * 180) / Math.PI + 90;\n    position.arcd = (arc * 180) / Math.PI;\n    let newIndex = Math.floor((360 - (position.degrees % 360)) / position.arcd);\n    if (newIndex !== position.index) {\n        position.index = newIndex;\n        position.name = options[position.index];\n        //console.log(position);\n        /* performance issues, how can i reduce latency?\n           -> find exact init time\n        tic.currentTime = 0;\n        if (tic.paused) {\n          tic.play();\n        }*/\n        reproducirNota(getNote(), 0.2);\n    }\n};\nspin.addEventListener(\"click\", spinWheel);\ninputPalabras.addEventListener(\"keypress\", function (event) {\n    if (event.key === \"Enter\") {\n        event.preventDefault();\n        botonAgregarPalabras.click();\n    }\n});\nwindow.addEventListener(\"keydown\", function (e) {\n    if (e.code === 'KeyS' && e.target == document.body) {\n        e.preventDefault();\n        spinWheel();\n    }\n});\nbotonAgregarPalabras.addEventListener(\"click\", () => {\n    if (inputPalabras.value != \"\" && options.length < 60) {\n        let names = inputPalabras.value.split(\",\");\n        names.forEach((name) => {\n            if (name.length > 0) {\n                addItem(name);\n            }\n        });\n        buildColorPallete();\n        dibujarRuleta();\n        dibujarNombreSeleccionado();\n        inputPalabras.value = \"\";\n        alerta.style.display = \"none\";\n    }\n    if (options.length >= 35) {\n        alerta.innerHTML = \"Ya agregaste demasiadas palabras.\";\n        alerta.style.display = \"block\";\n        window.scroll({ top: 0, left: 0, behavior: \"smooth\" });\n    }\n});\nbotonLimpiarOpciones.addEventListener(\"click\", function () {\n    lastName.play();\n    if (window.confirm(\"¿Borrar todas las opciones?\")) {\n        listaPalabras.innerHTML = '';\n        options = [];\n        addItem('default');\n        dibujarRuleta();\n    }\n});\nwindow.onload = function () {\n    (0, starrySky_1.createStarrySky)();\n    ctx = canvas.getContext(\"2d\");\n    outsideRadius = 255;\n    textRadius = 180;\n    insideRadius = 90;\n    centerX = canvas.width / 2;\n    centerY = canvas.height / 2;\n    console.log(centerX, centerY);\n    nombres.forEach((nombre) => {\n        addItem(nombre);\n    });\n    dibujarRuleta();\n    wink.volume = 0.11;\n    spinSound.volume = 0.29;\n    whoosh.volume = 0.001;\n    lastName.volume = 0.3;\n    tic.volume = 0.29;\n    document.body.style.backgroundColor = `hsl(${(0, utils_1.toInt)(Math.random() * 8745) % 255}deg 70% 0%)`;\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/index.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.toInt = exports.querySelector = void 0;\nconst querySelector = (selector) => {\n    return document.querySelector(selector);\n};\nexports.querySelector = querySelector;\nconst toInt = (num) => {\n    return Math.trunc(num);\n};\nexports.toInt = toInt;\n\n\n//# sourceURL=webpack://daily-roulette/./src/utils/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;let vs = `attribute vec3 aPosition;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}`;

// the fragment shader is called for each pixel
let fs = `
precision mediump float;
#define PI 3.14159265359
#define TWO_PI 6.28318530718.0
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec4 out_color;
float angle = 0.0;
float am_lfo = 0.0;
const int ARRAY_SIZE = 10;

vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);

    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
  float aspect=u_resolution.x/u_resolution.y;
  uv.x*=aspect;
  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);
    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*.4 + u_time*.4);

        d = sin(d*50. + u_time)/8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }
        
  gl_FragColor =  vec4(finalColor, 1.0);
}
`;
  let shaderProgram;
  let graphics;
  let time = Math.random() * 5155 + 2555;
  let deltaTime;

  function setup() {
    createCanvas(windowWidth, windowHeight*.991, WEBGL);
    shaderProgram = createShader(vs, fs);
    graphics = createGraphics(width, height*.991);
    graphics.noSmooth();
    graphics.pixelDensity(1);
  }

  function draw() {
    shader(shaderProgram);

    shaderProgram.setUniform('u_tex', graphics);
    shaderProgram.setUniform('u_resolution', [width, height]);
    shaderProgram.setUniform('u_time', time);
    shaderProgram.setUniform('u_mouse', [mouseX * 0.001, mouseY * 0.001]);
    noStroke();
    rect(-width / 2, -height / 2, width, height);
    time = millis() * .0001;
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }