function createTagMarkup(itemName, itemType) {
    return `
        <span class="tag">${itemName}
            <button class="tag__erase" type="button" data-type="${itemType}" data-item="${itemName}">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </span>
    `;
}