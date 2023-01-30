import React, {type ButtonHTMLAttributes} from "react";

export const Button: React.FC<
    { children: React.ReactElement | string } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
         children,
         ...props
     }) => {
    return (
        <button
            className='px-3 py-1 rounded-lg bg-brand-light text-white w-full hover:bg-brand-light/80 text-center disabled:opacity-50' {...props}>
            {children}
        </button>
    )
}
