import { useState } from "react"
import { BrowserRouter,Switch, Route } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import Signup from "./Signup"
import Register from "./Register"
import Balance from "./Balance"
import Signin from "./Signin"

export default function App(){
	const [userData, setUserData] = useState({})
	return(
		<UserContext.Provider value={{userData: userData, setUserData: setUserData}}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Signin}/>
					<Route path="/register" exact component={Signup}/>
					<Route path='/balance' exact component={Balance}/>
					<Route path='/cashin' exact component={Register}/>
					<Route path='/cashout' exact component={Register}/>
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>
	)

}