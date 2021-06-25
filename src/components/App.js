import { useState } from "react"
import { BrowserRouter,Switch, Route } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import Register from "./Register/Register"
import Cashout from "./Cashout/Cashout"
import Balance from "./Balance/Balance"
import Cashin from "./Cashin/Cashin"
import Login from "./Login/Login"

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
                    <Route path='/balance' exact>
                        <Balance></Balance>
                    </Route>
                    <Route path='/cashin' exact>
                        <Cashin></Cashin>
                    </Route>
                    <Route path='/cashout' exact>
                        <Cashout></Cashout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )

}