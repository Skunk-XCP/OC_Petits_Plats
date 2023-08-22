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

            const tagFilter = new TagFilters(recipes);

            const ingredientList = tagFilter.filteredIngredients();
            const applianceList = tagFilter.filteredAppliance();
            const utensilList = tagFilter.filteredUstensils();
            filters.forEach(filter => {

                if (filter === "ingredients") {
                    displayFilter(filter, ingredientList)
                } 
                
            })
        })
}

init();