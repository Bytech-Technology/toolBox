const searchButton = document.querySelector(".sidebar-search-button");
const searchPanel = document.querySelector(".sidebar-search");
const searchInput = document.querySelector(".sidebar-search-input");
const searchResults = document.querySelector(".sidebar-search-results");
const searchClose = document.querySelector(".sidebar-search-close");
const sidebarTools = document.querySelectorAll(".sidebar-tool");

if ( searchButton && searchPanel && searchInput && searchResults) {

    /* =====================================================
       ABRIR BUSCADOR
       ===================================================== */
    searchButton.addEventListener("click", () => {
        searchPanel.hidden = false;
        searchInput.focus();

    });

    /* =====================================================
       CERRAR BUSCADOR
       ===================================================== */
    searchClose.addEventListener("click", () => {
        closeSearch();
    });

    function closeSearch() {
        searchPanel.hidden = true;
        searchInput.value = "";
        searchResults.innerHTML = "";
    }

    /* =====================================================
       BUSCAR
       ===================================================== */
    searchInput.addEventListener("input", () => {
        const search = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = "";

        if (!search) {
            return;
        }

        let totalResults = 0;

        sidebarTools.forEach(tool => {
            const name = tool.dataset.name || "";
            const description = tool.dataset.description || "";
            const tags = tool.dataset.tags || "";
            const category = tool.dataset.category || "";
            const matches = name.includes(search) || description.includes(search) || tags.includes(search) || category.includes(search);

            if (matches) {
                const result = tool.cloneNode(true);
                result.classList.add("sidebar-search-result");

                searchResults.appendChild(result);
                totalResults++;
            }
        });

        if (totalResults === 0) {
            searchResults.innerHTML = `
                <div class="sidebar-search-empty">
                    No encontramos ninguna herramienta.
                </div>
            `;
        }
    });

    /* =====================================================
       ESC PARA CERRAR
       ===================================================== */
    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && !searchPanel.hidden) {
            closeSearch();
        }
    });
}