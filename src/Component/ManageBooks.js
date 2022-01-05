import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
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
  var cardStyle = {
    marginLeft: "26%",
    display: "block",
    width: "50vw",
    transitionDuration: "0.3s",
    height: "55vw",
  };
  return (
    <div>
      <NavBar />
      <br></br>
      <h1>Your Books</h1>
      <Link to="/addbook">Add a Book</Link>
      {books.map((book, i) => (
        <div key={i}>
          <br></br>
          <Card style={cardStyle} spacing={10} justify="center">
            <CardHeader
              action={
                <IconButton onClick={() => deleteBook(book.id)}>
                  <DeleteRounded />
                </IconButton>
              }
              title={book.title}
              subheader={"- " + book.author}
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
                <Typography variant="h5" align="center">
                  PUBLICATION - {book.publication}
                </Typography>
                &nbsp;
                <Typography variant="h5" align="center">
                  ISBN - {book.ISBN}
                </Typography>
                <br></br>
                <br></br>
                <br></br>
                <Button color="primary" variant="contained">
                  <Link
                    to="/update"
                    style={{ textDecoration: "none", color: "white" }}
                    state={{ book: book, username: username }}
                  >
                    Update
                  </Link>
                </Button>
              </Box>
            </CardContent>
          </Card>
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
