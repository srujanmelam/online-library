import axios from "axios";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar"

function Orders({username}) {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/orders?username=${username}&_expand=book`)
        .then((res) => {
          setOrders(res.data)
          console.log("Your orders retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    fetchData();
  },[username]);

  return( 
    <div>
      <NavBar/>
      <h4>Orders</h4>
      {orders.map((order,i)=>{
        return (<p key={i}> {order.date} {order.book.title} {order.book.author} {order.book.ISBN} {order.book.publication}</p>);
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username : state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Orders);