async function getRecipes() {
    const response = await fetch("../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes;
    return recipes;
}

async function init() {
    await displayRecipes();

    displayFilter("ingredients", "filters-container");
    displayFilter("ustensils", "filters-container");
    displayFilter("appliance", "filters-container");
}

init();