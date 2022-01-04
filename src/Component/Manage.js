import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Manage = () => {
  const [orders, setOrders] = useState([]);
  const [returns,setReturns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `http://localhost:3000/orders?return=false&_expand=book`
        )
        .then((res) => {
          setOrders(res.data);
          console.log("Pending returns retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const Return = () => {
      let records = [];
      orders.forEach((order) => {
        let fine = 0;
        const book = order.book;
        const date = new Date(order.date).getDate();
        const currentDate = new Date().getDate();
        if (currentDate - date >= 7) {
          fine = (currentDate - date) * 10;
        }
        const pre = records.find((i) => i.user === order.username);
        records =
          pre !== undefined
            ? records.map((record) =>
                record.user === order.username
                  ? { ...record, fine: record.fine+fine, count: record.count+1, books: [...record.books,book] }
                  : record
              )
            : [...records, {user: order.username, fine: fine, count:1, books: [book]}];
      });
      setReturns(records);
    };
    Return();
  }, [orders]);

  return (
    <div>
      <NavBar/>
      {returns.map((r,i)=>(
        <div key={i}>
          <h6>{r.user} Orders:{r.count} TotalFine :{r.fine}</h6>
          {r.books.map((book,i)=>(
          <p key={i}> {book.title} {book.author} {book.ISBN} {book.publication} </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Manage;