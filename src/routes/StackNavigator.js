import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import Initial from "../screens/Initial";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import HomeSesc from "../screens/HomeSesc";
import HomeSenac from "../screens/HomeSenac";
import Details from "../screens/Details";
import Historico from "../screens/Historico";
import ForgotPassword from "../screens/ForgotPassword";
import ForgotCode from "../screens/ForgotCode";

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Initial" component={Initial} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="HomeSesc" component={HomeSesc} />
            <Stack.Screen name="HomeSenac" component={HomeSenac} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Historico" component={Historico} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ForgotCode" component={ForgotCode} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />

        </Stack.Navigator>
    );
}
