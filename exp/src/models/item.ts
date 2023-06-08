import { gerFrecuency, uid } from "../utils";

export class Item {
  id: string;
  name: string;
  emoji: string;
  frequency: number;

  constructor(name: string, emoji: string) {
    this.id = uid();
    this.name = name;
    this.emoji = emoji;
    this.frequency = gerFrecuency()
  }
}