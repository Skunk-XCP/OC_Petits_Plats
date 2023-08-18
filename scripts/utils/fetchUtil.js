const filters = ["ingredients", "ustensils", "appliance"]

const filterMethods = ['filteredIngredients', 'filteredAppliance', 'filteredUstensils'
];


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
        filters.forEach(filter => displayFilter(filter))

        const tagFilter = new TagFilters(recipes);
        for (const method of filterMethods) {
            tagFilter[method]();
        }
    })


    
}

init();