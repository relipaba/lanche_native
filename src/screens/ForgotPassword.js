import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const YELLOW = "#FFBF3C";
const YELLOW_BORDER = "#C98E00";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          style={styles.backBtn}
          onPress={() => {
            if (navigation?.canGoBack?.()) navigation.goBack();
            else navigation.navigate("Login");
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.info}>para recuperar sua senha,
informe seu email</Text>

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

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("ForgotCode", { email })}
        >
          <Text style={styles.primaryButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../assets/onda.png")}
        style={styles.wave}
        resizeMode="cover"
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 8,
    padding: 6,
    marginTop: 8,
    zIndex: 20,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 16,
  },
  info: {
    textAlign: "center",
    color: "#000",
  },
  inputWrapper: {
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
    alignSelf: "center",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    color: "#111",
    letterSpacing: 1,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "115%",
    height: 240,
    zIndex: 1,
  },
});
