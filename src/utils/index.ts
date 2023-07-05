export const querySelector = (selector: string): HTMLElement | null => {
  return document.querySelector(selector);
}

export const toInt = (num: number): number => {
  return Math.trunc(num);
}

export const fixedStartTime = () => Math.trunc(new Date().getTime() / 1000) * 1000

export const uid = (): string => {
  const array = new Uint32Array(8);
  crypto.getRandomValues(array);
  let str = '';
  for (let i = 0; i < array.length; i++) {
    str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4);
  }
  return str;
};
const notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const calculateHz = (nota: string, octava: number): number => {
  const distanciaDesdeA4 = (octava - 4) * 12 + notas.indexOf(nota) - notas.indexOf('A');

  // Fórmula para calcular los hercios de una nota en función de su distancia desde A4
  const hertzA4 = 440;
  const hertz = hertzA4 * Math.pow(2, distanciaDesdeA4 / 12);

  return hertz;
}

export const gerFrecuency = (): number => {
  const indiceAleatorio = Math.floor(Math.random() * notas.length);
  const nota = notas[indiceAleatorio];
  const octava = Math.floor(Math.random() * 3 + 3);
  return calculateHz(nota, octava)
}

export const easeOut = (t: number, b: number, c: number, d: number) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  const eased = b + c * (tc + -3 * ts + 3 * t);
  return eased;
};

export const valueOf = (input: HTMLInputElement) => {
  return parseFloat(input.value) ?? .0;
}