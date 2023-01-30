import React from "react";
import {Logo} from "@/components/Logo";
import {LoginForm} from "@/components/Auth/LoginForm";

const LoginPage = () => {
    return (
        <div className='flex justify-center flex-col w-full'>
            <div className="flex items-center justify-between">
                <Logo width={200}/>
                <h1 className='text-4xl'>Login</h1>
            </div>
            <LoginForm/>

        </div>
    )
}

export default LoginPage
