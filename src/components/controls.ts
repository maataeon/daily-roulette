const inputs = Array.from(document.querySelectorAll(".inputControl input")) as HTMLInputElement[];


export const initControls = () => {
  inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const label = document.getElementById(input.dataset.displayId ?? "") as HTMLSpanElement;
        if (label) {
          label.textContent = parseFloat(input.value).toFixed(3);
        }
      });
  });
}