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
            <button class="toggle"><i class="fa-solid fa-chevron-down"></i></button>
            <ul id="${type}_list" class="type_list">
                ${listItems}
            </ul>
        </div>
    `;
}


