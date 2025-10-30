import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { listOrders } from "../storage/history";
import { formatBRL } from "../context/CartContext";
import { useFocusEffect } from "@react-navigation/native";

const PAGE_SIZE = 10;

export default function Historico({ navigation }) {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]); // pagina atual
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            let mounted = true;
      (async () => {
        const data = await listOrders();
        if (!mounted) return;
        setAllOrders(data);
        setOrders(data.slice(0, PAGE_SIZE));
      })();
      return () => {
        mounted = false;
      };
    }, [])
  );

  const loadMore = () => {
    if (loadingMore) return;
    if (orders.length >= allOrders.length) return;
    setLoadingMore(true);
    const next = allOrders.slice(orders.length, orders.length + PAGE_SIZE);
    setOrders((prev) => [...prev, ...next]);
    setLoadingMore(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await listOrders();
    setAllOrders(data);
    setOrders(data.slice(0, PAGE_SIZE));
    setRefreshing(false);
  };

    const renderItem = ({ item, index }) => {
        const qtySum = item.items?.reduce((s, it) => s + (it.qty || 0), 0) || 0;
        const names = (item.items || [])
            .map((it) => `${it.qty || 1}x ${it.name || "Produto"}`)
            .join(", ");
        const date = new Date(item.date || Date.now());
        const dateLabel = toBRDate(date);
        const thumbSource = item.items?.[0]?.image || require("../../assets/icon.png");
        return (
            <View style={[styles.card, index === 0 && styles.cardActive]}>
                <View style={styles.left}>
                    <Text style={styles.qty}>{qtySum}</Text>
                    <Image source={thumbSource} style={styles.thumb} />
                </View>
                <View style={styles.right}>
                    <Text style={styles.total}>{formatBRL(item.total || 0)}</Text>
                    <Text style={styles.items} numberOfLines={2} ellipsizeMode="tail">{names}</Text>
                    <Text style={styles.date}>{dateLabel}</Text>
                </View>
            </View>
        );
    };

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
            </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={orders}
        keyExtractor={(o, i) => o.id || String(i)}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Sem compras por enquanto.</Text>}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={
          orders.length > 0 && orders.length < allOrders.length ? (
            <View style={styles.footer}>
              {loadingMore ? (
                <ActivityIndicator color="#2E60AE" />
              ) : (
                <Text style={styles.footerText}>Carregando mais...</Text>
              )}
            </View>
          ) : null
        }
      />

            <Image source={require("../../assets/onda.png")} style={styles.wave} resizeMode="cover" />
        </View>
    );
}

function toBRDate(d) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { paddingTop: 24, paddingHorizontal: 12 },
    backBtn: { alignSelf: "flex-start", padding: 6, marginTop: 8, zIndex: 20 },
    listContent: { paddingHorizontal: 20, paddingBottom: 140, gap: 12 },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    cardActive: { borderWidth: 1, borderColor: "#2E60AE" },
    left: { flexDirection: "row", alignItems: "center", gap: 10 },
    qty: { color: "#222" },
    thumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#eee" },
    right: { alignItems: "flex-end" },
    total: { color: "#222" },
    items: { color: "#444", marginTop: 2, textAlign: "right", maxWidth: 220 },
    date: { color: "#666", marginTop: 2 },
    empty: { textAlign: "center", color: "#555", marginTop: 16 },
    wave: { position: "absolute", bottom: 0, right: 0, width: "115%", height: 240, zIndex: -1 },
});
