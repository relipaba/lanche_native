import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const BLUE_TOP = "#4E7AD7";
const BLUE_BOTTOM = "#274A92";
const PANEL_BLUE = "#3B56A6";

export default function Options({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Image source={require("../../assets/SescSenac.png")} style={styles.headerLogo} resizeMode="contain" />
            </View>

            <View style={styles.titlePill}>
                <Text style={styles.titleText}>LANCHONETES</Text>
            </View>

            <View style={styles.panel}>
                <ScrollView contentContainerStyle={styles.panelContent} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => navigation.navigate("HomeSesc") }>
                        <Image source={require("../../assets/Sesc.png")} style={styles.cardImage} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => navigation.navigate("HomeSenac") }>
                        <Image source={require("../../assets/Senac.png")} style={styles.cardImage} resizeMode="contain" />
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={styles.bottomBar}>
                <Feather name="file-text" size={22} color="#000" />
                <Feather name="shopping-bag" size={22} color="#000" />
                <Feather name="user" size={22} color="#000" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLUE_TOP,
    },
    header: {
        paddingTop: 24,
        paddingHorizontal: 12,
        alignItems: "center",
    },
    backBtn: {
        alignSelf: "flex-start",
        marginBottom: 6,
    },
    headerLogo: {
        width: 140,
        height: 36,
        alignSelf: "center",
    },
    titlePill: {
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 8,
        // simple shadow
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    titleText: {
        color: "#333",
        letterSpacing: 1,
    },
    panel: {
        flex: 1,
        backgroundColor: PANEL_BLUE,
        margin: 12,
        borderRadius: 16,
        paddingVertical: 16,
    },
    panelContent: {
        gap: 20,
        alignItems: "center",
    },
    card: {
        width: "86%",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },
    cardImage: {
        width: "85%",
        height: 90,
    },
    bottomBar: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 16,
        paddingVertical: 10,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
