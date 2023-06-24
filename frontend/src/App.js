import "./App.css";
import AddNotes from "./page/addnote";
import { Home } from "./page/home";
import { Login } from "./page/login";
// import { NotesPage } from "./page/Note";
import Signup from "./page/signup";
import { Todo } from "./page/todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateNotes from "./page/update";
import NotesPage from "./page/Note";
function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/Updatenote" element={<UpdateNotes />}></Route>
            <Route exact path="/Addnote" element={<AddNotes />}></Route>
          </Routes>
          {!localStorage.getItem("userid") ? (
            console.log(1)
          ) : (
            <Routes>
              <Route exact path="/Todo" element={<Todo />}></Route>
              <Route exact path="/Notepage" element={<NotesPage/>}></Route>
            </Routes>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
