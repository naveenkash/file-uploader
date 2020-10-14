let navigationHistory = [];
export const updateNavigationHistory = (state = navigationHistory, action) => {
  switch (action.type) {
    case "UPDATE_NAVIGATION_HISTORY":
      return action.payload;
    default:
      return state;
  }
};
