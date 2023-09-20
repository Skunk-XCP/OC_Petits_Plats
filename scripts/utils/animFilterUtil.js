function toggleFilter() {
    const filterBoxes = document.querySelectorAll('.filterBox');

    if (!filterBoxes.length) {
        return;
    }

    filterBoxes.forEach(filterBox => {
        filterBox.removeEventListener('click', filterBoxClickHandler); 
        filterBox.addEventListener('click', filterBoxClickHandler);
    });
}



function filterBoxClickHandler(event) {
    const filterBox = event.currentTarget;
    const chevron = filterBox.querySelector('i');
    const typeList = filterBox.querySelector('.type_list');
    const itemList = filterBox.querySelector('.items-list');
    
    // Si le clic est sur un input, on ne fait rien
    if (event.target.tagName.toLowerCase() === 'input') {
        return;
    }

    // Si le clic est sur un tag, on ne fait rien
    if (event.target.closest('.filter-item')) {
        return;
    }

    // Toggle la classe expanded pour le border-radius
    filterBox.classList.toggle('expanded');

    // Toggle la visibilité des éléments internes
    if (typeList) typeList.classList.toggle('visible');
    if (itemList) itemList.classList.toggle('visible');

    // Toggle l'icône
    if (chevron) {
        if (filterBox.classList.contains('expanded')) {
            chevron.style.transform = 'rotate(180deg)';
        } else {
            chevron.style.transform = 'rotate(0deg)';
        }
    }
}






// function toggleFilter() {
//     const filterBoxes = document.querySelectorAll('.filterBox');

//     if (!filterBoxes.length) {
//         return;
//     }

//     filterBoxes.forEach(filterBox => {

//         filterBox.setAttribute('tabindex', '0');
//         const searchBarFilter = filterBox.querySelector('.searchBar_filter');
//         const recipesToShow = filterRecipes(inputSearch.value, activeTags, allRecipes);


//         // Ajoute un écouteur focusout pour éviter d'ajouter des écouteurs multiples
//         filterBox.addEventListener('focusout', function () {
//             // Utilise setTimeout pour permettre au navigateur de définir document.activeElement
//             setTimeout(() => {
//                 // Vérifie si le nouvel élément actif est un descendant de filterBox
//                 if (!filterBox.contains(document.activeElement)) {
//                     // code pour fermer la liste
//                     filterBox.classList.remove('expanded');
//                     const typeList = filterBox.querySelector('.type_list');
//                     const itemList = filterBox.querySelector('.items-list');
//                     const chevron = filterBox.querySelector('i');
//                     if (typeList) typeList.classList.remove('visible');
//                     if (itemList) itemList.classList.remove('visible');
//                     if (chevron) chevron.style.transform = 'rotate(0deg)';

//                     searchBarFilter.value = '';
//                     for (let i = 0; i < eraseButton.length; i++) {
//                         if (!eraseButton[i].classList.contains('hidden')) {
//                             eraseButton[i].classList.add('hidden');
//                         }
//                     }

//                     // updateFiltersAndRecipes(recipesToShow);
//                 }
//             }, 0);
//         });

//         filterBox.addEventListener('click', function (event) {
//             const chevron = filterBox.querySelector('i');
//             const typeList = filterBox.querySelector('.type_list');
//             const itemList = filterBox.querySelector('.items-list');
//             const searchBarFilter = filterBox.querySelector('.searchBar_filter');
//             const recipesToShow = filterRecipes(inputSearch.value, activeTags, allRecipes);
//             const eraseButton = document.querySelectorAll(".search-tag__erase");


//             if (event.target.closest('.filter-item')) {
//                 // Si un tag est cliqué, masque le type_list et items-list
//                 typeList.classList.remove('visible');
//                 itemList.classList.remove('visible');
//                 filterBox.classList.remove('expanded');
//                 if (chevron) {
//                     chevron.style.transform = 'rotate(0deg)';
//                 }
//                 return;
//             }

//             if (event.target.closest('.searchBar_filter') || event.target.closest('.type_list')) {
//                 // Si le clic est sur searchBar_filter ou sur un de ses descendants, on ne fait rien
//                 return;
//             }

//             // Toggle la classe expanded pour le border-radius
//             filterBox.classList.toggle('expanded');

//             // Toggle la visibilité des éléments internes
//             typeList.classList.toggle('visible');
//             itemList.classList.toggle('visible');

//             // Clear l'input si la liste d'items se referme
//             if (!filterBox.classList.contains('expanded')) {
//                 searchBarFilter.value = '';
//                 for (let i = 0; i < eraseButton.length; i++) {
//                     if (!eraseButton[i].classList.contains('hidden')) {
//                         eraseButton[i].classList.add('hidden');
//                     }
//                 }
//                 // updateFiltersAndRecipes(recipesToShow);
//             }

//             // Toggle l'icône
//             if (chevron) {
//                 if (filterBox.classList.contains('expanded')) {
//                     chevron.style.transform = 'rotate(180deg)';
//                 } else {
//                     chevron.style.transform = 'rotate(0deg)';
//                 }
//             }
//         });
//     });
// }