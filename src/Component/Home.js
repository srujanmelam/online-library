import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import NavBar from "./NavBar";
import CartCounter from "./CartCounter";
import {
  Grid,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [attribute, setAttribute] = useState("title");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/books`)
        .then((res) => {
          setBooks(res.data);
          console.log("books data retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const searchData = async () => {
    await axios
      .get(`http://localhost:3000/books?${attribute}_like=${search}`)
      .then((res) => {
        setBooks(res.data);
        console.log("search");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",

              marginLeft: "150px",
            }}
          >
            <label htmlFor="search"> </label>
            <Box
              sx={{
                minWidth: 100,
                marginRight: "20px",
              }}
            >
              <FormControl fullWidth size="small">
                <Select
                  id="search"
                  variant="outlined"
                  value={attribute}
                  onChange={(e) => setAttribute(e.target.value)}
                >
                  <MenuItem value="title">title</MenuItem>
                  <MenuItem value="author">author</MenuItem>
                  <MenuItem value="publication">publication</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginRight: "10px",
              }}
            >
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                type="text"
                label={"search anything..." + search}
                onChange={(e) => setSearch(e.target.value)}
              ></TextField>
            </Box>
            <Box
              sx={{
                marginRight: "10px",
              }}
            >
              <Button
                size="medium"
                variant="contained"
                type="submit"
                onClick={searchData}
                color="primary"
                startIcon={<SearchRounded />}
              >
                Search
              </Button>
            </Box>
          </Box>
          <CartCounter />
          <br/><br/>
          <Box>
            <Box
              sx={{
                minWidth: 100,
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <Typography variant="h6">Sort By:</Typography>
              <FormControl size="small">
                <Select
                  id="sort"
                  variant="outlined"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="id">id</MenuItem>
                  <MenuItem value="title">title</MenuItem>
                  <MenuItem value="author">author</MenuItem>
                  <MenuItem value="publication">publication</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                minWidth: 100,
                marginLeft: "10px",
              }}
            >
              <Typography variant="h6">Order:</Typography>
              <FormControl size="small">
                <Select
                  id="order"
                  variant="outlined"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <MenuItem value="asc">ascending</MenuItem>
                  <MenuItem value="desc">descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid container spacing={3}>
            {books
              .sort((a, b) => {
                const ord = order === "asc" ? 1 : -1;
                if (a[sortBy] > b[sortBy]) {
                  return 1 * ord;
                }
                if (a[sortBy] < b[sortBy]) {
                  return -1 * ord;
                }
                return 0;
              })
              .map((book, i) => (
                <Grid item key={book.id} xs={12} md={6} lg={4}>
                  <Product book={book} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Home;
