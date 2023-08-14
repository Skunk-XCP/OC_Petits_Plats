const filters = ["ingredients", "ustensils", "appliance"]

async function getRecipes() {
    const response = await fetch("../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes;
    return recipes;
}

async function init() {
    await displayRecipes();

    filters.forEach(filter => displayFilter(filter))
}

init();