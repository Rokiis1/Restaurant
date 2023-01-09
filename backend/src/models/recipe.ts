export interface Recipe {
  id?: number;
  name: string;
  ingredients: string[];
  instructions: string;
}

export function validateRecipe(recipe: Recipe) {
  if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
    throw new Error("Missing required fields");
  }
}

export function formatRecipe(recipe: Recipe) {
  return {
    id: recipe.id,
    name: recipe.name.trim(),
    ingredients: recipe.ingredients.map((ingredient) => ingredient.trim()),
    instructions: recipe.instructions.trim(),
  };
}
