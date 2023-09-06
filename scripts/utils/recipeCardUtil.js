function createRecipeDOMElement(recipe) {

    return `
        <article class="recipe_article">
            <figure class="recipe_card">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe_picture">
                <figcaption class="recipe_content">

                    <span class="recipe_timer">${recipe.time}min</span>

                    <h2 class="recipe_title">${recipe.name}</h2>
                    
                    <h3 class="description_title">Recette</h3>
                    <p class="recipe_description">${recipe.description}</p>

                    <h3 class="ingredients_list">Ingrédients</h3>

                    <dl class="div_ingredient_bloc">
                        ${recipe.ingredients.map(ingredient => `
                            <div class="div_ingredients_group">
                                <dt class="ingredient_name">${ingredient.ingredient}</dt>
                                <dd class="ingredient_unit">${ingredient.quantity || ''} ${ingredient.unit || ''}</dd>
                            </div>
                        `).join('')}
                    </dl>
                </figcaption>
            </figure>
        </article>
    `;
}