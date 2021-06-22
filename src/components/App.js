import { useState } from "react"
import { BrowserRouter,Switch, Route } from "react-router-dom"
import Login from "./Login/Login"
import Register from "./Register/Register"
import UserContext from "../contexts/UserContext"

export default function App(){
    const [userData, setUserData] = useState({})
    return(
        <UserContext.Provider value={userData, setUserData}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Login></Login>
                    </Route>
                    <Route path="/register" exact>
                        <Register></Register>
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )

}