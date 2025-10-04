import { parsedIngredientsField } from '../utils/parsedIngredientsField.js';
import { validatedRecipe } from '../utils/validatedRecipe.js';
import { createNewRecipe, getRecipes } from '../services/recipe.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortRecipesParams.js';
import { recipesSortFields } from '../db/models/Recipe.js';
import { parseRecipeFilters } from '../utils/parseRecipeFilters.js';
import { handleThumbUpload } from '../utils/handleThumbUpload.js';
import { getRecipeById } from '../services/recipe.js';

export const getRecipesController = async (req, res) => {
  const userId = req.user?._id;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, recipesSortFields);

  const filters = parseRecipeFilters({
    ...req.query,
    userId,
    ingredients: req.query.ingredients,
  });

  const data = await getRecipes({ page, perPage, sortBy, sortOrder, filters });
  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data,
  });
};

export const createNewRecipeController = async (req, res) => {
  const { _id: owner } = req.user;

  const validatedData = validatedRecipe(req.body);
  const parsedIngredients = parsedIngredientsField(req.body);
  const thumb = await handleThumbUpload(req.file);

  const data = await createNewRecipe({
    ...req.body,
    ...validatedData,
    ingredients: parsedIngredients,
    thumb,
    owner,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created new recipe!',
    data,
  });
};

export const getRecipeByIdController = async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(404).json({
      status: 404,
      message: 'Recipe not found',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Recipe found',
    data: recipe,
  });
};
