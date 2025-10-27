import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

export default function Details({ route, navigation }) {
    const { product } = route.params || {};
    const name = product?.name || "Produto";
    const price = product?.price || "R$ 0,00";
    const description = product?.description || "Descrição não informada.";
    const image = product?.image || require("../../assets/icon.png");

    const [qty, setQty] = useState(1);
    const { addItem } = useCart();

    const inc = () => setQty((q) => q + 1);
    const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <Image source={image} style={styles.hero} resizeMode="cover" />

            <View style={styles.content}>
                <Text style={styles.label}>NOME PRODUTO:</Text>
                <Text style={styles.value}>{name}</Text>

                <Text style={[styles.label, { marginTop: 8 }]}>PREÇO PRODUTO:</Text>
                <Text style={styles.value}>{price}</Text>

                <Text style={[styles.label, { marginTop: 8 }]}>DESC PRODUTO:</Text>
                <Text style={styles.value}>{description}</Text>

                <View style={styles.qtyRow}>
                    <Text style={styles.label}>QUANTIDADE:</Text>
                    <View style={styles.qtyControls}>
                        <TouchableOpacity onPress={inc} style={styles.qtyBtn}>
                            <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{qty}</Text>
                        <TouchableOpacity onPress={dec} style={styles.qtyBtn}>
                            <Text style={styles.qtyBtnText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                        addItem(product, qty);
                        navigation.navigate("TabNavigator", { screen: "Cart" });
                    }}
                >
                    <Text style={styles.addBtnText}>ADICIONAR</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingTop: 24,
        paddingHorizontal: 12,
    },
    backBtn: {
        alignSelf: "flex-start",
    },
    hero: {
        width: "100%",
        height: 180,
        backgroundColor: "#eee",
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 12,
        gap: 2,
    },
    label: {
        color: "#222",
        fontWeight: "600",
    },
    value: {
        color: "#444",
    },
    qtyRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 10,
    },
    qtyControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    qtyBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    qtyBtnText: {
        fontSize: 18,
        color: "#000",
    },
    qtyValue: {
        width: 20,
        textAlign: "center",
        color: "#000",
    },
    addBtn: {
        alignSelf: "center",
        marginTop: 6,
        backgroundColor: "#FFBF3C",
        borderColor: "#C98E00",
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    addBtnText: {
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
