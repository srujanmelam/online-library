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
  const [fines, setFines] = useState([]);
  const [dueDates, setDueDates] = useState([]);
  const [totalFine, setTotalFine] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `http://localhost:3000/orders?username=${username}&return=false&_expand=book`
        )
        .then((res) => {
          setOrders(res.data);
          console.log("Your pending returns retrieved successfully");
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
    let total = 0;
    orders.forEach((order) => {
      const date = new Date(order.date).getDate();
      const currentDate = new Date().getDate();
      if (currentDate - date >= 7) {
        const f = (currentDate - date) * 10;
        fine.push(f);
        total += f;
      } else {
        fine.push(0);
      }
    });
    setFines(fine);
    setTotalFine(total);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "10%",
          marginLeft: "675px",
        }}
      >
        <AssessmentRounded fontSize="large" />
        <Typography variant="h4">Status</Typography>
      </Box>
      <div style={{ marginTop: 40 }}></div>
      <Typography variant="h4" align="center">
        Total Fine - {totalFine} Rs
      </Typography>
      <div style={{ marginTop: 40 }}></div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "250px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {orders.map((order, i) => (
            <Grid item key={i} xs={9} md={9} lg={9}>
              <Card key={i} elevation={3}>
                <CardContent>
                  <Box display="flex" flexDirection="row">
                    <Box
                      sx={{
                        marginTop: "50px",
                        marginLeft: "100px",
                      }}
                    >
                      <img
                        src={order.book.link}
                        style={{ width: 250, height: 350 }}
                        alt="bookImage"
                      />
                    </Box>
                    <Box
                      sx={{
                        marginTop: "60px",
                        marginLeft: "100px",
                        marginRight: "60px",
                        marginBottom: "45px",
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
