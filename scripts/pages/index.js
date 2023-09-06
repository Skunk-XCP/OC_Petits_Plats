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

            const tagFilters = new TagFilters(recipes);

            const ingredientList = tagFilters.filteredIngredients();
            const applianceList = tagFilters.filteredAppliance();
            const utensilList = tagFilters.filteredUstensils();
            filters.forEach(filter => {

                if (filter === "ingredients") {
                    displayFilter(filter, ingredientList)
                } else if (filter === "appliance") {
                    displayFilter(filter, applianceList)
                } else if (filter === "ustensils") {
                    displayFilter(filter, utensilList)
                }
            })
            
            toggleFilter();
            bindClickFilterItem();
        })
}

init();