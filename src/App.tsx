import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import UserList from "./components/users/UserList";
import UserInfo from "./components/users/UserInfo";
import AddUser from "./components/users/AddUser";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<UserList />} />
          <Route path="userInfo/:id" element={<UserInfo />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<AddUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
