/* =====================================================
   THEME SYSTEM
   ===================================================== */

const themeButtons = document.querySelectorAll(".theme-button");
const themeMenus = document.querySelectorAll(".theme-menu");
const themeOptions = document.querySelectorAll(".theme-option");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

/* =====================================================
   TEMA DEL SISTEMA
   ===================================================== */

function getSystemTheme() {
    return systemTheme.matches ? "dark" : "light";
}


/* =====================================================
   APLICAR TEMA
   ===================================================== */

function applyTheme(theme) {

    const actualTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.dataset.theme = actualTheme;

    updateActiveOptions(theme);
}



/* =====================================================
   ACTUALIZAR OPCIÓN ACTIVA
   ===================================================== */

function updateActiveOptions(theme) {
    themeOptions.forEach(option => {
        option.classList.toggle("active", option.dataset.themeOption === theme);
    });
}


/* =====================================================
   TEMA GUARDADO
   ===================================================== */

const savedTheme = localStorage.getItem("theme") || "system";
applyTheme(savedTheme);


/* =====================================================
   ABRIR MENÚ
   ===================================================== */

themeButtons.forEach(button => {

    button.addEventListener("click", event => {
        event.stopPropagation();

        const selector = button.closest(".theme-selector");
        const menu = selector.querySelector(".theme-menu");

        /*
         * Cerrar otros menús
         */

        themeMenus.forEach(otherMenu => {
            if (otherMenu !== menu) {
                otherMenu.hidden = true;
            }
        });

        menu.hidden = !menu.hidden;
    });
});


/* =====================================================
   SELECCIONAR TEMA
   ===================================================== */

themeOptions.forEach(option => {

    option.addEventListener("click", () => {

        const theme = option.dataset.themeOption;
        localStorage.setItem("theme", theme);

        applyTheme(theme);

        themeMenus.forEach(menu => {
            menu.hidden = true;
        });
    });
});



/* =====================================================
   CLICK AFUERA
   ===================================================== */

document.addEventListener("click", event => {

    if (
        !event.target.closest(".theme-selector")
    ) {

        themeMenus.forEach(menu => {
            menu.hidden = true;
        });
    }
});


/* =====================================================
   CAMBIO DEL TEMA DEL SISTEMA
   ===================================================== */

systemTheme.addEventListener("change", () => {

    const currentTheme = localStorage.getItem("theme") || "system";
    if (currentTheme === "system") {
        applyTheme("system");
    }
});