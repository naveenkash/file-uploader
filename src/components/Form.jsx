import React, { Component, createRef } from "react";
import "../styles/Form.css";
import { withRouter } from "react-router-dom";
import { isLoggedIn } from "../actions/Auth";
import { updateUser } from "../actions/User";
import { updateNavigationHistory } from "../actions/Navigate";
import { connect } from "react-redux";
import ButtonLoader from "./ButtonLoader";
export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.email = createRef();
    this.username = createRef();
    this.password = createRef();
  }

  submit = async () => {
    if (this.state.loading === true) {
      return;
    }
    if (this.props.signupForm && this.email.current.value.length <= 0) {
      alert("Email can't be empty");
      return;
    }
    if (this.username.current.value.length <= 0) {
      alert("username can't be empty");
      return;
    }
    if (this.password.current.value.length <= 0) {
      alert("password can't be empty");
      return;
    }
    this.setState({
      loading: true,
    });
    try {
      let formData = {
        email: this.props.signupForm ? this.email.current.value : "",
        username: this.username.current.value,
        password: this.password.current.value,
      };
      let url = "https://interview.skizzle.email/login/";
      if (this.props.signupForm) {
        url = "https://interview.skizzle.email/register/";
      }
      const resp = await fetch(url, {
        method: "POSt",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      });

      const data = await resp.json();
      if (resp.status >= 400) {
        this.setState({
          loading: false,
        });
        alert("Error occured");
        return;
      }
      if (!this.props.signupForm && data.token) {
        const userResp = await fetch("https://interview.skizzle.email/me/", {
          headers: { Authorization: `Token ${data.token}` },
        });
        const userdata = await userResp.json();
        const user = { user: { ...userdata }, ...data };
        localStorage.setItem("user", JSON.stringify(user));
        this.props.updateUser(user);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        this.props.updateUser(data);
      }

      this.props.isLoggedIn(true);
      let temp = [{ path: "/home", name: "Home" }];
      this.props.updateNavigationHistory(temp);
      this.props.history.push("/home");
    } catch (error) {
      alert(error);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="form_wrapper">
        <div className="form center">
          {this.props.signupForm ? (
            <input
              type="text"
              id="email"
              ref={this.email}
              placeholder="Email*"
            />
          ) : null}
          <input
            type="text"
            id="username"
            ref={this.username}
            placeholder="Username*"
            required
          />
          <input
            type="password"
            id="password"
            required
            ref={this.password}
            placeholder="Password*"
          />

          <button
            className="submit_form"
            style={{
              cursor: this.state.loading ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              this.submit();
            }}
          >
            {this.state.loading ? <ButtonLoader /> : "Submit"}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(null, { isLoggedIn, updateUser, updateNavigationHistory })(Form)
);
