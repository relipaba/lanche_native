import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: "#B98875",
                    tabBarLabel: "Caffee",
                }}
            />
            <Tab.Screen
                name="Local"
                component={Local}
                options={{
                    tabBarActiveTintColor: "#B98875",
                    tabBarLabel: "Lojas",

                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarActiveTintColor: "#B98875",
                    tabBarLabel: "Pedidos",

                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarActiveTintColor: "#B98875",
                    tabBarLabel: "Login",

                }}
            />

            <Tab.Screen
                name="Details"
                component={Details}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Tab.Navigator>
    );
}