import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { withRouter } from "react-router-dom";
import { isLoggedIn } from "./actions/Auth";
import { updateUser } from "./actions/User";
import { connect } from "react-redux";
import PageLoader from "./components/PageLoader";
import OpenFolder from "./pages/OpenFolder";
import { updateFiles } from "./actions/File";
import Navigate from "./components/Navigate";
import { updateNavigationHistory } from "./actions/Navigate";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && Date.parse(user.expiry) > Date.now()) {
      this.props.isLoggedIn(true);
      this.props.updateUser(user);
      let url = `https://interview.skizzle.email/file-folder/`;
      fetch(url, {
        headers: {
          Authorization: `Token ${user.token}`,
          accept: "application/json",
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.props.updateFiles(data);
          this.props.history.push("/home");
          let temp = [{ path: "/home", name: "Home" }];
          this.props.updateNavigationHistory(temp);
        })
        .catch((e) => {
          alert(e.message);
          this.props.history.push("/signup");
        });
    } else {
      localStorage.removeItem("user");
      this.props.history.push("/signup");
    }
    this.setState({
      loading: false,
    });
  }
  render() {
    if (this.state.loading) {
      return <PageLoader />;
    }
    return (
      <div className="app">
        <Navbar />
        {this.props.auth ? <Navigate /> : null}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/home/folders/:id">
            <OpenFolder />
          </Route>
          <Route>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, {
    isLoggedIn,
    updateUser,
    updateFiles,
    updateNavigationHistory,
  })(App)
);
