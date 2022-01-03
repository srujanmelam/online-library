import axios from "axios";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Status = ({ username }) => {
  const [orders, setOrders] = useState([]);
  const [dueDates, setDueDates] = useState([]);
  const [fines, setFines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `http://localhost:3000/orders?username=${username}&return=false&_expand=book`
        )
        .then((res) => {
          setOrders(res.data);
          console.log("Your orders retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [username]);

  useEffect(() => {
    let due = [];
    orders.forEach((order) => {
      const date = new Date(order.date).getTime();
      let dueD = date + 604800000;
      dueD = new Date(dueD).toUTCString();
      due.push(dueD);
    });
    setDueDates(due);
  }, [orders]);

  useEffect(() => {
    let fine = [];
    orders.forEach((order) => {
      const date = new Date(order.date).getDate();
      const currentDate = new Date().getDate();
      if (currentDate - date >= 7) {
        const f = (currentDate - date) * 10;
        fine.push(f);
      } else {
        fine.push(0);
      }
    });
    setFines(fine);
  }, [orders]);

  const returnBooks = (item) => {
    const order = {
      date: item.date,
      username: username,
      return: true,
      bookId: item.bookId,
    };
    axios
      .put(`http://localhost:3000/orders/${item.id}`, order)
      .then((res) => {
        setOrders(orders.filter((i) => i.id !== item.id));
        console.log("Book " + item.bookId + " returned successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavBar />
      {orders.map((order, i) => (
        <div key={i}>
          <h4>Book</h4>
          <p>
            {order.book.title} {order.book.author}
          </p>
          <p>
            {order.book.ISBN} {order.book.publication}
          </p>
          <button onClick={() => returnBooks(order)}>Return Book</button>
          <p>Due Date: {dueDates[i]}</p>
          <p>Fine {fines[i]} Rupees</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Status);
