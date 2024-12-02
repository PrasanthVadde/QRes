import { Route,  Routes } from "react-router-dom"
import HomeScreen from "../screens/homeScreen.jsx"
import CategoryScreen from "../screens/categoryScreen.jsx"
import CartScreen from "../screens/cartScreen.jsx"
import ProfileScreen from "../screens/profileScreen.jsx"
import PaymentScreen from "../screens/paymentScreen.jsx"
import SignUp from "../screens/signUp.jsx"
import SignIn from "../screens/signIn.jsx"


const NavigationStack=()=>{


    return(
        <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/category" element={<CategoryScreen />} />
            <Route path="/cart" element={<CartScreen/>}/>
            <Route path="/profile" element={<ProfileScreen/>}/>
            <Route path="/payment" element={<PaymentScreen/>}/>
        </Routes>
    )


}

export default NavigationStack