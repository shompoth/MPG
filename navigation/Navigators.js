// Librairies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Ecrans
import HomeScreen from "../screens/Home";
import PlayerDetailsScreen from "../screens/playerDetails";

// MainStackNavigator
const MainStackNavigatorComponent = createStackNavigator();

export const MainStackNavigator = () => {
    return (
        <MainStackNavigatorComponent.Navigator>
            <MainStackNavigatorComponent.Screen
                name="Joueurs Ligue 1 - 2018"
                component={HomeScreen}
            />
            <MainStackNavigatorComponent.Screen
                name="Detail du joueur"
                component={PlayerDetailsScreen}
            />
        </MainStackNavigatorComponent.Navigator>
    );
};
