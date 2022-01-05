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
  Grid,
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
      <div style={{ marginTop: 50 }}></div>
      <Typography variant="h3" align="center">
        Your Books
      </Typography>
      <div style={{ marginTop: 40 }}></div>
      <Button color="primary" variant="contained" size="large">
        <Link
          to="/addbook"
          style={{
            fontSize: "1.17em",
            textDecoration: "none",
            color: "white",
          }}
        >
          Add a Book
        </Link>
      </Button>
      <div style={{ marginTop: 40 }}></div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "225px",
          marginRight: "50px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {books.map((book, i) => (
            <Grid item key={i} xs={11} md={11} lg={11}>
              <Card elevation={3}>
                <CardHeader
                  action={
                    <IconButton
                      color="primary"
                      onClick={() => deleteBook(book.id)}
                    >
                      <DeleteRounded fontSize="large" />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box display="flex" flexDirection="row">
                    <Box
                      sx={{
                        marginLeft: "100px",
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
                        marginLeft: "150px",
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
                      &nbsp;
                      <Typography variant="h6" align="right">
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                        >
                          <Link
                            to="/update"
                            style={{ textDecoration: "none", color: "white" }}
                            state={{ book: book, username: username }}
                          >
                            Update
                          </Link>
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(ManageBooks);
