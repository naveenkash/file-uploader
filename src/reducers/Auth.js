let auth = false;
export const isLoggedIn = (state = auth, action) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return action.payload;
    default:
      return state;
  }
};
