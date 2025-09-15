const parseString = (str) => {
  if (typeof str !== 'string') return;
  return str.trim().toLowerCase();
};

export const parseRecipeFilters = ({
  type,
  title,
  categories,
  ingredients,
  search,
  userId,
}) => {
  const parsedType = parseString(type);
  const parsedTitle = parseString(title);
  const parsedIngredient = parseString(ingredients);
  const parsedCategory = parseString(categories);
  const parsedSearch = parseString(search);
  const parsedUserId = parseString(userId);

  return {
    ...(parsedType && { type: parsedType }),
    ...(parsedTitle && { title: parsedTitle }),
    ...(parsedIngredient && { ingredients: parsedIngredient }),
    ...(parsedCategory && { category: parsedCategory }),
    ...(parsedSearch && { searchQuery: parsedSearch }),
    ...(parsedUserId && { userId: parsedUserId }),
  };
};
