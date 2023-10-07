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
        const propertiesToCheck = ['name', 'description', 'appliance'];
        let matchesQuery = false;
        let matchesTags = true;

        for (let prop of propertiesToCheck) {
            if (recipe[prop].toLowerCase().includes(query)) {
                matchesQuery = true;
                break;
            }
        }

        if (!matchesQuery) {
            matchesQuery = recipe.ustensils.some(utensil => utensil.toLowerCase().includes(query)) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));
        }

        for (let tag of activeTags) {
            let tagMatches = propertiesToCheck.some(prop => recipe[prop].includes(tag)) ||
                recipe.ustensils.includes(tag) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.includes(tag));

            if (!tagMatches) {
                matchesTags = false;
                break;
            }
        }

        return matchesQuery && matchesTags;
    });
}


// MàJ la liste des recettes, la span total recettes, la liste des items des filtres
function updateDisplayedRecipesAndCountSpanAndFilterItems(query, activeTags) {
    const recipesToShow = filterRecipes(query, allRecipes, activeTags);

    displayRecipes(allRecipes, query, activeTags);
    updateRecipeCountSpan(recipesToShow.length);
    updateFilterItems(recipesToShow);
}


// Fonction pour effacer la valeur de l'input
function clearInput() {
    const inputField = document.querySelector('#search-bar');

    // Réinitialise la valeur de la barre de recherche
    inputField.value = '';

    // Déclenche manuellement l'événement 'input'
    inputField.dispatchEvent(new Event('input'));

    // Appel à handleSearchInput pour mettre à jour l'affichage des recettes
    updateDisplayedRecipesAndCountSpanAndFilterItems('', activeTags);
    inputField.focus();
}