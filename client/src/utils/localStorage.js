export const getSelectedRecipeIds = () => {
  const selectedRecipeIds = localStorage.getItem('selected_recipes')
    ? JSON.parse(localStorage.getItem('selected_recipes'))
    : [];

  return selectedRecipeIds;
};

export const selectRecipeIds = (recipeIdArr) => {
  if (recipeIdArr.length) {
    localStorage.setItem('selected_recipes', JSON.stringify(recipeIdArr));
  } else {
    localStorage.removeItem('selected_recipes');
  }
};

export const removeRecipeId = (recipeId) => {
  const selectedRecipeIds = localStorage.getItem('selected_recipes')
    ? JSON.parse(localStorage.getItem('selected_recipes'))
    : null;

  if (!selectedRecipeIds) {
    return false;
  }

  const updatedSelectedRecipeIds = selectedRecipeIds?.filter((selectedRecipeId) => selectedRecipeId !== recipeId);
  localStorage.setItem('saved_recipes', JSON.stringify(updatedSelectedRecipeIds));

  return true;
};
