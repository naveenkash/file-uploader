export const isLoggedIn = (isLoggedIn) => {
  return (dispatch) => {
    dispatch({
      type: "IS_LOGGED_IN",
      payload: isLoggedIn,
    });
  };
};
