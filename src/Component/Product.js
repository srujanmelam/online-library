import store from "./store";

function Product(props) {

  const book = props.book

  const addToCart= (item)=>{
    store.dispatch({type:'ADD_TO_CART',payload:{item:item}})
    console.log("book id :"+item.id+" is added to cart")
  }

  return(
    <div>
      <h6>{book.id} - {book.title}</h6>
      <h6>{book.author}</h6>
      <h6>{book.ISBN} {book.publication}</h6>
      <button onClick={()=>addToCart(book)}>add to cart</button>
    </div>
  );
}

export default Product;
