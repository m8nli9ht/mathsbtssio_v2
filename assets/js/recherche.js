const searchForm = document.querySelector("[data-search-form]");
const searchInput = document.querySelector("[data-search-input]");
const results = document.querySelector("[data-search-results]");
if (searchForm && searchInput && results) {
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim().toLocaleLowerCase("fr");
    results.replaceChildren();
    if (!query) return;
    let documents = window.rechercheIndex;
    if (!documents) {
      const response = await fetch("data/recherche.json");
      if (!response.ok) throw new Error(`Impossible de charger l'index de recherche (${response.status}).`);
      documents = await response.json();
    }
    const matches = documents.filter((item) =>
      `${item.titre} ${item.texte} ${item.legendes || ""}`.toLocaleLowerCase("fr").includes(query)
    );
    for (const match of matches) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = match.url;
      link.textContent = match.titre;
      item.append(link);
      results.append(item);
    }
    if (!matches.length) results.textContent = "Aucun résultat.";
  });
}
