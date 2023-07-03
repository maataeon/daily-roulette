import { querySelector } from "../utils";

const alert = querySelector('#alert') as HTMLDivElement;
let timeoutId: any;

export const pushAlert = (text: string, defaultTime: number = 3000) => {
  const alertLog = document.createElement("div");
  alertLog.textContent = text;
  alert.appendChild(alertLog)
  setTimeout(() => {
    alertLog.remove();
  }, defaultTime);
}