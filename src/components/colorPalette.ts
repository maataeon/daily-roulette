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
  arcAccumulator += Math.random() * 20 + 30;
  const hue = (initialOffset + arcAccumulator) % 360;
  const saturation = 69;
  const light = gatedLight();
  const alpha = 1;
  return new HSLAColor(hue, saturation, light, alpha);
}
