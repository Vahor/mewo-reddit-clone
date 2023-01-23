import {useAuth} from "@/context/AuthContext";
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";
import React from "react";
import {Logo} from "@/components/Logo";
import {Button} from "@/components/Button";

const navbarLinks = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'users',
        href: '/users'
    },
]

export const Navbar = () => {
    return (
        <div
            className='fixed h-16 bg-white dark:bg-dark w-full flex flex-row items-center max-w-screen-lg px-4 shadow justify-between'>
            <Logo/>
            <NavLinks/>
            <UserData/>
        </div>
    )
}

const NavLinks = () => {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <div className="flex flex-row gap-2">
            {navbarLinks.map((item) => {
                const active = pathname === item.href;
                return (
                    <Link to={item.href} key={item.label} className={clsx(
                        'font-bold uppercase relative',
                        'after:transition after:duration-100 after:absolute after:-bottom-5 after:right-0 after:border-b-2 after:content-[""] after:w-full hover:after:border-brand-light/70',
                        active && 'after:border-brand-light',
                        !active && 'after:border-transparent'
                    )}>
                        {item.label}
                    </Link>
                )
            })}

        </div>
    )
}

const UserData = () => {
    const {user, logout} = useAuth();

    return (
        <div className='w-max flex items-center'>
            {!user && (
                <Link to='/auth/login'>
                    <Button>
                        Login
                    </Button>
                </Link>
            )}
            {user && (
                <div onClick={logout}
                     className='flex items-center gap-2 transition-color duration-100 hover:bg-gray-100 rounded-md w-full cursor-pointer'>
                    <div className="flex flex-col">
                        <p className=''>{user.username}</p>
                        <p className='font-normal text-xs text-gray-300'>@{user.name}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

