const filters = ["ingredients", "ustensils", "appliance"]



async function getRecipes() {
    const response = await fetch("../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes;
    return recipes;
}


function init() {
    getRecipes()
    .then((recipes) => {
        displayRecipes(recipes);
        filters.forEach(filter => displayFilter(filter));

        const tagFilter = new TagFilters(recipes);

        const ingredientList = tagFilter.filteredIngredients();
        const applianceList = tagFilter.filteredAppliance();
        const utensilList = tagFilter.filteredUstensils();

        filterButtonsLists("ingredients", ingredientList);
        filterButtonsLists("appliance", applianceList);
        filterButtonsLists("ustensils", utensilList);
    })
}


init();