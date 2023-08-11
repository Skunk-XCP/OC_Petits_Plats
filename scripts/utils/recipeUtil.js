function createRecipeDOMElement(recipe) {
    
    return `
    <article class="recipe_article">
        <figure class="recipe_card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe_picture">
            <span class="recipe_timer">${recipe.time}min</span>
            <dl class="recipe_content">
                <dt class="recipe_title">${recipe.name}</dt>
                <dt class="description_title">Recette</dt>
                <dd class="recipe_description">${recipe.description}</dd>
                <dt class="ingredients_list">Ingrédients</dt>
                <div class="div_ingredient_bloc">
                    ${recipe.ingredients.map(ingredient => `
                        <div class="div_ingredients_group">
                            <dt class="ingredient_name">${ingredient.ingredient}</dt>
                            <dd class="ingredient_unit">${ingredient.quantity || ''} ${ingredient.unit || ''}</dd>
                        </div>
                    `).join('')}
                </div>
            </dl>
        </figure>
    </article>
    `;
}

