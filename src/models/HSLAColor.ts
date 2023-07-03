export class HSLAColor {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;

  constructor(hue: number, saturation: number, lightness: number, alpha: number) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.alpha = alpha;
  }

  toString(): string {
    return `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
  }
}