function createRecipeElement(recipe) {
    // Convertit l'objet recette en chaîne HTML
    const recipeElementString = createRecipeDOMElement(recipe);
    // Utilise le DOMParser pour convertir la chaîne HTML en élément DOM
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(recipeElementString, 'text/html');
    // Retourne l'élément DOM de la recette pour être ajouté à la page
    return doc.querySelector('.recipe_article');
}

async function displayRecipes() {
    // Récupère les données des recettes
    const recipesData = await getRecipes();
    // Convertit les données des recettes en objets recette
    allRecipes = recipesData.map(recipeData => 
        new Recipe(recipeData.id, recipeData.image, recipeData.name, recipeData.servings, recipeData.ingredients, recipeData.time, recipeData.description, recipeData.appliance, recipeData.ustensils)
    );

    updateRecipesDisplay(allRecipes);
    updateRecipeCountSpan(allRecipes.length);
}


const inputSearch = document.querySelector("#search-bar");
inputSearch.addEventListener('input', handleSearchInput);


// Gère la saisie dans la barre de recherche pour filtrer les recettes
function handleSearchInput(event) {
    // Récupère la valeur saisie par l'utilisateur
    const query = event.target.value;
    let recipesToShow;

    // Filtre les recettes en fonction de la requête
    // Si la requête contient moins de 3 caractères, affiche toutes les recettes
    recipesToShow = (query.length >= 3) ? filterRecipes(query, allRecipes) : allRecipes;

    updateRecipesDisplay(recipesToShow);
    updateRecipeCountSpan(recipesToShow.length); 
}

// Met à jour l'affichage des recettes sur la page
function updateRecipesDisplay(recipes) {
    // Sélectionne le conteneur des recettes
    const recipesContainer = document.getElementById('recipes-container');
    // Vide le conteneur des recettes
    recipesContainer.innerHTML = ''; 
    // Parcourt chaque recette et l'ajoute au conteneur
    for (const recipe of recipes) {
        const recipeElement = createRecipeElement(recipe);
        recipesContainer.appendChild(recipeElement);
    }
}

async function displayFilter(type) {
    const items = await getUniqueItems(type);
    const filterHTML = filter(type, items);
    const target = document.getElementById("filters-container");
    target.insertAdjacentHTML('beforeend', filterHTML);
}



// Initialiser la span qui affiche le compte des recettes
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