const MAX_INGREDIENTS = 6;

function ensureMaxIngredientsDisplayed(recipe, ingredientsBlock) {
    console.log("ensureMaxIngredientsDisplayed est appelée");
    while (recipe.ingredients.length < MAX_INGREDIENTS) {
        const emptyIngredientGroup = document.createElement('div');
        emptyIngredientGroup.classList.add('div_ingredients_group');

        const emptyIngredientName = document.createElement('dt');
        const emptyIngredientUnit = document.createElement('dd');

        emptyIngredientGroup.appendChild(emptyIngredientName);
        emptyIngredientGroup.appendChild(emptyIngredientUnit);

        ingredientsBlock.appendChild(emptyIngredientGroup);
        
        recipe.ingredients.push({}); 
    }
}