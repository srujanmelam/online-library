import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [publication, setPublication] = useState("");
  const history = useNavigate();

  const addBook = () => {
    const book = {
      title: title,
      author: author,
      ISBN: isbn,
      publication: publication,
    };
    axios.post(`http://localhost:3000/books`, book)
      .then((res) => {
        console.log("added a book successfully");
        history("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Add a Book</h1>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required="required" pattern="[A-Za-z0-9]+"/>
      <br />
      <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} required="required" pattern="[A-Za-z0-9]+"/>
      <br />
      <input type="text" placeholder="ISBN" onChange={(e) => setISBN(e.target.value)} required="required" pattern="[0-9]{3}-[0-9]-[0-9]{2}-[0-9]{6}-[0-9]"/>
      <br />
      <input type="number" placeholder="Publication" onChange={(e) => setPublication(e.target.value)} required="required" pattern="[0-9]{4}"/>
      <br />
      <button type="submit" onClick={addBook}>Submit</button>
    </div>
  );
}

export default AddBooks;
