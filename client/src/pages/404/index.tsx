import {Link} from "react-router-dom";

export const Page404 = (props: any) => {

    return (
        <div className='flex items-center justify-center flex-col h-full'>
            <h1 className='text-8xl font-bold'>404</h1>
            <p className='py-2'>Page not found</p>
            <Link to='/' className='underline text-sm'>Home Page</Link>
        </div>
    )
}
