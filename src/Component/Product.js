import store from "./store";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
function Product(props) {
  const book = props.book;

  const addToCart = (item) => {
    store.dispatch({ type: "ADD_TO_CART", payload: { item: item } });
    console.log("book id :" + item.id + " is added to cart");
  };

  return (
    <div>
      <Card elevation={4}>
        <CardHeader
          action={
            <IconButton color="primary" onClick={() => addToCart(book)}>
              <AddOutlined fontSize="large" />
            </IconButton>
          }
        />
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Box
              sx={{
                marginLeft: "75px",
                marginBottom: "45px",
              }}
            >
              <img
                src={book.link}
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
                Book Title - {book.title}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                Book ISBN - {book.ISBN}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                Book Publication - {book.publication}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                Book Author - {book.author}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Product;
