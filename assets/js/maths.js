const formulaBlocks = document.querySelectorAll(".formule");
for (const block of formulaBlocks) {
  const latex = block.dataset.latex;
  if (!latex) continue;
  const button = document.createElement("button");
  button.className = "copier-latex";
  button.type = "button";
  button.textContent = "Copier le LaTeX";
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(latex);
    button.textContent = "Copié";
    window.setTimeout(() => { button.textContent = "Copier le LaTeX"; }, 1500);
  });
  block.append(button);
}

if (typeof renderMathInElement === "function") {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
    output: "htmlAndMathml",
  });
}
