import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import AdminLogin from "./components/AdminLogin";
function App() {
  return (
<<<<<<< HEAD
    <div>
      
      <h2>User Form Component</h2>
      <UserForm />

     
    </div>
=======
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
>>>>>>> 3a1fb43b3623d50a991ea71987e701580533dea6
  );
}

export default App;
