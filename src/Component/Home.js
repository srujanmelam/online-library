import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import NavBar from "./NavBar";
import CartCounter from "./CartCounter";

function Home() {

  const [books,setBooks] = useState([])
  const [search, setSearch] = useState("");
  const [attribute, setAttribute] = useState("title");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(()=>{
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/books`)
        .then((res) => {
          setBooks(res.data)
          console.log("books data retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    fetchData();
  }, []);

  const searchData = async () => {
    await axios.get(`http://localhost:3000/books?${attribute}_like=${search}`)
      .then((res) => {
        setBooks(res.data)
        console.log("search");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavBar/>
      <input type="text" placeholder={"search anything..." + search} onChange={(e) => setSearch(e.target.value)}/>
      <label htmlFor="search">Search from : </label>
      <select id="search" value={attribute} onChange={(e) => setAttribute(e.target.value)}>
        <option value="title">title</option>
        <option value="author">author</option>
        <option value="publication">publication</option>
      </select>
      <button type="submit" onClick={searchData}>Search</button>
      <label htmlFor="sort">Sort :</label>
      <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="id">id</option>
        <option value="title">title</option>
        <option value="author">author</option>
        <option value="publication">publication</option>
      </select>
      <label htmlFor="Asc">Order :</label>
      <select id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
      <CartCounter/>
      {books.sort((a,b)=>{
        const ord = order==="asc"? 1:-1;
        if(a[sortBy] > b[sortBy]){return 1*ord;}
        if(a[sortBy] < b[sortBy]){return -1*ord;}
        return 0; 
        }).map((book,i)=>(
          <Product key={i} book={book} />
        ))
      }
    </div>
  );
}

export default Home;
