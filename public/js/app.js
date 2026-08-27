const searchInput = document.getElementById("tool-search");
const toolCards = document.querySelectorAll(".tool-card");
const categorySections = document.querySelectorAll(".category-section");
const searchEmpty = document.getElementById("search-empty");

searchInput.addEventListener("input", () => {
    const search = searchInput.value.trim().toLowerCase();
    let totalResults = 0;

    // =====================================================
    // SIN BÚSQUEDA
    // =====================================================
    if (!search) {

        toolCards.forEach(card => {
            card.style.display = "";
        });

        categorySections.forEach(section => {
            section.style.display = "";
        });

        searchEmpty.hidden = true;

        return;
    }


    // =====================================================
    // BUSCAR HERRAMIENTAS
    // =====================================================
    toolCards.forEach(card => {

        const name = card.dataset.name || "";
        const description = card.dataset.description || "";
        const tags = card.dataset.tags || "";
        const category = card.closest(".category-section")?.dataset.category || "";
        const matches = name.includes(search) || description.includes(search) || tags.includes(search) || category.includes(search);

        if (matches) {
            card.style.display = "";
            totalResults++;
        } else {
            card.style.display = "none";
        }
    });


    // =====================================================
    // OCULTAR CATEGORÍAS VACÍAS
    // =====================================================
    categorySections.forEach(section => {
        const visibleCards =section.querySelectorAll(".tool-card:not([style*='display: none'])");
        section.style.display = visibleCards.length > 0 ? "" : "none";
    });


    // =====================================================
    // SIN RESULTADOS
    // =====================================================
    searchEmpty.hidden = totalResults !== 0;

});