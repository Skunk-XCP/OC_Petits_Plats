function recipe(){
    // Recipe Article
    const recipe_article = document.createElement("article");
    recipe_article.classList.add('recipe_article');

    //Recipe Card
    const recipe_card = document.createElement("figure");
    recipe_card.classList.add('recipe_card');
    
    // Recipe Picture
    const recipe_picture = document.createElement("img");
    recipe_picture.classList.add('recipe_picture');
    recipe_picture.setAttribute('src', ``);
    recipe_picture.setAttribute('alt', ``);

    // Recipe Timer
    const recipe_timer = document.createElement('span');
    recipe_timer.classList.add('recipe_timer');
    recipe_timer.innerHTML = ` min`;

    // List Section
    const indredients_section = document.createElement('dl');
    indredients_section.classList.add('indredients_section');

    // Recipe Name
    const recipe_title = document.createElement('dt');
    recipe_title.classList.add('recipe_title');

    // Recette
    const description_title = document.createElement('dt');
    description_title.classList.add('description_title');
    description_title.innerHTML = 'Recette';

    // Recipe Description
    const recipe_description = document.createElement('dd');
    recipe_description.classList.add('recipe_description');

    // Ingredients List
    const ingredients_list = document.createElement('dt');
    ingredients_list.classList.add('ingredients_list');

    // Ingredients Name
    const ingredient_name = document.createElement('dt');
    ingredient_name.classList.add('ingredient_name');

    // Ingredients Unit
    const ingredient_unit = document.createElement('dd');
    ingredient_unit.classList.add('ingredient_unit');

    // AppendChild
    recipe_article.appendChild(recipe_card);
    recipe_card.appendChild(recipe_picture);
    recipe_card.appendChild(recipe_timer);
    recipe_card.appendChild(indredients_section);
    indredients_section.appendChild(recipe_title);
    indredients_section.appendChild(description_title);
    indredients_section.appendChild(recipe_description);
    indredients_section.appendChild(ingredients_list);
    indredients_section.appendChild(ingredient_name);
    indredients_section.appendChild(ingredient_unit);

    return recipe_article;
}