import { Router } from 'express';
import * as RecipesController from '../controllers/recipes';

const router = Router();

router.get('/', RecipesController.getAllRecipes);
router.get('/:id', RecipesController.getRecipe);
router.post('/', RecipesController.createRecipe);
router.put('/:id', RecipesController.updateRecipe);
router.delete('/:id', RecipesController.deleteRecipe);

export default router;
