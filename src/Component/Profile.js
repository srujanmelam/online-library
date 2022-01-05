import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { Card, CardContent, Typography } from "@material-ui/core";
var cardStyle = {
  marginLeft: "36%",
  display: "block",
  width: "30vw",
  transitionDuration: "0.3s",
  height: "15vw",
};
const Profile = ({ user }) => {
  const [orders, setOrders] = useState(0);
  const [pending, setPending] = useState(0);
  const [books, setBooks] = useState(0);

  const type = user.isAdmin ? "Admin" : "Student";
  const added = user.isAdmin ? `books Added - ${books}` : "";

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

  return (
    <div>
      <NavBar />
      <br></br>
      <Card sx={{ minWidth: 275 }} style={cardStyle}>
        <CardContent>
          <Typography variant="h4" align="left">
            User: {user.username}
          </Typography>
          <Typography align="left">Type: {type}</Typography>
          <Typography align="left">Orders: {orders}</Typography>
          <Typography align="left">Pending: {pending}</Typography>
          <Typography align="left">{added}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Profile);
