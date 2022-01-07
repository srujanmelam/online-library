import axios from "axios";
import store from "./store";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./css/Card.css";
import { Button, Typography, TextField, Box } from "@material-ui/core";

const Profile = ({ user }) => {
  const [orders, setOrders] = useState(0);
  const [pending, setPending] = useState(0);
  const [books, setBooks] = useState(0);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const type = user.isAdmin ? "Admin" : "Student";
  const added = user.isAdmin ? `Books Added - ${books}` : "";

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/orders?username=${user.username}`)
        .then((res) => {
          setOrders(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [user.username]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `http://localhost:3000/orders?username=${user.username}&return=false`
        )
        .then((res) => {
          setPending(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [user.username]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/books?addedBy=${user.username}`)
        .then((res) => {
          setBooks(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [user.username]);

  const expand = () => {
    let x = document.getElementById("change");
    let y = document.getElementsByClassName("Cards")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.height = "650px";
    } else {
      x.style.display = "none";
      y.style.height = "500px";
    }
  };

  const checkPassword = (val) => {
    setPassword(val);
    if (val.length === 0) {
      setError("Password cannot be empty");
    } else if (val.length < 6) {
      setError("Password should contain minimum 6 characters");
    } else if (val.length > 20) {
      setError("Password should not exceed 20 characters");
    } else if (val.match(/^.{6,20}$/)) {
      setError("");
    }
  };

  const changeConfirm = (val) => {
    setConfirm(val);
    if (val !== password) {
      setMessage("confirm password should be same as password");
    } else {
      setMessage("");
    }
  };

  const changePassword = () => {
    if ((password !== "") & (password === confirm)) {
      const update = {
        username: user.username,
        password: password,
        isAdmin: user.isAdmin,
      };
      axios
        .put(`http://localhost:3000/users/${user.userId}`, update)
        .then((res) => {
          console.log("changed password successfully");
          store.dispatch({ type: "logOut" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="Cards">
        <div className="upper-container">
          <div className="image-container">
            <img
              className="q"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsw40RqD54BYg7g04mBOm0f2k24h2hhn8-gg&usqp=CAU"
              alt=""
              height="100px"
              width="100px"
            />
          </div>
        </div>
        <div className="lower-container">
          <h5>&nbsp;{type}</h5>
          <h4>
            <b>{user.username.toUpperCase()}</b>
          </h4>
          <br></br>
          <div>
            <Typography variant="h3" align="center">
              Total Orders - {orders}
            </Typography>
            <br />
            <Typography variant="h3" align="center">
              Pending Orders - {pending}
            </Typography>
            <br />
            <Typography variant="h3" align="center">
              {added}
            </Typography>
            <div style={{ marginTop: 20 }}></div>
            <Button color="primary" onClick={() => expand()}>
              Change Password
            </Button>
            <div style={{ marginTop: 20 }}></div>
            <div id="change" style={{ display: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "75px",
                  marginRight: "75px",
                }}
              >
                <TextField
                  variant="outlined"
                  type="text"
                  label="New password"
                  onChange={(e) => checkPassword(e.target.value)}
                  required
                  helperText={error}
                  error={error}
                ></TextField>
                &nbsp;
                <TextField
                  variant="outlined"
                  type="text"
                  label="Confirm new password"
                  onChange={(e) => changeConfirm(e.target.value)}
                  required
                ></TextField>
                {message}
                &nbsp;
                <Link
                  to="/"
                  onClick={() => changePassword()}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Button color="primary" variant="contained">
                    Confirm
                  </Button>
                </Link>
              </Box>
              <div style={{ marginTop: 30 }}></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Profile);
