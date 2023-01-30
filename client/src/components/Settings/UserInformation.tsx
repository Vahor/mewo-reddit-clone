import React from "react";
import {useAuth} from "@/context/AuthContext";

export const UserInformation = () => {
    const {user} = useAuth();

    return (
        <>
            <h2 className='font-bold'>
                Information
            </h2>

            <div className="flex flex-col gap-4 mt-4">
                <p>
                    Username: {user?.name}
                </p>
                <p>
                    Email: {user?.email}
                </p>
                <p>
                    Role: {user?.role}
                </p>
            </div>
        </>
    )
}
