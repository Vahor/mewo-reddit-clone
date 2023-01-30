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
import SettingsPage from "@/pages/settings";
import {Page500} from "@/pages/500";

const router = createBrowserRouter([
    {
        path: "",
        element: <DefaultLayout/>,
        errorElement: <Page500/>,
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
            },
            {
                path: 'settings',
                element: <SettingsPage/>
            },
            {
                path: '*',
                element: <Page404/>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        errorElement: <Page500/>,
        children: [
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            },
            {
                path: '*',
                element: <Page404/>,
            }
        ]
    }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <AuthContextProvider>
                <RouterProvider router={router}/>
            </AuthContextProvider>
        </ThemeContextProvider>
    </React.StrictMode>,
)
