import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import {
  AccountCircle,
  TitleRounded,
  DialpadRounded,
  DateRangeRounded,
  InsertLink,
} from "@material-ui/icons";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@material-ui/core";

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
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <NavBar />
      <br></br>
      <Typography>Update Book {book.id}</Typography>
      <Grid
        container
        minwidth="100vh"
        style={{ border: "solid", minwidth: "100%", height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          style={{
            padding: 10,
          }}
        ></Grid>
        <Grid
          container
          item
          xs={12}
          md={4}
          lg={4}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
          style={{
            color: "white",
            padding: 10,
            borderRadius: "5%",
            backgroundImage: `url('https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')`,
          }}
        >
          <div />
          <Grid container justifyContent="center">
            <img
              src="https://cdn5.vectorstock.com/i/thumb-large/75/49/panda-book-read-newspaper-negative-space-logo-icon-vector-39827549.jpg"
              width={200}
              alt="logo"
              style={{ borderRadius: "50%" }}
            />
          </Grid>
          <TextField
            type="text"
            placeholder={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            pattern="[A-Za-z0-9]+"
            margin="normal"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start">
                  <TitleRounded />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type="text"
            placeholder={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            pattern="[A-Za-z0-9]+"
            margin="normal"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type="text"
            placeholder={isbn}
            onChange={(e) => setISBN(e.target.value)}
            required="required"
            pattern="[0-9]{3}-[0-9]-[0-9]{2}-[0-9]{6}-[0-9]"
            margin="normal"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start">
                  <DialpadRounded />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type="text"
            placeholder={publication}
            onChange={(e) => setPublication(e.target.value)}
            required="required"
            pattern="[0-9]{4}"
            margin="normal"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeRounded />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type="text"
            placeholder={link}
            onChange={(e) => setLink(e.target.value)}
            required
            margin="normal"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start">
                  <InsertLink />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <div style={{ marginTop: 25 }}></div>
          <Button
            type="submit"
            onClick={() => updateBook(book.id)}
            color="default"
            variant="contained"
          >
            Update
          </Button>
          <div />
          <div />
          <div />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          style={{
            padding: 10,
          }}
        ></Grid>
      </Grid>
    </div>
  );
};

export default UpdateBooks;
