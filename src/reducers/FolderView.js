let view = true;
export const folderView = (state = view, action) => {
  switch (action.type) {
    case "UPDATE_FOLDER_VIEW":
      return action.payload;
    default:
      return state;
  }
};
