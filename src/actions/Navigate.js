export const updateNavigationHistory = (navigationHistory) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_NAVIGATION_HISTORY",
      payload: navigationHistory,
    });
  };
};
