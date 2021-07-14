// Librairies
import React from "react";
import { Image } from "react-native";

const Logo = props => {
    // Variables
    const logoStyles = {
        width: props.dimensions.window.width * 0.4,
        height: props.dimensions.window.width * 0.15,
    };
    if (props.dimensions.window.width > 450) {
        logoStyles.width = props.dimensions.window.width * 0.25;
        logoStyles.height = props.dimensions.window.width * 0.1;
    }
    return <Image source={require("../../../assets/logoMPG.png")} style={logoStyles} />;
};
//
export default Logo;
