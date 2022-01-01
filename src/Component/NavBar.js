import store from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { MenuBookRounded } from "@material-ui/icons";

function NavBar({ user }) {
  const logOut = () => {
    store.dispatch({ type: "logOut" });
    console.log("Successfully logged out");
  };

  let extra = <></>;
  if (user.isAdmin) {
    extra = (
      <Link
        to="/addbook"
        style={{ fontSize: "1.17em", textDecoration: "none", color: "white" }}
      >
        Add a Book
      </Link>
    );
  } else {
    extra = (
      <Link
        to="/orders"
        style={{ fontSize: "1.17em", textDecoration: "none", color: "white" }}
      >
        Your Orders
      </Link>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "5px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "70%",
            }}
          >
            <IconButton>
              <Link
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <MenuBookRounded fontSize="large" />
              </Link>
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "8%",
            }}
          >
            {extra}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "8%",
              padding: "5px 0px",
            }}
          >
            <Typography variant="h6">Hi {user.username}</Typography>
          </Box>

          <Box>
            <Button variant="contained">
              <Link
                to="/"
                onClick={logOut}
                style={{ textDecoration: "none", color: "black" }}
              >
                LogOut
              </Link>
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(NavBar);
