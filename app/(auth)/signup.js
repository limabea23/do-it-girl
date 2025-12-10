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

const registerSchema = z.object({
  username: z.string().min(1, "O username é obrigatório"),
  email: z.string().min(1, "O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Campo confirmar senha obrigatório"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { signUp } = useAuth();

  const handleRegister = async () => {
    setErrors({});

    try {
      const validatedData = registerSchema.parse({
        username,
        email,
        password,
        confirmPassword,
      });

      setLoading(true);
      try {
        const result = await signUp(validatedData.username, validatedData.email, validatedData.password);

        if (!result.success) {
          window.alert(result.message || "Falha ao criar conta");
        }
      } catch (error) {
        window.alert("Falha ao criar conta");
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

        const allEmpty = !username && !email && !password && !confirmPassword;
        
        if (allEmpty) {
          window.alert("Todos os campos são obrigatórios");
        } else {
          const firstError = Object.values(newErrors)[0];
          window.alert(firstError);
        }
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
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Entre para o Do It, Girl!</Text>

          <Text style={styles.label}>username:</Text>
          <TextInput
            style={styles.input}
            placeholder="insira seu username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
            editable={!loading}
          />

          <Text style={styles.label}>email:</Text>
          <TextInput
            style={styles.input}
            placeholder="insira seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <Text style={styles.label}>senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="insira sua senha (mínimo 6 caracteres)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={styles.label}>confirmar senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="confirme sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>já possui conta?</Text>
          </View>

          <Link href="/(auth)/signin" asChild>
            <TouchableOpacity
              style={styles.signinButton}
              disabled={loading}
            >
              <Text style={styles.signinButtonText}>Entrar</Text>
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
  label: {
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
    borderColor: "#ddd",
    color: "#F79489",
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
  signinButton: {
    backgroundColor: "#FADCD9",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    width: 150,
    alignSelf: "center",
  },
  signinButtonText: {
    color: "#F79489",
    fontSize: 15,
    fontWeight: "bold",
  },
});
