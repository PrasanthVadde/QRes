import { BrowserRouter } from "react-router-dom";
import NavigationStack from "./navigation/navigationStack.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationStack />
    </BrowserRouter>
  );
};

export default App;
