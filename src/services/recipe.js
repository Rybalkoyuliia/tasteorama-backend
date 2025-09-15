import { sortList } from '../constants/index.js';
import { Recipe } from '../db/models/Recipe.js';
import { Ingredient } from '../db/models/Ingredient.js';
import { calcaPaginationData } from '../utils/calcPaginationData.js';

export const getRecipes = async ({
  page = 1,
  perPage = 12,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  let query = Recipe.find();
  if (filters.userId) {
    query = query.where('owner').equals(filters.userId);
  }

  if (filters.category) {
    query = query
      .where('category')
      .equals(new RegExp(`^${filters.category}$`, 'i'));
  }

  if (filters.searchQuery) {
    query = query.where('title').regex(new RegExp(filters.searchQuery, 'i'));
  }

  if (filters.ingredients) {
    const ingredient = await Ingredient.findOne({
      name: new RegExp(`^${filters.ingredients}$`, 'i'),
    });
    query = query.where('ingredients.id').equals(ingredient._id);
  }

  const filter = query.getFilter();
  const totalItems = await Recipe.countDocuments(filter);

  const items = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder, _id: 1 })
    .populate('ingredients.id')
    .exec();

  const paginationData = calcaPaginationData({ page, perPage, totalItems });

  return {
    items,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const createNewRecipe = async (payload) => await Recipe.create(payload);

export const getRecipeById = async (id) => {
  return await Recipe.findById(id).populate('ingredients.id');
};

export const deleteOwnRecipe = async (id) => await Recipe.findByIdAndDelete(id);
