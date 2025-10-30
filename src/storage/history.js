import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabase";

// chave base; o histórico fica por usuário
export const HISTORY_KEY = "order_history_v1";

async function keyForCurrentUser() {
  try {
    const { data } = await supabase.auth.getUser();
    const uid = data?.user?.id || "guest";
    return `${HISTORY_KEY}:${uid}`;
  } catch {
    return `${HISTORY_KEY}:guest`;
  }
}

export async function addOrder(order) {
  const key = await keyForCurrentUser();
  const list = await listOrders();
  list.unshift(order); // mais recente primeiro
  await AsyncStorage.setItem(key, JSON.stringify(list));
}

export async function listOrders() {
  try {
    const key = await keyForCurrentUser();
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function clearHistory() {
  const key = await keyForCurrentUser();
  await AsyncStorage.removeItem(key);
}
