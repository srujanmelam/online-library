import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import store from "./store";

function SignIn() {
  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const LoginUser = ()=>{
    axios.get(`http://localhost:3000/users?username=${username1}&password=${password1}`).then( res =>{
      if (res.data.length!==0){
        store.dispatch({type:"loginSuccess",payload:res.data[0].username}); 
        console.log("Login Success")  
        history("/home");
      }  
      else{
        store.dispatch({type:"loginFail"});
        console.log("Invalid Username or Password");
        setMessage("Username or Password is Invalid");
      }
   }).catch((err)=>{
       store.dispatch({type:"loginFail"});
       setMessage(err);
       console.log(err);
   })
  }

  return (
    <div>
      <h2>SignIn</h2>
      <input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} required/>
      <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required/>
      <input type="checkbox" value="lsRememberMe"/>
      <label htmlFor="rememberMe">Remember me</label>
      <p>{message}</p>
      <button type="submit" onClick={LoginUser}>Login</button>
      <h6>Don't have an account?</h6>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default SignIn;
