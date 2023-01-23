import {IconSearch} from "@tabler/icons";

export const Searchbar = () => {
    return (
        <div className="relative flex items-center w-full">
            <div className="absolute left-1.5">
                <IconSearch size={16} className='text-gray-400'/>
            </div>
            <input type='text'
                   placeholder='Search Twitter'
                   className='py-1 pl-7 rounded-xl bg-gray-100 w-full border-transparent !ring-transparent'
            />
        </div>
    )
}
