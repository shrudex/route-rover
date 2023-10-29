import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FindTrain from "./pages/FindTrain";
import Reservation from "./pages/Reservation";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div className="app">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <Login
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/find-train" element={<FindTrain />} />
        <Route
          path="/reservation"
          element={<Reservation currentUser={currentUser} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
