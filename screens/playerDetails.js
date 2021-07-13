// Librairie
import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

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

    return (
        <View style={styles.container}>
            {detailPlayer ? (
                <View style={styles.container}>
                    <Text style={{ fontSize: 18 }}>{detailPlayer.firstname} </Text>
                    <Text style={{ fontSize: 18 }}>{detailPlayer.lastname} </Text>
                    <Text style={{ fontSize: 16, marginTop: 10 }}>
                        {detailPlayer.club}{" "}
                    </Text>
                </View>
            ) : (
                <ActivityIndicator size="large" color="#000" />
            )}
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
        // paddingVertical: 50,
        marginHorizontal: 15,
    },
});

export default playerDetails;
