import { BrowserRouter as Router,Route, Routes } from "react-router-dom"
import User from "./user/User"
import AddRecipe from "./recipes/AddRecipe"
import Home from "./recipes/Home"
import Recipes from "./recipes/Recipes"
import Navbar from "./recipes/Navbar"
import userReducer, { UserContext, initialState } from "./user/userReducer"
import { useReducer } from "react"
import ErrorCom from "./recipes/ErrorCom"

const RouterCom=()=>{
  const [user, dispatchUser] = useReducer(userReducer, initialState);

    return(
    <UserContext.Provider value={{ state: user, dispatch: dispatchUser }}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Home/><User/></>} />
        <Route path="/recipes" element={<><Recipes/><User/></>} />
        <Route path="/add-recipe" element={<><AddRecipe/><User/></>} />
        <Route path="/error" element={<><ErrorCom/><User/></>} />
      </Routes>
    </Router>
     </UserContext.Provider>)
}

export default RouterCom;