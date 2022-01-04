import store from "./store";
import { Card, CardHeader, CardContent, IconButton, Typography, Box } from '@material-ui/core';
import { AddOutlined } from "@material-ui/icons";
function Product(props) {

  const book = props.book

  const addToCart= (item)=>{
    store.dispatch({type:'ADD_TO_CART',payload:{item:item}})
    console.log("book id :"+item.id+" is added to cart")
  }

  return(
    <div>
      <Card>
        <CardHeader 
          action={
            <IconButton
              onClick={()=>addToCart(book)}>
              <AddOutlined />
            </IconButton>
          }
          title={book.title}
          subheader= {"- "+book.author}
        />
        <CardContent>
          <img
            src={book.link}
            style={{ width: 250, height: 350 }}
            alt="bookImage"
          />
          <Box
            sx={{
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <Typography variant="h5" align="center">PUBLICATION - {book.publication}</Typography>
            &nbsp;
            <Typography variant="h5" align="center">ISBN - {book.ISBN}</Typography>
          </Box>          
        </CardContent>
      </Card> 
    </div>
  );
}

export default Product;
