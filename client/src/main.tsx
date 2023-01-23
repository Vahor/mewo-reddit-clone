import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {DefaultLayout} from './layouts/Default';
import {Page404} from "./pages/404";
import {AuthLayout} from "./layouts/AuthLayout";
import {AuthContextProvider} from "./context/AuthContext";
import LoginPage from "@/pages/auth/login";
import {ThemeContextProvider} from "@/context/ThemeProvider";
import {HomePage} from "@/pages/home";
import RegisterPage from "@/pages/auth/register";
import {PostIdPage} from "@/pages/post/[id]";

const router = createBrowserRouter([
    {
        path: "",
        element: <DefaultLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>,
            },
            {
                path: 'users',
                element: <div>tdest</div>
            },
            {
                path: 'post/:id',
                element: <PostIdPage/>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            }
        ]
    },
    {
        path: '*',
        element: <Page404/>
    }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthContextProvider>
            <ThemeContextProvider>
                <RouterProvider router={router}/>
            </ThemeContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
)
