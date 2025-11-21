// app/register.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error("Registration failed");

      Alert.alert("Sucesso", "Conta criada! Faça o login.");
      router.replace("/login");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : String(err) || "Erro desconhecido";
      Alert.alert("Erro", errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google login não implementado");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Crie a sua conta</Text>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.loginLink}>
          Já tem uma conta? <Text style={styles.loginText}>Log in</Text>
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

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

      <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.primaryButtonText}>Criar conta</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OU</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleText}>Continuar com Google</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        Ao criar uma conta, você concorda com os{" "}
        <Text style={styles.link}>Termos de Serviço</Text> e{" "}
        <Text style={styles.link}>Política de Privacidade</Text> do qrpush.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    maxWidth: 150,
    maxHeight: 70,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 25,
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
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  or: {
    textAlign: "center",
    marginVertical: 8,
    color: "#666",
  },
  googleButton: {
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  googleText: {
    color: "#333",
    fontWeight: "500",
  },
  terms: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
  link: {
    textDecorationLine: "underline",
    color: "#0066cc",
  },
});
