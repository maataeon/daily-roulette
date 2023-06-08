import type { Item } from '@/models/item';
import { reactive } from 'vue'

export const store = reactive({
  items: [] as Item[],
  addItem(item: Item) {
    this.items.push(item);
  }
})