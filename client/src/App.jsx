import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from "./components/home/Home"
import Detail from "./components/detail/Detail"
import Landing from "./components/landing/Landing"
import Nav from "./components/nav/Nav"
import CreateActivity from "./components/createActivity/CreateActivity"

function App() {

  const location = useLocation();

  return (
    <div className="app-container">
      {
      location.pathname !== "/" && <Nav />
      }
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/createActivity" element={<CreateActivity />} />
      </Routes>
    </div>
  );
};

export default App;
