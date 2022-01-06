import axios from "axios";
import store from "./store";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./NavBar";
import "../Component/Card.css";
import { Button, Typography } from "@material-ui/core";

const Profile = ({ user }) => {
  const [orders, setOrders] = useState(0);
  const [pending, setPending] = useState(0);
  const [books, setBooks] = useState(0);
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const history = useNavigate();

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

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
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
          history("/");
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
            <Button color="primary" onClick={()=>expand()}>Change Password</Button>
            <div id="change" style={{display:"none"}}>
              <input type="password" placeholder="New password" onChange={(e)=>setPassword(e.target.value)} />
              <input type="password" placeholder="Confirm new password" onChange={(e)=>setConfirm(e.target.value)} />
              <Link to="/" onClick={()=>changePassword()}>Confirm</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Profile);
