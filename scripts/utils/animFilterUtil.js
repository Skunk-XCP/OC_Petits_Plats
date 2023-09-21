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

function closeFilterBox(filterBox) {
    const chevron = filterBox.querySelector('.chevron');
    const typeList = filterBox.querySelector('.type_list');
    const itemList = filterBox.querySelector('.items-list');

    filterBox.classList.remove('expanded');

    if (typeList) typeList.classList.remove('visible');
    if (itemList) itemList.classList.remove('visible');

    if (chevron) {
        chevron.style.transform = 'rotate(0deg)';
    }
}


function filterBoxClickHandler(event) {
    const filterBox = event.currentTarget;

    // Si le clic est sur un input ou sur un tag, on ne fait rien
    if (event.target.tagName.toLowerCase() === 'input' || event.target.closest('.filter-item')) {
        return;
    }

    // Toggle la `filterBox`
    if (filterBox.classList.contains('expanded')) {
        closeFilterBox(filterBox);
    } else {
        openFilterBox(filterBox);
    }
}



// function filterBoxClickHandler(event) {
//     const filterBox = event.currentTarget;
//     const chevron = filterBox.querySelector('.chevron');
//     const typeList = filterBox.querySelector('.type_list');
//     const itemList = filterBox.querySelector('.items-list');
    
//     // Si le clic est sur un input, on ne fait rien
//     if (event.target.tagName.toLowerCase() === 'input') {
//         return;
//     }

//     // Si le clic est sur un tag, on ne fait rien
//     if (event.target.closest('.filter-item')) {
//         return;
//     }

//     // Toggle la classe expanded pour le border-radius
//     filterBox.classList.toggle('expanded');

//     // Toggle la visibilité des éléments internes
//     if (typeList) typeList.classList.toggle('visible');
//     if (itemList) itemList.classList.toggle('visible');

//     // Toggle l'icône
//     if (chevron) {
//         if (filterBox.classList.contains('expanded')) {
//             chevron.style.transform = 'rotate(180deg)';
//         } else {
//             chevron.style.transform = 'rotate(0deg)';
//         }
//     }
// }

