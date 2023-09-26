function createRecipeElement(recipe) {
    // Convertit l'objet recette en chaîne HTML
    const recipeElementString = createRecipeDOMElement(recipe);
    // Utilise le DOMParser pour convertir la chaîne HTML en élément DOM
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(recipeElementString, 'text/html');
    // Retourne l'élément DOM de la recette pour être ajouté à la page
    return doc.querySelector('.recipe_article');
}

async function displayRecipes(recipesData) {
    // Convertit les données des recettes en objets recette
    allRecipes = recipesData.map(recipeData =>
        new Recipe(recipeData.id, recipeData.image, recipeData.name, recipeData.servings, recipeData.ingredients, recipeData.time, recipeData.description, recipeData.appliance, recipeData.ustensils)
    );

    updateRecipesDisplay(allRecipes);
    updateRecipeCountSpan(allRecipes.length);
}

// Met à jour l'affichage des recettes sur la page
function updateRecipesDisplay(recipes) {
    try {
        // Sélectionne le conteneur des recettes
        const recipesContainer = document.getElementById('recipes-container');
        // Vide le conteneur des recettes
        recipesContainer.innerHTML = '';

        // Si la valeur est inconnue => message approprié
        if (recipes.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = `Aucune recette ne contient ‘${inputSearch.value}’ vous pouvez chercher "tarte aux pommes", "poisson ", etc.`;
            recipesContainer.appendChild(noResultsMessage);

            // Ajoute la classe CSS pour le mode "Aucun résultat"
            recipesContainer.classList.add('no-results');
        } else {
            // Si des recettes sont trouvées, retire la classe CSS pour le mode "Aucun résultat"
            recipesContainer.classList.remove('no-results');

            for (const recipe of recipes) {
                const recipeElement = createRecipeElement(recipe);
                recipesContainer.appendChild(recipeElement);
            }
        }
    } 
    
    catch (error) {
        console.error("Erreur lors de la mise à jour de l'affichage des recettes:", error);
    }
}

// Affiche les boutons de filtre
async function displayFilter(type, itemList) {
    const filterHTML = genenerateFilterHTML(type, itemList);
    const target = document.getElementById("filters-container");
    target.insertAdjacentHTML('beforeend', filterHTML);
}


// Initialise la span qui affiche le compte des recettes
function initializeRecipeCountSpan() {
    const filtersContainer = document.getElementById('filters-container');
    // Recherche si une span pour le compte des recettes existe déjà
    let countSpan = filtersContainer.querySelector('.recipe-count');

    // Si la span n'existe pas encore, la créer
    if (!countSpan) {
        countSpan = document.createElement('span');
        countSpan.className = 'recipe-count';
        filtersContainer.appendChild(countSpan);
    }

    // Mettre à jour le texte de la span avec le compte des recettes
    countSpan.textContent = `${count} recettes`;
}

//MàJ de la span qui affiche le nombre des recettes en fonction du nombre donné
function updateRecipeCountSpan(count) {
    const filtersContainer = document.getElementById('filters-container');
    let countSpan = filtersContainer.querySelector('.recipe-count');

    if (!countSpan) {
        countSpan = document.createElement('span');
        countSpan.className = 'recipe-count';
        filtersContainer.appendChild(countSpan);
    }

    const word = count > 1 ? 'recettes' : 'recette';
    countSpan.textContent = `${count} ${word}`;
}


function genenerateFilterHTML(type, items) {
    const translatedType = translations[type] || type;
    const listItems = items.map(item => `<a class="filter-item" data-type="${type}" data-item="${item}">${item} </a>`).join('');

    let htmlContent = `
        <div id="${type}_filter" class="filterBox" data-type="${type}">
            <span class="toggle">${translatedType}</span><i class="fa-solid fa-chevron-down chevron"></i>
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