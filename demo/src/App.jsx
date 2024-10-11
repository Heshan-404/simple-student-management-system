import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css" 
import ShowPage from "./pages/ShowStudents";
import StudentRegisterForm from "./pages/AddStudent";


function App() { 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="show" element={<ShowPage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
