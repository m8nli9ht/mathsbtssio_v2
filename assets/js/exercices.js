for (const solution of document.querySelectorAll("details[data-corrige]")) {
  solution.addEventListener("toggle", () => {
    solution.setAttribute("aria-label", solution.open ? "Corrigé affiché" : "Afficher le corrigé");
  });
}
