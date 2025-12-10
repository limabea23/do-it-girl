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
import { useAuth } from "../contexts/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, setUser, signOut } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [description, setDescription] = useState(user?.description || "");
  const [saving, setSaving] = useState(false);
  const [showSave, setShowSave] = useState(true);
  const [descFocused, setDescFocused] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = {
        ...user,
        username,
        email,
        description,
        ...(profileImage ? { profileImage } : {}),
      };
      setUser(updatedUser);
      const { saveUser } = await import('../utils/storage');
      await saveUser(updatedUser);
      Alert.alert("Perfil atualizado!", "Suas informações foram salvas.");
      router.replace('/(tabs)/profile');
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  };

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/profile')}>
        <Feather name="arrow-left" size={28} color="#222" />
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
          {profileImage || user?.profileImage ? (
            <Image
              style={styles.avatarImg}
              source={profileImage ? { uri: profileImage } : { uri: user.profileImage }}
            />
          ) : (
            <AntDesign name="user" size={60} color="#F5AEA7" />
          )}
        </TouchableOpacity>
        <View style={styles.formWrapper}>
          <Text style={styles.label}>username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Nome"
            maxLength={40}
            placeholderTextColor="#fff"
          />
          <Text style={styles.label}>email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            maxLength={60}
            placeholderTextColor="#fff"
          />
          <Text style={styles.label}>descrição</Text>
          <TextInput
            style={[styles.input, styles.inputDesc]}
            value={description}
            onChangeText={text => {
              if (text.length <= 120) {
                setDescription(text);
              }
            }}
            placeholder="Descrição"
            multiline
            maxLength={120}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
            <Text style={styles.saveText}>CONCLUIR ALTERAÇÃO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F48C8C',
    paddingTop: 40,
    paddingHorizontal: 0,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  cardContainer: {
    backgroundColor: '#ddb1b1ff',
    marginTop: 80,
    borderRadius: 24,
    width: '100%',
    minHeight: '100%',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarWrapper: {
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#F5AEA7',
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F48C8C',
    overflow: 'hidden',
  },
  avatarImg: {
    width: 110,
    height: 110,
    borderRadius: 55,
    resizeMode: 'cover',
    backgroundColor: '#F5AEA7',
  },
  formWrapper: {
    width: '100%',
    marginTop: 8,
  },
  label: {
    color: '#ff0095ff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#FADCD9',
    color: '#222',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 4,
  },
  inputDesc: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#F48C8C',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#F48C8C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
    