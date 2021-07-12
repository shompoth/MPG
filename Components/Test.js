import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";

function Test() {
    const [test, setTest] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => {
                setTest(!test);
                console.log(test);
            }}
            activeOpacity={0.6}
        >
            <Text>Test</Text>
        </TouchableOpacity>
    );
}

export default Test;
