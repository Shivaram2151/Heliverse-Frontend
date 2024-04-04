import { Route, Routes } from "react-router";
import "./App.css";
import { UsersList } from "./Components/UsersList/UsersList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Team } from "./Components/Team/Team";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={UsersList} />
        <Route path="/teams" Component={Team} />
      </Routes>
    </div>
  );
}

export default App;
