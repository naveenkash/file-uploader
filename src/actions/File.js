export const updateFiles = (files) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_FILES",
      payload: files,
    });
  };
};
