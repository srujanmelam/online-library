import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [isAdmin1, setisAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const history = useNavigate();

  const SignUpUser = ()=>{
    const user = {
      "username":username1,
      "password":password1,
      "isAdmin":isAdmin1
    }
    if (username1.length > 0 & password1.length > 0){
      axios.post(`http://localhost:3000/users`,user).then((res)=>{
        console.log("user created successfully")
        history("/")
      }).catch((err)=>{
        setMessage(err)
        console.log(err);
      })
    }
    else{
      if(username1.length === 0)
      {
        console.log("username should not be empty")
        setMessage("Username should not be empty")
      }
      if(password1.length === 0)
      {
        console.log("password should not be empty")
        setMessage("Password should not be empty")
      }
    }
  }

  return(
    <div>
      <h2>SignUp</h2>
      <input type="text" placeholder="Enter Username" onChange={(e)=>setUsername(e.target.value)} required />
      <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} required />
	    <label>Admin</label>
      <input name="isAdmin" type="checkbox" checked={isAdmin1} onChange={(e)=>setisAdmin(!isAdmin1)} />
      <p>{message}</p>
	    <button type="submit" onClick={SignUpUser}>Sign Up</button>
      <h6>Already have an account?</h6>
      <Link to="/">Sign In</Link>
    </div>
  );

}

export default SignUp