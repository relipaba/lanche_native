import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Options from "../screens/Options";
import Cart from "../screens/Cart";
import User from "../screens/User";
import { useCart } from "../context/CartContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { items } = useCart();
  const count = items.reduce((sum, it) => sum + it.qty, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffdd1fff",
        tabBarStyle: { backgroundColor: "#2E60AE"}
      }}
    >
      <Tab.Screen
        name="Options"
        component={Options}
        options={{
          tabBarLabel: "Lojas",
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Pedidos",
          tabBarBadge: count > 0 ? count : undefined,
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
