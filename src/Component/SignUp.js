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
          minwidth: "100%",
          height: "100vh",
        }}
      >
        <Grid item xs={12} md={7} lg={7}>
          <img
            src="https://media.istockphoto.com/vectors/library-vector-id165640961?b=1&k=20&m=165640961&s=612x612&w=0&h=ZWMF08lRmY3cdOS0VNL-8qh17XOCcKL7mAeAZXwEC2A="
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
            padding: 10,

            backgroundImage: `url('https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')`,
          }}
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minwidth: 300,
              color: "white",
              
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
              margin="normal"
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{
                style:{color:'white'}
              }}
              required
              InputProps={{
                style:{color:'white'},
                startAdornment: (
                 
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              margin="normal"
              InputLabelProps={{
                style:{color:'white'}
              }}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style:{color:'white'},
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Typography>
                  Admin
                  <Checkbox
                    name="isAdmin"
                    type="checkbox"
                    checked={isAdmin1}
                    color="primary"
                    onChange={(e) => setisAdmin(!isAdmin1)}
                  ></Checkbox>
                </Typography>
              </Grid>
              <Grid item> </Grid>
            </Grid>
            <Typography> {message} </Typography> <div style={{ height: 20 }} />
            <Button
              type="submit"
              onClick={SignUpUser}
              color="default"
              variant="contained"
            >
              SignUp
            </Button>
            <div style={{ height: 20 }} />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Typography>Already have an account ?</Typography>
              </Grid>
              <Grid item>
                <Link to="/" style={{ textDecoration: "none", color: "yellow" }}>
                  Sign in
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

export default SignUp;
