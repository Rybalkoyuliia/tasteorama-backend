import { Router } from 'express';
import { getIngredients } from '../controllers/getIngredients.js';
import { getExistingIngredients } from '../controllers/getExistingIngredients.js';

const ingredientsRouter = Router();

ingredientsRouter.get('/', getIngredients);

ingredientsRouter.get('/used', getExistingIngredients);

export default ingredientsRouter;
