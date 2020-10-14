import React, { Component } from "react";
import "../styles/Navigate.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateNavigationHistory } from "../actions/Navigate";
export class Navigate extends Component {
  goTo = (folder, i) => {
    let temp = this.props.navigate.slice(0, i < 1 ? 1 : i + 1);
    this.props.updateNavigationHistory(temp);
    let path = folder.path || `/home/folders/${folder.id}`;
    this.props.history.push(path);
  };
  render() {
    return (
      <div className="container">
        <div className="navigate_wrapper navbar_bottom_margin">
          <div className="navigate_container">
            {this.props.navigate.map((folder, i) => (
              <div
                onClick={() => {
                  this.goTo(folder, i);
                }}
                className="navigate"
                key={folder.id + 1}
              >
                {folder.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToPRops = (state) => ({
  navigate: state.navigationHistory,
});
export default withRouter(
  connect(mapStateToPRops, { updateNavigationHistory })(Navigate)
);
