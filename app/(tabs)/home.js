import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { getUserTasks, toggleTaskComplete } from "../../utils/storage";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Home() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const load = async () => {
    if (!user) return;
    const items = await getUserTasks(user.id);
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setTasks(items.slice(0, 5));
  };

  useEffect(() => {
    load();
  }, [user]);

  const handleQuick = () => router.push("/calendar"); // Vai para Calendar
  const handleRoutines = () => router.push("/list"); // Vai para Lista de Tarefas

  const handleToggle = async (id) => {
    await toggleTaskComplete(id, user.id);
    await load();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Do It, Girl!</Text>
        <View style={styles.counterCard}>
          <Text style={styles.counterText}>
            Tarefas de hoje: {tasks.length} a fazer, 2 concluídas
          </Text>
        </View>
      </View>

      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>Meta de Semana:</Text>
        <Text style={styles.goalText}>Ser incrível!</Text>
      </View>

      <View style={styles.buttonsRow}>
        <View style={styles.smallButtons}>
          <TouchableOpacity style={styles.roundButton} onPress={() => router.push("/create")}>
            <FontAwesome5 name="plus" size={24} color="#f2a8a3" />
          </TouchableOpacity>
          <Text style={styles.smallLabel}>Adicionar</Text>
        </View>

        <View style={styles.smallButtons}>
          <TouchableOpacity style={styles.roundButton} onPress={handleQuick}>
            <FontAwesome5 name="bolt" size={24} color="#f2a8a3" />
          </TouchableOpacity>
          <Text style={styles.smallLabel}>Rápido</Text>
        </View>

        <View style={styles.smallButtons}>
          <TouchableOpacity style={styles.roundButton} onPress={handleRoutines}>
            <FontAwesome5 name="stopwatch" size={24} color="#f2a8a3" />
          </TouchableOpacity>
          <Text style={styles.smallLabel}>Rotinas</Text>
        </View>
      </View>

      <View style={styles.listArea}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleToggle(item.id)} style={styles.taskCard}>
              <Text style={[styles.taskTitle, item.completed && styles.taskDone]}>
                {item.title}
              </Text>
              {item.completed && <FontAwesome5 name="check" size={18} color="#fff" />}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Sem tarefas — crie na aba Rápido</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2a8a3",
    padding: 18,
  },
  header: {
    marginTop: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  counterCard: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 10,
    borderRadius: 12,
  },
  counterText: {
    color: "#fff",
  },
  goalCard: {
    backgroundColor: "#f8c2c0",
    borderRadius: 12,
    padding: 18,
    marginTop: 18,
    marginBottom: 18,
  },
  goalTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
  },
  goalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 18,
  },
  smallButtons: {
    alignItems: "center",
  },
  roundButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  smallLabel: {
    color: "#fff",
    marginTop: 8,
  },
  listArea: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: "#f7bcbc",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    color: "#fff",
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});
