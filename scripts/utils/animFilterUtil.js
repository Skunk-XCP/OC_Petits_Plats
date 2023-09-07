function toggleFilter() {
    const filterBoxes = document.querySelectorAll('.filterBox');

    if (!filterBoxes.length) {
        return;
    }

    filterBoxes.forEach(filterBox => {
        filterBox.addEventListener('click', function(event) {
            const chevron = filterBox.querySelector('i');
            const typeList = filterBox.querySelector('.type_list');
            const itemList = filterBox.querySelector('.items-list');
            const searchBarFilter = filterBox.querySelector('.searchBar_filter'); 


            if (event.target.closest('.filter-item')) {
                // Si un tag (filter-item) est cliqué, masque le type_list et items-list
                typeList.classList.remove('visible');
                itemList.classList.remove('visible');
                filterBox.classList.remove('expanded');
                // if (searchBarFilter) {
                //     searchBarFilter.value = '';
                // }
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
            if (!filterBox.classList.contains('expanded') && searchBarFilter) {
                searchBarFilter.value = '';
            }

            // Toggle l'icône
            if (chevron) {
                if (filterBox.classList.contains('expanded')) {
                    chevron.style.transform = 'rotate(180deg)';
                } else {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }

            document.addEventListener('click', function(event) {
                const isClickInside = filterBox.contains(event.target);
            
                if (!isClickInside) {
                    // Fermer la liste et réinitialiser l'input
                    typeList.classList.remove('visible');
                    itemList.classList.remove('visible');
                    filterBox.classList.remove('expanded'); 
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                    if (searchBarFilter) {
                        searchBarFilter.value = '';
                    }
                }
            });
        });
    });
}
