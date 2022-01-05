import axios from "axios";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Card, CardContent, Grid, Typography, Button } from "@material-ui/core";
import { ShoppingBasketRounded } from "@material-ui/icons";

function Orders({ username }) {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("Recent Orders");

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

  const changeOrders = ()=>{
    setOrders(orders.reverse());
    if (name === "Recent Orders"){
      setName("Earlier Orders");
    }
    else{
      setName("Recent Orders");
    }
  }

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 50 }}></div>
      <Typography variant="h3" align="center">
        <ShoppingBasketRounded fontSize="large" />
        &nbsp; Orders
      </Typography>
      <div style={{ marginTop: 30 }}></div>
      <Button
        color="primary"
        variant="contained" 
        size="large"
        onClick={()=>changeOrders()}
      >
        {name}
      </Button>
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
        <Grid container spacing={5} alignItems="center">
          {orders.map((order, i) => {
            return (
              <Grid item key={i} xs={10} md={10} lg={10}>
                <Card key={i} elevation={3}>
                  <CardContent>
                    <Box display="flex" flexDirection="row">
                      <Box
                        sx={{
                          marginTop: "50px",
                          marginLeft: "75px",
                          marginBottom: "45px",
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
                        }}
                      >
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
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Orders);
