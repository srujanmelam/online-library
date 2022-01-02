import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Grid, TextField, Button, InputAdornment } from "@material-ui/core";
import {
  AccountCircle,
  TitleRounded,
  DialpadRounded,
  DateRangeRounded,
} from "@material-ui/icons";

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
    axios
      .post(`http://localhost:3000/books`, book)
      .then((res) => {
        console.log("added a book successfully");
        history("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.designtrends.com/wp-content/uploads/2015/11/24071414/Brown-Backgrounds36.jpg')`,
      }}
    >
      <NavBar />
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
            backgroundImage: `url('https://images.unsplash.com/photo-1615799998586-54a1591888bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd24lMjBwYXBlcnxlbnwwfHwwfHw%3D&w=1000&q=80')`,
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
            label="Title"
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
            required
            pattern="[A-Za-z0-9]+"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleRounded />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type="text"
            label="Author"
            margin="normal"
            onChange={(e) => setAuthor(e.target.value)}
            required
            pattern="[A-Za-z0-9]+"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type="text"
            label="ISBN"
            margin="normal"
            onChange={(e) => setISBN(e.target.value)}
            required
            pattern="[0-9]{3}-[0-9]-[0-9]{2}-[0-9]{6}-[0-9]"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DialpadRounded />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type="number"
            label="Publication"
            margin="normal"
            onChange={(e) => setPublication(e.target.value)}
            required
            pattern="[0-9]{4}"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeRounded />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button
            type="submit"
            onClick={addBook}
            color="default"
            variant="contained"
          >
            Submit
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
}

export default AddBooks;
