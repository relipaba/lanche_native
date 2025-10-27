import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/routes/StackNavigator";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    
    <CartProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
