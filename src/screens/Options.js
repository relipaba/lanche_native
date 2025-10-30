import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

const BLUE_TOP = "#4E7AD7";
const BLUE_BOTTOM = "#274A92";
const PANEL_BLUE = "#3B56A6";

export default function Options({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
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

            {/* bottom bar removido — tabs reais ficam no TabNavigator */}
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
        backgroundColor: PANEL_BLUE,
        alignSelf: "center",
        width: "92%", // levemente maior e centralizado
        marginVertical: 18,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    panelContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 28,
        paddingVertical: 12,
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
    // bottomBar removido
});
