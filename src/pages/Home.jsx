import React, { Component } from "react";
import Folder from "../components/Folder";
import { withRouter } from "react-router-dom";
import { updateFiles } from "../actions/File";
import { connect } from "react-redux";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    let url = `https://interview.skizzle.email/file-folder/`;
    fetch(url, {
      headers: {
        Authorization: `Token ${this.props.user.token}`,
        accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.props.updateFiles({ ...data });
        data.results = data.results.filter((folder) => {
          return !folder.parent_folder;
        });
        this.setState({ data });
      });
  }
  render() {
    return (
      <div className=" container">
        <div className="home_container">
          <div className="home_wrapper">
            <Folder files={this.state.data && this.state.data.results} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default withRouter(connect(mapStateToProps, { updateFiles })(Home));
