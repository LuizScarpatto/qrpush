import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { apiFetch } from "../../httphelper/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalScreen from "../qrCodeModal";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  type QRCode = { id: number; url: string };
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [qrcodes, setQrcodes] = useState<QRCode[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleGenerate = () => {
    router.replace("/qrcode-create");
  };
  useEffect(() => {
    const loadUserId = async () => {
      const userid = await AsyncStorage.getItem("userId");
      setUserId(userid);
      const token = await AsyncStorage.getItem("authToken");
      setAuthToken(token);
    };
    loadUserId();
  }, []);

  useEffect(() => {
  const fetchQRCodes = async () => {
    if (userId == null) {
      setQrcodes([]);
      return;
    }

    try {
      const data: QRCode[] = await apiFetch(`/qrcode/qrcodes/${userId}`);
      setQrcodes(data);
      Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "QR Code gerado com sucesso!",
            position: "bottom",
          });
    } catch (err) {
      Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Erro ao recuperar qrcodes.",
            position: "bottom",
          });
    }
  };

  fetchQRCodes();
}, [userId]);


  const renderItem = ({ item }: { item: QRCode }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => {
          setSelectedId(item.id);
          setModalVisible(true);
        }}
      >
        <Text style={styles.idText}>ID: {item.id}</Text>
        <Text style={styles.urlText}>URL: {item.url}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo_branca.png")}
            style={styles.logo}
          />
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <FontAwesome name="search" size={30} color="dimgray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="question-circle" size={30} color="dimgray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="user-circle" size={30} color="dimgray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
      </View>

      <Text style={styles.title}>Sua Plataforma de QR Codes</Text>
      <Text style={styles.subtitle}>
        Tenha QR Codes customizáveis e um domínio complementar
      </Text>
      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeText}>Upgrade no Plano</Text>
      </TouchableOpacity>

      <View style={styles.container2}>
        <Text style={styles.sectionTitle}>Meus QR Codes</Text>
        <View style={styles.separator} />

        <FlatList
          data={qrcodes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          extraData={selectedId}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
              Nenhum QR Code encontrado
            </Text>
          }
        />
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
        <Text style={styles.generateText}>Gerar Novo QR Code</Text>
      </TouchableOpacity>
      
      <ModalScreen
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          qrId={selectedId}
          token={authToken || ""}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 30, backgroundColor: "#fff" },
  container2: { flex: 1, padding: 24, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: { maxHeight: 60, resizeMode: "contain" },
  headerIcons: { flexDirection: "row", gap: 25 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4, color: "#333" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  upgradeButton: {
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 24,
  },
  upgradeText: { color: "#fff", fontWeight: "600" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#333" },
  generateButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  generateText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  separator: { height: 1, backgroundColor: "#ccc", marginHorizontal: -24 },
  item: { padding: 12, marginVertical: 6, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  selectedItem: { backgroundColor: "#d0ebff", borderColor: "#3399ff" },
  idText: { fontWeight: "bold", color: "#333" },
  urlText: { color: "#555" },
});
