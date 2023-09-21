const inputSearch = document.querySelector("#search-bar");
inputSearch.addEventListener('input', handleSearchInput);
const eraseButtons = document.querySelector("#eraseButton");
eraseButtons.addEventListener('click', clearInput);


// Fonction qui permet d'effectuer une recherche
function handleSearchInput(event) {
    const query = event.target.value.toLowerCase();
    
    const eraseButton = document.querySelector('#eraseButton');
    eraseButton.classList.toggle('hidden', query.length === 0);
    
    if (query.length >= 3 || activeTags.length > 0) {
        updateDisplayedRecipesAndCountSpanAndFilterItems(query, activeTags);
    } else {
        updateDisplayedRecipesAndCountSpanAndFilterItems('', []);
    }
}


// Fonction pour filtrer les recettes selon la requête de l'utilisateur et/ou les tags appliqués
function filterRecipes(query, recipes, activeTags) {
    return recipes.filter(recipe => {
        let matchesQuery = recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.appliance.toLowerCase().includes(query) ||
            recipe.ustensils.some(utensil => utensil.toLowerCase().includes(query)) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));
        
        let matchesTags = activeTags.every(tag => 
            recipe.name.includes(tag) ||
            recipe.description.includes(tag) ||
            recipe.appliance.includes(tag) ||
            recipe.ustensils.includes(tag) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.includes(tag))
        );
        
        return matchesQuery && matchesTags;
    });
}


function updateDisplayedRecipesAndCountSpanAndFilterItems(query, activeTags) {
    let recipesToShow = allRecipes;

    recipesToShow = filterRecipes(query, recipesToShow, activeTags);

    updateRecipesDisplay(recipesToShow);
    updateRecipeCountSpan(recipesToShow.length);
    updateFilterItems(recipesToShow);
}


// Fonction pour effacer la valeur de l'input
function clearInput() {
    const inputField = document.querySelector('#search-bar');
    
    // Réinitialise la valeur de la barre de recherche
    inputField.value = '';

    // Appel à handleSearchInput pour mettre à jour l'affichage des recettes
    updateDisplayedRecipesAndCountSpanAndFilterItems('', activeTags);
    inputField.focus();
}

