
function toggleFilter() {
    const filterBoxes = document.querySelectorAll('.filterBox');

    if (!filterBoxes.length) {
        return;
    }

    filterBoxes.forEach(filterBox => {
        filterBox.addEventListener('click', function(event) {
            // Si le clic est sur searchBar_filter ou sur un de ses descendants, on ne fait rien
            if (event.target.closest('.searchBar_filter') || event.target.closest('.type_list')) {
                return;
            }

            const icon = filterBox.querySelector('i');
            const typeList = filterBox.querySelector('.type_list');
            const itemList = filterBox.querySelector('.items-list');

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
