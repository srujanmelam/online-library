import axios from "axios";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { AssessmentRounded, LibraryBooksRounded } from "@material-ui/icons";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";

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
      <div style={{ marginTop: 40 }}></div>
      <Typography variant="h3">
        <AssessmentRounded fontSize="large" />
        &nbsp; Status
      </Typography>
      <div style={{ marginTop: 40 }}></div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "175px",
          marginRight: "50px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {orders.map((order, i) => (
            <Grid item key={i} xs={11} md={11} lg={11}>
              <Card key={i}>
                <CardContent>
                  <Box display="flex" flexDirection="row">
                    <Box
                      sx={{
                        marginTop: "75px",
                      }}
                    >
                      <img
                        src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
                        style={{ width: "45%", height: "75%" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        marginTop: "65px",
                        marginLeft: "40px",
                        marginRight: "60px",
                      }}
                    >
                      <Typography variant="h6" align="left">
                        Book Title - {order.book.title}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        Book ISBN - {order.book.ISBN}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        Book Publication - {order.book.publication}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        Book Author - {order.book.author}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        Due Date: {dueDates[i]}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        Fine: {fines[i]} Rupees
                      </Typography>
                      &nbsp;
                      <Typography align="right">
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => returnBooks(order)}
                          endIcon={<LibraryBooksRounded fontSize="large" />}
                        >
                          Return Book
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div style={{ marginTop: 40 }}></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Status);
