import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const BLUE = "#2E60AE";
const BLUE_LIGHT = "#4E7AD7";
const YELLOW = "#FFBF3C";
const YELLOW_BORDER = "#C98E00";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.topArea}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Image
                    source={require("../../assets/SescSenac.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.form}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="email"
                        placeholderTextColor="#777"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <MaterialCommunityIcons name="message-processing-outline" size={20} color="#777" />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="senha"
                        placeholderTextColor="#777"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textInput}
                        secureTextEntry
                    />
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#777" />
                </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Options") }>
          <Text style={styles.primaryButtonText}>ENTRAR</Text>
        </TouchableOpacity>

                <View style={styles.links}>
                    <Text style={styles.linkText}>esqueci a senha</Text>
                    <Text style={[styles.linkText, { marginTop: 10 }]}>não tem conta?</Text>
                </View>
            </View>

            <Image
                source={require("../../assets/onda.png")}
                style={styles.wave}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topArea: {
        paddingTop: 24,
        paddingHorizontal: 16,
        alignItems: "center",
    },
    backBtn: {
        alignSelf: "flex-start",
        marginBottom: 8,
    },
    logo: {
        width: 220,
        height: 60,
    },
    form: {
        paddingHorizontal: 24,
        marginTop: 10,
        gap: 16,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        // shadow iOS
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        // elevation Android
        elevation: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 6,
        marginRight: 8,
        color: "#000",
    },
    primaryButton: {
        backgroundColor: YELLOW,
        borderColor: YELLOW_BORDER,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        paddingVertical: 12,
        marginTop: 4,
    },
    primaryButtonText: {
        fontSize: 16,
        color: "#111",
        letterSpacing: 1,
    },
    links: {
        marginTop: 12,
    },
    linkText: {
        color: BLUE,
        textDecorationLine: "underline",
    },
    wave: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "115%",
        height: 240,
    },
});
