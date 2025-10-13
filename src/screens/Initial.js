import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Initial({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoCard}>
          <Image
            source={require("../../assets/SescSenac.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>LANCHONETE</Text>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Cadastro")}
        >
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

const BLUE = "#2E60AE";
const BLUE_LIGHT = "#4E7AD7";
const YELLOW = "#FFBF3C";
const YELLOW_BORDER = "#C98E00";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: BLUE,
    paddingTop: 24,
    paddingBottom: 26,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 270,
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // Elevation for Android
    elevation: 4,
  },
  logo: {
    width: 240,
    height: 70,
  },
  tag: {
    position: "absolute",
    bottom: -16,
    backgroundColor: BLUE_LIGHT,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignSelf: "center",
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 14,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingTop: 32,
  },
  primaryButton: {
    backgroundColor: YELLOW,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: YELLOW_BORDER,
    paddingVertical: 12,
    width: "70%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#111",
    fontSize: 16,
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
