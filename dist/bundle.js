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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pushAlert: () => (/* binding */ pushAlert)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n\nconst alert = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.querySelector)('#alert');\nlet timeoutId;\nconst pushAlert = (text, defaultTime = 3000) => {\n    const alertLog = document.createElement(\"div\");\n    alertLog.textContent = text;\n    alert.appendChild(alertLog);\n    setTimeout(() => {\n        alertLog.remove();\n    }, defaultTime);\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/alertMsg.ts?");

/***/ }),

/***/ "./src/components/audio.ts":
/*!*********************************!*\
  !*** ./src/components/audio.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initAudio: () => (/* binding */ initAudio),\n/* harmony export */   playChangeItem: () => (/* binding */ playChangeItem),\n/* harmony export */   playFrequency: () => (/* binding */ playFrequency),\n/* harmony export */   playLastName: () => (/* binding */ playLastName),\n/* harmony export */   playWink: () => (/* binding */ playWink),\n/* harmony export */   selectEgyptianScale: () => (/* binding */ selectEgyptianScale),\n/* harmony export */   selectMajorScale: () => (/* binding */ selectMajorScale)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst audioContext = new (window.AudioContext)();\nconst wink = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.querySelector)('#wink');\nconst lastName = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.querySelector)('#last-name');\nlet indiceNota = 0;\nlet duration = 0.2;\nconst majorScale = [\n    523.25,\n    587.33,\n    659.25,\n    698.46,\n    783.99,\n    880.00,\n    987.77 // B\n];\nconst egyptianScale = [\n    587.33,\n    622.25,\n    739.99,\n    783.99,\n    880.00 // A\n];\nlet selectedScale = majorScale;\nconst getNote = () => {\n    const nota = selectedScale[indiceNota];\n    indiceNota = (indiceNota + 1) % selectedScale.length;\n    return nota;\n};\nconst playFrequency = (frequency) => {\n    const oscilador = audioContext.createOscillator();\n    oscilador.type = 'sine'; // (sine, square, sawtooth, triangle)\n    oscilador.frequency.value = frequency;\n    const ganancia = audioContext.createGain();\n    oscilador.connect(ganancia);\n    ganancia.connect(audioContext.destination);\n    oscilador.start();\n    const fadeOutStartTime = audioContext.currentTime + duration - 0.1; // Desvanecimiento de 0.1 segundos antes del final\n    ganancia.gain.setValueAtTime(.04, audioContext.currentTime); // Volumen inicial\n    ganancia.gain.linearRampToValueAtTime(0, fadeOutStartTime); // Desvanecimiento lineal hacia 0\n    oscilador.stop(audioContext.currentTime + duration);\n};\nconst playChangeItem = () => {\n    playFrequency(getNote());\n};\nconst playLastName = () => __awaiter(void 0, void 0, void 0, function* () {\n    yield lastName.play();\n});\nconst playWink = () => __awaiter(void 0, void 0, void 0, function* () {\n    yield wink.play();\n});\nconst selectMajorScale = () => {\n    selectedScale = majorScale;\n};\nconst selectEgyptianScale = () => {\n    selectedScale = egyptianScale;\n};\nconst initAudio = () => {\n    wink.volume = 0.11;\n    lastName.volume = 0.3;\n    duration = 0.2;\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/audio.ts?");

/***/ }),

/***/ "./src/components/colorPalette.ts":
/*!****************************************!*\
  !*** ./src/components/colorPalette.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   nextHSLAColor: () => (/* binding */ nextHSLAColor)\n/* harmony export */ });\n/* harmony import */ var _models_HSLAColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/HSLAColor */ \"./src/models/HSLAColor.ts\");\n\nlet arcAccumulator = 0;\nconst initialOffset = Math.random() * 360;\nconst gateSequence = [45, 80, 70];\nlet indexGate = -1;\nconst gatedLight = () => {\n    indexGate = (indexGate + 1) % gateSequence.length;\n    return gateSequence[indexGate];\n};\nconst nextHSLAColor = () => {\n    arcAccumulator += Math.random() * 20 + 30;\n    const hue = (initialOffset + arcAccumulator) % 360;\n    const saturation = 69;\n    const light = gatedLight();\n    const alpha = 1;\n    return new _models_HSLAColor__WEBPACK_IMPORTED_MODULE_0__.HSLAColor(hue, saturation, light, alpha);\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/colorPalette.ts?");

/***/ }),

/***/ "./src/components/controls.ts":
/*!************************************!*\
  !*** ./src/components/controls.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initControls: () => (/* binding */ initControls)\n/* harmony export */ });\nconst inputs = Array.from(document.querySelectorAll(\".inputControl input\"));\nconst initControls = () => {\n    inputs.forEach((input) => {\n        input.addEventListener(\"input\", () => {\n            var _a;\n            const label = document.getElementById((_a = input.dataset.displayId) !== null && _a !== void 0 ? _a : \"\");\n            if (label) {\n                label.textContent = parseFloat(input.value).toFixed(3);\n            }\n        });\n    });\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/controls.ts?");

/***/ }),

/***/ "./src/components/emojis.ts":
/*!**********************************!*\
  !*** ./src/components/emojis.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getEmoji: () => (/* binding */ getEmoji)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n\nconst emojiFaces = [\"😀\", \"😃\", \"😄\", \"😁\", \"😆\", \"😅\", \"😂\", \"🤣\", \"😊\", \"😇\", \"🙂\", \"🙃\", \"😉\", \"😌\", \"😍\", \"🥰\", \"😘\", \"😗\", \"😙\", \"😚\", \"😋\", \"😛\", \"😝\", \"😜\", \"🤪\", \"🤨\", \"🧐\", \"🤓\", \"😎\", \"🤩\", \"🥳\", \"😏\", \"😒\", \"😞\", \"😔\", \"😟\", \"😕\", \"🙁\", \"☹️\", \"😣\", \"😖\", \"😫\", \"😩\", \"🥺\", \"😢\", \"😭\", \"😤\", \"😠\", \"😡\", \"🤬\", \"🤯\", \"😳\", \"🥵\", \"🥶\", \"😱\", \"😨\", \"😰\", \"😥\", \"😓\", \"🤗\", \"🤔\", \"🤭\", \"🤫\", \"🤥\", \"😶\", \"😐\", \"😑\", \"😬\", \"🙄\", \"😯\", \"😦\", \"😧\", \"😮\", \"😲\", \"😴\", \"🤤\", \"😪\", \"😵\", \"🤐\", \"🥴\", \"🤢\", \"🤮\", \"🤧\", \"😷\", \"🤒\", \"🤕\", \"🤑\", \"🤠\", \"😈\", \"👿\", \"👹\", \"👺\", \"🤡\", \"💩\", \"👻\", \"👽\", \"👾\", \"🤖\", \"🎃\"];\nconst getEmoji = () => {\n    const emoji = emojiFaces[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.toInt)(Math.abs(Math.random() * emojiFaces.length * 3)) % emojiFaces.length];\n    return emoji;\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/emojis.ts?");

/***/ }),

/***/ "./src/components/itemList.ts":
/*!************************************!*\
  !*** ./src/components/itemList.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteItem: () => (/* binding */ deleteItem),\n/* harmony export */   disableItems: () => (/* binding */ disableItems),\n/* harmony export */   enableItems: () => (/* binding */ enableItems),\n/* harmony export */   finishSelectedItem: () => (/* binding */ finishSelectedItem),\n/* harmony export */   getItem: () => (/* binding */ getItem),\n/* harmony export */   getItems: () => (/* binding */ getItems),\n/* harmony export */   getSelectedItem: () => (/* binding */ getSelectedItem),\n/* harmony export */   initItemList: () => (/* binding */ initItemList),\n/* harmony export */   loadInitialItems: () => (/* binding */ loadInitialItems),\n/* harmony export */   setSelectedItem: () => (/* binding */ setSelectedItem)\n/* harmony export */ });\n/* harmony import */ var _models_Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Item */ \"./src/models/Item.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _alertMsg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alertMsg */ \"./src/components/alertMsg.ts\");\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./log */ \"./src/components/log.ts\");\n/* harmony import */ var _wheel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wheel */ \"./src/components/wheel.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nconst inputPalabras = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)('#itemInput');\nconst addItemButton = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)('#addItem-button');\nconst itemListElement = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)('#itemList');\nconst saveAsDefaultButton = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)('#saveAsDefault');\nlet options = [];\nlet selectedItem;\nlet nombres;\nconst defaultNameJSON = `{\r\n  \"items\":[\r\n     \"default\",\r\n     \"empty\"\r\n  ]\r\n}`;\nconst getItems = () => options;\nconst getItem = (index) => options[index];\nconst setSelectedItem = (item) => selectedItem = item;\nconst getSelectedItem = () => selectedItem;\nconst getItemElements = () => [].slice.call(itemListElement.children);\nconst addItem = (valor) => {\n    const name = valor.toUpperCase();\n    const item = new _models_Item__WEBPACK_IMPORTED_MODULE_0__.Item(name);\n    options.push(item);\n    item.element.onclick = () => {\n        deleteItem(item);\n        (0,_wheel__WEBPACK_IMPORTED_MODULE_4__.drawWheel)();\n        (0,_wheel__WEBPACK_IMPORTED_MODULE_4__.dibujarNombreSeleccionado)();\n    };\n    itemListElement.appendChild(item.element);\n};\nconst deleteItem = (item) => __awaiter(void 0, void 0, void 0, function* () {\n    item.element.remove();\n    options = options.filter(i => i.id != item.id);\n});\nconst disableItems = () => getItemElements().forEach((item) => item.disabled = true);\nconst enableItems = () => getItemElements().forEach((item) => item.disabled = false);\nconst loadInitialItems = () => {\n    nombres === null || nombres === void 0 ? void 0 : nombres.forEach((nombre) => {\n        addItem(nombre);\n    });\n};\nconst finishSelectedItem = () => {\n    if (selectedItem) {\n        (0,_log__WEBPACK_IMPORTED_MODULE_3__.logTimeAndName)(selectedItem);\n        selectedItem = null;\n    }\n};\ninputPalabras.addEventListener(\"keypress\", function (event) {\n    if (event.key === \"Enter\") {\n        event.preventDefault();\n        addItemButton.click();\n    }\n});\ninputPalabras.addEventListener(\"keyup\", function (event) {\n    addItemButton.disabled = !event.target.value.trim();\n});\naddItemButton.addEventListener(\"click\", () => {\n    if (inputPalabras.value != \"\" && getItems().length < 60) {\n        let names = inputPalabras.value.split(\",\");\n        names.forEach((name) => {\n            if (name.length > 0) {\n                addItem(name);\n            }\n        });\n        (0,_wheel__WEBPACK_IMPORTED_MODULE_4__.drawWheel)();\n        (0,_wheel__WEBPACK_IMPORTED_MODULE_4__.dibujarNombreSeleccionado)();\n        inputPalabras.value = \"\";\n    }\n    else if (getItems().length == 60) {\n        (0,_alertMsg__WEBPACK_IMPORTED_MODULE_2__.pushAlert)(\"you reached the items limit\");\n    }\n});\nsaveAsDefaultButton.addEventListener(\"click\", () => {\n    const namesArray = getItems().map(item => item.name);\n    console.log({ namesArray });\n    localStorage.setItem(\"defaultNames\", JSON.stringify({ items: namesArray }));\n    (0,_alertMsg__WEBPACK_IMPORTED_MODULE_2__.pushAlert)(\"saved 👍\");\n});\nconst initItemList = () => {\n    var _a;\n    const defaultNames = JSON.parse((_a = localStorage.getItem(\"defaultNames\")) !== null && _a !== void 0 ? _a : defaultNameJSON);\n    nombres = defaultNames.items;\n    loadInitialItems();\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/itemList.ts?");

/***/ }),

/***/ "./src/components/log.ts":
/*!*******************************!*\
  !*** ./src/components/log.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getItemCounter: () => (/* binding */ getItemCounter),\n/* harmony export */   increaseCountName: () => (/* binding */ increaseCountName),\n/* harmony export */   logTimeAndName: () => (/* binding */ logTimeAndName),\n/* harmony export */   resetCounterNames: () => (/* binding */ resetCounterNames)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time */ \"./src/components/time.ts\");\n\n\nconst log = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.querySelector)('#log');\nlet itemCounter = 0;\nconst getItemCounter = () => itemCounter;\nconst resetCounterNames = () => itemCounter = 0;\nconst increaseCountName = () => itemCounter++;\nconst logTimeAndName = (item) => {\n    if (item) {\n        log.innerHTML += `\r\n      <div class=\"logEntry\">\r\n        <div>${item.emoji}</div>\r\n        <div>${item.name}</div>\r\n        <div>${(0,_time__WEBPACK_IMPORTED_MODULE_1__.calculateTimeDiffCronometer)()}</div>\r\n      </div>`;\n    }\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/log.ts?");

/***/ }),

/***/ "./src/components/starrySky.ts":
/*!*************************************!*\
  !*** ./src/components/starrySky.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initStarrySky: () => (/* binding */ initStarrySky)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n\nconst randomStarColor = () => {\n    return `hsl(${Math.trunc(Math.random() * 8745) % 255}deg 70% 60%)`;\n};\nfunction initStarrySky() {\n    const maxStars = Math.abs(Math.random() * 293);\n    const stars = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.querySelector)(\"#stars\");\n    for (let i = 0; i < maxStars; i++) {\n        stars.appendChild((() => {\n            let svg = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n            svg.innerHTML = `<defs><filter id=\"glow\"><feGaussianBlur stdDeviation=\"1.5\" result=\"coloredBlur\"/><feMerge><feMergeNode in=\"coloredBlur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter></defs>`;\n            let radius = Math.random() * 2.5 + 3;\n            svg.setAttribute(\"class\", \"star\");\n            svg.setAttribute(\"viewBox\", \"0 0 240 240\");\n            svg.style.width = radius + \"px\";\n            svg.style.height = radius + \"px\";\n            svg.style.transform = \"rotate(\" + ((Math.random() * 100) | 0) + \"deg)\";\n            svg.style.left = ((Math.random() * 120) | 0) + \"vw\";\n            svg.style.top = ((Math.random() * 120) | 0) + \"vh\";\n            svg.style.opacity = (Math.random() * 0.214 + 0.657).toString();\n            let path = document.createElementNS(\"http://www.w3.org/2000/svg\", \"path\");\n            path.setAttribute(\"d\", \"m48,234 73-226 73,226-192-140h238z\");\n            path.setAttribute(\"fill\", randomStarColor());\n            path.setAttribute(\"filter\", \"url(#glow)\");\n            svg.appendChild(path);\n            return svg;\n        })());\n    }\n}\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/starrySky.ts?");

/***/ }),

/***/ "./src/components/time.ts":
/*!********************************!*\
  !*** ./src/components/time.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   calculateTimeDiffCronometer: () => (/* binding */ calculateTimeDiffCronometer),\n/* harmony export */   clearCronometerText: () => (/* binding */ clearCronometerText),\n/* harmony export */   initTime: () => (/* binding */ initTime),\n/* harmony export */   resetCronometer: () => (/* binding */ resetCronometer)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _itemList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./itemList */ \"./src/components/itemList.ts\");\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./log */ \"./src/components/log.ts\");\n\n\n\nconst cronometer = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.querySelector)('#cronometer');\nconst time = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.querySelector)('#time');\nlet cronometerTime = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.fixedStartTime)();\nlet lastDateNow = Date.now();\nconst clearCronometerText = () => cronometer.innerText = \"\";\nconst resetCronometer = () => cronometerTime = new Date().getTime();\nconst calculateTimeDiffCronometer = () => {\n    const difference = new Date().getTime() - cronometerTime;\n    const seconds = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.toInt)(difference / 1000) >= 60\n        ? ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.toInt)(difference / 1000) % 60).toString().padStart(2, \"0\")\n        : (0,_utils__WEBPACK_IMPORTED_MODULE_0__.toInt)(difference / 1000) % 60;\n    const minutes = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.toInt)(difference / 1000 / 60);\n    const out = `${minutes > 0 ? minutes + \"m\" : \"\"}${seconds}s`;\n    return out;\n};\nconst initTime = () => {\n    if (Date.now() - lastDateNow > 1000) {\n        const date = new Date();\n        const minutes = (\"0\" + date.getMinutes()).slice(-2);\n        const hour = (\"0\" + date.getHours()).slice(-2);\n        lastDateNow = Date.now();\n        time.innerText = `${hour}:${minutes}`;\n        if ((0,_log__WEBPACK_IMPORTED_MODULE_2__.getItemCounter)() > 0 && (0,_itemList__WEBPACK_IMPORTED_MODULE_1__.getSelectedItem)() != null) {\n            cronometer.innerText = `+ ${calculateTimeDiffCronometer()}`;\n        }\n    }\n    requestAnimationFrame(initTime);\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/time.ts?");

/***/ }),

/***/ "./src/components/wheel.ts":
/*!*********************************!*\
  !*** ./src/components/wheel.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dibujarNombreSeleccionado: () => (/* binding */ dibujarNombreSeleccionado),\n/* harmony export */   drawWheel: () => (/* binding */ drawWheel),\n/* harmony export */   initRoulette: () => (/* binding */ initRoulette),\n/* harmony export */   isSpinning: () => (/* binding */ isSpinning),\n/* harmony export */   setSpinning: () => (/* binding */ setSpinning)\n/* harmony export */ });\n/* harmony import */ var _models_MousePosition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/MousePosition */ \"./src/models/MousePosition.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio */ \"./src/components/audio.ts\");\n/* harmony import */ var _itemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./itemList */ \"./src/components/itemList.ts\");\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./log */ \"./src/components/log.ts\");\n/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./time */ \"./src/components/time.ts\");\n\n\n\n\n\n\nconst wheelCanvas = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)('#wheelCanvas');\nconst spinButton = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)(\"#spinButton\");\nconst frictionRange = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)(\"#frictionRange\");\nconst startThresholdRange = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)(\"#startThresholdRange\");\nconst stopThresholdRange = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)(\"#stopThresholdRange\");\nconst TWO_PI = Math.PI * 2;\nconst contrastThreshold = 24;\nlet startAngle = (Math.random() * 360) | 0;\nlet arc = 0;\nlet spinAngleStart;\nlet spinTime = 0;\nlet spinTimeTotal = 0;\nlet ctx;\nlet centerX;\nlet centerY;\nlet outsideRadius;\nlet textRadius;\nlet insideRadius;\nlet spining = false;\nlet lastIndex;\nlet showIntro = true;\nlet dragging = false;\nconst mousePosition = new _models_MousePosition__WEBPACK_IMPORTED_MODULE_0__.MousePosition();\nconst gammaCorrection = (value) => {\n    // Gamma value (adjust as needed)\n    const gamma = 2.2;\n    return Math.pow(value / 100, gamma) * 100;\n};\nconst drawWheel = () => {\n    arc = Math.PI / ((0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getItems)().length / 2);\n    ctx.fillStyle = \"rgba(0,0,0,0.1)\";\n    ctx.fillRect(0, 0, wheelCanvas.width, wheelCanvas.height);\n    //ctx.globalCompositeOperation = \"difference\";\n    //ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.translate(centerX, centerY);\n    ctx.strokeStyle = \"white\";\n    ctx.lineWidth = 1;\n    ctx.font = \"13px Helvetica, Arial\";\n    ctx.strokeStyle = \"#999\";\n    ctx.lineWidth = 4;\n    ctx.beginPath();\n    ctx.arc(0, 0, outsideRadius, 0, Math.PI * 2);\n    ctx.stroke();\n    ctx.closePath();\n    (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getItems)().forEach((item, i) => {\n        const angle = startAngle + i * arc;\n        ctx.fillStyle = item.color.toString();\n        ctx.strokeStyle = \"#333\";\n        ctx.lineWidth = 2;\n        ctx.lineCap = \"round\";\n        ctx.lineJoin = \"round\";\n        ctx.beginPath();\n        ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);\n        ctx.arc(0, 0, insideRadius, angle + arc, angle, true);\n        ctx.stroke();\n        ctx.fill();\n        ctx.save();\n        ctx.shadowOffsetX = -1;\n        ctx.shadowOffsetY = -1;\n        ctx.shadowBlur = 0;\n        ctx.translate(0 + Math.cos(angle + arc / 2) * textRadius, 0 + Math.sin(angle + arc / 2) * textRadius);\n        ctx.rotate(angle + arc / 2 + Math.PI);\n        ctx.font = \"regular 16px 'Roboto'\";\n        ctx.textAlign = \"left\";\n        ctx.textBaseline = \"middle\";\n        const text = (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getItem)(i).name.split('').join(' ').padEnd(20, ' ');\n        const correctedLuminosity = gammaCorrection(item.color.lightness); // Umbral para decidir el color del texto (ajusta según tus necesidades)\n        const textColor = correctedLuminosity < contrastThreshold ? \"#FEFEFE\" : \"#030303\";\n        ctx.fillStyle = textColor;\n        ctx.strokeStyle = \"rgba(255, 255, 255, .9)\";\n        ctx.lineWidth = 1;\n        //ctx.strokeText(text, -ctx.measureText(text).width / 2, 0);\n        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);\n        ctx.closePath();\n        ctx.restore();\n    });\n    cursorPosition();\n    ctx.translate(-centerX, -centerY);\n};\nconst cursorPosition = function () {\n    ctx.fillStyle = \"#ccc\";\n    ctx.strokeStyle = \"#222\";\n    ctx.lineWidth = 1;\n    ctx.beginPath();\n    ctx.lineTo(0 + 4, 0 - (outsideRadius + 10));\n    ctx.lineTo(0 + 4, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 + 9, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 + 0, 0 - (outsideRadius - 18));\n    ctx.lineTo(0 - 9, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 - 4, 0 - (outsideRadius - 10));\n    ctx.lineTo(0 - 4, 0 - (outsideRadius + 10));\n    ctx.fill();\n    ctx.stroke();\n    ctx.closePath();\n    const degrees = (startAngle * 180) / Math.PI + 90;\n    const arcd = (arc * 180) / Math.PI;\n    let currentIndex = Math.floor((360 - (degrees % 360)) / arcd);\n    if (currentIndex !== lastIndex) {\n        lastIndex = currentIndex;\n        (0,_audio__WEBPACK_IMPORTED_MODULE_2__.playChangeItem)();\n    }\n};\nconst dibujarNombreSeleccionado = () => {\n    const item = (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getSelectedItem)();\n    if (item) {\n        const text = `${item.emoji} ${item.name}`;\n        ctx.save();\n        ctx.translate(centerX, centerY);\n        ctx.fillStyle = \"#f2f2f2\";\n        ctx.font = \"bold 32px Arial\";\n        ctx.fillText(text, 0 - ctx.measureText(text).width / 2, 0 + 10);\n        ctx.fillStyle = \"#eee\";\n        ctx.restore();\n    }\n};\nconst startRotateWheel = () => {\n    if (showIntro)\n        showIntro = false;\n    if (spinTime >= spinTimeTotal) {\n        if ((0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getItems)().length < 1) {\n            console.info('Debe haber al menos 2 opciones');\n        }\n        else {\n            setSpinning(true);\n            spinButton.disabled = true;\n            (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.finishSelectedItem)();\n            (0,_time__WEBPACK_IMPORTED_MODULE_5__.clearCronometerText)();\n            rotateWheel();\n        }\n    }\n};\nconst rotateWheel = () => {\n    if (throwVelocity < (0,_utils__WEBPACK_IMPORTED_MODULE_1__.valueOf)(stopThresholdRange)) {\n        stopRotateWheel();\n    }\n    else {\n        throwVelocity *= (0,_utils__WEBPACK_IMPORTED_MODULE_1__.valueOf)(frictionRange);\n        startAngle += throwVelocity;\n        drawWheel();\n        requestAnimationFrame(rotateWheel);\n    }\n};\nconst stopRotateWheel = () => {\n    setSpinning(false);\n    const item = getFocusedItem();\n    (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.setSelectedItem)(item);\n    (0,_time__WEBPACK_IMPORTED_MODULE_5__.resetCronometer)();\n    dibujarNombreSeleccionado();\n    (0,_log__WEBPACK_IMPORTED_MODULE_4__.increaseCountName)();\n    if ((0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getItems)().length == 1) {\n        (0,_audio__WEBPACK_IMPORTED_MODULE_2__.playLastName)();\n    }\n    else if ((0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getItems)().length > 1) {\n        (0,_audio__WEBPACK_IMPORTED_MODULE_2__.playWink)();\n        (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.deleteItem)(item);\n    }\n    spinButton.disabled = false;\n    setTimeout(activateIntro, 0);\n};\nconst setSpinning = (state) => {\n    if (state) {\n        spining = state;\n        (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.disableItems)();\n    }\n    else {\n        spining = state;\n        (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.enableItems)();\n    }\n};\nconst isSpinning = () => !!spining;\nconst getFocusedItem = () => {\n    const degrees = (startAngle * 180) / Math.PI + 90;\n    const arcd = (arc * 180) / Math.PI;\n    const index = Math.floor((360 - (degrees % 360)) / arcd);\n    return (0,_itemList__WEBPACK_IMPORTED_MODULE_3__.getItem)(index);\n};\nfunction calcularAngulo() {\n    // Obtener la posición del mouse relativa al canvas\n    const rect = wheelCanvas.getBoundingClientRect();\n    const x = mousePosition.x - rect.left;\n    const y = mousePosition.y - rect.top;\n    // Obtener las coordenadas del centro del canvas\n    const centerX = wheelCanvas.width / 2;\n    const centerY = wheelCanvas.height / 2;\n    // Calcular el ángulo en radianes utilizando atan2\n    const radians = Math.atan2(y - centerY, x - centerX);\n    return radians;\n}\nlet throwVelocity = 0;\nlet initialPointerAngle = 0;\nlet initialStartAngle = 0;\nconst introAnimation = () => {\n    if (dragging) {\n        const pointerAngle = calcularAngulo();\n        startAngle = (pointerAngle - initialPointerAngle) + initialStartAngle;\n        drawWheel();\n        throwVelocity = (mousePosition.angle - pointerAngle) * -.7;\n        mousePosition.angle = pointerAngle;\n    }\n    else {\n        if (throwVelocity > (0,_utils__WEBPACK_IMPORTED_MODULE_1__.valueOf)(startThresholdRange)) {\n            startRotateWheel();\n            return;\n        }\n        else if (throwVelocity) {\n            if (throwVelocity > (0,_utils__WEBPACK_IMPORTED_MODULE_1__.valueOf)(stopThresholdRange)) {\n                throwVelocity *= (0,_utils__WEBPACK_IMPORTED_MODULE_1__.valueOf)(frictionRange);\n                startAngle += throwVelocity;\n                drawWheel();\n            }\n            else {\n                throwVelocity = 0;\n            }\n        }\n    }\n    if (showIntro) {\n        requestAnimationFrame(introAnimation);\n    }\n};\nconst activateIntro = () => {\n    showIntro = true;\n    introAnimation();\n};\nconst drawMeasures = (radians) => {\n    let degrees = radians * (180 / Math.PI);\n    const rect = wheelCanvas.getBoundingClientRect();\n    const x = mousePosition.x - rect.left;\n    const y = mousePosition.y - rect.top;\n    // Ajustar el rango de ángulos a [0, 360]\n    if (degrees < 0) {\n        degrees += 360;\n    }\n    //ctx.clearRect(0, 0, canvas.width, canvas.height);\n    // Dibujar el eje x\n    ctx.beginPath();\n    ctx.moveTo(0, centerY);\n    ctx.lineTo(wheelCanvas.width, centerY);\n    ctx.strokeStyle = 'green';\n    ctx.lineWidth = 1;\n    ctx.stroke();\n    // Dibujar el eje y\n    ctx.beginPath();\n    ctx.moveTo(centerX, 0);\n    ctx.lineTo(centerX, wheelCanvas.height);\n    ctx.strokeStyle = 'green';\n    ctx.lineWidth = 1;\n    ctx.stroke();\n    // Dibujar la línea\n    ctx.beginPath();\n    ctx.moveTo(centerX, centerY);\n    ctx.lineTo(x, y);\n    ctx.strokeStyle = 'blue';\n    ctx.lineWidth = 2;\n    ctx.stroke();\n    // Dibujar el arco\n    const radius = Math.min(centerX, centerY);\n    const startAngle = 0;\n    const endAngle = radians;\n    ctx.beginPath();\n    ctx.arc(centerX, centerY, radius, startAngle, endAngle);\n    ctx.strokeStyle = 'red';\n    ctx.lineWidth = 2;\n    ctx.stroke();\n};\nwindow.addEventListener(\"keydown\", (e) => {\n    if (e.code === 'KeyS' && e.target == document.body) {\n        e.preventDefault();\n        if (!isSpinning()) {\n            startRotateWheel();\n        }\n        ;\n    }\n});\nspinButton.addEventListener(\"click\", startRotateWheel);\nwheelCanvas.addEventListener(\"mousedown\", (event) => {\n    dragging = true;\n    initialPointerAngle = calcularAngulo();\n    initialStartAngle = startAngle;\n    wheelCanvas.classList.add(\"grabbing\");\n});\nwindow.addEventListener(\"mouseup\", (event) => {\n    dragging = false;\n    wheelCanvas.classList.remove(\"grabbing\");\n});\nwindow.addEventListener(\"mousemove\", (event) => {\n    mousePosition.x = event.clientX;\n    mousePosition.y = event.clientY;\n});\nconst initRoulette = () => {\n    ctx = wheelCanvas.getContext(\"2d\");\n    outsideRadius = 255;\n    textRadius = 180;\n    insideRadius = 90;\n    centerX = wheelCanvas.width / 2;\n    centerY = wheelCanvas.height / 2;\n    drawWheel();\n    introAnimation();\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/components/wheel.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/audio */ \"./src/components/audio.ts\");\n/* harmony import */ var _components_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/controls */ \"./src/components/controls.ts\");\n/* harmony import */ var _components_itemList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/itemList */ \"./src/components/itemList.ts\");\n/* harmony import */ var _components_wheel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/wheel */ \"./src/components/wheel.ts\");\n/* harmony import */ var _components_starrySky__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/starrySky */ \"./src/components/starrySky.ts\");\n/* harmony import */ var _components_time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/time */ \"./src/components/time.ts\");\n\n\n\n\n\n\nwindow.onload = function () {\n    (0,_components_starrySky__WEBPACK_IMPORTED_MODULE_4__.initStarrySky)();\n    (0,_components_time__WEBPACK_IMPORTED_MODULE_5__.initTime)();\n    (0,_components_itemList__WEBPACK_IMPORTED_MODULE_2__.initItemList)();\n    (0,_components_wheel__WEBPACK_IMPORTED_MODULE_3__.initRoulette)();\n    (0,_components_audio__WEBPACK_IMPORTED_MODULE_0__.initAudio)();\n    (0,_components_controls__WEBPACK_IMPORTED_MODULE_1__.initControls)();\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/index.ts?");

/***/ }),

/***/ "./src/models/HSLAColor.ts":
/*!*********************************!*\
  !*** ./src/models/HSLAColor.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HSLAColor: () => (/* binding */ HSLAColor)\n/* harmony export */ });\nclass HSLAColor {\n    constructor(hue, saturation, lightness, alpha) {\n        this.hue = hue;\n        this.saturation = saturation;\n        this.lightness = lightness;\n        this.alpha = alpha;\n    }\n    toString() {\n        return `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;\n    }\n}\n\n\n//# sourceURL=webpack://daily-roulette/./src/models/HSLAColor.ts?");

/***/ }),

/***/ "./src/models/Item.ts":
/*!****************************!*\
  !*** ./src/models/Item.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Item: () => (/* binding */ Item)\n/* harmony export */ });\n/* harmony import */ var _components_colorPalette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/colorPalette */ \"./src/components/colorPalette.ts\");\n/* harmony import */ var _components_emojis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/emojis */ \"./src/components/emojis.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\n\n\n\nclass Item {\n    constructor(name) {\n        this.buildHTMLButtonElement = () => {\n            const itemElement = document.createElement(\"button\");\n            itemElement.id = this.id;\n            itemElement.className = \"item\";\n            itemElement.innerHTML = `\r\n    <div class=\"name-icon\">${this.emoji}</div>\r\n    <div class=\"name-text\">${this.name}</div>\r\n  `;\n            return itemElement;\n        };\n        this.id = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.uid)();\n        this.name = name;\n        this.emoji = (0,_components_emojis__WEBPACK_IMPORTED_MODULE_1__.getEmoji)();\n        this.frequency = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.gerFrecuency)();\n        this.element = this.buildHTMLButtonElement();\n        this.color = (0,_components_colorPalette__WEBPACK_IMPORTED_MODULE_0__.nextHSLAColor)();\n    }\n}\n\n\n//# sourceURL=webpack://daily-roulette/./src/models/Item.ts?");

/***/ }),

/***/ "./src/models/MousePosition.ts":
/*!*************************************!*\
  !*** ./src/models/MousePosition.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MousePosition: () => (/* binding */ MousePosition)\n/* harmony export */ });\nclass MousePosition {\n    constructor() {\n        this.x = 0;\n        this.y = 0;\n        this.px = 0;\n        this.py = 0;\n        this.angle = 0;\n    }\n}\n\n\n//# sourceURL=webpack://daily-roulette/./src/models/MousePosition.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   easeOut: () => (/* binding */ easeOut),\n/* harmony export */   fixedStartTime: () => (/* binding */ fixedStartTime),\n/* harmony export */   gerFrecuency: () => (/* binding */ gerFrecuency),\n/* harmony export */   querySelector: () => (/* binding */ querySelector),\n/* harmony export */   toInt: () => (/* binding */ toInt),\n/* harmony export */   uid: () => (/* binding */ uid),\n/* harmony export */   valueOf: () => (/* binding */ valueOf)\n/* harmony export */ });\nconst querySelector = (selector) => {\n    return document.querySelector(selector);\n};\nconst toInt = (num) => {\n    return Math.trunc(num);\n};\nconst fixedStartTime = () => Math.trunc(new Date().getTime() / 1000) * 1000;\nconst uid = () => {\n    const array = new Uint32Array(8);\n    crypto.getRandomValues(array);\n    let str = '';\n    for (let i = 0; i < array.length; i++) {\n        str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4);\n    }\n    return str;\n};\nconst notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];\nconst calculateHz = (nota, octava) => {\n    const distanciaDesdeA4 = (octava - 4) * 12 + notas.indexOf(nota) - notas.indexOf('A');\n    // Fórmula para calcular los hercios de una nota en función de su distancia desde A4\n    const hertzA4 = 440;\n    const hertz = hertzA4 * Math.pow(2, distanciaDesdeA4 / 12);\n    return hertz;\n};\nconst gerFrecuency = () => {\n    const indiceAleatorio = Math.floor(Math.random() * notas.length);\n    const nota = notas[indiceAleatorio];\n    const octava = Math.floor(Math.random() * 3 + 3);\n    return calculateHz(nota, octava);\n};\nconst easeOut = (t, b, c, d) => {\n    const ts = (t /= d) * t;\n    const tc = ts * t;\n    const eased = b + c * (tc + -3 * ts + 3 * t);\n    return eased;\n};\nconst valueOf = (input) => {\n    var _a;\n    return (_a = parseFloat(input.value)) !== null && _a !== void 0 ? _a : .0;\n};\n\n\n//# sourceURL=webpack://daily-roulette/./src/utils/index.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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