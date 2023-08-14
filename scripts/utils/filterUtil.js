const translations = {
    "ingredients": "Ingrédients",
    "utensils": "Ustensiles",
    "appliance": "Appareil"
};

function filter(type) {
    const translatedType = translations[type] || type;
    return `
        <div id="${type}_filter" class="filterBox">
            <input type="text" id="${type}" value="${translatedType}" class="inputField">
            <label for="${type}"></label>
            <button class="toggle"><i class="fa-solid fa-chevron-down"></i></button>
            <div id="${type}_list"></div>
        </div>
    `
}