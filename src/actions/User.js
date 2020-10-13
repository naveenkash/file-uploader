export const updateUser = (isLoggedIn) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_USER",
      payload: isLoggedIn,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_USER",
      payload: null,
    });
    dispatch({
      type: "IS_LOGGED_IN",
      payload: false,
    });
  };
};
