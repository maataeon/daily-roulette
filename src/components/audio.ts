import { querySelector } from "../utils";

const audioContext = new (window.AudioContext)();

const wink = querySelector('#wink') as HTMLAudioElement;
const lastName = querySelector('#last-name') as HTMLAudioElement;

let indiceNota = 0;
let duration = 0.2;

const majorScale = [
  523.25, // C
  587.33, // D
  659.25, // E
  698.46, // F
  783.99, // G
  880.00, // A
  987.77  // B
];
const egyptianScale = [
  587.33, // D
  622.25, // D#
  739.99, // F#
  783.99, // G
  880.00  // A
];

let selectedScale = majorScale;

const getNote = () => {
  const nota = selectedScale[indiceNota];
  indiceNota = (indiceNota + 1) % selectedScale.length;
  return nota;
}

export const playFrequency = (frequency:number) => {

  const oscilador = audioContext.createOscillator();
  oscilador.type = 'sine'; // (sine, square, sawtooth, triangle)
  oscilador.frequency.value = frequency;

  const ganancia = audioContext.createGain();
  oscilador.connect(ganancia);
  ganancia.connect(audioContext.destination);

  oscilador.start();

  const fadeOutStartTime = audioContext.currentTime + duration - 0.1; // Desvanecimiento de 0.1 segundos antes del final
  ganancia.gain.setValueAtTime(.04, audioContext.currentTime); // Volumen inicial
  ganancia.gain.linearRampToValueAtTime(0, fadeOutStartTime); // Desvanecimiento lineal hacia 0

  oscilador.stop(audioContext.currentTime + duration);
}

export const playChangeItem = () => {
  playFrequency(getNote());
}


export const playLastName = async () => {
  await lastName.play();
}

export const playWink = async () => {
  await wink.play();
}

export const selectMajorScale = () => {
  selectedScale = majorScale;
}

export const selectEgyptianScale = () => {
  selectedScale = egyptianScale;
}

export const initAudio = () => {
  wink.volume = 0.11;
  lastName.volume = 0.3;
  duration = 0.2
}