import store from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function NavBar({ user }) {

  const logOut = () => {
    store.dispatch({ type: "logOut" });
    console.log("Successfully logged out");
  };

  let extra = <></>;
  if(user.isAdmin){
    extra = <li><Link to="/addbook">Add a Book</Link></li>;
  }
  else{
    extra = <li><Link to="/orders">Your Orders</Link></li>;
  }

  return(
    <ul>
      <li><Link to="/home">Home</Link></li>
      {extra}
      <li>Hi {user.username}</li>
      <li><Link to="/" onClick={logOut}>Log Out</Link></li>
    </ul>
  );

}

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(NavBar);