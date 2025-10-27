import AsyncStorage from "@react-native-async-storage/async-storage";

export const HISTORY_KEY = "order_history_v1";

export async function addOrder(order) {
  const list = await listOrders();
  list.unshift(order); // mais recente primeiro
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(list));
}

export async function listOrders() {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function clearHistory() {
  await AsyncStorage.removeItem(HISTORY_KEY);
}

