import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image style={styles.pic} source={require('../../assets/public/padraoperfil.jpg')} />
        </View>

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>editar perfil</Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>ID do Usuário</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Membro desde</Text>
          <Text style={styles.infoValue}>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("pt-BR")
              : "N/A"}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🔒 sair da Conta</Text>
        </TouchableOpacity>

        <View style={styles.versionCard}>
          <Text style={styles.versionText}>
            Versão 2.0 - Com Expo Router + AsyncStorage
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#000203ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    fontSize: 50,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#FADCD9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoLabel: {
    fontSize: 12,
    color: "#ff0357ff",
    marginBottom: 5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 16,
    color: "#f5b9cdff",
    fontWeight: "500",
  },
  
  logoutButton: {
  backgroundColor: "#F5AEA7",
  borderRadius: 25,
  paddingVertical: 12,
  paddingHorizontal: 40,
  alignItems: "center",
  alignSelf: "center",
  marginTop: 35,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
    textShadowColor: "#0002",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  versionCard: {
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  pic: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 15,
    borderRadius: 500,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 2,
    position: 'absolute',
    bottom: -50,
    zIndex: 1,
  },
  profileCard: {
    backgroundColor: "#F48C8C",
    borderRadius: 30,
    padding: 30,
    width: "90%",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
    shadowColor: "#ff0095ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
