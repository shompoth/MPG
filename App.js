// Librairies
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";

// Composants

// Variables
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function App() {
    // States
    const [dimensions, setDimensions] = useState({ window, screen });
    const [tableList, setTableList] = useState([
        "Joueurs",
        "Poste",
        "Club",
        "Côte",
        // "Position",
    ]);

    const [players, setPlayers] = useState("");

    const [sortPlayer, setSortPlayer] = useState("");

    // const [modalVisible, setModalVisible] = useState(false);

    // const [actualPlayer, setActualPlayer] = useState(null);

    // Cycles de vie
    useEffect(() => {
        axios
            .get(`https://api.monpetitgazon.com/stats/championship/1/2018`)
            .then(res => {
                const persons = res.data;
                setPlayers(persons);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    // Fonctions
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    const playerPosition = ultraPosition => {
        let position;

        switch (ultraPosition) {
            case 10:
                position = "G";
                break;
            case 20:
                position = "D";
                break;
            case 21:
                position = "L";
                break;
            case 31:
                position = "MD";
                break;
            case 32:
                position = "MO";
                break;
            case 40:
                position = "A";
                break;
            default:
                position = null;
                break;
        }
        return position;
    };

    // Variables
    const logoStyles = {
        width: dimensions.window.width * 0.55,
        height: dimensions.window.width * 0.2,
    };

    return (
        <>
            {/* <Modal visible={modalVisible} transparent={true}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 17,
                            elevation: 30,
                            shadowColor: "black",
                            shadowOpacity: 0.4,
                            shadowRadius: 5,
                            shadowOffset: { width: 0, height: 0 },
                        }}
                    >
                        {console.log(actualPlayer)}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text>Fermer</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal> */}
            <StatusBar style="auto" />

            <View style={styles.container}>
                <StatusBar style="auto" />
                <Image source={require("./assets/logoMPG.png")} style={logoStyles} />

                {players ? (
                    <>
                        <View
                            style={{
                                // ...styles.listWrapper,
                                // marginVertical: 10,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                borderRadius: "10%",
                                flexDirection: "row",
                                backgroundColor: "#e9ebee",
                            }}
                        >
                            {tableList.map(item => (
                                <TouchableOpacity
                                    onPress={() =>
                                        Alert.alert(
                                            "Désolé",
                                            "Cette fonctionnalité n'est pas encore disponible",
                                            "",
                                        )
                                    }
                                    activeOpacity={0.6}
                                    // underlayColor="rgba(91, 196, 69, 0.8)"
                                    style={{
                                        ...styles.listWrapper,
                                        paddingHorizontal: 0,
                                    }}
                                    key={item}
                                >
                                    <Text
                                        style={{
                                            ...styles.row,
                                            color: "#99a0b2",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <FlatList
                            data={players}
                            renderItem={player => (
                                <TouchableHighlight
                                    onPress={player => {
                                        // setActualPlayer(true);
                                        // setModalVisible(true);
                                        Alert.alert(
                                            "Désolé",
                                            "Cette fonctionnalité n'est pas encore disponible",
                                            "",
                                        );
                                    }}
                                    activeOpacity={1}
                                    underlayColor="rgba(91, 196, 69, 0.7)"
                                >
                                    <View style={styles.listWrapper}>
                                        <Text style={styles.row}>
                                            {player.item.lastname}
                                        </Text>
                                        {/* <Text style={styles.row}>{player.item.firstname}</Text> */}
                                        <Text style={styles.row}>
                                            {playerPosition(player.item.ultraPosition)}
                                        </Text>
                                        <Text style={styles.row}>{player.item.club}</Text>
                                        <Text style={styles.row}>
                                            {player.item.quotation}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                            keyExtractor={player => player.id}
                            style={{
                                width: "100%",
                                // marginVertical: 5,
                            }}
                        />
                    </>
                ) : (
                    <ActivityIndicator size="large" color="#000" />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: "#fff",
        marginHorizontal: 15,
    },
    listWrapper: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        borderBottomWidth: 1,
        borderBottomColor: "#e9ebee",
        paddingHorizontal: 10,
    },
    row: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 12,
    },
});
