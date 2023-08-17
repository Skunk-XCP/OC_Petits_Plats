const translations = {
    "ingredients": "Ingrédients",
    "utensils": "Ustensiles",
    "appliance": "Appareil"
};

function filter(type, items = []) {
    const translatedType = translations[type] || type;
    const listItems = items.map(item => `<li>${item}</li>`).join('');

    return `
        <div id="${type}_filter" class="filterBox">
            <input type="text" id="${type}" value="${translatedType}" class="inputField">
            <label for="${type}"></label>
            <button class="toggle" onclick="toggleFilterHeight('${type}')"><i class="fa-solid fa-chevron-down"></i></button>
            <ul id="${type}_list">
                ${listItems}
            </ul>
        </div>
    `;
}
