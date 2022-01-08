import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Manage = () => {
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);

  const Expand = (id) => {
    let x = document.getElementById(id);
    if (x.lastElementChild.style.display === "none") {
      x.lastElementChild.style.display = "block";
      x.firstElementChild.innerHTML = "View Less";
    } else {
      x.lastElementChild.style.display = "none";
      x.firstElementChild.innerHTML = "View More";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/orders?return=false&_expand=book`)
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
          fine = (currentDate - 7 - date) * 10;
        }
        const pre = records.find((i) => i.user === order.username);
        records =
          pre !== undefined
            ? records.map((record) =>
                record.user === order.username
                  ? {
                      ...record,
                      fine: record.fine + fine,
                      count: record.count + 1,
                      books: [...record.books, book],
                    }
                  : record
              )
            : [
                ...records,
                { user: order.username, fine: fine, count: 1, books: [book] },
              ];
      });
      setReturns(records);
    };
    Return();
  }, [orders]);

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 50 }}></div>
      <Box
        sx={{
          marginLeft: "75px",
          marginRight: "75px",
        }}
      >
        <Grid container spacing={5}>
          {returns.length === 0 ? (
            <Typography variant="h5">
              There are no Pending Book Returns from Users
            </Typography>
          ) : (
            returns.map((r, i) => (
              <Grid item key={i} xs={12} md={12} lg={12}>
                <Paper elevation={3} style={{ border: "solid", borderColor: "blue",}}>
                  &nbsp;
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "15px",
                    }}
                  >
                    &nbsp;
                    <Typography variant="h5" align="center">
                      User : {r.user.toUpperCase()} &nbsp; No Of Orders :{" "}
                      {r.count} &nbsp; Total Fine : {r.fine} Rs
                    </Typography>
                  </Box>
                  <div id={i}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => Expand(i)}
                    >
                      View More
                    </Button>
                    <div style={{ marginTop: 10 }}></div>
                    <div style={{ display: "none" }}>
                      <Box
                        sx={{
                          marginLeft: "30px",
                          marginRight: "30px",
                          marginTop: "30px",
                        }}
                      >
                        <Grid container spacing={3} key={i}>
                          {r.books.map((book, i) => (
                            <Grid item key={i} xs={4} md={4} lg={4}>
                              <Card elevation={3} style={{ border: "solid", borderColor: "red", borderWidth: "2px"}}>
                                <CardHeader
                                  title={book.title}
                                  subheader={" - " + book.author}
                                />
                                <CardContent>
                                  <img
                                    src={book.link}
                                    style={{ width: 160, height: 200 }}
                                    alt="bookImage"
                                  />
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      marginTop: "30px",
                                    }}
                                  >
                                    <Typography variant="h6" align="center">
                                      PUBLICATION - {book.publication}
                                    </Typography>
                                    &nbsp;
                                    <Typography variant="h6" align="center">
                                      ISBN - {book.ISBN}
                                    </Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </div>
                    &nbsp;
                  </div>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <div style={{ marginTop: 40 }}></div>
    </div>
  );
};

export default Manage;
