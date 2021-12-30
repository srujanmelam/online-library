import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  Typography,
} from "@material-ui/core";

import { AccountCircle, LockRounded } from "@material-ui/icons";
function SignUp() {
  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [isAdmin1, setisAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const history = useNavigate();

  const SignUpUser = () => {
    const user = {
      username: username1,
      password: password1,
      isAdmin: isAdmin1,
    };
    if ((username1.length > 0) & (password1.length > 0)) {
      axios
        .post(`http://localhost:3000/users`, user)
        .then((res) => {
          console.log("user created successfully");
          history("/");
        })
        .catch((err) => {
          setMessage(err);
          console.log(err);
        });
    } else {
      if (username1.length === 0) {
        console.log("username should not be empty");
        setMessage("Username should not be empty");
      }
      if (password1.length === 0) {
        console.log("password should not be empty");
        setMessage("Password should not be empty");
      }
    }
  };

  return (
    <div>
      <Grid
        container
        style={{
          border: "solid",
          minWidth: "100%",
          height: "100vh",
        }}
      >
        <Grid item xs={12} md={7} lg={7}>
          <img
            src="https://c1.wallpaperflare.com/preview/542/360/877/library-books-montessori-school.jpg"
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
          style={{ padding: 10 }}
        >
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
              />
            </Grid>
            <TextField
              type="text"
              label="Username"
              margin="normal"
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
                <Typography>Admin</Typography>
              </Grid>
              <Grid item>
                <Checkbox
                  name="isAdmin"
                  type="checkbox"
                  checked={isAdmin1}
                  color="primary"
                  onChange={(e) => setisAdmin(!isAdmin1)}
                ></Checkbox>
              </Grid>
            </Grid>
            <Typography>{message}</Typography>
            <div style={{ height: 20 }} />
            <Button
              type="submit"
              onClick={SignUpUser}
              color="primary"
              variant="contained"
            >
              SignUp
            </Button>

            <div style={{ height: 20 }} />
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Typography>Already have an account?</Typography>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <Link to="/">Sign In</Link>
                </Button>
              </Grid>
            </Grid>
          </div>

          <div />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;