import {Outlet} from "react-router-dom"
import {Navbar} from "@/layouts/Default/Navbar/Navbar";

export const DefaultLayout = () => {

    return (
        <>
            <Navbar/>
            <div>
                yey
                <Outlet/>
            </div>
        </>
    )
}
