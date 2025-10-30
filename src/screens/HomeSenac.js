import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";


const BLUE_TOP = "#4E7AD7";
const PANEL_BG = "#FFFFFF";

// Produtos virão do Supabase; sem mocks locais

function formatPrice(value) {
  if (value == null) return "R$ 0,00";
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(num)) return `R$ ${value}`;
  return `R$ ${num.toFixed(2).replace(".", ",")}`;
}

export default function HomeSenac({ navigation }) {
  const [showFilter, setShowFilter] = useState(false);
  const [filterKey, setFilterKey] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("produto")
        .select("id_produto, nome_produto, descricao, preco, categoria, img")
        .limit(100);
      if (!isMounted) return;
      if (error) {
        console.error("Erro ao carregar produtos (SENAC):", error);
        setLoadError(error.message);
        setProducts([]);
      } else {
        const normalized = (data || []).map((p) => ({
          id: String(p.id_produto),
          name: p.nome_produto,
          price: formatPrice(p.preco),
          descricao: p.descricao || "",
          categoria: p.categoria || "",
          image: p.img ? { uri: p.img } : null,
        }));
        setProducts(normalized);
      }
      setLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  

  const data = useMemo(() => {
    if (!filterKey) return products;
    return products.filter((it) => belongsToCategory(it.categoria, filterKey));
  }, [filterKey, products]);

  const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
                navigation.navigate("Details", {
                    product: {
                        // envia os dados necessários para o carrinho/salvar pedido
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        description: item.descricao || getDescription(item.name),
                        image: item.image || require("../../assets/icon.png"),
                        lanchoneteId: 7, // SENAC (id_lanchonete)
                    },
                })
            }
        >
            <Image
                source={item.image || require("../../assets/icon.png")}
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
                <TouchableOpacity
                  hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                  onPress={() => {
                    if (navigation?.canGoBack?.()) navigation.goBack();
                    else navigation.navigate("TabNavigator");
                  }}
                  style={styles.backBtn}
                >
                  <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Image source={require("../../assets/Senac.png")} style={styles.brand} resizeMode="contain" />
            </View>

            <View style={styles.titlePill}>
                <Text style={styles.titleText}>CARDAPIO SENAC</Text>
            </View>

      {loading ? (
        <View style={{ paddingTop: 24, alignItems: "center" }}>
          <ActivityIndicator color="#000" />
          <Text style={{ marginTop: 8, color: "#000" }}>Carregando...</Text>
        </View>
      ) : loadError ? (
        <Text style={{ textAlign: "center", color: "#c00", marginTop: 12 }}>
          Erro: {loadError}
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={data}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", color: "#333" }}>
              Nenhum produto encontrado
            </Text>
          )}
        />
      )}

      <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(true)}>
        <Feather name="filter" size={16} color="#000" />
        <Text style={styles.filterText}>FILTRAR</Text>
      </TouchableOpacity>

      {/* bottom bar removido — usa o TabNavigator real */}

      {showFilter && (
        <View style={styles.overlay}>
          <View style={styles.filterPanel}>
            <View style={styles.filterHeader}>
              <TouchableOpacity onPress={() => setShowFilter(false)} style={styles.backBtn}>
                <MaterialIcons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Image source={require("../../assets/Senac.png")} style={styles.brandLarge} resizeMode="contain" />
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
      <Image
        source={require("../../assets/onda.png")}
        style={styles.wave}
        resizeMode="cover"
      />
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

function belongsToCategory(category, filter) {
  const normalize = (s) => {
    if (!s) return "";
    let v = String(s).toLowerCase().trim();
    v = v
      .replace(/[áàâã]/g, "a")
      .replace(/[éèê]/g, "e")
      .replace(/[íìî]/g, "i")
      .replace(/[óòôõ]/g, "o")
      .replace(/[úùû]/g, "u")
      .replace(/ç/g, "c");
    if (v.endsWith("s")) v = v.slice(0, -1);
    return v;
  };

  const key = normalize(filter);
  const cat = normalize(category);
  const aliases = {
    bebida: ["bebida", "drink"],
    salgado: ["salgado"],
    doce: ["doce", "sobremesa"],
    vegetariano: ["vegetariano", "veg", "veggie"],
  };
  const target = aliases[key] || [];
  return target.includes(cat);
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
        padding: 6,
        marginTop: 8,
        zIndex: 20,
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
  // bottomBar removido
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
  wave: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "115%",
    height: 240,
    zIndex: -1,
  },
});
