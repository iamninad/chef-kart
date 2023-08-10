import './App.css';
import Description from './pages/Description/Description';
import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/description" element={<Description />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
