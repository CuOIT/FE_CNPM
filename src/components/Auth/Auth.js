import React, { useState } from "react";
import { useEffect } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
// import { fetchInstant } from "@/config";
// import { METHOD } from "@/constants";
import "./Auth.css";
const LoginForm = () => {
  // const [username,  setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = async (event) => {
  //  // event.preventDefault();
  //   console.log(`Username: ${username} Password: ${password}`);
  //   try {
  //     const response = await fetch("https://your-api.com/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     setError(error.message);
  //   }

  // };

  useEffect(() => {
    const loginText = document.querySelector(".title-text.login");
    console.log(loginText);
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector(".slide.login");
    const signupBtn = document.querySelector(".slide.signup");
    const signupLink = document.querySelector("form .signup-link a");
    signupBtn.onclick = () => {
      loginForm.style.marginLeft = "-50%";
      //loginText.style.marginLeft = "-50%";
    };
    loginBtn.onclick = () => {
      loginForm.style.marginLeft = "0%";
      //loginText.style.marginLeft = "0%";
    };
    signupLink.onclick = () => {
      signupBtn.click();
      return false;
    };
  }, []);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const { phone, password } = event.target;

    const payload = {
      phone: phone.value,
      password: password.value,
    };
    console.log(payload);
    fetchInstant("/login", METHOD.POST, payload).then((res) => {
      console.log(res.data);
    });

    // setUsername("Cuong");

    // try {

    //   const response = await fetch("https://localhost:3000/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       // phone,
    //       // username,
    //       // email,
    //       // password,
    //       // birthday,
    //       // role,
    //       // gender,
    //       username
    //     }),
    //   });
    //   window.alert("TRY");

    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   setError(error.message);
    // }
  };
  return (
    <div className="App">
      <form>
        <button>Click me</button>
      </form>
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">Login Form</div>
          <div className="title signup">Signup Form</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" checked />
            <input type="radio" name="slide" />
            <label htmlFor="login" className="slide login">
              Login
            </label>
            <label htmlFor="signup" className="slide signup">
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form className="login" onSubmit={handleLogin}>
              <div className="field">
                <input
                  name="phone"
                  id="usernameSignIn"
                  type="text"
                  placeholder="Phone"
                  required
                />
              </div>
              <div className="field">
                <input
                  name="password"
                  id="passwordSignIn"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input id="loginAsUser" type="submit" value="Login as User" />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input id="loginAsAdmin" type="submit" value="Login as Admin" />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input id="LoginAsStaff" type="submit" value="Login as Staff" />
              </div>
              <div className="signup-link">
                Not a member? <a href="">Signup now</a>
              </div>
            </form>
            <form className="signup">
              <div className="field">
                <input id="phone" type="text" placeholder="Phone" required />
              </div>
              <div className="field">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="field">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className="field">
                <input id="name" type="text" placeholder="Name" required />
              </div>
              <div className="field">
                <input id="email" type="text" placeholder="Email" required />
              </div>
              <div className="field">
                <input
                  id="birthday"
                  type="date"
                  placeholder="Birthday"
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
