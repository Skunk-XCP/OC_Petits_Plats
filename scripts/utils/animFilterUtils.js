function toggleFilter() {
    const toggleElements = document.querySelectorAll('.toggle');

    if (!toggleElements.length) {
        console.error("Element '.toggle' not found!");
        return;
    }

    toggleElements.forEach(toggleElement => {
        toggleElement.addEventListener('click', function() {
            const filterBox = this.closest('.filterBox');
            filterBox.classList.toggle('expanded');

            const typeList = filterBox.querySelector('.type_list');
            const itemList = filterBox.querySelector('div:last-of-type');

            // Vérifier si filterBox a la classe expanded
            if (filterBox.classList.contains('expanded')) {
                typeList.style.display = 'block';
                itemList.style.display = 'block';
            } else {
                typeList.style.display = 'none';
                itemList.style.display = 'none';
            }
        });
    });
}



