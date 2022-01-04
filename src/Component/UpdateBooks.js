import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const UpdateBooks = () => {
  const location = useLocation();
  const { book } = location.state;
  const { username } = location.state;
  const [isbn, setISBN] = useState(book.ISBN);
  const [link, setLink] = useState(book.link);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publication, setPublication] = useState(book.publication);
  const history = useNavigate();

  const updateBook = (id) => {
    const book = {
      title: title,
      author: author,
      ISBN: isbn,
      publication: publication,
      link: link,
      addedBy: username,
    };
    axios
      .put(`http://localhost:3000/books/${id}`, book)
      .then((res) => {
        console.log("Updated Book " + id + " successfully");
        history("/books");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Link to="/books">Back</Link>
      <h1>Update Book {book.id}</h1>
      <input
        type="text"
        placeholder={title}
        onChange={(e) => setTitle(e.target.value)}
        required="required"
        pattern="[A-Za-z0-9]+"
      />
      <br />
      <br />
      <input
        type="text"
        placeholder={author}
        onChange={(e) => setAuthor(e.target.value)}
        required="required"
        pattern="[A-Za-z0-9]+"
      />
      <br />
      <br />
      <input
        type="text"
        placeholder={isbn}
        onChange={(e) => setISBN(e.target.value)}
        required="required"
        pattern="[0-9]{3}-[0-9]-[0-9]{2}-[0-9]{6}-[0-9]"
      />
      <br />
      <br />
      <input
        type="text"
        placeholder={publication}
        onChange={(e) => setPublication(e.target.value)}
        required="required"
        pattern="[0-9]{4}"
      />
      <br />
      <br />
      <input
        type="text"
        placeholder={link}
        onChange={(e) => setLink(e.target.value)}
        required="required"
      />
      <br />
      <br />
      <button type="submit" onClick={() => updateBook(book.id)}>
        Update
      </button>
    </div>
  );
};

export default UpdateBooks;
