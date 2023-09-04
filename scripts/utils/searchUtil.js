function filterRecipes(query, tags, recipes) {

    let recipesFromSearchBar =  recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query) ||
        recipe.appliance.toLowerCase().includes(query) ||
        recipe.ustensils.some(utensil => utensil.toLowerCase().includes(query)) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query))
    );

    if(tags.length > 0) {
        recipesFromSearchBar = filterByTags(recipesFromSearchBar, tags);
    }

    return recipesFromSearchBar;
}


// Filtre une liste de recettes en fonction des tags fournis
function filterByTags(recipes, tags) {
    return recipes.filter(recipe => {
        for (let tag of tags) {
            // Si le tag est de type "ingrédients" et que la recette n'a pas cet ingrédient, 
            // retourne false (exclut la recette)
            if (tag.type === "ingredients" && !recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.name.toLowerCase())) {
                return false;
            }
            if (tag.type === "ustensils" && !recipe.ustensils.some(utensil => utensil.toLowerCase() === tag.name.toLowerCase())) {
                return false;
            }
            if (tag.type === "appliance" && recipe.appliance.toLowerCase() !== tag.name.toLowerCase()) {
                return false;
            }
        }
        // Si toutes les vérifications sont passées, 
        // retourne true (inclut la recette dans le résultat)
        return true;
    });
}

//MàJ de la span qui affiche le nombre des recettes en fonction du nombre donné
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