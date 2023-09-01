function filterRecipes(query, tags, recipes) {

    let recipesFromSearchBar =  recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query.toLowerCase()) || 
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.appliance.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ustensils.some(utensil => utensil.toLowerCase().includes(query.toLowerCase())) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()))
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