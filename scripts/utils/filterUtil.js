const translations = {
    "ingredients": "Ingrédients",
    "utensils": "Ustensiles",
    "appliance": "Appareil"
};

function filter(type, items) {
    const translatedType = translations[type] || type;
    const listItems = items.map(item => `<a class="filter-item" data-type="${type}" data-type="${item}">${item} </a>`).join('');

    return `
        <div id="${type}_filter" class="filterBox">
            <button type="button" class="toggle">${translatedType} <i class="fa-solid fa-chevron-down"></i></button> 
            <div id="${type}_list" class="type_list">
                <label for="${type}"></label>
                <input type="text" id="${type}" class="searchBar_filter">
                <div>
                  ${listItems}
                </div>
            </div>
        </div>
    `;
}


// function bindClickFilterItem() {
//     const filterItem = document.getElementsByClassName("filter-item");
//     filterItem.forEach
    
// }

function bindClickFilterItem() {
    const filterItems = document.getElementsByClassName("filter-item");
    const tagsContainer = document.getElementById("tags-container");

    // Convertir HTMLCollection en Array
    Array.from(filterItems).forEach(item => {
        item.addEventListener("click", function() {
            const itemName = this.textContent.trim();

            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = itemName;

            tagsContainer.appendChild(tag);


            // Code à exécuter lors du clic sur un élément
            console.log("Item clicked:", this.textContent.trim());
        });
    });
}
