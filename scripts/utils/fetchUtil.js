async function getRecipes() {
    // Effectue une requête fetch pour récupérer les données depuis le fichier photographers.json
    const response = await fetch("../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes;
    return recipes;
}

async function init() {
    


}

init();