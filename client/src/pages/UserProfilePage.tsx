import {useParams} from "react-router-dom";

const UserProfilePage = () => {

    const {user} = useParams<{ user: string }>();

    return (
        <span>{user}</span>
    )
}

export default UserProfilePage
