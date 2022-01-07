import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { DeleteRounded, UpdateRounded } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";

const ManageBooks = ({ username }) => {
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState("Recently Added");
  const itemsPerPage = 4;
  const pagesVisited = (pageNumber - 1) * itemsPerPage;
  const displayItems = books.slice(pagesVisited, pagesVisited + itemsPerPage);
  const pageCount = Math.ceil(books.length / itemsPerPage);

  const changePage = (event, val) => {
    setPageNumber(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/books?addedBy=${username}`)
        .then((res) => {
          setBooks(res.data);
          console.log("Added Books retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [username]);

  const changeOrder = () => {
    setBooks(books.reverse());
    if (name === "Recently Added") {
      setName("Long Ago Added");
    } else {
      setName("Recently Added");
    }
  };

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
      <div style={{ marginTop: 50 }}></div>
      <Typography variant="h3" align="center">
        &nbsp;Your Books
      </Typography>
      <div style={{ marginTop: 40 }}></div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "55%",
          marginLeft: "325px",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => changeOrder()}
        >
          {name}
        </Button>
        <Link
          to="/addbook"
          style={{
            fontSize: "1.17em",
            textDecoration: "none",
            color: "white",
          }}
        >
          <Button color="primary" variant="contained" size="large">
            Add a Book
          </Button>
        </Link>
      </Box>
      <div style={{ marginTop: 50 }}></div>
      <Box
        sx={{
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {displayItems.map((book, i) => (
            <Grid item key={i} xs={6} md={6} lg={6}>
              <Card elevation={3}>
                <CardContent>
                  <Box display="flex" flexDirection="row">
                    <Box
                      sx={{
                        marginTop: "30px",
                        marginLeft: "50px",
                        marginBottom: "30px",
                      }}
                    >
                      <img
                        src={book.link}
                        style={{ width: 150, height: 250 }}
                        alt="bookImage"
                      />
                    </Box>
                    <Box
                      sx={{
                        marginTop: "30px",
                        marginLeft: "100px",
                        marginRight: "60px",
                        marginBottom: "45px",
                      }}
                    >
                      <Typography variant="h6" align="left">
                        Title - {book.title}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        Author - {book.author}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        ISBN - {book.ISBN}
                      </Typography>
                      &nbsp;
                      <Typography variant="h6" align="left">
                        Publication - {book.publication}
                      </Typography>
                      &nbsp;
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginRight: "60px",
                        }}
                      >
                        <Link
                          to="/update"
                          style={{ textDecoration: "none", color: "white" }}
                          state={{ book: book, username: username }}
                        >
                          <Button
                            color="primary"
                            variant="contained"
                            startIcon={<UpdateRounded fontSize="large" />}
                          >
                            Update
                          </Button>
                        </Link>
                        <Box sx={{ marginLeft: "60px" }}>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => deleteBook(book.id)}
                            endIcon={<DeleteRounded fontSize="large" />}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          marginTop: "50px",
          marginLeft: "675px",
          marginBottom: "50px",
        }}
      >
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          count={pageCount}
          page={pageNumber}
          onChange={changePage}
        />
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
