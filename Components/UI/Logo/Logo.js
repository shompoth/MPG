// Librairies
import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = props => {
    // Variables
    const logoStyles = {
        width: props.dimensions.window.width * 0.55,
        height: props.dimensions.window.width * 0.2,
    };
    return <Image source={require("../../../assets/logoMPG.png")} style={logoStyles} />;
};
//
export default Logo;
