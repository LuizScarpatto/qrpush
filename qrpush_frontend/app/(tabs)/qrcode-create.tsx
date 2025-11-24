import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet
} from "react-native";
import { apiFetch } from "../../httphelper/api";
import Toast from "react-native-toast-message";

export default function QrCodeCreate() {
  const [url, setUrl] = useState("");

  const handleGenerate = async () => {
  if (!url.trim()) {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: "Digite uma URL válida.",
      position: "bottom",
    });
    return;
  }

  try {
    const data = await apiFetch("/qrcode/create", {
      method: "POST",
      body: JSON.stringify({ url }),
    });

    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: "QR Code gerado com sucesso!" + (data?.shortUrl ? ` URL: ${data.shortUrl}` : ""),
      position: "bottom",
    });

    console.log("QRCode:", data);

  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: err instanceof Error ? err.message : "Erro desconhecido",
      position: "bottom",
    });
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
