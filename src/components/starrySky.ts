import { querySelector } from "../utils";

const randomStarColor = () => {
  return `hsl(${Math.trunc(Math.random() * 8745) % 255}deg 70% 60%)`;
};

export function createStarrySky() {
  const maxStars = Math.abs(Math.random() * 293);
  const stars = querySelector("#stars") as HTMLDivElement;

  for (let i = 0; i < maxStars; i++) {
    stars.appendChild(
      (() => {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.innerHTML = `<defs><filter id="glow"><feGaussianBlur stdDeviation="1.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
        let radius = Math.random() * 2.5 + 3;
        svg.setAttribute("class", "star");
        svg.setAttribute("viewBox", "0 0 240 240");
        svg.style.width = radius + "px";
        svg.style.height = radius + "px";
        svg.style.transform = "rotate(" + ((Math.random() * 100) | 0) + "deg)";
        svg.style.left = ((Math.random() * 120) | 0) + "vw";
        svg.style.top = ((Math.random() * 120) | 0) + "vh";
        svg.style.opacity = (Math.random() * 0.214 + 0.657).toString();
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "m48,234 73-226 73,226-192-140h238z");
        path.setAttribute("fill", randomStarColor());
        path.setAttribute("filter", "url(#glow)");
        svg.appendChild(path);
        return svg;
      })()
    );
  }
}