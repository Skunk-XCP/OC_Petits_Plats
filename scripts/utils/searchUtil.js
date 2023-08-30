// Filtre les recettes en fonction d'une requête donnée
function filterRecipes(query, tags, recipes) {

    let recipesFromSearchBar = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query) ||
        recipe.appliance.toLowerCase().includes(query) ||
        recipe.ustensils.some(utensil => utensil.toLowerCase().includes(query)) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query))
    );

    // Filtre les recettes en fonction des tags
    if (tags && tags.length > 0) {
        recipesFromSearchBar = recipesFromSearchBar.filter(recipe => {
            return tags.every(tag => {
                switch(tag.type) {
                    case 'appliance':
                        return recipe.appliance.toLowerCase() === tag.name.toLowerCase();
                    case 'ustensil':
                        return recipe.ustensils.includes(tag.name);
                    case 'ingredient':
                        return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.name.toLowerCase());
                    default:
                        return false;
                }
            });
        });
    }

    return recipesFromSearchBar
}