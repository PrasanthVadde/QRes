import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
     
    const navigate = useNavigate();
    const navigateHandler = () => {
        
        navigate("/category");
    }
 const navigateTOCart =()=>{
    
    navigate("./cart")
 }
    return (
        <>
            <h1>Welcome to HomeScreen.....</h1>







            <button onClick={navigateHandler}>Click Me</button>

            <button onClick={navigateTOCart}>Cart</button>
        </>
    );
};

export default HomeScreen;
