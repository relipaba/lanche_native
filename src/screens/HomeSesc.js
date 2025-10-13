import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const BLUE_TOP = "#4E7AD7";
const PANEL_BG = "#FFFFFF";

const ITEMS = [
  { id: "1", name: "brownie", price: "R$ 2,35" },
  { id: "2", name: "pastel", price: "R$ 10,00" },
  { id: "3", name: "sucos", price: "R$ 6,35" },
  { id: "4", name: "croissant", price: "R$ 12,00" },
  { id: "5", name: "agua mineral", price: "R$ 3,35" },
  { id: "6", name: "bolinhos", price: "R$ 8,50" },
  { id: "7", name: "torta doce", price: "R$ 9,50" },
  { id: "8", name: "brigadeiro", price: "R$ 4,50" },
  { id: "9", name: "calzone", price: "R$ 11,90" },
  { id: "10", name: "coxinha", price: "R$ 13,50" },
  { id: "11", name: "cafe", price: "R$ 4,00" },
  { id: "12", name: "achocolatado", price: "R$ 10,55" },
];

export default function HomeSesc({ navigation }) {
  const [showFilter, setShowFilter] = useState(false);
  const [filterKey, setFilterKey] = useState(null); // 'bebidas' | 'salgados' | 'doces' | 'vegetariano'

  const data = useMemo(() => {
    if (!filterKey) return ITEMS;
    return ITEMS.filter((it) => belongsToCategory(it.name, filterKey));
  }, [filterKey]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("Details", {
          product: {
            name: item.name,
            price: item.price,
            description: getDescription(item.name),
            image: require("../../assets/icon.png"),
          },
        })
      }
    >
      <Image
        source={require("../../assets/icon.png")}
        style={styles.cardThumb}
        resizeMode="cover"
      />
      <View style={styles.cardInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={require("../../assets/Sesc.png")} style={styles.brand} resizeMode="contain" />
      </View>

      <View style={styles.titlePill}>
        <Text style={styles.titleText}>CARDAPIO SESC</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(true)}>
        <Feather name="filter" size={16} color="#000" />
        <Text style={styles.filterText}>FILTRAR</Text>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <Feather name="file-text" size={22} color="#000" />
        <Feather name="shopping-bag" size={22} color="#000" />
        <Feather name="user" size={22} color="#000" />
      </View>

      {showFilter && (
        <View style={styles.overlay}>
          <View style={styles.filterPanel}>
            <View style={styles.filterHeader}>
              <TouchableOpacity onPress={() => setShowFilter(false)} style={styles.backBtn}>
                <MaterialIcons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Image source={require("../../assets/Sesc.png")} style={styles.brandLarge} resizeMode="contain" />
            </View>
            <View style={styles.titlePill}>
              <Text style={styles.titleText}>OPCOES</Text>
            </View>

            <View style={styles.optionsList}>
              {[
                { key: "bebidas", label: "Bebidas" },
                { key: "salgados", label: "Salgados" },
                { key: "doces", label: "Doces" },
                { key: "vegetariano", label: "Vegetariano" },
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={styles.optBtn}
                  onPress={() => {
                    setFilterKey(opt.key);
                    setShowFilter(false);
                  }}
                >
                  <Text style={styles.optText}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.historyLink}>Ver historico de compras</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

function getDescription(name) {
  const map = {
    brownie: "Bolo de chocolate denso com cobertura crocante.",
    pastel: "Massa crocante recheada, frita na hora.",
    sucos: "Sucos naturais variados, geladinhos.",
    croissant: "Folhado amanteigado, leve e macio.",
    "agua mineral": "Água mineral gelada, 500ml.",
    bolinhos: "Bolinhos salgados variados da casa.",
    "torta doce": "Fatia de torta doce do dia.",
    brigadeiro: "Clássico brigadeiro de chocolate com granulado.",
    calzone: "Massa assada recheada com queijo e presunto.",
    coxinha: "Coxinha crocante com frango cremoso.",
    cafe: "Café passado na hora, 200ml.",
    achocolatado: "Bebida láctea com chocolate, 300ml.",
  };
  return map[name] || "Item delicioso preparado na hora.";
}

function belongsToCategory(name, filter) {
  const categorias = {
    bebidas: ["sucos", "agua mineral", "cafe", "achocolatado"],
    salgados: ["pastel", "croissant", "bolinhos", "calzone", "coxinha"],
    doces: ["brownie", "torta doce", "brigadeiro"],
    vegetariano: [
      "sucos",
      "agua mineral",
      "croissant",
      "brigadeiro",
      "torta doce",
      "brownie",
    ],
  };
  const list = categorias[filter] || [];
  return list.includes(name);
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
    marginBottom: 4,
  },
  brand: {
    width: 60,
    height: 24,
    alignSelf: "flex-end",
    marginTop: -24,
    marginRight: 8,
  },
  titlePill: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  titleText: {
    color: "#333",
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 90,
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PANEL_BG,
    borderRadius: 10,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  itemName: {
    color: "#222",
    marginBottom: 2,
  },
  itemPrice: {
    color: "#666",
  },
  filterButton: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  filterText: {
    color: "#000",
  },
  bottomBar: {
    position: "absolute",
    bottom: 16,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    padding: 12,
  },
  filterPanel: {
    backgroundColor: PANEL_BG,
    borderRadius: 18,
    paddingBottom: 16,
    overflow: "hidden",
  },
  filterHeader: {
    paddingTop: 16,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  brandLarge: {
    width: 68,
    height: 28,
    alignSelf: "flex-end",
    marginTop: -24,
    marginRight: 8,
  },
  optionsList: {
    paddingHorizontal: 18,
    marginTop: 14,
    gap: 14,
  },
  optBtn: {
    backgroundColor: "#FFBF3C",
    borderColor: "#C98E00",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 12,
  },
  optText: {
    color: "#111",
  },
  historyLink: {
    textAlign: "center",
    color: BLUE_TOP,
    marginTop: 6,
    textDecorationLine: "underline",
  },
});
