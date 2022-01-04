import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const ManageBooks = ({ username }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/books?addedBy=${username}`)
        .then((res) => {
          setBooks(res.data);
          console.log(username);
          console.log("Added Books retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [username]);

  const deleteBook = (id) => {
    let records = books;
    axios
      .delete(`http://localhost:3000/books/${id}/`)
      .then((res) => {
        console.log("Deleted Book " + id + "successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    records = records.filter((book) => book.id !== id);
    setBooks(records);
  };

  return (
    <div>
      <NavBar />
      {books.map((book, i) => (
        <div key={i}>
          <img alt="BookImage" src={book.link} />
          <h6>{book.title}</h6>
          <h6>{book.author}</h6>
          <h6>{book.ISBN}</h6>
          <h6>{book.publication}</h6>
          <Link to="/update" state={{ book: book, username: username }}>
            Update
          </Link>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(ManageBooks);
