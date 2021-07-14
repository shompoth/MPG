// Librairie
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    ScrollView,
} from "react-native";
import Logo from "../components/UI/Logo/Logo";

function playerDetails(props) {
    // State
    const [detailPlayer, setDetailPlayer] = useState("");
    // const [dimensions, setDimensions] = useState({ window, screen });

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

    // Variables;
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
        birth = birth.replace(/-/g, "/");
        birth = new Date(birth);
        const now = new Date();
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth();
        const nowDay = now.getDay();

        const birthYear = birth.getFullYear();
        const birthMonth = birth.getMonth();
        const birthDay = birth.getDay();
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
        <View
            style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
            }}
        >
            {/* <Logo dimensions={dimensions} /> */}
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
                        <View style={styles.divWrapperBigStats}>
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
                                    {detailPlayer.birthDate &&
                                        getAge(detailPlayer.birthDate)}
                                    {detailPlayer.birthDate && <Text> ans</Text>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.mt20}>
                            <View style={styles.divWrapperBigStats}>
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
                            <View style={styles.divWrapperBigStats}>
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
                        <ScrollView style={{ width: "90%" }}>
                            {detailPlayer.ultraPosition === 10 ? (
                                <View style={styles.divWrapperLittleStats}>
                                    <Text style={styles.detailProperty}>EFFICACE ?</Text>
                                    <View style={styles.rowDiv}>
                                        <Text>Buts encaissés par match :</Text>
                                        <Text style={styles.blueColor}>
                                            {detailPlayer.stats.goalsConcededByMatch}
                                        </Text>
                                    </View>
                                    <View style={styles.rowDiv}>
                                        <Text>Nombre de cleansheet :</Text>
                                        <Text style={styles.blueColor}>
                                            {detailPlayer.stats.sumCleanSheet}
                                        </Text>
                                    </View>
                                    <View style={styles.rowDiv}>
                                        <Text>Arrêts réalisés : </Text>
                                        <Text style={styles.blueColor}>
                                            {detailPlayer.stats.sumSaves}
                                        </Text>
                                    </View>
                                    <View style={styles.rowDiv}>
                                        <Text>Parades : </Text>
                                        <Text style={styles.blueColor}>
                                            {detailPlayer.stats.sumDeflect}
                                        </Text>
                                    </View>
                                    <View style={styles.rowDiv}>
                                        <Text>Pénaltys sauvés : </Text>
                                        <Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.sumPenaltySave}
                                            </Text>{" "}
                                            (
                                            {detailPlayer.stats.sumPenaltySave &&
                                                (detailPlayer.stats.sumPenaltySave /
                                                    detailPlayer.stats.sumPenaltyFaced) *
                                                    100}
                                            %)
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <>
                                    <View style={styles.divWrapperLittleStats}>
                                        <Text style={styles.detailProperty}>
                                            EFFICACE ?
                                        </Text>
                                        <View style={styles.rowDiv}>
                                            <Text>Duels remportés par match :</Text>
                                            <Text>
                                                <Text>
                                                    <Text style={styles.blueColor}>
                                                        {
                                                            detailPlayer.stats
                                                                .wonContestByMatch
                                                        }
                                                    </Text>
                                                    (
                                                    {
                                                        detailPlayer.stats
                                                            .percentageWonContest
                                                    }
                                                    %)
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Duels remportés par match : </Text>
                                            <Text>
                                                <Text style={styles.blueColor}>
                                                    {detailPlayer.stats.wonDuelByMatch}
                                                </Text>
                                                ({detailPlayer.stats.percentageWonDuel}%)
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Pertes de balles par match : </Text>
                                            <Text>
                                                <Text style={styles.blueColor}>
                                                    {detailPlayer.stats.lostBallByMatch}
                                                </Text>
                                                ({detailPlayer.stats.percentageLostBall}%)
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Fautes commises par match : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.foulsByMatch}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Fautes subies par match : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.foulsEnduredByMatch}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Tirs cadrés par match : </Text>
                                            <Text>
                                                <Text style={styles.blueColor}>
                                                    {
                                                        detailPlayer.stats
                                                            .shotOnTargetByMatch
                                                    }
                                                </Text>
                                                (
                                                {
                                                    detailPlayer.stats
                                                        .percentageShotOnTarget
                                                }
                                                %)
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.divWrapperLittleStats}>
                                        <Text style={styles.detailProperty}>
                                            IL PLANTE ?
                                        </Text>
                                        <View style={styles.rowDiv}>
                                            <Text>Buts (pén) :</Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.sumGoals} (
                                                {detailPlayer.stats.sumPenalties})
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Fréquence de buts (min.) : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.minutesByGoal}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Buts par match : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.goalByMatch}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Tirs par match : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.shotByMatch}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Grosses occasions manquées : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.sumBigChanceMissed}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.divWrapperLittleStats}>
                                        <Text style={styles.detailProperty}>
                                            UN AS DE LA PASSE ?
                                        </Text>
                                        <View style={styles.rowDiv}>
                                            <Text>Passes décisives : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.sumGoalAssist}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Grosses occasions créées : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.sumBigChanceCreated}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Passes réussies par match : </Text>
                                            <Text>
                                                <Text style={styles.blueColor}>
                                                    {
                                                        detailPlayer.stats
                                                            .succeedPassByMatch
                                                    }
                                                </Text>
                                                (
                                                {detailPlayer.stats.percentageSucceedPass}
                                                %)
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>
                                                Passes réussies dans son camp par match :{" "}
                                            </Text>
                                            <Text>
                                                <Text style={styles.blueColor}>
                                                    {
                                                        detailPlayer.stats
                                                            .succeedPassBackZoneByMatch
                                                    }
                                                </Text>
                                                (
                                                {
                                                    detailPlayer.stats
                                                        .percentageAccuratePassBackZone
                                                }
                                                %)
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>
                                                Passes longues réussies par match :{" "}
                                            </Text>
                                            <Text>
                                                <Text style={styles.blueColor}>
                                                    {
                                                        detailPlayer.stats
                                                            .succeedLongPassByMatch
                                                    }
                                                </Text>
                                                (
                                                {
                                                    detailPlayer.stats
                                                        .percentageAccurateLongPass
                                                }
                                                %)
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Centres réussis par match : </Text>
                                            <Text>
                                                <Text style={styles.blueColor}>
                                                    {
                                                        detailPlayer.stats
                                                            .succeedCrossByMatch
                                                    }
                                                </Text>
                                                (
                                                {
                                                    detailPlayer.stats
                                                        .percentageCrossSuccess
                                                }
                                                %)
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.divWrapperLittleStats}>
                                        <Text style={styles.detailProperty}>
                                            SOLIDE ?
                                        </Text>
                                        <View style={styles.rowDiv}>
                                            <Text>Interceptions par match : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.interceptByMatch}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Tacles par match : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.tackleByMatch}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Buts encaissés par match : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.goalsConcededByMatch}
                                            </Text>
                                        </View>
                                        <View style={styles.rowDiv}>
                                            <Text>Erreurs qui amènent un but : </Text>
                                            <Text style={styles.blueColor}>
                                                {detailPlayer.stats.mistakeByMatch}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )}
                        </ScrollView>
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
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: "#fff",
        width: "100%",
        // paddingVertical: 50,
        // marginHorizontal: 15,
    },
    divWrapperBigStats: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 0.3,
        borderBottomColor: "#e9ebee",
        width: "100%",
    },
    divWrapperLittleStats: {
        justifyContent: "center",
        paddingVertical: 10,
    },
    rowDiv: {
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "100%",
        paddingVertical: 2,
    },
    presentationDiv: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 7,
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
    blueColor: {
        color: "#4054cc",
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
        marginVertical: 10,
    },
    mr5: {
        marginRight: 5,
    },
    detailProperty: {
        fontSize: 18,
        marginBottom: 5,
    },
});

export default playerDetails;
