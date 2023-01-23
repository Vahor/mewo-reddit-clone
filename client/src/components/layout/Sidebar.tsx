import {Searchbar} from "./Searchbar";
import {Recommended} from "./Recommended";

export const Sidebar = () => {
    return (
        <aside className="h-screen flex flex-col py-2 border-l items-start px-2 gap-2">
            <Searchbar/>
            <Recommended/>
        </aside>
    )
}
