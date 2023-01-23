import {Outlet} from "react-router-dom"

export const AuthLayout = () => {

    return (
        <div className='flex flex-col items-center max-w-md justify-center h-screen w-screen mx-auto'>
            <Outlet/>
        </div>
    )
}
