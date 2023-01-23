import React, {ButtonHTMLAttributes} from "react";

export const Button: React.FC<{ children: React.ReactElement | string } & ButtonHTMLAttributes<HTMLButtonElement>> = ({children,...props}) => {
    return (
        <button className='px-3 py-2 rounded-xl bg-blue-400 text-white w-full mt-4 text-center disabled:opacity-50' {...props}>
            {children}
        </button>
    )
}
