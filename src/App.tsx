import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Header from "./components/Header";

function App() {
  const isAuth = useSelector((state: any) => state.auth.isAuthenicated);

  return (
    <div className="App">
      {isAuth && <Header />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route element={<ProtectedRoute children={<UserList />} />}>
            <Route path="/" element={<UserList />} />
            <Route path="/userInfo/:id" element={<UserInfo />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
