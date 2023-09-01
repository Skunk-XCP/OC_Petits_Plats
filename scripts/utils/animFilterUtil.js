function toggleFilter() {
    const filterBoxes = document.querySelectorAll('.filterBox');

    if (!filterBoxes.length) {
        return;
    }

    filterBoxes.forEach(filterBox => {
        filterBox.addEventListener('click', function(event) {
            const icon = filterBox.querySelector('i');
            const typeList = filterBox.querySelector('.type_list');
            const itemList = filterBox.querySelector('.items-list');

            if (event.target.closest('.filter-item')) {
                // Si un tag (filter-item) est cliqué, masquez le type_list et items-list
                typeList.classList.remove('visible');
                itemList.classList.remove('visible');
                filterBox.classList.remove('expanded'); 
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
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

            // Toggle l'icône
            if (icon) {
                if (filterBox.classList.contains('expanded')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}
