async function getUniqueItems(type) {
    const recipes = await getRecipes();
    const itemsSet = new Set();

    recipes.forEach(recipe => {
        if (type === "ingredients") {
            recipe.ingredients.forEach(ingredient => {
                itemsSet.add(ingredient.ingredient);
            });
        } else if (type === "ustensils") {
            recipe.ustensils.forEach(utensil => {
                itemsSet.add(utensil);
            });
        } else if (type === "appliance") {
            itemsSet.add(recipe.appliance);
        }
    });

    return Array.from(itemsSet);
}





function toggleFilterHeight(type) {
    const filterBox = document.getElementById(`${type}_filter`);
    const list = document.getElementById(`${type}_list`);
    const icon = filterBox.querySelector('.toggle i');

    console.log("Toggle called for:", type); 

    if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
        list.style.maxHeight = '300px';
        icon.classList.add('rotated');
        console.log("List should be visible now"); 
    } else {
        list.style.display = 'none';
        list.style.maxHeight = '0px';
        icon.classList.remove('rotated');
        console.log("List should be hidden now"); 
    }

    console.log("List height:", list.clientHeight); 
}
