const eraseButtons = document.querySelector(".search-bar__erase");
eraseButtons.addEventListener('click', clearInput);

const inputSearch = document.querySelector("#search-bar");
inputSearch.addEventListener('input', handleSearchInput);


// Fonction lorsqu'une valeur est entrée dans la barre de recherche
function handleSearchInput(event) {
    // Conversion en minuscules de la chaîne entrée par l'utilisateur   
    const query = event.target.value.toLowerCase();
    let recipesToShow;

    // Active/désactive la classe "hidden" selon si la requête est vide ou non
    const eraseButton = document.querySelector('#eraseButton');
    eraseButton.classList.toggle('hidden', query.length === 0);

    // Filtre les recettes si requête >= à 3 caractères
    recipesToShow = (query.length >= 3) ? filterRecipes(query, activeTags, allRecipes) : allRecipes;

    // MàJ liste recettes affichées et filtres actifs
    updateFiltersAndRecipes(recipesToShow);
}


// Fonction pour effacer le contenu de la barre de recherche
function clearInput() {
    const inputField = document.querySelector('#search-bar');
    
    // Réinitialisation de la valeur de la barre de recherche
    inputField.value = '';

    // Appel handleSearchInput pour MàJ l'état de l'application 
    // en fonction de la nouvelle valeur de la barre de recherche (qui est maintenant vide)
    handleSearchInput({ target: inputField });
    inputField.focus();
}
