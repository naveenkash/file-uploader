import { isLoggedIn } from "./Auth";
import { updateFiles } from "./File";
import { user } from "./User";
import { updateNavigationHistory } from "./Navigate";
import { folderView } from "./FolderView";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: isLoggedIn,
  user,
  files: updateFiles,
  navigationHistory: updateNavigationHistory,
  folderView: folderView,
});

export default allReducers;
