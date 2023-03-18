import React, { Component } from "react";
import "./login.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
// import fire from "../../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.configure = getAuth();

    this.state = {
      renderSigning: "login",
      email: "",
      confirmPassword: "",
      password: "",
    };
  }
  componentDidMount() {
    // console.log(this.state.renderSigning);
  }
  handleToggleSigning = (e) => {
    e.preventDefault();
    if (e.target.value === "signup") {
      this.setState({ renderSigning: e.target.value });
    } else {
      this.setState({ renderSigning: e.target.value });
    }
  };

  auth = (e) => {
    e.preventDefault();
    if (e.target.value === "login") {
      signInWithEmailAndPassword(
        this.configure,
        this.state.email,
        this.state.password
      )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(`Line 52: Loginform.js ${e.target.value}`);
      if (this.state.password !== this.state.confirmPassword) {
        alert("Password not identical with confirm password try again");
      } else {
        createUserWithEmailAndPassword(
          this.configure,
          this.state.email,
          this.state.password
        )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };
  handleChange = (e) => {
    switch (e.target.name) {
      case "email": {
        this.setState({ email: e.target.value });
        break;
      }
      case "password": {
        this.setState({ password: e.target.value });
        break;
      }
      case "confirmPassword": {
        this.setState({ confirmPassword: e.target.value });
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    return (
      <div className="overflow-y-scroll wrapper">
        <div className="container flex flex-col items-center px-4 mx-auto ">
          <div className="mt-10 mb-5">
            <img src={logo} alt="AEIRG logo" className="w-72" />
          </div>

          <h1 className="font-[inter] font-bold text-[25px] text-center text-[white] mb-10">
            Face Identifcation System
          </h1>
          <form
            action=""
            name=""
            className="bg-[white] rounded-[11px] px-10 py-6 flex flex-col items-center w-1/2 mb-10 signup_signin_res"
          >
            {this.state.renderSigning === "login" ? (
              <h1 className="text-center font-[inter] text-[33px] font-semibold mb-5">
                Login Form
              </h1>
            ) : (
              <h1 className="text-center font-[inter] text-[33px] font-semibold mb-5">
                Signup Form
              </h1>
            )}

            <div className="border border-[#C5C5BE] rounded-[11px] flex items-center mb-6 w-full">
              <button
                value="login"
                onClick={this.handleToggleSigning}
                className={`text-center rounded-[11px] px-6 py-4 text-[15px] font-[inter] font-semibold w-full transition-all ease-in-out ${
                  this.state.renderSigning === "login"
                    ? "background text-[white]"
                    : ""
                }`}
              >
                Login
              </button>
              <button
                value="signup"
                className={`text-center rounded-[11px] px-6 py-4 text-[15px] font-[inter] font-semibold w-full transition-all ease-in-out ${
                  this.state.renderSigning === "signup"
                    ? "background text-[white]"
                    : ""
                }`}
                onClick={this.handleToggleSigning}
              >
                Signup
              </button>
            </div>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className="border border-[#C5C5BE] rounded-[11px] py-4 px-4 w-full mb-4"
              // value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="border border-[#C5C5BE] rounded-[11px] py-4 px-4 w-full mb-4"
              // value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className={`border border-[#C5C5BE] rounded-[11px] py-4 px-4 w-full mb-2 ${
                this.state.renderSigning !== "signup" ? "hidden" : ""
              }`}
              // value={this.state.confirmPassword}
              onChange={this.handleChange}
            />

            <Link
              to=""
              className={`self-start text-[#0048A9] font-[inter] text-[13px] font-medium mb-4 ${
                this.state.renderSigning !== "login" ? "hidden" : ""
              }`}
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="background mb-4 w-full py-4 px-4 rounded-[11px] text-center text-[15px] text-[white] font-[inter] font-semibold"
              value={this.state.renderSigning === "login" ? "login" : "signup"}
              onClick={this.auth}
            >
              {this.state.renderSigning === "login" ? "Login" : "Signup"}
            </button>
            <p
              className={`font-[inter] text-[13px] font-medium ${
                this.state.renderSigning !== "login" ? "hidden" : ""
              }`}
            >
              Not a user?{" "}
              <button
                className="text-[#0048A9]"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ renderSigning: "signup" });
                }}
              >
                Signup now
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
