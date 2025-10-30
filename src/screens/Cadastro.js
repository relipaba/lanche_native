import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

const BLUE = "#2E60AE";
const YELLOW = "#FFBF3C";
const YELLOW_BORDER = "#C98E00";

export default function Cadastro({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirm) {
            Alert.alert("Atenção", "Preencha todos os campos.");
            return;
        }
        if (password !== confirm) {
            Alert.alert("Atenção", "As senhas não coincidem.");
            return;
        }
        try {
            setSubmitting(true);
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { nome: name },
                },
            });
            if (error) {
                Alert.alert("Erro ao cadastrar", error.message);
                return;
            }
            // Cria/atualiza perfil imediatamente quando houver sessão ativa
            try {
                const userId = data?.user?.id;
                const hasSession = !!data?.session;
                if (userId && hasSession) {
                    const { error: upsertErr } = await supabase
                        .from('perfil')
                        .upsert({ id_user: userId, nome: name || null }, { onConflict: 'id_user' });
                    if (upsertErr) {
                        console.warn('Falha ao criar perfil:', upsertErr);
                    }
                }
            } catch (e) {
                console.warn('Erro ao preparar perfil:', e);
            }
            // Dependendo das configurações do Supabase, pode exigir verificação por e-mail.
            Alert.alert(
                "Sucesso",
                data?.user?.identities?.length === 0
                    ? "E-mail já cadastrado."
                    : "Cadastro realizado. Verifique seu e-mail, se necessário."
            );
            navigation.reset({
              index: 0,
              routes: [
                { name: "TabNavigator", params: { screen: "Options" } }
              ],
            });
        } catch (e) {
            Alert.alert("Erro inesperado", String(e?.message || e));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topArea}>
                <TouchableOpacity
                  hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                  style={styles.backBtn}
                  onPress={() => {
                    if (navigation?.canGoBack?.()) navigation.goBack();
                    else navigation.navigate("Initial");
                  }}
                >
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

                <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp} disabled={submitting}>
                    <Text style={styles.primaryButtonText}>{submitting ? "Cadastrando..." : "CADASTRAR"}</Text>
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
        padding: 6,
        marginTop: 8,
        zIndex: 20,
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
    zIndex: 1,
  },
});
