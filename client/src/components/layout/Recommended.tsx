import React from "react";

export const Recommended = () => {
    return (
        <div className='flex flex-col gap-2 w-full overflow-auto'>
            <Section title='Trending'>
                <>
                    <RecommendedUser/>
                    <RecommendedUser/>
                    <RecommendedUser/>
                    <RecommendedUser/>
                </>
            </Section>

            <Section title='You might like'>
                <>
                    <RecommendedThread position={1} title='DisneyPlus' description='125K Tweets'/>
                    <RecommendedThread position={1} title='DisneyPlus' description='125K Tweets'/>
                    <RecommendedThread position={1} title='DisneyPlus' description='125K Tweets'/>
                    <RecommendedThread position={1} title='DisneyPlus' description='125K Tweets'/>
                </>
            </Section>
        </div>
    )
}

const Section: React.FC<{ title: string, children: React.ReactElement }> = ({title, children}) => {

    return (
        <div className='bg-gray-100 px-2 py-4 rounded-md'>
            <p className='font-bold pb-2 mb-2 border-b border-gray-300'>{title}</p>
            <ol className='flex flex-col gap-2'>
                {children}
            </ol>
        </div>
    )
}

const RecommendedThread: React.FC<{ position: number, title: string, description: string }> =
    ({position, title, description}) => {
        return (
            <li className='flex flex-col pb-2 mb-2 border-b border-gray-300'>
                <span className='text-gray-400 text-xs'>{position}&nbsp;-&nbsp;Trending</span>
                <span className='font-bold'>{title}</span>
                <span className='text-gray-400 font-bold text-xs'>{description}</span>
            </li>
        )
    }

const RecommendedUser = () => {

    return (
        <li className='flex flex-col lg:flex-row gap-2 lg:items-center'>
            <div className='flex items-center gap-2 cols-span-1 grow'>
                <img className='h-8 w-8 rounded-full bg-red-500'/>
                <div className="flex flex-col">
                    <p className='font-bold'>UserName</p>
                    <p className='font-normal text-xs text-gray-300'>@yey</p>
                </div>
            </div>
            <button
                className='grow-0 cols-span-1 py-0.5 font-bold rounded-xl bg-transparent border border-blue-400 text-blue-400 px-2 w-full lg:w-auto'>
                Follow
            </button>
        </li>
    )
}
