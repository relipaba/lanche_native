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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

const BLUE = "#2E60AE";
const YELLOW = "#FFBF3C";
const YELLOW_BORDER = "#C98E00";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }
    try {
      setSubmitting(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert("Erro ao entrar", error.message);
        return;
      }
      // Entrar na aplicação principal (tabs) e limpar histórico
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigator", params: { screen: "Options" } }],
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
        <Image source={require("../../assets/SescSenac.png")} style={styles.logo} resizeMode="contain" />
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

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={submitting}>
          <Text style={styles.primaryButtonText}>{submitting ? "Entrando..." : "ENTRAR"}</Text>
        </TouchableOpacity>

        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword") }>
            <Text style={styles.linkText}>esqueci a senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro") }>
            <Text style={[styles.linkText, { marginTop: 10 }]}>não tem conta?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image source={require("../../assets/onda.png")} style={styles.wave} resizeMode="cover" />
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
    gap: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
    zIndex: 1,
  },
});

