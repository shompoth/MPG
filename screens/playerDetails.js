// Librairie
import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import Logo from "../Components/UI/Logo/Logo";

function playerDetails(props) {
    // State
    const [detailPlayer, setDetailPlayer] = useState("");

    // Cycle de vie
    useEffect(() => {
        axios
            .get(
                `https://api.monpetitgazon.com/stats/player/${props.route.params.IDPlayer}?season=2018`,
            )
            .then(res => {
                const player = res.data;
                setDetailPlayer(player);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // useEffect(() => {
    //     Dimensions.addEventListener("change", onChange);
    //     return () => {
    //         Dimensions.removeEventListener("change", onChange);
    //     };
    // });

    // Variables
    // const window = Dimensions.get("window");
    // const screen = Dimensions.get("screen");

    // Fonctions
    const playerPosition = ultraPosition => {
        let position;

        switch (ultraPosition) {
            case 10:
                position = "Gardien";
                break;
            case 20:
                position = "Défenseur central";
                break;
            case 21:
                position = "Défenseur latéral";
                break;
            case 31:
                position = "Milieu défensif";
                break;
            case 32:
                position = "Milieu offensif";
                break;
            case 40:
                position = "Attaquant";
                break;
            default:
                position = null;
                break;
        }
        return position;
    };

    function getAge(birth) {
        birth = birth.replace(/-/g, "/"); //Replace the "-" in the format with "/"
        birth = new Date(birth); //Change to Date type after replacement
        const now = new Date(); //Get the current date
        const nowYear = now.getFullYear(); //The year of the current date
        const nowMonth = now.getMonth();
        const nowDay = now.getDay();

        const birthYear = birth.getFullYear();
        const birthMonth = birth.getMonth();
        const birthDay = birth.getDay(); //Number of days of birth date
        let age;

        if (birth > now) {
            return false;
        } else if (
            nowYear == birthYear ||
            (nowYear > birthYear && nowMonth >= birthMonth && nowDay >= birthDay)
        ) {
            age = nowYear - birthYear;
        } else {
            age = nowYear - birthYear - 1; //In short, the age cannot be +1 before the birthday
        }
        return age;
    }

    // const onChange = ({ window, screen }) => {
    //     setDimensions({ window, screen });
    // };

    return (
        <>
            {/* <Logo dimensions={props.dimensions} /> */}
            <View
                style={{ ...styles.container, backgroundColor: "rgba(91, 196, 69, 0.7)" }}
            >
                {detailPlayer ? (
                    <>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            <View style={styles.presentationDiv}>
                                {detailPlayer.firstname && (
                                    <Text style={styles.playerName}>
                                        {detailPlayer.firstname}
                                    </Text>
                                )}

                                <Text style={styles.playerName}>
                                    {detailPlayer.lastname}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                borderBottomWidth: 0.5,
                                borderBottomColor: "e9ebee",
                                width: "100%",
                            }}
                        >
                            {/* <View style={styles.presentationDiv}>
                                {detailPlayer.firstname && (
                                    <Text style={styles.playerName}>
                                        {detailPlayer.firstname}
                                    </Text>
                                )}

                                <Text style={styles.playerName}>
                                    {detailPlayer.lastname}
                                </Text>
                            </View> */}

                            <View style={{ ...styles.presentationDiv, flex: 1 }}>
                                <Text style={styles.textCenter18}>
                                    {playerPosition(detailPlayer.ultraPosition)}
                                </Text>
                                <Text style={styles.textCenter18}>
                                    {detailPlayer.club}{" "}
                                </Text>
                            </View>
                            <View style={{ ...styles.presentationDiv, flex: 1 }}>
                                <Text style={styles.textCenter18}>
                                    {getAge(detailPlayer.birthDate)} ans
                                </Text>
                            </View>
                        </View>
                        <View style={styles.mt20}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: "e9ebee",
                                    width: "100%",
                                }}
                            >
                                <View style={{ ...styles.presentationDiv, flex: 1 }}>
                                    <Text style={styles.textCenter16}>Note moyenne</Text>
                                    <Text style={styles.blueTextCenter20}>
                                        {detailPlayer.stats.avgRate}
                                    </Text>
                                </View>
                                {detailPlayer.ultraPosition === 10 ? (
                                    <>
                                        <View
                                            style={{
                                                ...styles.presentationDiv,
                                                flex: 1,
                                            }}
                                        >
                                            <Text style={styles.textCenter16}>
                                                Clean Sheat
                                            </Text>
                                            <Text style={styles.blueTextCenter20}>
                                                {detailPlayer.stats.sumCleanSheet}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                ...styles.presentationDiv,
                                                flex: 1,
                                            }}
                                        >
                                            <Text style={styles.textCenter16}>
                                                % Sauvés
                                            </Text>
                                            <Text style={styles.blueTextCenter20}>
                                                {detailPlayer.stats.percentageSaveShot}
                                            </Text>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <View
                                            style={{
                                                ...styles.presentationDiv,
                                                flex: 1,
                                            }}
                                        >
                                            <Text style={styles.textCenter16}>
                                                Buts (pén.)
                                            </Text>
                                            <Text style={styles.blueTextCenter20}>
                                                {detailPlayer.stats.sumGoals} (
                                                {detailPlayer.stats.sumPenalties})
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                ...styles.presentationDiv,
                                                flex: 1,
                                            }}
                                        >
                                            <Text style={styles.textCenter16}>
                                                Passe dé
                                            </Text>
                                            <Text style={styles.blueTextCenter20}>
                                                {detailPlayer.stats.sumGoalAssist}
                                            </Text>
                                        </View>
                                    </>
                                )}
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: "e9ebee",
                                    width: "100%",
                                }}
                            >
                                <View style={styles.presentationDiv}>
                                    <Text style={styles.textCenter16}>Côte</Text>
                                    <Text style={styles.blueTextCenter20}>
                                        {detailPlayer.quotation}
                                    </Text>
                                </View>
                                <View style={styles.presentationDiv}>
                                    <Text style={styles.textCenter16}>
                                        Titulaire (remp.)
                                    </Text>
                                    <Text style={styles.blueTextCenter20}>
                                        {detailPlayer.stats.appearances.starter} (
                                        {detailPlayer.stats.appearances.standIn})
                                    </Text>
                                </View>
                                <View style={styles.presentationDiv}>
                                    <Text style={styles.textCenter16}>Cartons</Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...styles.card18,
                                                marginRight: 5,
                                                backgroundColor: "#ca2e2a",
                                            }}
                                        >
                                            {detailPlayer.stats.sumRedCard}
                                        </Text>
                                        <Text
                                            style={{
                                                ...styles.card18,
                                                backgroundColor: "#f1a640",
                                            }}
                                        >
                                            {detailPlayer.stats.sumYellowCard}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
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
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: "#fff",
        // paddingVertical: 50,
        // marginHorizontal: 15,
    },
    presentationDiv: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    playerName: {
        fontSize: 22,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    blueTextCenter20: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "#4054cc",
        marginTop: 5,
    },
    card18: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 5,
        color: "white",
        paddingHorizontal: 2,
    },
    textCenter18: {
        fontSize: 18,
        textAlign: "center",
    },
    textCenter16: {
        fontSize: 16,
        textAlign: "center",
    },

    mt20: {
        marginTop: 20,
    },
});

export default playerDetails;
