import {Outlet, useNavigate} from "react-router-dom"
import {Navbar} from "@/layouts/Default/Navbar/Navbar";
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";

export const DefaultLayout = () => {

    const {user} = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/auth/login', {
                replace: true
            })
        }
    }, [user])

    if (!user) {
        return <div>
            loading...
        </div>
    }

    return (
        <>
            <Navbar/>
            <div className='mt-16'>
                <Outlet/>
            </div>
        </>
    )
}
