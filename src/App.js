import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import Home from './Component/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/' element={< SignIn />}></Route>
          <Route exact path='/signup' element={< SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
