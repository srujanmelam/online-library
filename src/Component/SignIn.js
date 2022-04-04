import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import store from "./store";
import "./css/Captcha.css";
import "./CaptchaGen.js";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";

function SignIn() {
  const [username1, setUsername] = useState("");
  const [error1, setError1] = useState("");
  const [val1, setVal1] = useState(false);
  const [password1, setPassword] = useState("");
  const [error2, setError2] = useState("");
  const [val2, setVal2] = useState(false);
  const [message, setMessage] = useState("");
  const history = useNavigate();

  // Code to set and validate username
  const changeUsername = (val) => {
    setUsername(val);
    if (val.length === 0) {
      setError1("Username cannot be empty");
      setVal1(true);
    } else if (!val.match(/^[a-zA-Z0-9\s]+$/)) {
      setError1("Username should contain letters and numbers");
      setVal1(true);
    } else if (val.length < 5) {
      setError1("Username should contain minimum 5 characters");
      setVal1(true);
    } else if (val.length > 15) {
      setError1("Username should not exceed 15 characters");
      setVal1(true);
    } else if (val.match(/^[a-zA-Z0-9\s]{5,15}$/)) {
      setError1("");
      setVal1(false);
    }
  };

  // Code to set and validate password
  const changePassword = (val) => {
    setPassword(val);
    if (val.length === 0) {
      setError2("Password cannot be empty");
      setVal2(true);
    } else if (val.length < 6) {
      setError2("Password should contain minimum 6 characters");
      setVal2(true);
    } else if (val.match(/^.{6,20}$/)) {
      setError2("");
      setVal2(false);
    }
  };

  const LoginUser = () => {
    if (
      !username1.match(/^[a-zA-Z0-9\s]{5,15}$/) | !password1.match(/^.{6,20}$/)
    ) {
      setMessage("Invalid Username or Password");
      return;
    }
    // Hitting the url(query) with post method to login with given credentials
    const credentials = { username: username1, password: password1 };
    axios
      .post(`http://localhost:5000/login`, credentials)
      .then((res) => {
        if (res.data) {
          const user = {
            userId: res.data.user._id,
            username: res.data.user.username,
            isAdmin: res.data.user.isAdmin,
            token: res.data.token,
          };
          store.dispatch({ type: "loginSuccess", payload: user });
          console.log("Login Success");
          // Redirecting to home page
          history("/home");
        } else {
          store.dispatch({ type: "loginFail" });
          console.log("Invalid Username or Password");
          setMessage("Username or Password is Invalid");
        }
      })
      .catch((err) => {
        store.dispatch({ type: "loginFail" });
        setMessage(err);
        console.log(err);
      });
  };

  return (
    <div>
      <Grid
        container
        minwidth="100vh"
        style={{ border: "solid", minwidth: "100%", height: "100vh" }}
      >
        <Grid item xs={12} md={7} lg={7}>
          <img
            src="https://images.squarespace-cdn.com/content/v1/5475f6eae4b0821160f6ac3e/1570638927688-1XI0VGYD2404X06L0MC4/bigstock-Library-Background-Bookshelve-314188303.jpg"
            style={{ width: "100%", height: "100%", objectfits: "cover" }}
            alt="brand"
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={5}
          lg={5}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
          style={{
            color: "white",
            padding: 10,
            backgroundImage: `url('https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')`,
          }}
        >
          <div />
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minwidth: 300,
            }}
          >
            <Grid container justifyContent="center">
              <img
                src="https://cdn5.vectorstock.com/i/thumb-large/75/49/panda-book-read-newspaper-negative-space-logo-icon-vector-39827549.jpg"
                width={200}
                alt="logo"
                style={{ borderRadius: "50%" }}
              />
            </Grid>
            <TextField
              type="text"
              label="Username"
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ pattern: /^[a-zA-Z0-9]{5,15}$/ }}
              margin="normal"
              onClick={(e) => changeUsername(e.target.value)}
              onChange={(e) => changeUsername(e.target.value)}
              required
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              helperText={error1}
              error={val1}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              margin="normal"
              onClick={(e) => changePassword(e.target.value)}
              onChange={(e) => changePassword(e.target.value)}
              required
              inputProps={{ pattern: /^.{6,20}$/ }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
              helperText={error2}
              error={val2}
            ></TextField>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Typography htmlFor="rememberMe">
                  Remember me
                  <Checkbox
                    type="checkbox"
                    defaultChecked
                    color="primary"
                    value="lsRememberMe"
                  ></Checkbox>
                </Typography>
              </Grid>
              <div class="center">
                <div id="captchaBackground">
                  <span id="captcha">captcha text</span>
                  <input id="textBox" type="text" name="text" />
                  <div id="buttons">
                    <input id="submit" type="submit" />
                    <button id="refresh" type="submit">
                      Refresh
                    </button>
                  </div>
                  <span id="output"></span>
                </div>
              </div>

              <Grid item> </Grid>
            </Grid>
            <Typography> {message} </Typography> <div style={{ height: 20 }} />
            <Button
              type="submit"
              onClick={LoginUser}
              color="default"
              variant="contained"
            >
              Sign In
            </Button>
            <div style={{ height: 20 }} />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Typography> Don 't have an account?</Typography>
              </Grid>
              <Grid item>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "yellow" }}
                >
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
