import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

const BLUE = "#2E60AE";
const BLUE_LIGHT = "#4E7AD7";
const YELLOW = "#FFBF3C";
const YELLOW_BORDER = "#C98E00";

const KEY_NAME = "user_name";
// Não persistimos email localmente: vem do Supabase

export default function User({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [cep, setCep] = useState("");
  const [idade, setIdade] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [{ data: userData }] = await Promise.all([
          supabase.auth.getUser(),
        ]);
        const user = userData?.user;
        if (user?.email) setEmail(user.email);
        // nome salvo localmente por usuário (fallback quando perfil não existe)
        if (user?.id) {
          const localName = await AsyncStorage.getItem(`${KEY_NAME}:${user.id}`);
          if (localName) setName(localName);
        }

        if (user?.id) {
          const { data, error } = await supabase
            .from('perfil')
            .select('nome, cep, data_nascimento, cidade, estado, rua, bairro, complemento, sexo, telefone')
            .eq('id_user', user.id)
            .maybeSingle();
          if (!error && data) {
            setName(data.nome || "");
            setCep(data.cep || "");
            setIdade((data.data_nascimento ?? "").toString());
            setCidade(data.cidade || "");
            setEstado(data.estado || "");
            setRua(data.rua || "");
            setBairro(data.bairro || "");
            setComplemento(data.complemento || "");
            setSexo(data.sexo || "");
            setTelefone(data.telefone || "");
          }
        }
      } catch (_) {
        // silent
      }
    })();
  }, []);

  const onConfirm = async () => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData?.user?.id;
      if (uid) await AsyncStorage.setItem(`${KEY_NAME}:${uid}`, name || "");
      Alert.alert("Perfil salvo", "Suas informações foram atualizadas.");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar agora.");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      setLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Erro ao sair", error.message);
        return;
      }
      navigation.reset({ index: 0, routes: [{ name: "Initial" }] });
    } catch (err) {
      Alert.alert("Erro", "Não foi possível sair agora.");
    } finally {
      setLoggingOut(false);
    }
  };

  const onSaveProfile = async () => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user?.id) {
        Alert.alert("Atenção", "Você precisa estar logado para salvar o perfil.");
        return;
      }
      const payload = {
        id_user: user.id,
        nome: name || null,
        cep: cep || null,
        data_nascimento: idade || null,
        cidade: cidade || null,
        estado: estado || null,
        rua: rua || null,
        bairro: bairro || null,
        complemento: complemento || null,
        sexo: sexo || null,
        telefone: telefone || null,
      };
      const { error } = await supabase
        .from('perfil')
        .upsert(payload, { onConflict: 'id_user' });
      if (error) {
        Alert.alert("Erro", error.message || "Não foi possível salvar agora.");
        return;
      }
      const { data: userData2 } = await supabase.auth.getUser();
      const uid2 = userData2?.user?.id;
      if (uid2) await AsyncStorage.setItem(`${KEY_NAME}:${uid2}`, name || "");
      Alert.alert("Perfil salvo", "Suas informações foram atualizadas.");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar agora.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            if (navigation?.canGoBack?.()) navigation.goBack();
            else navigation.navigate("TabNavigator");
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Feather name="user" size={72} color="#000" />
          <Text style={styles.profileName}>{name || "nome"}</Text>
        </View>

        <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="nome completo"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="email"
            placeholderTextColor="#777"
            value={email}
            editable={false}
            style={[styles.textInput, { color: '#666' }]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="CEP"
            placeholderTextColor="#777"
            value={cep}
            onChangeText={setCep}
            style={styles.textInput}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Idade"
            placeholderTextColor="#777"
            value={idade}
            onChangeText={setIdade}
            style={styles.textInput}
            keyboardType="number-pad"
            maxLength={3}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Cidade"
            placeholderTextColor="#777"
            value={cidade}
            onChangeText={setCidade}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Estado"
            placeholderTextColor="#777"
            value={estado}
            onChangeText={setEstado}
            style={styles.textInput}
            autoCapitalize="characters"
            maxLength={2}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Rua"
            placeholderTextColor="#777"
            value={rua}
            onChangeText={setRua}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Bairro"
            placeholderTextColor="#777"
            value={bairro}
            onChangeText={setBairro}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Complemento"
            placeholderTextColor="#777"
            value={complemento}
            onChangeText={setComplemento}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Sexo"
            placeholderTextColor="#777"
            value={sexo}
            onChangeText={setSexo}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Telefone"
            placeholderTextColor="#777"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.textInput}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onSaveProfile} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? "SALVANDO..." : "CONFIRMAR"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout} disabled={loggingOut}>
          <Text style={styles.logoutButtonText}>{loggingOut ? "SAINDO..." : "SAIR"}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("Historico") }>
          <Text style={styles.historyLink}>Ver historico de compras</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>

      <Image source={require("../../assets/onda.png")} style={styles.wave} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  backBtn: {
    alignSelf: "flex-start",
    padding: 6,
    zIndex: 20,
  },
  profileCard: {
    alignItems: "center",
    marginTop: 6,
  },
  profileName: {
    marginTop: 6,
    color: "#000",
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 10,
    gap: 12,
  },
  scrollContent: {
    paddingBottom: 280,
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
  historyLink: {
    color: BLUE,
    textDecorationLine: "underline",
    alignSelf: "flex-start",
    marginLeft: 6,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: YELLOW,
    borderColor: YELLOW_BORDER,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    color: "#111",
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderColor: "#E64545",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#E64545",
    letterSpacing: 1,
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
