import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import '../Component/Card.css'
import { Typography } from "@material-ui/core";

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
      <div className='Cards'>
            <div className='upper-container'>
                <div className='image-container'>
                    <img className="q" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsw40RqD54BYg7g04mBOm0f2k24h2hhn8-gg&usqp=CAU" alt="" height="100px" width="100px" />
                </div>

            </div>
            <div className='lower-container'>
                <h5>{type}</h5>
                <h4><b>{user.username}</b></h4><br></br>
                <div style={{marginLeft:"20%"}}>
                <Typography variant="h3" align="left">Total Orders - {orders}</Typography><br />
                <Typography variant="h3"  align="left">Pending Fee - {pending}</Typography><br />
                <Typography variant="h3"  align="left">{added}</Typography>


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
