// Librairies
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";

// Composants
import Test from "../components/Test";
import Logo from "../components/UI/Logo/Logo";

// Variables
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function Home(props) {
    // States
    const [dimensions, setDimensions] = useState({ window, screen });

    const [tableList, setTableList] = useState(["Joueurs", "Poste", "Club", "Côte"]);

    const [players, setPlayers] = useState("");

    const [sortPlayers, setSortPlayers] = useState(null);

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

    // Variables

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

    const settingSort = sort => {
        if (sort === "Joueurs") {
            sortPlayers === "alphaDescending"
                ? setSortPlayers("alphaAscending")
                : setSortPlayers("alphaDescending");
        }
        if (sort === "Poste") {
            sortPlayers === "posteDescending"
                ? setSortPlayers("posteAscending")
                : setSortPlayers("posteDescending");
        }

        sortFunction(sortPlayers);
    };

    const sortFunction = sortPlayers => {
        if (sortPlayers === "alphaAscending") {
            players.sort((a, b) =>
                b.lastname.toUpperCase() > a.lastname.toUpperCase() ? 1 : -1,
            );
        } else if (sortPlayers === "alphaDescending") {
            players.sort((a, b) =>
                a.lastname.toUpperCase() > b.lastname.toUpperCase() ? 1 : -1,
            );
        } else if (sortPlayers === "posteDescending") {
            players.sort((a, b) => (a.ultraPosition > b.ultraPosition ? 1 : -1));
        } else if (sortPlayers === "posteAscending") {
            players.sort((a, b) => (b.ultraPosition > a.ultraPosition ? 1 : -1));
        }
    };

    // const displayArrow = item => {
    //     let arrow;
    //     if (item === "Joueurs") {
    //         if (sortPlayers === "alphaDescending") {
    //             arrow = (
    //                 <Image
    //                     source={require("../assets/downArrow.png")}
    //                     style={{ paddingTop: 10 }}
    //                 />
    //             );
    //         } else if (sortPlayers === "posteDescending") {
    //             arrow = (
    //                 <Image
    //                     source={require("./assets/downArrow.png")}
    //                     style={{ paddingTop: 10 }}
    //                 />
    //             );
    //         }
    //     } else if (item === "Poste") {
    //         if (sortPlayers === "alphaAscending") {
    //             arrow = (
    //                 <Image
    //                     source={require("./assets/upArrow.png")}
    //                     style={{ paddingTop: 10 }}
    //                 />
    //             );
    //         } else if (sortPlayers === "posteAscending") {
    //             arrow = (
    //                 <Image
    //                     source={require("./assets/upArrow.png")}
    //                     style={{ paddingTop: 10 }}
    //                 />
    //             );
    //         }
    //     }

    //     return arrow;
    // };

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#fff",
            }}
        >
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Logo dimensions={dimensions} />
                <Test />

                {players ? (
                    <>
                        <View
                            style={{
                                marginTop: 10,
                                paddingHorizontal: 10,
                                borderRadius: "10%",
                                flexDirection: "row",
                                backgroundColor: "#e9ebee",
                            }}
                        >
                            {tableList.map(item => (
                                <TouchableOpacity
                                    onPress={() => settingSort(item)}
                                    activeOpacity={0.6}
                                    style={{
                                        ...styles.listWrapper,
                                        paddingHorizontal: 0,
                                    }}
                                    key={item}
                                >
                                    <View
                                        style={{
                                            ...styles.row,
                                            height: 50,
                                            flex: 1,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...styles.row,
                                                color: "#99a0b2",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item}

                                            {/* {sortPlayers && displayArrow(item)} */}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <FlatList
                            data={players}
                            renderItem={player => (
                                <TouchableHighlight
                                    onPress={() => {
                                        props.navigation.navigate("Detail du joueur", {
                                            IDPlayer: player.item.id.replace(
                                                /[^0-9]/g,
                                                "",
                                            ),
                                            dimensions,
                                        });
                                    }}
                                    activeOpacity={1}
                                    underlayColor="rgba(91, 196, 69, 0.7)"
                                >
                                    <View style={styles.listWrapper}>
                                        <Text style={styles.row}>
                                            {player.item.lastname}
                                        </Text>
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
                            }}
                        />
                    </>
                ) : (
                    <ActivityIndicator size="large" color="#000" />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: window.width > 450 ? "85%" : "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: "#fff",
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
        justifyContent: "center",
        paddingVertical: 10,
        fontSize: 12,
    },
});

export default Home;
