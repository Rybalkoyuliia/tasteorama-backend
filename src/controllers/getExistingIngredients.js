import { Recipe } from '../db/models/Recipe.js';

export const getExistingIngredients = async (req, res, next) => {
  try {
    const { category } = req.query;

    const usedIngredients = await Recipe.aggregate([
      {
        $match: {
          category: category,
        },
      },
      { $unwind: '$ingredients' },
      {
        $group: {
          _id: '$ingredients.id',
        },
      },
      {
        $lookup: {
          from: 'ingredients',
          localField: '_id',
          foreignField: '_id',
          as: 'ingredientData',
        },
      },
      {
        $unwind: '$ingredientData',
      },
      {
        $replaceRoot: {
          newRoot: '$ingredientData',
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
