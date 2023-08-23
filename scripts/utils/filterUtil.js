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
                <buton class="search-tag__erase " type="button"><i class="fa-solid fa-xmark"></i></buton>
            </div>
            <div>
                ${listItems}
            </div>
        </div>
    `;
}



function bindClickFilterItem() {
    const filterItems = document.getElementsByClassName("filter-item");
    const tagsContainer = document.getElementById("tags-container");

    // Convertir HTMLCollection en Array
    Array.from(filterItems).forEach(item => {
        item.addEventListener("click", function () {
            const itemName = this.textContent.trim();

            // Vérifiez si le tag existe déjà
            const existingTags = tagsContainer.querySelectorAll('.tag');
            for(let i = 0; i < existingTags.length; i++) {
                if (existingTags[i].textContent.includes(itemName)) {
                    // Si le tag existe déjà, nous sortons de la fonction callback
                    return;  
                }
            }

            const tagMarkup = `
                <span class="tag">${itemName}
                    <button class="tag__erase" type="button">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </span>
            `;

            tagsContainer.insertAdjacentHTML('beforeend', tagMarkup);

            // Sélection du dernier tag inséré
            const lastInsertedTag = tagsContainer.lastElementChild; 
            const eraseButton = lastInsertedTag.querySelector('.tag__erase');
            eraseButton.addEventListener('click', function() {
                lastInsertedTag.remove();
            });
        });
    });
}

