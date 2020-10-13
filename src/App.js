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
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    let user = localStorage.getItem("user");
    this.setState({
      loading: false,
    });
    if (user) {
      this.props.isLoggedIn(true);
      this.props.updateUser(JSON.parse(user));
      this.props.history.push("/home");
    } else {
      this.props.history.push("/signup");
    }
  }
  render() {
    if (this.state.loading) {
      return <PageLoader />;
    }
    return (
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/home">
            <Home />
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
  connect(mapStateToProps, { isLoggedIn, updateUser })(App)
);
