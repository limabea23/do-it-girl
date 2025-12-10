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
  ScrollView,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "expo-router";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";

const loginSchema = z.object({
  username: z.string().min(1, "Username é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    setErrors({});

    if (!username.trim() || !password.trim()) {
      window.alert("todos os campos são necessarios");
      return;
    }

    try {
      const validatedData = loginSchema.parse({
        username: username.trim(),
        password: password.trim(),
      });

      setLoading(true);
      try {
        const result = await signIn(validatedData.username, validatedData.password);

        if (!result.success) {
          window.alert(result.message || "Falha ao fazer login");
        }
      } catch (error) {
        window.alert("Falha ao fazer login");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);

        const firstError = Object.values(newErrors)[0];
        window.alert(firstError);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Image source={require("../../assets/public/Logo.png")} style={styles.image} />
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="insira sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#F79489"
            />
          </TouchableOpacity>
        </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F79489",
  },
  scrollContent: {
    flexGrow: 1,
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
    marginTop: -170,
    marginBottom: 0,
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
    fontWeight: "bold",
  },
  senha: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FADCD9",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#F79489",
  },
  eyeIcon: {
    padding: 15,
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
