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
    const filterHTML = filter(type, itemList);
    const target = document.getElementById("filters-container");
    target.insertAdjacentHTML('beforeend', filterHTML);

    deleteInputTagFilter(type);
    handleFilterTagsInput(type);
    filterItemsByValue(type);
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