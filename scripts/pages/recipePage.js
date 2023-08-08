async function displayRecipes() {
    const recipesData = await getRecipes();
    const recipesContainer = document.getElementById('recipes-container');

    for (const recipeData of recipesData) {
        const recipeObj = new Recipe(recipeData.id, recipeData.image, recipeData.name, recipeData.servings, recipeData.ingredients, recipeData.time, recipeData.description, recipeData.appliance, recipeData.ustensils);
        const recipeElement = createRecipeElement(recipeObj);
        recipesContainer.appendChild(recipeElement);

        const ingredientsBlock = recipeElement.querySelector('.div_ingredient_bloc');
        ensureMaxIngredientsDisplayed(recipeObj, ingredientsBlock);
    }
}

function createRecipeElement(recipe) {
    const recipeElementString = createRecipeDOMElement(recipe);
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(recipeElementString, 'text/html');
    return doc.querySelector('.recipe_article');
}