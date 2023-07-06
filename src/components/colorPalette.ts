import { HSLAColor } from "../models/HSLAColor";
let arcAccumulator = 0;
const initialOffset = Math.random() * 360;

const gateSequence = [45, 80, 70];
let indexGate = -1;
const gatedLight = () => {
  indexGate = (indexGate + 1) % gateSequence.length;
  return gateSequence[indexGate];
}


export const nextHSLAColor = () => {
  arcAccumulator += Math.random() * 15 + 30;
  const hue = (initialOffset + arcAccumulator) % 360;
  const saturation = 93;
  const light = gatedLight() * .6;
  const alpha = 1;
  return new HSLAColor(hue, saturation, light, alpha);
}
