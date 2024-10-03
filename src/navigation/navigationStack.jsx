import { Route,  Routes } from "react-router-dom"
import HomeScreen from "../screens/homeScree.jsx"
import CategoryScreen from "../screens/categoryScreen.jsx"
import CartScreen from "../screens/cartScreen.jsx"

const NavigationStack=()=>{


    return(
        <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/category" element={<CategoryScreen />} />
            <Route path="/cart" element={<CartScreen/>}/>
        </Routes>
    )


}

export default NavigationStack