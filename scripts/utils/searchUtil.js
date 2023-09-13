function filterRecipes(query, tags, recipes) {

    let recipesFromSearchBar =  recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query) ||
        recipe.appliance.toLowerCase().includes(query) ||
        recipe.ustensils.some(utensil => utensil.toLowerCase().includes(query)) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query))
    );

    return tags.length > 0 ? filterByTags(recipesFromSearchBar, tags) : recipesFromSearchBar;
}

// Filtre une liste de recettes en fonction des tags fournis
function filterByTags(recipes, tags) {
    return recipes.filter(recipe => {
        return tags.every(tag => {
            // Si le tag est de type "ingrédients" et que la recette n'a pas cet ingrédient, 
            // retourne false (exclut la recette)
            if (tag.type === "ingredients") {
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.name.toLowerCase());
            }
            if (tag.type === "ustensils") {
                return recipe.ustensils.some(utensil => utensil.toLowerCase() === tag.name.toLowerCase());
            }
            if (tag.type === "appliance") {
                return recipe.appliance.toLowerCase() === tag.name.toLowerCase();
            }
            return false;
        });
    });
}



function updateFilterItemsVisibility(displayedRecipes) {
    const filterTypes = ['ingredients', 'ustensils', 'appliance'];
    
    filterTypes.forEach(type => {
        // Récupére tous les items du type actuel
        const items = document.querySelectorAll(`.filter-item[data-type="${type}"]`);
        
        // Crée un ensemble des valeurs uniques pour le type actuel dans les recettes affichées
        const uniqueValues = new Set();
        
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

        // Cache ou affiche chaque item selon s'il apparaît dans les recettes affichées
        items.forEach(item => {
            const itemValue = item.getAttribute('data-item').toLowerCase();
            if (uniqueValues.has(itemValue)) {
                item.classList.remove("hidden_item");
            } else {
                item.classList.add("hidden_item");
            }
        });
    });
}





// Fonction qui permet de garder le tag actif lorsqu'on
// efface la valeur de l'input
function handleSearchInput(event) {
    // Récupère la valeur saisie par l'utilisateur
    const query = event.target.value.toLowerCase();
    let recipesToShow;

    // Si la longueur de la requête est égale à 0 -> ajout classe hidden
    eraseButton.classList.toggle('hidden', query.length === 0);

    // Filtre les recettes en fonction de la requête et des tags actifs
    if (query.length >= 3) {
        recipesToShow = filterRecipes(query, activeTags, allRecipes);
    } else {
        // Si la requête contient moins de 3 caractères, affiche les recettes qui correspondent aux tags actifs
        recipesToShow = activeTags.length > 0 ? filterByTags(allRecipes, activeTags) : allRecipes;
    }

    updateFiltersAndRecipes(recipesToShow);
}


