import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(username, password);

      if (!result.success) {
        Alert.alert("Erro", result.message || "Falha ao fazer login");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Image source={require("../../assets/images/Logo.png")} style={styles.image} />
        <Text style={styles.title}>Bem-vindo ao Do It, Girl!</Text>
        <Text style={styles.subtitle}>Acesse sua conta para continuar       </Text>
        <Text style={styles.username}>username:</Text>
        <TextInput
          style={styles.input}
          placeholder="insira seu username"
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <Text style={styles.senha}>senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="insira sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>ainda não é cadastrado?</Text>
        </View>
        
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity 
            style={styles.signupButton}
            disabled={loading}
          >
            <Text style={styles.signupButtonText}>Cadastre-se</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F79489",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  username: {
    fontSize: 16,
    color: "#fff",
  },
  senha: {
    fontSize: 16,
    color: "#fff",
  },
  input: {
    backgroundColor: "#FADCD9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    color: "#F79489",
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#FADCD9",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    width: 150,
    alignSelf: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    backgroundColor: "#FADCD9",
    color: "#F79489",
    fontSize: 15,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#ffffffff",
    fontSize: 14,
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "#FADCD9",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    width: 150,
    alignSelf: "center",
  },
  signupButtonText: {
    color: "#F79489",
    fontSize: 15,
    fontWeight: "bold",
  },
});
