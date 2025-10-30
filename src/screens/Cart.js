import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCart, formatBRL } from "../context/CartContext";
import { addOrder } from "../storage/history";
import { supabase } from "../../lib/supabase";

const BLUE_TOP = "#4E7AD7";
const BLUE_BOTTOM = "#274A92";

export default function Cart({ navigation }) {
  const { items, removeItem, total, clearCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.id)}>
        <MaterialIcons name="remove-circle" size={28} color="#E64545" />
      </TouchableOpacity>
      <Image source={item.image || require("../../assets/icon.png")} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.priceLabel}  x{item.qty}</Text>
      </View>
    </View>
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

      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Seu carrinho está vazio.</Text>}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalBar}>
        <Text style={styles.totalText}>total : {formatBRL(total)}</Text>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={async () => {
            if (!items.length) return;
            try {
              // 1) autenticação
              const { data: auth } = await supabase.auth.getUser();
              const userId = auth?.user?.id;
              if (!userId) {
                Alert.alert("Faça login", "Entre para confirmar o pedido.");
                return;
              }

              // 2) descobre lanchonete a partir do item
              const lanchoneteId = items[0]?.lanchoneteId ?? null;
              if (!lanchoneteId) {
                Alert.alert("Seleção necessária", "Não foi possível identificar a lanchonete.");
                return;
              }

              // 3) cria registro em 'pedido'
              const { data: pedidoRow, error: pedError } = await supabase
                .from("pedido")
                .insert({
                  id_lanchonete: lanchoneteId,
                  id_user_cliente: userId,
                  status_pedido: "confirmado",
                  valor_total: total,
                })
                .select("id_pedido, created_at")
                .single();
              if (pedError) throw pedError;

              // 4) cria os itens do pedido
              const idPedido = pedidoRow?.id_pedido;
              const itensRows = items.map((it) => ({
                id_pedido: idPedido,
                id_produto: Number(it.id),
                quantidade: it.qty,
                preco_unitario: it.price,
              }));
              const { error: itensError } = await supabase.from("itens_pedido").insert(itensRows);
              if (itensError) throw itensError;

              // 5) mantém histórico local para tela de Histórico
              const now = new Date();
              const order = {
                id: String(idPedido ?? now.getTime()),
                date: now.toISOString(),
                total,
                items: items.map((it) => ({
                  id: it.id,
                  name: it.name,
                  qty: it.qty,
                  price: it.price,
                  priceLabel: it.priceLabel,
                  image: it.image,
                })),
              };
              await addOrder(order);
              clearCart();
              Alert.alert("Pedido confirmado", "Seu pedido foi salvo com sucesso.");
              navigation?.navigate?.("Historico");
            } catch (e) {
              Alert.alert("Erro", String(e?.message || "Não foi possível confirmar o pedido."));
            }
          }}
        >
          <Text style={styles.confirmText}>CONFIRMAR</Text>
        </TouchableOpacity>
      </View>
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
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 140,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  removeBtn: {
    marginRight: 6,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  info: { flex: 1 },
  name: { color: "#222" },
  price: { color: "#666", marginTop: 2 },
  empty: { textAlign: "center", color: "#555", marginTop: 16 },
  totalBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 18,
    backgroundColor: BLUE_TOP,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  totalText: {
    color: "#fff",
    marginBottom: 8,
  },
  confirmBtn: {
    alignSelf: "center",
    backgroundColor: "#FFBF3C",
    borderColor: "#C98E00",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  confirmText: {
    color: "#111",
    letterSpacing: 1,
  },
});
