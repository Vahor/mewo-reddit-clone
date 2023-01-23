import {Outlet, useNavigate} from "react-router-dom"
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";

export const AuthLayout = () => {
    const {user} = useAuth()
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            navigate('/', {
                replace: true
            })
        }
    }, [user])

    if (user) {
        return <div>loading...</div>
    }

    return (
        <div className='flex flex-col items-center max-w-md justify-center h-screen w-screen mx-auto'>
            <Outlet/>
        </div>
    )
}
