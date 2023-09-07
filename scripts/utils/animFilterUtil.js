function toggleFilter() {
    const filterBoxes = document.querySelectorAll('.filterBox');

    if (!filterBoxes.length) {
        return;
    }

    filterBoxes.forEach(filterBox => {
        filterBox.addEventListener('click', function (event) {
            const chevron = filterBox.querySelector('i');
            const typeList = filterBox.querySelector('.type_list');
            const itemList = filterBox.querySelector('.items-list');
            const searchBarFilter = filterBox.querySelector('.searchBar_filter');
            const recipesToShow = filterRecipes(inputSearch.value, activeTags, allRecipes);
            const eraseButton = document.querySelectorAll(".search-tag__erase");



            if (event.target.closest('.filter-item')) {
                // Si un tag est cliqué, masque le type_list et items-list
                typeList.classList.remove('visible');
                itemList.classList.remove('visible');
                filterBox.classList.remove('expanded');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
                return;
            }

            if (event.target.closest('.searchBar_filter') || event.target.closest('.type_list')) {
                // Si le clic est sur searchBar_filter ou sur un de ses descendants, on ne fait rien
                return;
            }

            // Toggle la classe expanded pour le border-radius
            filterBox.classList.toggle('expanded');

            // Toggle la visibilité des éléments internes
            typeList.classList.toggle('visible');
            itemList.classList.toggle('visible');

            // Clear l'input si la liste d'items se referme
            if (!filterBox.classList.contains('expanded')) {
                searchBarFilter.value = '';
                for (let i = 0; i < eraseButton.length; i++) {
                    if(!eraseButton[i].classList.contains('hidden'))  {
                        eraseButton[i].classList.add('hidden');
                    }                  
                }
                updateRecipesDisplay(recipesToShow);
                updateRecipeCountSpan(recipesToShow.length);
                itemListsFilteredByTag(recipesToShow)
            }

            // Toggle l'icône
            if (chevron) {
                if (filterBox.classList.contains('expanded')) {
                    chevron.style.transform = 'rotate(180deg)';
                } else {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }

            document.addEventListener('click', function (event) {
                const isClickInside = filterBox.contains(event.target);

                if (!isClickInside) {
                    // Fermer la liste et réinitialiser l'input 
                    // en cliquant à l'extérieur du bouton
                    typeList.classList.remove('visible');
                    itemList.classList.remove('visible');
                    filterBox.classList.remove('expanded');
                    searchBarFilter.value = '';
                    for (let i = 0; i < eraseButton.length; i++) {
                        if(!eraseButton[i].classList.contains('hidden'))  {
                            eraseButton[i].classList.add('hidden');
                        }                  
                    }
                    chevron.style.transform = 'rotate(0deg)';
                    updateRecipesDisplay(recipesToShow);
                    updateRecipeCountSpan(recipesToShow.length);
                    itemListsFilteredByTag(recipesToShow)
                }
            });
        });
    });
}
