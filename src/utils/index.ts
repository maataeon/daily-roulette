export const querySelector = (selector: string): HTMLElement | null => {
  return document.querySelector(selector);
}

export const toInt = (num: number): number => {
  return Math.trunc(num);
}