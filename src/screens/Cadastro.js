import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BLUE = "#2E60AE";
const YELLOW = "#FFBF3C";
const YELLOW_BORDER = "#C98E00";

export default function Cadastro({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

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
                        placeholder="nome completo"
                        placeholderTextColor="#777"
                        value={name}
                        onChangeText={setName}
                        style={styles.textInput}
                    />
                </View>

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
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="confirmar senha"
                        placeholderTextColor="#777"
                        value={confirm}
                        onChangeText={setConfirm}
                        style={styles.textInput}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Options")}>
                    <Text style={styles.primaryButtonText}>CADASTRAR</Text>
                </TouchableOpacity>
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
        gap: 14,
    },
    inputWrapper: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        // iOS shadow
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        // Android elevation
        elevation: 4,
    },
    textInput: {
        fontSize: 16,
        color: "#000",
        paddingVertical: 6,
    },
    primaryButton: {
        backgroundColor: YELLOW,
        borderColor: YELLOW_BORDER,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        paddingVertical: 12,
        marginTop: 6,
    },
    primaryButtonText: {
        fontSize: 16,
        color: "#111",
        letterSpacing: 1,
    },
    wave: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "115%",
        height: 240,
    },
});
