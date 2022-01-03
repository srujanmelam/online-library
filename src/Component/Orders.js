import axios from "axios";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { ShoppingBasketRounded } from "@material-ui/icons";

function Orders({ username }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/orders?username=${username}&_expand=book`)
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

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <ShoppingBasketRounded fontSize="large" />
        &nbsp; Orders
      </Typography>
      <div style={{ marginTop: 30 }}></div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 10px 10px",
          marginLeft: "250px",
          marginRight: "50px",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {orders.map((order, i) => {
            return (
              <Grid item key={i} xs={10} md={10} lg={10}>
                <Card key={i}>
                  <CardContent>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Order Date - {order.date}
                    </Typography>
                    &nbsp;
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
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Orders);
