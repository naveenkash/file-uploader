import React, { Component, createRef } from "react";
import "../styles/Upload.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ButtonLoader from "./ButtonLoader";
export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUploadDialog: false,
      openFolderNameDialog: false,
      loading: false,
    };
    this.createFolderInput = createRef();
    this.upload = createRef();
  }
  openUploadDialog = () => {
    this.setState({
      openUploadDialog: true,
    });
  };
  uploadFile = async (e) => {
    let fileData = e.currentTarget.files[0];
    let url = `https://interview.skizzle.email/file-folder/`;
    // create form data
    let formData = new FormData();
    formData.append(
      "user",
      JSON.stringify({
        user: {
          username: this.props.user.username,
          email: this.props.user ? this.props.user.email : "",
        },
      })
    );
    formData.append("name", fileData.name);
    formData.append("file", fileData);
    formData.append("folder", false);
    formData.append("parent_folder", this.props.match.params.id || null);
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${this.props.user.token}`,
          accept: "application/json",
        },
        body: formData,
      });
      const data = await resp.json();
      this.setState({ data });
      alert("File Uploaded");
    } catch (error) {
      alert(error.message);
    }
    this.setState({
      openUploadDialog: false,
      openFolderNameDialog: false,
      loading: false,
    });
  };
  createFolder = async () => {
    if (this.createFolderInput.current.value <= 0) {
      alert("Name cannot be empty");
      return;
    }
    let url = `https://interview.skizzle.email/file-folder/`;
    this.setState({
      loading: true,
    });
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${this.props.user.token}`,
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          parent_folder: this.props.match.params.id || null,
          folder: true,
          name: this.createFolderInput.current.value,
        }),
      });
      await resp.json();
      alert("Folder Created");
    } catch (error) {
      alert(error.message);
    }
    this.setState({
      openUploadDialog: false,
      openFolderNameDialog: false,
      loading: false,
    });
  };
  openFolderNameDialog = () => {
    this.setState({ openFolderNameDialog: true });
  };
  hideUploadOptions = () => {
    if (this.state.openUploadDialog || this.state.openFolderNameDialog) {
      this.setState({
        openUploadDialog: false,
        openFolderNameDialog: false,
      });
    }
  };
  render() {
    const DIALOG_OPENED =
      this.state.openFolderNameDialog || this.state.openUploadDialog;
    return (
      <>
        <div className="upload_container" ref={this.upload}>
          <div
            className="upload"
            onClick={() => {
              this.openUploadDialog();
            }}
          >
            <div className="upload_icon">
              <i className="fas fa-plus"></i> New
            </div>
          </div>
          {this.state.openUploadDialog ? (
            <div className="upload_wrapper">
              <div className="upload_dialog">
                <ul>
                  <li className="upload_item">
                    <label htmlFor="fileUpload">File Upload</label>
                    <input
                      id="fileUpload"
                      onInput={(e) => {
                        this.uploadFile(e);
                      }}
                      type="file"
                    />
                  </li>
                  <li
                    className="upload_item"
                    onClick={(e) => {
                      this.openFolderNameDialog(e);
                    }}
                  >
                    Create Folder
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
          {this.state.openFolderNameDialog ? (
            <div className="create_folder">
              <div className="create_folder_input">
                <input
                  type="text"
                  ref={this.createFolderInput}
                  placeholder="Folder Name"
                />
              </div>
              <button
                className="create"
                style={{
                  cursor: this.state.loading ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  this.createFolder();
                }}
              >
                {this.state.loading ? <ButtonLoader /> : "Create"}
              </button>
            </div>
          ) : null}
        </div>
        {DIALOG_OPENED ? (
          <div
            className="overlay"
            onClick={() => {
              this.hideUploadOptions();
            }}
          ></div>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default withRouter(connect(mapStateToProps, {})(Upload));
