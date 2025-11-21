import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      await AsyncStorage.setItem("authToken", data.token);
      router.replace("/(tabs)/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert("Erro", message);
    }
  };

  const handleCreateAccount = () => {
    router.replace("/create-account");
  };

  return (
    <View style={styles.container}>

      <Image source={require("../assets/images/logo_branca.png")} style={styles.logo} />

      <Text style={styles.title}>Login</Text>
      <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
      
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.or}>OU</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleCreateAccount}>
            <Text style={styles.secondaryButtonText}>Criar conta</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  or: {
    textAlign: "center",
    marginVertical: 8,
    color: "#666",
  },
  logo: {
    maxWidth: 150,
    maxHeight: 70,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 25,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  loginLink: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  loginText: {
    color: "#0066cc",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  primaryButton: {
    backgroundColor: "#0066cc",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    maxHeight: 48,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton:{
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
    maxHeight: 48,
  },
  secondaryButtonText: {
    color: "#333",
    fontWeight: "500",
  },
});