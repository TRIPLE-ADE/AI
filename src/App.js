import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import fire from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Private_route from "./firebase/privateRoute";
import AuthenticationForm from "./pages/login/loginform";
import Dashboard from "./pages/Main_Dashboard/Dashboard";
import About from "./pages/Main_Dashboard/About";
import Monitor from "./pages/Main_Dashboard/Monitor";
import History from "./pages/Main_Dashboard/History";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Logs from "./pages/Main_Dashboard/Logs";
// import userEvent from "@testing-library/user-event";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener = () => {
    onAuthStateChanged(fire, (user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };

  siginOUt = () => {
    signOut(getAuth())
      .then((res) => {
        alert("Logged Out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="h-screen">
        <Routes>
          <Route
            path="/"
            element={
              this.state.user ? (
                <Navigate to="/dashboard/home" />
              ) : (
                <AuthenticationForm />
              )
            }
          />
          <Route
            path="/auth"
            element={
              this.state.user ? (
                <Navigate to="/dashboard/home" />
              ) : (
                <AuthenticationForm />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <Private_route user={this.state.user}>
                <Dashboard siginOUt={this.siginOUt} />
              </Private_route>
            }
          >
            <Route index element={<About/>} />
            <Route path="/dashboard/staff-registration" element={<Monitor />} />
            <Route path="/dashboard/home" element={<About />} />
            <Route path="/dashboard/live-security-control" element={<Logs />} />
            <Route path="/dashboard/history" element={<History />} />
          </Route>
        </Routes>
      </div>
    );
  }
}
export default App;
