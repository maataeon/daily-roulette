const inputs = Array.from(document.querySelectorAll(".inputControl input")) as HTMLInputElement[];


export const initControls = () => {
  console.log({ inputs })

  inputs.forEach((input) => {
      input.addEventListener("input", () => {
        console.log({dataset: input.dataset})
        const label = document.getElementById(input.dataset.displayId ?? "") as HTMLSpanElement;
        if (label) {
          label.textContent = parseFloat(input.value).toFixed(3);
        }
      });
  });
}