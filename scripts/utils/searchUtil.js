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

function filterByTags(recipes, tags) {
    return recipes.filter(recipe => {
        for (let tag of tags) {
            if (tag.type === "ingredients" && !recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.name.toLowerCase())) {
                return false;
            }
            if (tag.type === "ustensils" && !recipe.ustensils.some(utensil => utensil.toLowerCase() === tag.name.toLowerCase())) {
                return false;
            }
            if (tag.type === "ingredients" && !recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.name.toLowerCase())) {
                return false;
            }
        }
        return true;
    });
}