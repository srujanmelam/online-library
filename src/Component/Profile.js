import axios from "axios";
import { useState,useEffect } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";

const Profile = ({user}) => {
  const [orders,setOrders] = useState(0); 
  const [pending,setPending] = useState(0);
  const [books,setBooks] = useState(0);

  const type = user.isAdmin ? "Admin" : "Student";
  const added = user.isAdmin ? <h4>Books Added{books}</h4> : <></>;

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
        .get(`http://localhost:3000/orders?username=${user.username}&return=false`)
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
      <NavBar/>
      <h4>{user.username}</h4>
      <h4>{type}</h4>
      <h4>Orders - {orders}</h4>
      <h4>Pending - {pending}</h4>
      {added}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Profile);
