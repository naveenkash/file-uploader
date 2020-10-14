export const folderView = (view) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_FOLDER_VIEW",
      payload: view,
    });
  };
};
