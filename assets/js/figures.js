const figures = [...document.querySelectorAll("figure img")];
if (figures.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Agrandissement de la figure");
  dialog.innerHTML = '<button type="button" aria-label="Fermer">Fermer</button><img alt="">';
  document.body.append(dialog);
  const enlarged = dialog.querySelector("img");
  const closeButton = dialog.querySelector("button");
  let activeIndex = 0;
  let trigger = null;
  for (const [index, image] of figures.entries()) {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Agrandir : ${image.alt}`);
    const open = () => {
      activeIndex = index;
      trigger = image;
      enlarged.src = image.src;
      enlarged.alt = image.alt;
      dialog.showModal();
      closeButton.focus();
    };
    image.addEventListener("click", open);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  }
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      activeIndex = (activeIndex + direction + figures.length) % figures.length;
      enlarged.src = figures[activeIndex].src;
      enlarged.alt = figures[activeIndex].alt;
    }
  });
  dialog.addEventListener("close", () => trigger?.focus());
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
