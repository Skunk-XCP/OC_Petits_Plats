function createTagMarkup(itemName) {
    return `
        <span class="tag">${itemName}
            <button class="tag__erase" type="button">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </span>
    `;
}