import { useState } from "react"
import { BrowserRouter,Switch, Route } from "react-router-dom"
import Login from "./Login/Login"
import Register from "./Register/Register"
import Balance from "./Balance/Balance"
import UserContext from "../contexts/UserContext"
import Cashin from "./Cashin/Cashin"
import Cashout from "./Cashout/Cashout"

export default function App(){
    const [userData, setUserData] = useState({})
    return(
        <UserContext.Provider value={{userData: userData, setUserData: setUserData}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Login></Login>
                    </Route>
                    <Route path="/register" exact>
                        <Register></Register>
                    </Route>
                    <Route path='/balance'>
                        <Balance></Balance>
                    </Route>
                    <Route path='/cashin'>
                        <Cashin></Cashin>
                    </Route>
                    <Route path='/cashout'>
                        <Cashout></Cashout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )

}