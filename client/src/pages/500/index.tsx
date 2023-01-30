import {Link} from "react-router-dom";

export const Page500 = () => {
    return (
        <div className='flex items-center justify-center flex-col h-screen'>
            <h1 className='text-8xl font-bold'>500</h1>
            <p>
                Oops
            </p>
            <Link to='/' className='underline text-sm'>Home Page</Link>
        </div>
    )
}
