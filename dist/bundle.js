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

/***/ "./src/components/alertMsg.ts":
/*!************************************!*\
  !*** ./src/components/alertMsg.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.pushAlert = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst alert = (0, utils_1.querySelector)('#alert');\nlet timeoutId;\nconst pushAlert = (text, defaultTime = 3000) => {\n    const alertLog = document.createElement(\"div\");\n    alertLog.textContent = text;\n    alert.appendChild(alertLog);\n    setTimeout(() => {\n        alertLog.remove();\n    }, defaultTime);\n};\nexports.pushAlert = pushAlert;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/alertMsg.ts?");

/***/ }),

/***/ "./src/components/audio.ts":
/*!*********************************!*\
  !*** ./src/components/audio.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initAudio = exports.selectEgyptianScale = exports.selectMajorScale = exports.playWink = exports.playLastName = exports.playChangeItem = exports.playFrequency = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst audioContext = new (window.AudioContext)();\nconst wink = (0, utils_1.querySelector)('#wink');\nconst lastName = (0, utils_1.querySelector)('#last-name');\nlet indiceNota = 0;\nlet duration = 0.2;\nconst majorScale = [\n    523.25,\n    587.33,\n    659.25,\n    698.46,\n    783.99,\n    880.00,\n    987.77 // B\n];\nconst egyptianScale = [\n    587.33,\n    622.25,\n    739.99,\n    783.99,\n    880.00 // A\n];\nlet selectedScale = majorScale;\nconst getNote = () => {\n    const nota = selectedScale[indiceNota];\n    indiceNota = (indiceNota + 1) % selectedScale.length;\n    return nota;\n};\nconst playFrequency = (frequency) => {\n    const oscilador = audioContext.createOscillator();\n    oscilador.type = 'sine'; // (sine, square, sawtooth, triangle)\n    oscilador.frequency.value = frequency;\n    const ganancia = audioContext.createGain();\n    oscilador.connect(ganancia);\n    ganancia.connect(audioContext.destination);\n    oscilador.start();\n    const fadeOutStartTime = audioContext.currentTime + duration - 0.1; // Desvanecimiento de 0.1 segundos antes del final\n    ganancia.gain.setValueAtTime(.04, audioContext.currentTime); // Volumen inicial\n    ganancia.gain.linearRampToValueAtTime(0, fadeOutStartTime); // Desvanecimiento lineal hacia 0\n    oscilador.stop(audioContext.currentTime + duration);\n};\nexports.playFrequency = playFrequency;\nconst playChangeItem = () => {\n    (0, exports.playFrequency)(getNote());\n};\nexports.playChangeItem = playChangeItem;\nconst playLastName = () => __awaiter(void 0, void 0, void 0, function* () {\n    yield lastName.play();\n});\nexports.playLastName = playLastName;\nconst playWink = () => __awaiter(void 0, void 0, void 0, function* () {\n    yield wink.play();\n});\nexports.playWink = playWink;\nconst selectMajorScale = () => {\n    selectedScale = majorScale;\n};\nexports.selectMajorScale = selectMajorScale;\nconst selectEgyptianScale = () => {\n    selectedScale = egyptianScale;\n};\nexports.selectEgyptianScale = selectEgyptianScale;\nconst initAudio = () => {\n    wink.volume = 0.11;\n    lastName.volume = 0.3;\n    duration = 0.2;\n};\nexports.initAudio = initAudio;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/audio.ts?");

/***/ }),

/***/ "./src/components/background.ts":
/*!**************************************!*\
  !*** ./src/components/background.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initBackground = exports.isCustomBackground = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst inputImagen = (0, utils_1.querySelector)('#inputImagen');\nconst stars = (0, utils_1.querySelector)('#stars');\nconst customFileLabel = (0, utils_1.querySelector)('#customFileLabel');\nlet loadedCustomBackground = false;\nconst isCustomBackground = () => loadedCustomBackground;\nexports.isCustomBackground = isCustomBackground;\ninputImagen.addEventListener('change', function (e) {\n    var _a;\n    const file = (_a = e.target) === null || _a === void 0 ? void 0 : _a.files[0];\n    if (file) {\n        customFileLabel.textContent = `Custom background (${file.name})`;\n        const reader = new FileReader();\n        reader.onload = function (e) {\n            var _a;\n            const imagenURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;\n            stars.style.backgroundImage = \"url('\" + imagenURL + \"')\";\n        };\n        reader.readAsDataURL(file);\n        loadedCustomBackground = true;\n    }\n});\nconst initBackground = () => {\n};\nexports.initBackground = initBackground;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/background.ts?");

/***/ }),

/***/ "./src/components/colorPalette.ts":
/*!****************************************!*\
  !*** ./src/components/colorPalette.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.nextHSLAColor = void 0;\nconst HSLAColor_1 = __webpack_require__(/*! ../models/HSLAColor */ \"./src/models/HSLAColor.ts\");\nlet arcAccumulator = 0;\nconst initialOffset = Math.random() * 360;\nconst gateSequence = [45, 80, 70];\nlet indexGate = -1;\nconst gatedLight = () => {\n    indexGate = (indexGate + 1) % gateSequence.length;\n    return gateSequence[indexGate];\n};\nconst nextHSLAColor = () => {\n    arcAccumulator += Math.random() * 15 + 30;\n    const hue = (initialOffset + arcAccumulator) % 360;\n    const saturation = 93;\n    const light = gatedLight() * .6;\n    const alpha = 1;\n    return new HSLAColor_1.HSLAColor(hue, saturation, light, alpha);\n};\nexports.nextHSLAColor = nextHSLAColor;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/colorPalette.ts?");

/***/ }),

/***/ "./src/components/controls.ts":
/*!************************************!*\
  !*** ./src/components/controls.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initControls = void 0;\nconst inputs = Array.from(document.querySelectorAll(\".inputControl input\"));\nconst initControls = () => {\n    inputs.forEach((input) => {\n        input.addEventListener(\"input\", () => {\n            var _a;\n            const label = document.getElementById((_a = input.dataset.displayId) !== null && _a !== void 0 ? _a : \"\");\n            if (label) {\n                label.textContent = parseFloat(input.value).toFixed(3);\n            }\n        });\n    });\n};\nexports.initControls = initControls;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/controls.ts?");

/***/ }),

/***/ "./src/components/emojis.ts":
/*!**********************************!*\
  !*** ./src/components/emojis.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getEmoji = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst emojiFaces = [\"😀\", \"😃\", \"😄\", \"😁\", \"😆\", \"😅\", \"😂\", \"🤣\", \"😊\", \"😇\", \"🙂\", \"🙃\", \"😉\", \"😌\", \"😍\", \"🥰\", \"😘\", \"😗\", \"😙\", \"😚\", \"😋\", \"😛\", \"😝\", \"😜\", \"🤪\", \"🤨\", \"🧐\", \"🤓\", \"😎\", \"🤩\", \"🥳\", \"😏\", \"😒\", \"😞\", \"😔\", \"😟\", \"😕\", \"🙁\", \"☹️\", \"😣\", \"😖\", \"😫\", \"😩\", \"🥺\", \"😢\", \"😭\", \"😤\", \"😠\", \"😡\", \"🤬\", \"🤯\", \"😳\", \"🥵\", \"🥶\", \"😱\", \"😨\", \"😰\", \"😥\", \"😓\", \"🤗\", \"🤔\", \"🤭\", \"🤫\", \"🤥\", \"😶\", \"😐\", \"😑\", \"😬\", \"🙄\", \"😯\", \"😦\", \"😧\", \"😮\", \"😲\", \"😴\", \"🤤\", \"😪\", \"😵\", \"🤐\", \"🥴\", \"🤢\", \"🤮\", \"🤧\", \"😷\", \"🤒\", \"🤕\", \"🤑\", \"🤠\", \"😈\", \"👿\", \"👹\", \"👺\", \"🤡\", \"💩\", \"👻\", \"👽\", \"👾\", \"🤖\", \"🎃\"];\nconst getEmoji = () => {\n    const emoji = emojiFaces[(0, utils_1.toInt)(Math.abs(Math.random() * emojiFaces.length * 3)) % emojiFaces.length];\n    return emoji;\n};\nexports.getEmoji = getEmoji;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/emojis.ts?");

/***/ }),

/***/ "./src/components/itemList.ts":
/*!************************************!*\
  !*** ./src/components/itemList.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initItemList = exports.finishSelectedItem = exports.loadInitialItems = exports.enableItems = exports.disableItems = exports.deleteItem = exports.getSelectedItem = exports.setSelectedItem = exports.getItem = exports.getItems = void 0;\nconst Item_1 = __webpack_require__(/*! ../models/Item */ \"./src/models/Item.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst alertMsg_1 = __webpack_require__(/*! ./alertMsg */ \"./src/components/alertMsg.ts\");\nconst log_1 = __webpack_require__(/*! ./log */ \"./src/components/log.ts\");\nconst wheel_1 = __webpack_require__(/*! ./wheel */ \"./src/components/wheel.ts\");\nconst inputPalabras = (0, utils_1.querySelector)('#itemInput');\nconst addItemButton = (0, utils_1.querySelector)('#addItem-button');\nconst itemListElement = (0, utils_1.querySelector)('#itemList');\nconst saveAsDefaultButton = (0, utils_1.querySelector)('#saveAsDefault');\nlet options = [];\nlet selectedItem;\nlet nombres;\nconst defaultNameJSON = `{\r\n  \"items\":[\r\n     \"default\",\r\n     \"empty\"\r\n  ]\r\n}`;\nconst getItems = () => options;\nexports.getItems = getItems;\nconst getItem = (index) => options[index];\nexports.getItem = getItem;\nconst setSelectedItem = (item) => selectedItem = item;\nexports.setSelectedItem = setSelectedItem;\nconst getSelectedItem = () => selectedItem;\nexports.getSelectedItem = getSelectedItem;\nconst getItemElements = () => [].slice.call(itemListElement.children);\nconst addItem = (valor) => {\n    const name = valor.toUpperCase();\n    const item = new Item_1.Item(name);\n    options.push(item);\n    item.element.onclick = () => {\n        if (options.length > 1) {\n            (0, exports.deleteItem)(item);\n            (0, wheel_1.drawWheel)();\n            (0, wheel_1.dibujarNombreSeleccionado)();\n        }\n        else {\n            (0, alertMsg_1.pushAlert)(\"must exist at least one name\");\n        }\n    };\n    itemListElement.appendChild(item.element);\n};\nconst deleteItem = (item) => __awaiter(void 0, void 0, void 0, function* () {\n    item.element.remove();\n    options = options.filter(i => i.id != item.id);\n});\nexports.deleteItem = deleteItem;\nconst disableItems = () => getItemElements().forEach((item) => item.disabled = true);\nexports.disableItems = disableItems;\nconst enableItems = () => getItemElements().forEach((item) => item.disabled = false);\nexports.enableItems = enableItems;\nconst loadInitialItems = () => {\n    nombres === null || nombres === void 0 ? void 0 : nombres.forEach((nombre) => {\n        addItem(nombre);\n    });\n};\nexports.loadInitialItems = loadInitialItems;\nconst finishSelectedItem = () => {\n    if (selectedItem) {\n        (0, log_1.logTimeAndName)(selectedItem);\n        selectedItem = null;\n    }\n};\nexports.finishSelectedItem = finishSelectedItem;\ninputPalabras.addEventListener(\"keypress\", function (event) {\n    if (event.key === \"Enter\") {\n        event.preventDefault();\n        addItemButton.click();\n    }\n});\ninputPalabras.addEventListener(\"keyup\", function (event) {\n    addItemButton.disabled = !event.target.value.trim();\n});\naddItemButton.addEventListener(\"click\", () => {\n    if (inputPalabras.value != \"\" && (0, exports.getItems)().length < 60) {\n        let names = inputPalabras.value.split(\",\");\n        names.forEach((name) => {\n            if (name.length > 0) {\n                addItem(name);\n            }\n        });\n        (0, wheel_1.drawWheel)();\n        (0, wheel_1.dibujarNombreSeleccionado)();\n        inputPalabras.value = \"\";\n    }\n    else if ((0, exports.getItems)().length == 60) {\n        (0, alertMsg_1.pushAlert)(\"you reached the items limit\");\n    }\n});\nsaveAsDefaultButton.addEventListener(\"click\", () => {\n    (0, utils_1.disableButtonTemporarily)(saveAsDefaultButton);\n    const namesArray = (0, exports.getItems)().map(item => item.name);\n    console.log({ namesArray });\n    localStorage.setItem(\"defaultNames\", JSON.stringify({ items: namesArray }));\n    (0, alertMsg_1.pushAlert)(\"saved 👍\");\n});\nconst initItemList = () => {\n    var _a;\n    const defaultNames = JSON.parse((_a = localStorage.getItem(\"defaultNames\")) !== null && _a !== void 0 ? _a : defaultNameJSON);\n    nombres = defaultNames.items;\n    (0, exports.loadInitialItems)();\n};\nexports.initItemList = initItemList;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/itemList.ts?");

/***/ }),

/***/ "./src/components/log.ts":
/*!*******************************!*\
  !*** ./src/components/log.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.logTimeAndName = exports.increaseCountName = exports.resetCounterNames = exports.getItemCounter = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst time_1 = __webpack_require__(/*! ./time */ \"./src/components/time.ts\");\nconst log = (0, utils_1.querySelector)('#log');\nlet itemCounter = 0;\nconst getItemCounter = () => itemCounter;\nexports.getItemCounter = getItemCounter;\nconst resetCounterNames = () => itemCounter = 0;\nexports.resetCounterNames = resetCounterNames;\nconst increaseCountName = () => itemCounter++;\nexports.increaseCountName = increaseCountName;\nconst logTimeAndName = (item) => {\n    if (item) {\n        log.innerHTML += `\r\n      <div class=\"logEntry\">\r\n        <div>${item.emoji}</div>\r\n        <div>${item.name}</div>\r\n        <div>${(0, time_1.calculateTimeDiffCronometer)()}</div>\r\n      </div>`;\n    }\n};\nexports.logTimeAndName = logTimeAndName;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/log.ts?");

/***/ }),

/***/ "./src/components/starrySky.ts":
/*!*************************************!*\
  !*** ./src/components/starrySky.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initStarrySky = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst randomStarColor = () => {\n    return `hsl(${Math.trunc(Math.random() * 8745) % 255}deg 70% 60%)`;\n};\nfunction initStarrySky() {\n    const maxStars = Math.abs(Math.random() * 293);\n    const stars = (0, utils_1.querySelector)(\"#stars\");\n    for (let i = 0; i < maxStars; i++) {\n        stars.appendChild((() => {\n            let svg = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n            svg.innerHTML = `<defs><filter id=\"glow\"><feGaussianBlur stdDeviation=\"1.5\" result=\"coloredBlur\"/><feMerge><feMergeNode in=\"coloredBlur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter></defs>`;\n            let radius = Math.random() * 2.5 + 3;\n            svg.setAttribute(\"class\", \"star\");\n            svg.setAttribute(\"viewBox\", \"0 0 240 240\");\n            svg.style.width = radius + \"px\";\n            svg.style.height = radius + \"px\";\n            svg.style.transform = \"rotate(\" + ((Math.random() * 100) | 0) + \"deg)\";\n            svg.style.left = ((Math.random() * 120) | 0) + \"vw\";\n            svg.style.top = ((Math.random() * 120) | 0) + \"vh\";\n            svg.style.opacity = (Math.random() * 0.214 + 0.657).toString();\n            let path = document.createElementNS(\"http://www.w3.org/2000/svg\", \"path\");\n            path.setAttribute(\"d\", \"m48,234 73-226 73,226-192-140h238z\");\n            path.setAttribute(\"fill\", randomStarColor());\n            path.setAttribute(\"filter\", \"url(#glow)\");\n            svg.appendChild(path);\n            return svg;\n        })());\n    }\n}\nexports.initStarrySky = initStarrySky;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/starrySky.ts?");

/***/ }),

/***/ "./src/components/time.ts":
/*!********************************!*\
  !*** ./src/components/time.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initTime = exports.calculateTimeDiffCronometer = exports.resetCronometer = exports.clearCronometerText = void 0;\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst itemList_1 = __webpack_require__(/*! ./itemList */ \"./src/components/itemList.ts\");\nconst log_1 = __webpack_require__(/*! ./log */ \"./src/components/log.ts\");\nconst cronometer = (0, utils_1.querySelector)('#cronometer');\nconst time = (0, utils_1.querySelector)('#time');\nlet cronometerTime = (0, utils_1.fixedStartTime)();\nlet lastDateNow = Date.now();\nconst clearCronometerText = () => cronometer.innerText = \"\";\nexports.clearCronometerText = clearCronometerText;\nconst resetCronometer = () => cronometerTime = new Date().getTime();\nexports.resetCronometer = resetCronometer;\nconst calculateTimeDiffCronometer = () => {\n    const difference = new Date().getTime() - cronometerTime;\n    const seconds = (0, utils_1.toInt)(difference / 1000) >= 60\n        ? ((0, utils_1.toInt)(difference / 1000) % 60).toString().padStart(2, \"0\")\n        : (0, utils_1.toInt)(difference / 1000) % 60;\n    const minutes = (0, utils_1.toInt)(difference / 1000 / 60);\n    const out = `${minutes > 0 ? minutes + \"m\" : \"\"}${seconds}s`;\n    return out;\n};\nexports.calculateTimeDiffCronometer = calculateTimeDiffCronometer;\nconst initTime = () => {\n    if (Date.now() - lastDateNow > 1000) {\n        const date = new Date();\n        const minutes = (\"0\" + date.getMinutes()).slice(-2);\n        const hour = (\"0\" + date.getHours()).slice(-2);\n        lastDateNow = Date.now();\n        time.innerText = `${hour}:${minutes}`;\n        if ((0, log_1.getItemCounter)() > 0 && (0, itemList_1.getSelectedItem)() != null) {\n            cronometer.innerText = `+ ${(0, exports.calculateTimeDiffCronometer)()}`;\n        }\n    }\n    requestAnimationFrame(exports.initTime);\n};\nexports.initTime = initTime;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/time.ts?");

/***/ }),

/***/ "./src/components/wheel.ts":
/*!*********************************!*\
  !*** ./src/components/wheel.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initRoulette = exports.isSpinning = exports.setSpinning = exports.dibujarNombreSeleccionado = exports.drawWheel = void 0;\nconst MousePosition_1 = __webpack_require__(/*! ../models/MousePosition */ \"./src/models/MousePosition.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nconst audio_1 = __webpack_require__(/*! ./audio */ \"./src/components/audio.ts\");\nconst background_1 = __webpack_require__(/*! ./background */ \"./src/components/background.ts\");\nconst itemList_1 = __webpack_require__(/*! ./itemList */ \"./src/components/itemList.ts\");\nconst log_1 = __webpack_require__(/*! ./log */ \"./src/components/log.ts\");\nconst time_1 = __webpack_require__(/*! ./time */ \"./src/components/time.ts\");\nconst wheelCanvas = (0, utils_1.querySelector)('#wheelCanvas');\nconst spinButton = (0, utils_1.querySelector)(\"#spinButton\");\nconst frictionRange = (0, utils_1.querySelector)(\"#frictionRange\");\nconst startThresholdRange = (0, utils_1.querySelector)(\"#startThresholdRange\");\nconst stopThresholdRange = (0, utils_1.querySelector)(\"#stopThresholdRange\");\nconst TWO_PI = Math.PI * 2;\nconst contrastThreshold = 24;\nlet startAngle = (Math.random() * 360) | 0;\nlet arc = 0;\nlet spinAngleStart;\nlet spinTime = 0;\nlet spinTimeTotal = 0;\nlet ctx;\nlet centerX;\nlet centerY;\nlet outsideRadius;\nlet textRadius;\nlet insideRadius;\nlet spining = false;\nlet lastIndex;\nlet showIntro = true;\nlet dragging = false;\nconst mousePosition = new MousePosition_1.MousePosition();\nconst gammaCorrection = (value) => {\n    // Gamma value (adjust as needed)\n    const gamma = 2.2;\n    return Math.pow(value / 100, gamma) * 100;\n};\nconst drawWheel = () => {\n    arc = Math.PI / ((0, itemList_1.getItems)().length / 2);\n    ctx.fillStyle = \"rgba(0,0,0,0.1)\";\n    //ctx.globalCompositeOperation = \"difference\";\n    if ((0, background_1.isCustomBackground)()) {\n        ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);\n    }\n    else {\n        ctx.fillRect(0, 0, wheelCanvas.width, wheelCanvas.height);\n    }\n    ctx.translate(centerX, centerY);\n    ctx.strokeStyle = \"white\";\n    ctx.lineWidth = 1;\n    ctx.font = \"13px Helvetica, Arial\";\n    ctx.strokeStyle = \"#999\";\n    ctx.lineWidth = 4;\n    ctx.beginPath();\n    ctx.arc(0, 0, outsideRadius, 0, Math.PI * 2);\n    ctx.stroke();\n    ctx.closePath();\n    (0, itemList_1.getItems)().forEach((item, i) => {\n        const angle = startAngle + i * arc;\n        ctx.fillStyle = item.color.toString();\n        ctx.strokeStyle = \"#333\";\n        ctx.lineWidth = 2;\n        ctx.lineCap = \"round\";\n        ctx.lineJoin = \"round\";\n        ctx.beginPath();\n        ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);\n        ctx.arc(0, 0, insideRadius, angle + arc, angle, true);\n        ctx.stroke();\n        ctx.fill();\n        ctx.save();\n        ctx.shadowOffsetX = -1;\n        ctx.shadowOffsetY = -1;\n        ctx.shadowBlur = 0;\n        ctx.translate(0 + Math.cos(angle + arc / 2) * textRadius, 0 + Math.sin(angle + arc / 2) * textRadius);\n        ctx.rotate(angle + arc / 2 + Math.PI);\n        ctx.font = \"regular 16px 'Roboto'\";\n        ctx.textAlign = \"left\";\n        ctx.textBaseline = \"middle\";\n        const text = (0, itemList_1.getItem)(i).name.split('').join(' ').padEnd(20, ' ');\n        const correctedLuminosity = gammaCorrection(item.color.lightness); // Umbral para decidir el color del texto (ajusta según tus necesidades)\n        const textColor = correctedLuminosity < contrastThreshold ? \"#FEFEFE\" : \"#030303\";\n        ctx.fillStyle = textColor;\n        ctx.strokeStyle = \"rgba(255, 255, 255, .9)\";\n        ctx.lineWidth = 1;\n        //ctx.strokeText(text, -ctx.measureText(text).width / 2, 0);\n        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);\n        ctx.closePath();\n        ctx.restore();\n    });\n    cursorPosition();\n    ctx.translate(-centerX, -centerY);\n};\nexports.drawWheel = drawWheel;\nconst cursorPosition = function () {\n    ctx.fillStyle = \"#ccc\";\n    ctx.strokeStyle = \"#222\";\n    ctx.lineWidth = 1;\n    ctx.beginPath();\n    ctx.lineTo(0 + 4, 0 - (outsideRadius + 10));\n    ctx.lineTo(0 + 4, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 + 9, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 + 0, 0 - (outsideRadius - 18));\n    ctx.lineTo(0 - 9, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 - 4, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 - 4, 0 - (outsideRadius + 10));\n    ctx.fill();\n    ctx.stroke();\n    ctx.closePath();\n    const degrees = (startAngle * 180) / Math.PI + 90;\n    const arcd = (arc * 180) / Math.PI;\n    let currentIndex = Math.floor((360 - (degrees % 360)) / arcd);\n    if (currentIndex !== lastIndex) {\n        lastIndex = currentIndex;\n        (0, audio_1.playChangeItem)();\n    }\n};\nconst dibujarNombreSeleccionado = () => {\n    const item = (0, itemList_1.getSelectedItem)();\n    if (item) {\n        const text = `${item.emoji} ${item.name}`;\n        ctx.save();\n        ctx.translate(centerX, centerY);\n        ctx.fillStyle = \"#f2f2f2\";\n        ctx.font = \"bold 32px Arial\";\n        ctx.fillText(text, 0 - ctx.measureText(text).width / 2, 0 + 10);\n        ctx.fillStyle = \"#eee\";\n        ctx.restore();\n    }\n};\nexports.dibujarNombreSeleccionado = dibujarNombreSeleccionado;\nconst startRotateWheel = () => {\n    if (showIntro)\n        showIntro = false;\n    (0, exports.setSpinning)(true);\n    spinButton.disabled = true;\n    (0, itemList_1.finishSelectedItem)();\n    (0, time_1.clearCronometerText)();\n    rotateWheel();\n};\nconst rotateWheel = () => {\n    if (throwVelocity < (0, utils_1.valueOf)(stopThresholdRange)) {\n        stopRotateWheel();\n    }\n    else {\n        throwVelocity *= (0, utils_1.valueOf)(frictionRange);\n        startAngle += throwVelocity;\n        (0, exports.drawWheel)();\n        requestAnimationFrame(rotateWheel);\n    }\n};\nconst stopRotateWheel = () => {\n    saveInitialState();\n    (0, exports.setSpinning)(false);\n    const item = getFocusedItem();\n    (0, itemList_1.setSelectedItem)(item);\n    (0, time_1.resetCronometer)();\n    (0, exports.dibujarNombreSeleccionado)();\n    (0, log_1.increaseCountName)();\n    if ((0, itemList_1.getItems)().length == 1) {\n        (0, audio_1.playLastName)();\n    }\n    else if ((0, itemList_1.getItems)().length > 1) {\n        (0, audio_1.playWink)();\n        (0, itemList_1.deleteItem)(item);\n    }\n    spinButton.disabled = false;\n    setTimeout(activateIntro, 0);\n};\nconst setSpinning = (state) => {\n    if (state) {\n        spining = state;\n        (0, itemList_1.disableItems)();\n    }\n    else {\n        spining = state;\n        (0, itemList_1.enableItems)();\n    }\n};\nexports.setSpinning = setSpinning;\nconst isSpinning = () => !!spining;\nexports.isSpinning = isSpinning;\nconst getFocusedItem = () => {\n    const degrees = (startAngle * 180) / Math.PI + 90;\n    const arcd = (arc * 180) / Math.PI;\n    const index = Math.floor((360 - (degrees % 360)) / arcd);\n    return (0, itemList_1.getItem)(index);\n};\nfunction calcularAngulo() {\n    // Obtener la posición del mouse relativa al canvas\n    const rect = wheelCanvas.getBoundingClientRect();\n    const x = mousePosition.x - rect.left;\n    const y = mousePosition.y - rect.top;\n    // Obtener las coordenadas del centro del canvas\n    const centerX = wheelCanvas.width / 2;\n    const centerY = wheelCanvas.height / 2;\n    // Calcular el ángulo en radianes utilizando atan2\n    const radians = Math.atan2(y - centerY, x - centerX);\n    return radians;\n}\nlet throwVelocity = 0;\nlet initialPointerAngle = 0;\nlet initialStartAngle = 0;\nconst introAnimation = () => {\n    if (!(0, exports.isSpinning)()) {\n        if (dragging) {\n            const pointerAngle = calcularAngulo();\n            startAngle = (pointerAngle - initialPointerAngle) + initialStartAngle;\n            (0, exports.drawWheel)();\n            throwVelocity = (mousePosition.angle - pointerAngle) * -.7;\n            mousePosition.angle = pointerAngle;\n        }\n        else {\n            if (throwVelocity > (0, utils_1.valueOf)(startThresholdRange)) {\n                startRotateWheel();\n                return;\n            }\n            else if (throwVelocity) {\n                if (throwVelocity > (0, utils_1.valueOf)(stopThresholdRange)) {\n                    throwVelocity *= (0, utils_1.valueOf)(frictionRange);\n                    startAngle += throwVelocity;\n                    (0, exports.drawWheel)();\n                }\n                else {\n                    throwVelocity = 0;\n                }\n            }\n        }\n    }\n    if (showIntro) {\n        requestAnimationFrame(introAnimation);\n    }\n};\nconst activateIntro = () => {\n    showIntro = true;\n    introAnimation();\n};\nconst saveInitialState = () => {\n    initialStartAngle = startAngle;\n    initialPointerAngle = calcularAngulo();\n};\nconst drawMeasures = (radians) => {\n    let degrees = radians * (180 / Math.PI);\n    const rect = wheelCanvas.getBoundingClientRect();\n    const x = mousePosition.x - rect.left;\n    const y = mousePosition.y - rect.top;\n    // Ajustar el rango de ángulos a [0, 360]\n    if (degrees < 0) {\n        degrees += 360;\n    }\n    //ctx.clearRect(0, 0, canvas.width, canvas.height);\n    // Dibujar el eje x\n    ctx.beginPath();\n    ctx.moveTo(0, centerY);\n    ctx.lineTo(wheelCanvas.width, centerY);\n    ctx.strokeStyle = 'green';\n    ctx.lineWidth = 1;\n    ctx.stroke();\n    // Dibujar el eje y\n    ctx.beginPath();\n    ctx.moveTo(centerX, 0);\n    ctx.lineTo(centerX, wheelCanvas.height);\n    ctx.strokeStyle = 'green';\n    ctx.lineWidth = 1;\n    ctx.stroke();\n    // Dibujar la línea\n    ctx.beginPath();\n    ctx.moveTo(centerX, centerY);\n    ctx.lineTo(x, y);\n    ctx.strokeStyle = 'blue';\n    ctx.lineWidth = 2;\n    ctx.stroke();\n    // Dibujar el arco\n    const radius = Math.min(centerX, centerY);\n    const startAngle = 0;\n    const endAngle = radians;\n    ctx.beginPath();\n    ctx.arc(centerX, centerY, radius, startAngle, endAngle);\n    ctx.strokeStyle = 'red';\n    ctx.lineWidth = 2;\n    ctx.stroke();\n};\nwindow.addEventListener(\"keydown\", (e) => {\n    if (e.code === 'KeyS' && e.target == document.body) {\n        e.preventDefault();\n        if (!(0, exports.isSpinning)()) {\n            throwVelocity = 0.3;\n        }\n    }\n});\nspinButton.addEventListener(\"click\", () => {\n    throwVelocity = 0.3;\n});\nwheelCanvas.addEventListener(\"mousedown\", (event) => {\n    dragging = true;\n    saveInitialState();\n    wheelCanvas.classList.add(\"grabbing\");\n});\nwindow.addEventListener(\"mouseup\", (event) => {\n    dragging = false;\n    wheelCanvas.classList.remove(\"grabbing\");\n});\nwindow.addEventListener(\"mousemove\", (event) => {\n    mousePosition.x = event.clientX;\n    mousePosition.y = event.clientY;\n});\nconst initRoulette = () => {\n    ctx = wheelCanvas.getContext(\"2d\");\n    outsideRadius = 255;\n    textRadius = 180;\n    insideRadius = 90;\n    centerX = wheelCanvas.width / 2;\n    centerY = wheelCanvas.height / 2;\n    (0, exports.drawWheel)();\n    introAnimation();\n};\nexports.initRoulette = initRoulette;\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/wheel.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst audio_1 = __webpack_require__(/*! ./components/audio */ \"./src/components/audio.ts\");\nconst controls_1 = __webpack_require__(/*! ./components/controls */ \"./src/components/controls.ts\");\nconst itemList_1 = __webpack_require__(/*! ./components/itemList */ \"./src/components/itemList.ts\");\nconst wheel_1 = __webpack_require__(/*! ./components/wheel */ \"./src/components/wheel.ts\");\nconst starrySky_1 = __webpack_require__(/*! ./components/starrySky */ \"./src/components/starrySky.ts\");\nconst time_1 = __webpack_require__(/*! ./components/time */ \"./src/components/time.ts\");\nconst background_1 = __webpack_require__(/*! ./components/background */ \"./src/components/background.ts\");\nwindow.onload = function () {\n    (0, starrySky_1.initStarrySky)();\n    (0, time_1.initTime)();\n    (0, itemList_1.initItemList)();\n    (0, wheel_1.initRoulette)();\n    (0, audio_1.initAudio)();\n    (0, controls_1.initControls)();\n    (0, background_1.initBackground)();\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/index.ts?");

/***/ }),

/***/ "./src/models/HSLAColor.ts":
/*!*********************************!*\
  !*** ./src/models/HSLAColor.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HSLAColor = void 0;\nclass HSLAColor {\n    constructor(hue, saturation, lightness, alpha) {\n        this.hue = hue;\n        this.saturation = saturation;\n        this.lightness = lightness;\n        this.alpha = alpha;\n    }\n    toString() {\n        return `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;\n    }\n}\nexports.HSLAColor = HSLAColor;\n\n\n//# sourceURL=webpack://daily-roulette/./src/models/HSLAColor.ts?");

/***/ }),

/***/ "./src/models/Item.ts":
/*!****************************!*\
  !*** ./src/models/Item.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Item = void 0;\nconst colorPalette_1 = __webpack_require__(/*! ../components/colorPalette */ \"./src/components/colorPalette.ts\");\nconst emojis_1 = __webpack_require__(/*! ../components/emojis */ \"./src/components/emojis.ts\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nclass Item {\n    constructor(name) {\n        this.buildHTMLButtonElement = () => {\n            const itemElement = document.createElement(\"button\");\n            itemElement.id = this.id;\n            itemElement.className = \"item\";\n            itemElement.innerHTML = `\r\n    <div class=\"name-icon\">${this.emoji}</div>\r\n    <div class=\"name-text\">${this.name}</div>\r\n  `;\n            return itemElement;\n        };\n        this.id = (0, utils_1.uid)();\n        this.name = name;\n        this.emoji = (0, emojis_1.getEmoji)();\n        this.frequency = (0, utils_1.gerFrecuency)();\n        this.element = this.buildHTMLButtonElement();\n        this.color = (0, colorPalette_1.nextHSLAColor)();\n    }\n}\nexports.Item = Item;\n\n\n//# sourceURL=webpack://daily-roulette/./src/models/Item.ts?");

/***/ }),

/***/ "./src/models/MousePosition.ts":
/*!*************************************!*\
  !*** ./src/models/MousePosition.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MousePosition = void 0;\nclass MousePosition {\n    constructor() {\n        this.x = 0;\n        this.y = 0;\n        this.px = 0;\n        this.py = 0;\n        this.angle = 0;\n    }\n}\nexports.MousePosition = MousePosition;\n\n\n//# sourceURL=webpack://daily-roulette/./src/models/MousePosition.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.disableButtonTemporarily = exports.valueOf = exports.easeOut = exports.gerFrecuency = exports.uid = exports.fixedStartTime = exports.toInt = exports.querySelector = void 0;\nconst querySelector = (selector) => {\n    return document.querySelector(selector);\n};\nexports.querySelector = querySelector;\nconst toInt = (num) => {\n    return Math.trunc(num);\n};\nexports.toInt = toInt;\nconst fixedStartTime = () => Math.trunc(new Date().getTime() / 1000) * 1000;\nexports.fixedStartTime = fixedStartTime;\nconst uid = () => {\n    const array = new Uint32Array(8);\n    crypto.getRandomValues(array);\n    let str = '';\n    for (let i = 0; i < array.length; i++) {\n        str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4);\n    }\n    return str;\n};\nexports.uid = uid;\nconst notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];\nconst calculateHz = (nota, octava) => {\n    const distanciaDesdeA4 = (octava - 4) * 12 + notas.indexOf(nota) - notas.indexOf('A');\n    // Fórmula para calcular los hercios de una nota en función de su distancia desde A4\n    const hertzA4 = 440;\n    const hertz = hertzA4 * Math.pow(2, distanciaDesdeA4 / 12);\n    return hertz;\n};\nconst gerFrecuency = () => {\n    const indiceAleatorio = Math.floor(Math.random() * notas.length);\n    const nota = notas[indiceAleatorio];\n    const octava = Math.floor(Math.random() * 3 + 3);\n    return calculateHz(nota, octava);\n};\nexports.gerFrecuency = gerFrecuency;\nconst easeOut = (t, b, c, d) => {\n    const ts = (t /= d) * t;\n    const tc = ts * t;\n    const eased = b + c * (tc + -3 * ts + 3 * t);\n    return eased;\n};\nexports.easeOut = easeOut;\nconst valueOf = (input) => {\n    var _a;\n    return (_a = parseFloat(input.value)) !== null && _a !== void 0 ? _a : .0;\n};\nexports.valueOf = valueOf;\nconst disableButtonTemporarily = (button) => {\n    button.disabled = true;\n    setTimeout(() => button.disabled = false, 600);\n};\nexports.disableButtonTemporarily = disableButtonTemporarily;\n\n\n//# sourceURL=webpack://daily-roulette/./src/utils/index.ts?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;