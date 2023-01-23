import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import {Navbar} from "./components/layout/Navbar/Navbar";
import {Sidebar} from "./components/layout/Sidebar";
import {AuthContextProvider} from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProfilePage from "./pages/ProfilePage";

dayjs.extend(relativeTime)

function App() {

    return (
        <Router>
            <AuthContextProvider>
                <div className="grid grid-cols-12 gap-2 h-screen fixed">
                    <div className="col-span-3">
                        <Navbar/>
                    </div>
                    <div className="col-span-6 relative overflow-auto">
                        <Switch>
                            <Route path="/" exact>
                                <HomePage/>
                            </Route>
                            <Route path="/login" exact>
                                <LoginPage/>
                            </Route>
                            <Route path="/profile" exact>
                                <ProfilePage/>
                            </Route>
                            <Route path="/user/:user">
                                <UserProfilePage/>
                            </Route>
                        </Switch>
                    </div>
                    <div className="col-span-3">
                        <Sidebar/>
                    </div>
                </div>
            </AuthContextProvider>
        </Router>
    )
}

export default App
