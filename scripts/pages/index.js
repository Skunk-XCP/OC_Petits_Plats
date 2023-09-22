const filters = ["ingredients", "appliance", "ustensils" ]

async function getRecipes() {
    const response = await fetch("../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes;
    return recipes;
}


function init() {
    // Appel de la fonction getRecipes pour obtenir des recettes
    getRecipes()
        // Traitement lorsque la promesse est résolue
        .then((recipes) => {
            displayRecipes(recipes);

            const tagFilters = new TagFilters(recipes);

            const ingredientList = tagFilters.filteredIngredients();
            const applianceList = tagFilters.filteredAppliance();
            const utensilList = tagFilters.filteredUstensils();

            // Boucle pour afficher les filtres sur la base des listes filtrées
            for (let i = 0; i < filters.length; i++) {
                const filter = filters[i];

                if (filter === "ingredients") {
                    displayFilter(filter, ingredientList);
                } else if (filter === "appliance") {
                    displayFilter(filter, applianceList);
                } else if (filter === "ustensils") {
                    displayFilter(filter, utensilList);
                }
            }

            const filterBoxes = document.querySelectorAll('.filterBox');
            for (let i = 0; i < filterBoxes.length; i++) {
                filterBoxes[i].addEventListener('click', filterBoxClickHandler);
            }

            bindClickFilterItem();
            bindInputFiltering();
            bindEraseButton();
        })
}


init();