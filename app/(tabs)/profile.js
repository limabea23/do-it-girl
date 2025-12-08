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
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

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

        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <Text style={styles.quote}>"Você não pode ser o que os outros querem que você seja. Você tem que ser você mesma, do seu jeito."</Text>

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
    backgroundColor: "#F48C8C",
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  avatarContainer: {
    width: "100%",
    height: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "transparent",
    position: "relative",
  },
  avatar: {
    fontSize: 50,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginTop: 6,
    marginBottom: 2,
    textAlign: "left",
    marginLeft: 140, 
    textShadowColor: "rgba(0,0,0,0.18)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  email: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 12,
    textAlign: "left",
    marginLeft: 140, 
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
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: "#fff",
    borderWidth: 3,
    position: "absolute",
    left: 20,
    top: 0, 
    zIndex: 10,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
  profileCard: {
    backgroundColor: "#ddb1b1ff",
    borderRadius: 30,
    paddingTop: 36, 
    paddingBottom: 30,
    paddingHorizontal: 20,
    width: "92%",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 30,
    overflow: "visible",
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
  editButton: {
    backgroundColor: "rgba(255,255,255,0.18)", 
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 6,
    marginLeft: 140,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    shadowColor: "rgba(0,0,0,0.12)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  quote: {
    fontSize: 14,
    color: "rgba(255,255,255,0.95)",
    marginTop: 14,
    marginBottom: 14,
    lineHeight: 20,
    alignSelf: "flex-start",
  },
});
