const eraseButton = document.querySelector(".search-bar__erase");
const inputSearch = document.querySelector("#search-bar");
inputSearch.addEventListener('input', handleSearchInput);
eraseButton.addEventListener("click", clearInput);


function handleSearchInput(event) {
    // Récupère la valeur saisie par l'utilisateur
    const query = event.target.value.toLowerCase();
    let recipesToShow;

    // Si la longueur de la requête est égale à 0 -> ajout classe hidden
    eraseButton.classList.toggle('hidden', query.length === 0);

    // Filtre les recettes en fonction de la requête
    // Si la requête contient moins de 3 caractères, affiche toutes les recettes
    recipesToShow = (query.length >= 3) ? filterRecipes(query, activeTags, allRecipes) : allRecipes;

    updateRecipesDisplay(recipesToShow);
    updateRecipeCountSpan(recipesToShow.length); 
    updateFilterItemsVisibility(recipesToShow); 
}


// Permet d'effacer le texte dans la barre de recherche
function clearInput() {
    inputSearch.value = '';
    handleSearchInput({ target: inputSearch });
    inputSearch.focus();
}
