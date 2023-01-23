import {useAuth} from "@/context/AuthContext";
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";
import React from "react";
import {Logo} from "@/components/Logo";
import {Button} from "@/components/Button";
import {useTheme} from "@/context/ThemeProvider";
import {IconMoon, IconSun} from "@tabler/icons";

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
            className='fixed h-16 bg-white dark:bg-gray-900 w-full border-b border-gray-300 dark:border-gray-800 '>
            <div
                className="relative h-16 w-full flex flex-row max-w-screen-lg px-4 items-center justify-between mx-auto">
                <Link to='/'>
                    <Logo/>
                </Link>
                <NavLinks/>
                <UserData/>
            </div>
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
    const {theme, setTheme} = useTheme();

    return (
        <div className="flex flex-row items-center gap-2">
            <div className='w-max flex items-center'>
                {!user && (
                    <Link to='/auth/login'>
                        <Button>
                            Login
                        </Button>
                    </Link>
                )}
                {user && (
                    <div onClick={logout} className='cursor-pointer font-normal text-xs text-gray-300'>
                        @{user.name}
                    </div>
                )}
            </div>
            <div
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className='p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100'
            >
                {theme === 'light' && <IconMoon/>}
                {theme === 'dark' && <IconSun/>}
            </div>
        </div>
    )
}

