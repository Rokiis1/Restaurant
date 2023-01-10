export interface Recipe {
  id?: number
  name: string
  ingredients: string[]
  instructions: string
}

export function validateRecipe(recipe: Recipe): void {
  if (!recipe.name.trim() || recipe.ingredients.length === 0 || !recipe.instructions.trim()) {
    throw new Error('Missing required fields');
  }
}

export function formatRecipe(recipe: Recipe): Recipe {
  return {
    id: recipe.id,
    name: recipe.name.trim(),
    ingredients: recipe.ingredients.map((ingredient) => ingredient.trim()),
    instructions: recipe.instructions.trim()
  };
}
