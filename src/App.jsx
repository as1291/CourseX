import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup.jsx';
import Appbar from './Appbar.jsx';
import Signin from './signin.jsx';
import AddCourse from './AddCourse.jsx';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e3e2e1' }}>
      <Router>
      <Appbar />
      <Routes>
          <Route path="/addcourse" element={<AddCourse/>} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
