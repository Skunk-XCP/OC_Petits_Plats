const translations = {
    "ingredients": "Ingrédients",
    "appliance": "Appareil",
    "ustensils": "Ustensiles"
};

let activeTags = [];


// Fonction pour gérer les clics sur les éléments filtrables
function addTag(event) {
    const itemType = event.currentTarget.getAttribute('data-type');
    const itemName = event.currentTarget.getAttribute('data-item');

    // Evite de créer plusieurs fois le meme tag
    if (activeTags.includes(itemName)) {
        return;
    }

    // Appelle la fonction handleTags pour gérer la logique des tags
    const tagsContainer = document.getElementById("tags-container");

    const newTag = createTagMarkup(itemName, itemType);
    tagsContainer.insertAdjacentHTML('beforeend', newTag);

    // Ajoute le nouveau tag au tableau activeTags
    activeTags.push(itemName);
}

// Fonction pour supprimer un tag actif
function deleteActiveTag(event) {

    // Si le bouton de suppression d'un tag est cliqué
    const tagElement = event.target.closest('.tag');

    // Nom du tag à supprimer
    const tagName = tagElement.textContent.trim();

    const index = activeTags.indexOf(tagName);
    if (index !== -1) {
        // Supprime le tag du tableau activeTags
        activeTags.splice(index, 1);
    }

    // Supprime le tag du DOM
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        if (tag.textContent.trim().includes(tagName)) {
            tag.remove();
        }
    });

    const inputSearch = document.querySelector("#search-bar");
    updateDisplayedRecipesAndCountSpanAndFilterItems(inputSearch.value.toLowerCase(), activeTags);
}


function bindClickFilterItem() {
    const filterItems = document.querySelectorAll('.filter-item');

    filterItems.forEach((item) => {
        // Attache le nouvel écouteur d'événement
        item.addEventListener('click', createTagFromItem);
    });
}

function createTagFromItem(event) {
    const itemType = event.currentTarget.getAttribute('data-type');
    const itemName = event.currentTarget.getAttribute('data-item');
    const filterBox = event.target.closest('.filterBox');

    // Ajouter le tag
    addTag(event);

    // MàJ la liste des recettes + total + filtres
    const inputSearch = document.querySelector("#search-bar");
    updateDisplayedRecipesAndCountSpanAndFilterItems(inputSearch.value.toLowerCase(), activeTags);

    // Vider le champs input
    const inputForCurrentType = document.querySelector(`#${itemType}`);
    if (inputForCurrentType) {
        inputForCurrentType.value = "";
    }

    // Bind click suppression tag
    bindDeleteTagButton(itemName, itemType);

    // // Trouver et fermer la filterBox associée
    closeFilterBox(filterBox);
}


function bindDeleteTagButton() {
    const tagsContainer = document.getElementById("tags-container");
    tagsContainer.addEventListener('click', function (event) {
        // Si le bouton de suppression d'un tag est cliqué
        if (event.target.closest('.tag__erase')) {
            deleteActiveTag(event);
        }
    });
}


function updateFilterItems(displayedRecipes) {
    const filterTypes = ['ingredients', 'ustensils', 'appliance'];

    filterTypes.forEach(type => {
        const uniqueValues = new Set();

        // Crée un ensemble des valeurs uniques pour le type actuel dans les recettes affichées
        displayedRecipes.forEach(recipe => {
            if (type === 'ingredients') {
                recipe.ingredients.forEach(ingredient => {
                    uniqueValues.add(ingredient.ingredient.toLowerCase());
                });
            } else if (type === 'ustensils') {
                recipe.ustensils.forEach(utensil => {
                    uniqueValues.add(utensil.toLowerCase());
                });
            } else if (type === 'appliance') {
                uniqueValues.add(recipe.appliance.toLowerCase());
            }
        });

        // Trouve le conteneur d'items pour ce type
        const itemListContainer = document.querySelector(`#${type}_filter .items-list`);

        // Réinitialise le conteneur d'items
        itemListContainer.innerHTML = '';

        // Recrée la liste d'items basée sur les valeurs uniques trouvées
        uniqueValues.forEach(value => {
            const itemHTML = `<a class="filter-item" data-type="${type}" data-item="${value}">${value}</a>`;
            itemListContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        bindClickFilterItem();
    });
}


// Fonction pour rechercher un item à partir de la recherche input
function filterItemsBasedOnInput(inputElement) {
    const filterBox = inputElement.closest('.filterBox');
    const eraseButton = filterBox.querySelector('.search-tag__erase');
    const itemList = filterBox.querySelector('.items-list');

    // Récupérer tous les items
    const allItems = Array.from(itemList.querySelectorAll('.filter-item'));

    // Récupérer la valeur de l'input
    const inputValue = inputElement.value.toLowerCase();

    // Afficher ou cacher le bouton erase en fonction de la longueur de la valeur de l'input
    if (inputValue.length > 0) {
        eraseButton.classList.remove('hidden');
    } else {
        eraseButton.classList.add('hidden');
    }

    // Masquer ou afficher chaque item en fonction de la correspondance avec la valeur de l'input
    allItems.forEach(item => {
        const itemValue = item.getAttribute('data-item');

        if (compareWithoutAccents(itemValue, inputValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Compare deux chaînes de caractères après avoir supprimé les accents 
// et les avoir transformées en minuscules
function compareWithoutAccents(str1, str2) {
    const normalizedStr1 = str1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedStr2 = str2.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return normalizedStr1.includes(normalizedStr2);
}


// Cette fonction ajoute les écouteurs d'événements aux inputs pour la recherche dynamique
function bindInputFiltering() {
    const inputs = document.querySelectorAll('.searchBar_filter');

    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const inputValue = event.target.value;
            const filterBox = event.target.closest('.filterBox');
            const eraseButton = filterBox.querySelector('.search-tag__erase');

            // Gérer la visibilité du bouton erase
            if (inputValue.length === 0) {
                eraseButton.classList.add('hidden');
            } else {
                eraseButton.classList.remove('hidden');
            }

            if (inputValue.length >= 3) {
                filterItemsBasedOnInput(event.target);
            } else {
                // Si moins de 3 caractères sont présents, afficher tous les items
                const itemList = filterBox.querySelector('.items-list');
                const allItems = Array.from(itemList.querySelectorAll('.filter-item'));

                allItems.forEach(item => {
                    item.style.display = '';
                });
            }
        });
    });
}


// Fonction ajoute les écouteurs d'événements aux boutons delete
function bindEraseButton() {
    const eraseButtons = document.querySelectorAll('.search-tag__erase');

    eraseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filterBox = event.target.closest('.filterBox');
            const input = filterBox.querySelector('.searchBar_filter');

            // Empeche la liste de se fermer lorsqu'on clique sur le bouton pour effacer
            event.stopPropagation();

            // Effacer la valeur de l'input
            input.value = '';

            // Appeler la fonction filterItemsBasedOnInput pour remettre à jour la liste des items et cacher le bouton erase
            filterItemsBasedOnInput(input);
        });
    });
}


