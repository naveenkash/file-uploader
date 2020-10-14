import React, { Component } from "react";
import Folder from "../components/Folder";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
export class OpenFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.filterChilds();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.filterChilds();
    }
  }
  filterChilds = () => {
    let id = Number(this.props.match.params.id);
    if (id) {
      let folders = [];
      if (this.props.files && this.props.files.results) {
        this.props.files.results.forEach((folder) => {
          if (folder.parent_folder === id) {
            folders.push(folder);
          }
        });
      }
      this.setState({
        data: folders,
      });
    }
  };
  render() {
    return (
      <div className="container">
        <div className="home_container">
          <div className="home_wrapper">
            <Folder files={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  files: state.files,
});
export default withRouter(connect(mapStateToProps, {})(OpenFolder));
