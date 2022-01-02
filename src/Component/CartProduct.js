import store from "./store";
import { actionTypes } from "./reducers/CartReducer";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

const CartProduct = ({ item }) => {
  const deleteFromCart = () => {
    const action = {
      type: actionTypes.DELETE_FROM_CART,
      payload: {
        item: item,
      },
    };
    store.dispatch(action);
    console.log("deleted a book in cart");
  };

  return (
    <div>
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
          <Grid item xs={10} md={10} lg={10}>
            <Card>
              <CardHeader
                action={
                  <IconButton onClick={deleteFromCart} color="secondary">
                    <DeleteRounded fontSize="large" />
                  </IconButton>
                }
                title={"Your Product ID -  " + item.id}
              />
              <CardContent>
                <Typography variant="h6" align="left">
                  Book Title - {item.title}
                </Typography>
                &nbsp;
                <Typography variant="h6" align="left">
                  Book ISBN - {item.ISBN}
                </Typography>
                &nbsp;
                <Typography variant="h6" align="left">
                  Book Publication - {item.publication}
                </Typography>
                &nbsp;
                <Typography variant="h6" align="left">
                  Book Author - {item.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartProduct;
