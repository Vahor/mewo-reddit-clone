import React from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const HomePage = () => {
    const {user} = useAuth();
    const history = useHistory()

    if (user) {
        history.replace(`/user/${user.username}`)
    } else {
        history.replace(`/`)
    }


    return null;
}

export default HomePage
