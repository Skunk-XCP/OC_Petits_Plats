const translations = {
    "ingredients": "Ingrédients",
    "ustensils": "Ustensiles",
    "appliance": "Appareil"
};

let activeTags = [];

function filter(type, items) {
    const translatedType = translations[type] || type;
    const listItems = items.map(item => `<a class="filter-item" data-type="${type}" data-item="${item}">${item} </a>`).join('');

    let htmlContent = `
        <div id="${type}_filter" class="filterBox" data-type="${type}">
            <button type="button" class="toggle">${translatedType} </button> <i class="fa-solid fa-chevron-down chevron"></i>
            <div id="${type}_list" class="type_list">
                <label for="${type}"></label>
                <input type="text" id="${type}" class="searchBar_filter">
                <button class="search-tag__erase hidden" type="button"><i class="fa-solid fa-xmark"></i></button>
                <img class="search-tag__magnifying-glass" src="/assets/images/search-valid.svg" alt="Icone loupe">
            </div>

            <div class="items-list">
                ${listItems}
            </div>
        </div>
    `;

    return htmlContent;
}

function bindClickFilterItem() {
    const filterItems = document.getElementsByClassName("filter-item");
    
    // Converti HTMLCollection en Array
    Array.from(filterItems).forEach(item => {
        item.addEventListener("click", function () {
            const itemName = this.dataset.item;
            const itemType = this.dataset.type;

            // Si l'élément est désactivé, ignorez le clic
            if (this.classList.contains('disabled')) {
                return;
            }

            // Gestion des tags
            handleTags(itemName, itemType);

            // Mise à jour des recettes affichées
            updateDisplayedRecipes(itemName, itemType);

        });
    });
}

function handleTags(itemName, itemType) {
    const tagsContainer = document.getElementById("tags-container");

    // Vérifie si le tag existe déjà
    const existingTags = tagsContainer.querySelectorAll('.tag');
    for (let i = 0; i < existingTags.length; i++) {
        if (existingTags[i].textContent.includes(itemName)) {
            // Si le tag existe déjà, nous sortons de la fonction
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
    deleteActiveTag(tagsContainer.lastElementChild);

    // Désactive l'élément
    const clickedItem = document.querySelector(`.filter-item[data-type="${itemType}"][data-item="${itemName}"]`);
    if (clickedItem) {
        clickedItem.classList.add('disabled');
    }
}

// Met à jour l'affichage des recettes en fonction des tags actifs
function updateDisplayedRecipes(itemName, itemType) {
    activeTags.push({ type: itemType, name: itemName });
    const recipesToShow = filterRecipes(inputSearch.value, activeTags, allRecipes);
    updateRecipesDisplay(recipesToShow);
    updateRecipeCountSpan(recipesToShow.length);
    updateFilterItemsVisibility(recipesToShow);
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


function deleteActiveTag(itemName) {
    // Supprime le tag du tableau activeTags.
    const index = activeTags.findIndex(tag => tag.name === itemName);
    if (index !== -1) {
        activeTags.splice(index, 1);
    }

    // Supprime le tag visuellement affiché à l'utilisateur.
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        if (tag.textContent.trim() === itemName) {
            // supprime le tag du DOM
            tag.remove(); 
        }
    });

    // Remet la liste de recettes à jour avec suppression d'un tag
    const recipesToShow = filterRecipes(inputSearch.value, activeTags, allRecipes);
    updateRecipesDisplay(recipesToShow);
    updateRecipeCountSpan(recipesToShow.length);
    updateFilterItemsVisibility(recipesToShow);  // ajoutée

    // Réactivez l'élément
    const clickedItem = document.querySelector(`.filter-item[data-item="${itemName}"]`);
    if (clickedItem) {
        clickedItem.classList.remove('disabled');
    }
}

document.addEventListener('click', function(event) {
    if (event.target.closest('.tag__erase')) {
        const itemName = event.target.closest('.tag').textContent.trim();
        deleteActiveTag(itemName);
    }
});
