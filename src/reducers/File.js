let files = [];
export const updateFiles = (state = files, action) => {
  switch (action.type) {
    case "UPDATE_FILES":
      return action.payload;
    default:
      return state;
  }
};
