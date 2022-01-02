import store from "./store";
import { Card, CardHeader, CardContent, IconButton, Typography } from '@material-ui/core';
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
        
      /><CardContent>
        <Typography variant="body2">PUBLICATION - {book.publication}</Typography>
        <Typography variant="body2">ISBN - {book.ISBN}</Typography>
      </CardContent>
      </Card>
      
      
    </div>
  );
}

export default Product;
