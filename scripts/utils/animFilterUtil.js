function toggleFilter() {
    const toggleElements = document.querySelectorAll('.toggle');

    if (!toggleElements.length) {
        console.error("Element '.toggle' not found!");
        return;
    }

    toggleElements.forEach(toggleElement => {
        toggleElement.addEventListener('click', function() {
            const filterBox = this.closest('.filterBox');
            const icon = this.querySelector('i');
            const typeList = filterBox.querySelector('.type_list');
            const itemList = filterBox.querySelector('div:last-of-type');

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
