import { nextHSLAColor } from "../components/colorPalette";
import { getEmoji } from "../components/emojis";
import { gerFrecuency, uid } from "../utils";
import { HSLAColor } from "./HSLAColor";

export class Item {
  id: string;
  name: string;
  emoji: string;
  frequency: number;
  element: HTMLButtonElement;
  color: HSLAColor;

  constructor(name: string) {
    this.id = uid();
    this.name = name;
    this.emoji = getEmoji();
    this.frequency = gerFrecuency()
    this.element = this.buildHTMLButtonElement();
    this.color = nextHSLAColor();
  }

  buildHTMLButtonElement = () => {
    const itemElement = document.createElement("button");
    itemElement.id = this.id;
    itemElement.className = "nombre";
    itemElement.innerHTML = `
    <div class="name-icon">${this.emoji}</div>
    <div class="name-text">${this.name}</div>
  `;
    return itemElement;
  };
}