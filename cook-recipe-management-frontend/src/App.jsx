
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterForm from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {
  

  return (
    <>
      <div className='w-full min-h-screen  flex justify-center items-center'>
          <Routes path="/*">
            
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/*" element={<Dashboard/>} />
          </Routes>
                {/* 
        <LoginCard /> */}
        
      </div>
    </>
  );
}

export default App;