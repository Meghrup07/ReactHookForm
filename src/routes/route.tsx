import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';


const Login = lazy(() => import('../components/pages/auth/Login'));
const UserList = lazy(() => import("../components/pages/users/UserList"));
const UserInfo = lazy(() => import("../components/pages/users/UserList"));
const AddUser = lazy(() => import("../components/pages/users/AddUser"));
const EditUser = lazy(() => import("../components/pages/users/AddUser"));
const NotFound = lazy(() => import("../components/pages/NotFound"));

const route = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "",
        element: <UserList />
    },
    {
        path: "userInfo/:id",
        element: <UserInfo />
    },
    {
        path: "add",
        element: <AddUser />
    },
    {
        path: "edit/:id",
        element: <EditUser />
    },
    {
        path: "*",
        element: <NotFound />,
    }
]


const RouterLinks = () => {
    return (
        <Routes>
            <Suspense fallback={<div>Loading...</div>}>
                {route.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Suspense>
        </Routes>
    );
};
export default RouterLinks;