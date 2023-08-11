// Filtre les recettes en fonction d'une requête donnée
function filterRecipes(query, recipes) {
    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query.toLowerCase()) || 
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.appliance.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ustensils.some(utensil => utensil.toLowerCase().includes(query.toLowerCase())) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()))
    );
}
