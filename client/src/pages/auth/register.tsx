import React from "react";
import {Logo} from "@/components/Logo";
import {RegisterForm} from "@/components/Auth/RegisterForm";

const RegisterPage = () => {


    return (
        <div className='flex justify-center flex-col w-full'>
            <div className="flex items-center justify-between">
                <Logo width={200}/>
                <h1 className='text-4xl'>Register</h1>
            </div>
            <RegisterForm/>

        </div>
    )
}

export default RegisterPage
