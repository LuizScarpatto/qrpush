import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";

export default function QrCodeCreate() {
  const [url, setUrl] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) {
      Alert.alert("Erro", "Digite uma URL válida.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/qrcode/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      if (!res.ok) throw new Error("Falha ao gerar QR Code");

      const data = await res.json();

      Alert.alert("Sucesso", "QR Code gerado com sucesso!");

      console.log("QRCode:", data);

    } catch (err) {
      Alert.alert("Erro", err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criação Rápida</Text>

      <Text style={styles.label}>Entre a URL de destino</Text>
      <TextInput
        style={styles.input}
        placeholder="https://exemplo.com"
        placeholderTextColor="#999"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  label: {
    marginBottom: 8,
    color: "#444",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
