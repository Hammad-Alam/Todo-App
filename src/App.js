import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListTodo from "./pages/listTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
