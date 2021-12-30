import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import store from "./store";
import { Button, InputAdornment, styled, TextField } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { AccountCircle, LockRounded} from "@material-ui/icons" 


function SignIn() {
  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));  

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
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <img src="https://st2.depositphotos.com/1177973/6352/i/950/depositphotos_63529855-stock-photo-e-learning-concept-digital-library.jpg" 
            style={{width: '100%', height: '100%', objectfits:'cover'}} 
            alt='brand'
          />  
        </Grid>
        <Grid container item 
          xs={12} 
          md={6} 
          lg={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div />
          < div 
            style={{ 
              display: "flex", 
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <Grid container justify="center">
              <img src= "https://cdn.dribbble.com/users/5707100/screenshots/15403508/media/36df88a25ddf58eab0dda29ded1ac920.png?compress=1&resize=400x300"
                width={200}
                alt='logo'
              />
              </Grid>
              <TextField
                label="Username" 
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment> 
                  ),
                }}
              >
              </TextField>
              <TextField 
                label="Password" 
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>  
                  ),
                }}
              >
              </TextField>
              <div style={{ height: 20}}>
                <Button color="primary" variant="contained">
                  Sign In
                </Button>
              </div>
              <div>
                <Button>Don't Have An Account?</Button>
              </div>
          </div>
          <div />
        </Grid >
      </Grid>
      
    </div>
  );
}

export default SignIn;
