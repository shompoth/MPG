// Librairies
import React from "react";
import { MainStackNavigator } from "./Navigators";
import { NavigationContainer } from "@react-navigation/native";

function AppNavigator() {
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

export default AppNavigator;
