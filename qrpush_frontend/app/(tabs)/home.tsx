import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

export default function HomeScreen() {
  const [url, setUrl] = useState("");

  const handleGenerate = () => {
    if (!url) {
      Alert.alert("Erro", "Por favor, insira uma URL.");
      return;
    }
    Alert.alert("QR Code gerado!", `Destino: ${url}`);
    // TODO: integrate with QR code generation logic
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.icon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>❓</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title & Promo */}
      <Text style={styles.title}>Sua Plataforma de QR Codes</Text>
      <Text style={styles.subtitle}>
        Tenha QR Codes customizáveis e um domínio complementar
      </Text>
      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeText}>Upgrade no Plano</Text>
      </TouchableOpacity>

      {/* Quick Creation */}
      <Text style={styles.sectionTitle}>Criação rápida</Text>
      <Text style={styles.info}>Você pode criar mais 50 QR Codes esse mês!</Text>
      <Text style={styles.domain}>Domínio: qrpush.com</Text>

      <TextInput
        style={styles.input}
        placeholder="Entre a URL de destino"
        placeholderTextColor="#999"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
        <Text style={styles.generateText}>Gerar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  upgradeText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  domain: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  generateButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  generateText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
