class TagFilters {
    constructor(recipes){
        // Utiliser flatMap pour obtenir tous les ingrédients
        this.ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
        this.appliance = recipes.map(recipe => recipe.appliance);
        // this.ustensils = recipes.flatMap(recipe => recipe.ustensils.map(ustensil => this.ustensil.toLowerCase()));
        this.ustensils = recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()));

    }

    filteredIngredients() {
        // Éliminer les doublons avec Set
        const uniqueIngredientsSet = new Set(this.ingredients);
        
        // Convertir le Set en tableau
        const uniqueIngredientsArray = [...uniqueIngredientsSet];
        
        return uniqueIngredientsArray;
    }
    
    filteredAppliance() {
        const uniqueAppliancesSet = new Set(this.appliance);
        
        const uniqueAppliancesArray = [...uniqueAppliancesSet];
        
        return uniqueAppliancesArray;
    }

    filteredUstensils() {
        const uniqueUstensilsSet = new Set(this.ustensils);
        
        const uniqueUstensilsArray = [...uniqueUstensilsSet];
        
        return uniqueUstensilsArray;
    }
}

