async function getRecipes() {
    const response = await fetch("../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes;
    return recipes;
}

async function init() {
    displayRecipes();

}

init();