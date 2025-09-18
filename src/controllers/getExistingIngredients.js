import { Recipe } from '../db/models/Recipe.js';

export const getExistingIngredients = async (_, res, next) => {
  try {
    const usedIngredients = await Recipe.aggregate([
      { $unwind: '$ingredients' },
      { $group: { _id: '$ingredients.id' } },
      {
        $lookup: {
          from: 'ingredients',
          localField: '_id',
          foreignField: '_id',
          as: 'usedInRecipes',
        },
      },
      { $unwind: '$usedInRecipes' },
      {
        $project: {
          _id: 1,
          name: '$usedInRecipes.name',
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);
    res.status(200).json(usedIngredients);
  } catch (error) {
    next(error);
  }
};
