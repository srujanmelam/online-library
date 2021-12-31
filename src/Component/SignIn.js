import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import store from "./store";
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
  const [password1, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const LoginUser = () => {
    axios
      .get(
        `http://localhost:3000/users?username=${username1}&password=${password1}`
      )
      .then((res) => {
        if (res.data.length !== 0) {
          store.dispatch({
            type: "loginSuccess",
            payload: res.data[0].username,
          });
          console.log("Login Success");
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
        minWidth="100vh"
        style={{ border: "solid", minWidth: "100%", height: "100vh" }}
      >
        <Grid item xs={12} md={7} lg={7}>
          <img
            src="https://c4.wallpaperflare.com/wallpaper/417/445/320/anime-original-book-chair-library-hd-wallpaper-preview.jpg"
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
          justify="space-between"
          style={{
            color: "white",
            padding: 10,
            backgroundImage: `url('https://images.unsplash.com/photo-1615799998586-54a1591888bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd24lMjBwYXBlcnxlbnwwfHwwfHw%3D&w=1000&q=80')`,
          }}
        >
          <div />
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <Grid container justify="center">
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
              margin="normal"
              color="white"
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Typography htmlFor="rememberMe">
                  Remember me
                  <Checkbox
                    type="checkbox"
                    color="brown"
                    value="lsRememberMe"
                  ></Checkbox>
                </Typography>
              </Grid>
              <Grid item> </Grid>
            </Grid>
            <Typography> {message} </Typography> <div style={{ height: 20 }} />
            <Button
              type="submit"
              onClick={LoginUser}
              color="4E342E"
              variant="contained"
            >
              Sign In
            </Button>
            <div style={{ height: 20 }} />
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Typography> Don 't have an account?</Typography>
              </Grid>
              <Grid item>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "black" }}
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
