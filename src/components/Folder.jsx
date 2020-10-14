import React, { Component } from "react";
import "../styles/Folder.css";
import { withRouter } from "react-router-dom";
import Upload from "./Upload";
import { updateNavigationHistory } from "../actions/Navigate";
import { folderView } from "../actions/FolderView";
import getDateFromTimestamp from "../util/getDateFromTimestamp";
import { connect } from "react-redux";
export class Folder extends Component {
  getDate = (isoDate) => {
    if (isoDate == null) {
      return;
    }
    return getDateFromTimestamp(Date.parse(isoDate));
  };
  folderView = (view) => {
    this.props.folderView(view);
  };
  openFolder = (folder) => {
    if (folder.file !== null) {
      return;
    }
    let temp = this.props.navigate;
    temp.push(folder);
    this.props.updateNavigationHistory(temp);
    this.props.history.push(`/home/folders/${folder.id}`);
  };
  render() {
    const NAMELENGTH = 15;
    return (
      <div className="folder_wrapper container">
        <div className="view_option">
          <div
            className="grid_view_option"
            onClick={() => {
              this.folderView(false);
            }}
            title="Grid View"
          >
            <i className="fas fa-grip-horizontal"></i>
          </div>
          <div
            className="list_view_option"
            onClick={() => {
              this.folderView(true);
            }}
            title="List View"
          >
            <i className="fas fa-list"></i>
          </div>
        </div>
        {this.props.listView ? (
          <div className="list_view">
            <div className="folder_detail list_view_grid">
              <div className="detail">Name</div>
              <div className="detail">Created At</div>
              <div className="detail">Type</div>
              <div className="detail">Size</div>
            </div>
            <div>
              {this.props.files
                ? this.props.files.map((folder) => (
                    <div
                      className="folder list_view_grid"
                      key={folder.id}
                      onClick={() => this.openFolder(folder)}
                    >
                      <div className="folder-name">
                        {folder.file ? (
                          <i className="fas fa-file"></i>
                        ) : (
                          <i className="fas fa-folder"></i>
                        )}
                        <span>
                          {folder.name.length > NAMELENGTH
                            ? folder.name.substring(0, NAMELENGTH)
                            : folder.name}
                        </span>
                      </div>
                      <div className="created_at">
                        {this.getDate(folder.created_date)}
                      </div>
                      <div className="type">
                        {folder.file ? "File" : "Folder"}
                      </div>
                      <div className="size">--</div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ) : (
          <div className="grid_view">
            {this.props.files
              ? this.props.files.map((folder) => (
                  <div
                    className="folder grid_folder"
                    key={folder.id}
                    onClick={() => this.openFolder(folder)}
                  >
                    <div className="folder-name">
                      {folder.file ? (
                        <i className="fas fa-file"></i>
                      ) : (
                        <i className="fas fa-folder"></i>
                      )}
                      <span>
                        {folder.name.length > NAMELENGTH
                          ? folder.name.substring(0, NAMELENGTH)
                          : folder.name}
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        )}
        <Upload />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  navigate: state.navigationHistory,
  listView: state.folderView,
});
export default withRouter(
  connect(mapStateToProps, { updateNavigationHistory, folderView })(Folder)
);
