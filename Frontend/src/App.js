import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CarVendor from "./Components/CarVendor";
import Brands from "./Components/Brands";
import Models from "./Components/Models";
import CreateCar from "./Components/CreateCar";
import UpdateCar from "./Components/UpdateCar";
import UpdateModel from "./Components/UpdateModel";
import CreateModel from "./Components/CreateModel";

function App() {
  return (
    <BrowserRouter>
      <main>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <strong>HOMEPAGE</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/brands/">
                  <strong>BRANDS</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/models/">
                  <strong>MODELS</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/brands/create/">
                  Create new car
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/models/create/">
                  Create new model
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<CarVendor />} />
          <Route path="/brands/" element={<Brands />} />
          <Route path="/models/" element={<Models />} />
          <Route path="/brands/create/" element={<CreateCar />} />
          <Route path="/brands/update/" element={<UpdateCar />} />
          <Route path="/models/create/" element={<CreateModel />} />
          <Route path="/models/update/" element={<UpdateModel />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
