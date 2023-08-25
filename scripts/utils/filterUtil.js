const translations = {
    "ingredients": "Ingrédients",
    "ustensils": "Ustensiles",
    "appliance": "Appareil"
};

function filter(type, items) {
    const translatedType = translations[type] || type;
    const listItems = items.map(item => `<a class="filter-item" data-type="${type}" data-type="${item}">${item} </a>`).join('');

    let htmlContent = `
        <div id="${type}_filter" class="filterBox">
            <button type="button" class="toggle">${translatedType} <i class="fa-solid fa-chevron-down"></i></button> 
            <div id="${type}_list" class="type_list">
                <label for="${type}"></label>
                <input type="text" id="${type}" class="searchBar_filter">
                <button class="search-tag__erase hidden" type="button"><i class="fa-solid fa-xmark"></i></button>
                <img class="search-tag__magnifying-glass" src="/assets/images/search-valid.svg" alt="Icone loupe">
            </div>

            <div>
                ${listItems}
            </div>
        </div>
    `;

    return htmlContent;
}

// Compare deux chaînes de caractères après avoir supprimé les accents 
// et les avoir transformées en minuscules
function compareWithoutAccents(str1, str2) {
    const normalizedStr1 = str1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedStr2 = str2.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return normalizedStr1.includes(normalizedStr2);
}


// Attache un gestionnaire d'événements à un élément d'entrée 
// pour filtrer les items en fonction de sa valeur
function handleFilterTagsInput(type) {
    const inputElement = document.getElementById(type);
    inputElement.addEventListener('keyup', () => filterItemsByValue(type));
}


// Filtre les items basé sur la valeur d'un élément d'entrée
function filterItemsByValue(type) {
    const inputElement = document.getElementById(type);
    const filterValue = inputElement.value;

    const items = document.querySelectorAll(`.filter-item[data-type="${type}"]`);

    // Si la valeur est < à 3 caractères, affiche tous les items
    if (filterValue.length < 3) {
        items.forEach(item => item.classList.remove("hidden_item"));
        return;
    }

    // Cache ou affiche chaque item selon s'il correspond à la valeur filtrée
    items.forEach(item => {
        if (compareWithoutAccents(item.innerHTML, filterValue)) {
            item.classList.remove("hidden_item");
        } else {
            item.classList.add("hidden_item");
        }
    });
}


// Supprime la valeur d'un élément d'entrée et met à jour la liste des items en conséquence
function deleteInputTagFilter(type) {
    const eraseButton = document.querySelector(`#${type}_filter .search-tag__erase`);
    const inputField = document.querySelector(`#${type}_filter .searchBar_filter`);

    // Lorsque le bouton d'effacement est cliqué, 
    // la valeur de l'input est supprimée et les items sont mis à jour
    eraseButton.addEventListener('click', function () {
        inputField.value = '';
        filterItemsByValue(type);
        updateEraseButtonVisibility();
    });

    inputField.addEventListener('input', updateEraseButtonVisibility);

    function updateEraseButtonVisibility() {
        if (inputField.value.length === 0) {
            eraseButton.classList.add('hidden');
        } else {
            eraseButton.classList.remove('hidden');
        }
    }

    // Initial check
    updateEraseButtonVisibility();
}


function bindClickFilterItem() {
    const filterItems = document.getElementsByClassName("filter-item");
    const tagsContainer = document.getElementById("tags-container");

    // Converti HTMLCollection en Array
    Array.from(filterItems).forEach(item => {
        item.addEventListener("click", function () {
            const itemName = this.textContent.trim();

            // Vérifiez si le tag existe déjà
            const existingTags = tagsContainer.querySelectorAll('.tag');
            for (let i = 0; i < existingTags.length; i++) {
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
            eraseButton.addEventListener('click', function () {
                lastInsertedTag.remove();
            });

            // Trouve le filterBox parent et le ferme
            const parentFilterBox = this.closest('.filterBox');
            if (parentFilterBox) {
                parentFilterBox.classList.remove('expanded');

                // Cachez également les éléments à l'intérieur de filterBox
                const typeList = parentFilterBox.querySelector('.type_list');
                const itemList = parentFilterBox.querySelector('div:last-of-type');

                typeList.style.display = 'visible';
                itemList.style.display = 'visible';
            }

            const toggleButton = this.closest('.filterBox').querySelector('.toggle');
            const icon = toggleButton.querySelector('i');
            
            if (icon) {
                if (toggleButton.closest('.filterBox').classList.contains('expanded')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}
