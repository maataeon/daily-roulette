import { HSLAColor } from "../models/HSLAColor";
import { toInt } from "../utils";

let arcAccumulator = 0;
const initialOffset = Math.random() * 360;

export const nextHSLAColor = () => {
  arcAccumulator += Math.random() * 20 + 30;
  const hue = (initialOffset + arcAccumulator) % 360;
  const saturation = 69;
  const light = Math.random() * 40 + 30;
  const alpha = 1;
  return new HSLAColor(hue, saturation, light, alpha);
}
