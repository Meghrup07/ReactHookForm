import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/auth/Login";
import UserList from "./components/pages/users/UserList";
import UserInfo from "./components/pages/users/UserInfo";
import AddUser from "./components/pages/users/AddUser";
import Layout from "./components/layout/Layout";
import NotFound from "./components/pages/NotFound";
import { ToastContainer } from "react-toastify";
import Gallery from "./components/pages/gallery/Index";

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
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
      {/* <RouterLinks /> */}
    </div>
  );
}

export default App;
