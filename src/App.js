import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Component/Home';
import Cart from './Component/Cart'
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import Orders from "./Component/Orders";
import Status from "./Component/Status";
import AddBooks from './Component/AddBooks';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< SignIn />}></Route>
          <Route exact path='/signup' element={< SignUp />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/addbook' element={< AddBooks />}></Route>
          <Route exact path='/orders' element={< Orders />}></Route>
          <Route exact path='/cart' element={< Cart />}></Route>
          <Route exact path='/status' element={< Status />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;