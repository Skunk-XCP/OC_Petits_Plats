// Fonction pour ouvrir les boutons filtre
function openFilterBox(filterBox) {
    const chevron = filterBox.querySelector('.chevron');
    const typeList = filterBox.querySelector('.type_list');
    const itemList = filterBox.querySelector('.items-list');

    filterBox.classList.add('expanded');
    
    if (typeList) typeList.classList.add('visible');
    if (itemList) itemList.classList.add('visible');

    if (chevron) {
        chevron.style.transform = 'rotate(180deg)';
    }
}


// Fonction pour fermer les boutons filtre
function closeFilterBox(filterBox) {
    const chevron = filterBox.querySelector('.chevron');
    const typeList = filterBox.querySelector('.type_list');
    const itemList = filterBox.querySelector('.items-list');
    const eraseButton = filterBox.querySelector('.search-tag__erase');
    const inputForCurrentType = filterBox.querySelector('input.searchBar_filter');

    filterBox.classList.remove('expanded');

    if (typeList) typeList.classList.remove('visible');
    if (itemList) itemList.classList.remove('visible');

    // Si un input est présent
    if (inputForCurrentType) {
        // Vider la valeur de l'input
        inputForCurrentType.value = "";
        // Masquer le bouton "effacer"
        eraseButton.classList.add('hidden');
        
        // Réinitialiser la liste d'éléments à son état original
        filterItemsBasedOnInput(inputForCurrentType);
    }

    if (chevron) {
        chevron.style.transform = 'rotate(0deg)';
    }
}




// Gère le comportement ouverture et fermeture des boutons filtres
// lorsque l'utilisateur clique dessus ou à l'extérieur
function filterBoxClickHandler(event) {

    // Récupère l'élément filterBox sur lequel l'événement de clic a été déclenché
    const filterBox = event.currentTarget;

    // Si le clic est sur un input ou sur un tag, on ne fait rien
    if (event.target.tagName.toLowerCase() === 'input' || event.target.closest('.filter-item')) {
        return;
    }

    // Vérifie si la filterBox est actuellement ouverte
    if (filterBox.classList.contains('expanded')) {
        closeFilterBox(filterBox);
    } else {
        openFilterBox(filterBox);

        filterBox.focus();  

        document.addEventListener('click', function outsideClickListener(e) {
            // Si le clic a été effectué à l'extérieur de la filterBox => ferme la filterBox
            if (!filterBox.contains(e.target) && e.target !== filterBox) {
                closeFilterBox(filterBox);

                // Supprime l'écouteur pour éviter les écouteurs multiples
                document.removeEventListener('click', outsideClickListener);
            }
        });
    }
}
