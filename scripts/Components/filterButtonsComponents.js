function filter(type, items) {
    const translatedType = translations[type] || type;
    const listItems = items.map(item => `<a class="filter-item" data-type="${type}" data-item="${item}">${item} </a>`).join('');

    let htmlContent = `
        <div id="${type}_filter" class="filterBox" data-type="${type}">
            <button type="button" class="toggle">${translatedType} </button> <i class="fa-solid fa-chevron-down chevron"></i>
            <div id="${type}_list" class="type_list">
                <label for="${type}"></label>
                <input type="text" id="${type}" class="searchBar_filter">
                <button class="search-tag__erase hidden" type="button"><i class="fa-solid fa-xmark"></i></button>
                <img class="search-tag__magnifying-glass" src="/assets/images/search-valid.svg" alt="Icone loupe">
            </div>

            <div class="items-list">
                ${listItems}
            </div>
        </div>
    `;

    return htmlContent;
}