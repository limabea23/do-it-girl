import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Image
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [description] = useState(user?.description || "");

  // Simulação de função de salvar descrição
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

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
          <TouchableOpacity onPress={pickImage} style={styles.picTouchable}>
            <Image
              style={styles.pic}
              source={user?.profileImage ? { uri: user.profileImage } : null}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }} onPress={() => router.push('/editprofile')}>EDITAR PERFIL</Text>
        </TouchableOpacity>

        <Text style={styles.infoLabel}>Descrição</Text>
        <View style={styles.descriptionRow}>
          <TextInput
            style={[styles.descriptionInput, { flex: 1, marginBottom: 0 }]}
            value={description}
            editable={false}
            multiline={true}
            maxLength={120}
            underlineColorAndroid="transparent"
          />
        </View>

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

        <TouchableOpacity style={styles.logoutButton} onPress={async () => { await signOut(); router.replace('/(auth)/signin'); }}>
          <Text style={styles.logoutText}>
            <Feather name="log-out" size={22} color="#fff" /> Sair da Conta
          </Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  picTouchable: {
    position: "relative",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 20,
  },
  cameraIcon: {
    fontSize: 18,
    color: "#F48C8C",
  },
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
    textShadowRadius: 4,
  },
  email: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 12,
    textAlign: "left",
    marginLeft: 140,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#FADCD9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoLabel: {
    fontSize: 11,
    color: "#ff0095ff",
    marginBottom: 5,
    marginLeft: 5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: "#000000ff",
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 36,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: "flex-start",
    alignSelf: "stretch",
    marginTop: 40,
    marginBottom: 0,
    flex: 1,
    minHeight: '92%',
    overflow: "visible",
    shadowColor: "#ff0095ff",
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
  descriptionInput: {
    width: '100%',
    minHeight: 100,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
    color: '#000000ff',
    borderWidth: 1,
    borderColor: '#ddb1b1ff',
  },
});
