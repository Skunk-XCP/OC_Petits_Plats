class TagFilters {
    constructor(recipes){
        this.recipes = recipes;
    }

    // filteredIngredients() {
    //     let allIngredients = [];
    //     let uniqueIngredient;
    //     for (let i = 0 ; i < this.recipes.length ; i++) {
    //         for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
    //             allIngredients.push(this.recipes[i].ingredients[j].ingredient)
    //             uniqueIngredient = [... new Set(allIngredients)]
    //         }
    //     }
    //     console.log(uniqueIngredient);
    //     console.log(allIngredients);

    // }



    filteredIngredients() {
        // Utiliser flatMap pour obtenir tous les ingrédients
        const allIngredients = this.recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
        // Éliminer les doublons avec Set
        const uniqueIngredientsSet = new Set(allIngredients);
        
        // Convertir le Set en tableau
        const uniqueIngredientsArray = [...uniqueIngredientsSet];
        
        return uniqueIngredientsArray;
    }
    

    filteredAppliance() {
        const allAppliances = this.recipes.map(recipe => recipe.appliance);
        
        const uniqueAppliancesSet = new Set(allAppliances);
        
        const uniqueAppliancesArray = [...uniqueAppliancesSet];
        
        return uniqueAppliancesArray;
    }

    filteredUstensils() {
        const allUstensils = this.recipes.flatMap(recipe => recipe.ustensils);

        const uniqueUstensilsSet = new Set(allUstensils);
        
        const uniqueUstensilsArray = [...uniqueUstensilsSet];
        
        return uniqueUstensilsArray;
    }
    
}

