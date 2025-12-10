import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTasks } from "../../contexts/TaskContext";

const { width } = Dimensions.get("window");

const wp = (v) => (width * v) / 100;
const size = (s) => {
  if (width < 360) return s * 0.82;
  if (width < 400) return s * 0.9;
  if (width > 500) return s * 1.12;
  return s;
};

export default function CreateTaskScreen() {
  const { addTask } = useTasks();
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtasks, setSubtasks] = useState([]);

  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [priority, setPriority] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meeting, setMeeting] = useState("");

  const handleAddSubtask = () => {
    const trimmed = subtaskInput.trim();
    if (!trimmed) return;
    setSubtasks((c) => [...c, trimmed]);
    setSubtaskInput("");
  };

  const handleRemoveSubtask = (i) => {
    setSubtasks((c) => c.filter((_, index) => index !== i));
  };

  const handleSaveTask = () => {
    if (!title.trim()) return Alert.alert("Aviso", "Informe um título.");
    if (!category) return Alert.alert("Aviso", "Selecione uma categoria.");

    addTask({
      title: title.trim(),
      subtasks,
      listName: category,
      goal: goal.trim(),
      priority: priority.trim(),
      date,
      time,
      meeting: meeting.trim(),
    });

    navigation.navigate('list');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.panel}>
          <Text style={styles.heading}>Minhas Listas e Tarefas</Text>

          <View style={styles.chipRow}>
            {["Todas", "Estudos", "AutoCuidado", "Lazer"].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, category === cat && styles.chipSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    category === cat && styles.chipTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.iconRow}>
            <View style={styles.iconBlock}>
              <MaterialIcons name="date-range" size={size(22)} color="#fff" />
              <TextInput
                placeholder="Digite a data (ex: 12/10/2025)"
                value={date}
                onChangeText={setDate}
                placeholderTextColor="#ffdede"
                style={styles.iconInput}
              />
            </View>

            <View style={styles.iconBlock}>
              <MaterialIcons name="access-time" size={size(22)} color="#fff" />
              <TextInput
                placeholder="Digite a hora (ex: 14:30)"
                value={time}
                onChangeText={setTime}
                placeholderTextColor="#ffdede"
                style={styles.iconInput}
              />
            </View>

            <View style={styles.iconBlock}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={size(22)}
                color="#fff"
              />
              <TextInput
                placeholder="Reunião"
                value={meeting}
                onChangeText={setMeeting}
                placeholderTextColor="#ffdede"
                style={styles.iconInput}
              />
            </View>
          </View>

          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, goal === "Mais Importante" && styles.chipSelected]}
              onPress={() => setGoal("Mais Importante")}
            >
              <Text
                style={[
                  styles.chipText,
                  goal === "Mais Importante" && styles.chipTextSelected,
                ]}
              >
                Meta Importante
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.chip, priority === "Prioridade" && styles.chipSelected]}
              onPress={() => setPriority("Prioridade")}
            >
              <Text
                style={[
                  styles.chipText,
                  priority === "Prioridade" && styles.chipTextSelected,
                ]}
              >
                Prioridade
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Título da tarefa"
            placeholderTextColor="#a13d3a99"
            style={styles.input}
          />

          <View style={styles.subtaskHeader}>
            <Text style={styles.subtaskTitle}>Subtarefas</Text>

            <View style={styles.subtaskArea}>
              <View style={styles.subtaskRow}>
                <TextInput
                  value={subtaskInput}
                  onChangeText={setSubtaskInput}
                  placeholder="Adicionar subtarefa"
                  placeholderTextColor="#a13d3a99"
                  style={[styles.input, styles.subtaskInput]}
                />
                <TouchableOpacity style={styles.addCircle} onPress={handleAddSubtask}>
                  <Text style={styles.addCircleText}>+</Text>
                </TouchableOpacity>
              </View>

              {subtasks.length > 0 && (
                <View style={styles.subtaskList}>
                  {subtasks.map((item, index) => (
                    <View key={index} style={styles.subtaskItem}>
                      <Text style={styles.subtaskText}>{item}</Text>
                      <TouchableOpacity onPress={() => handleRemoveSubtask(index)}>
                        <Text style={styles.removeText}>Remover</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
            <Text style={styles.saveButtonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fbeff2",
  },
  scroll: {
    paddingBottom: size(60),
    paddingTop: size(22),
  },
  panel: {
    backgroundColor: "#fbb1b1",
    borderRadius: size(22),
    padding: size(22),
    marginHorizontal: "5%",
    shadowColor: "#e57373",
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#fadcd9",
  },
  heading: {
    fontSize: size(32),
    textAlign: "center",
    marginBottom: size(20),
    color: "#e57373",
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Montserrat" : "sans-serif",
    letterSpacing: 1.5,
  },
  chipRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: size(10),
    marginBottom: size(18),
  },
  chip: {
    backgroundColor: "#fadcd9",
    borderRadius: size(16),
    paddingVertical: size(10),
    paddingHorizontal: size(20),
    borderWidth: 2,
    borderColor: "#fbb1b1",
    marginBottom: size(8),
    marginRight: size(8),
    shadowColor: "#fbb1b1",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  chipSelected: {
    backgroundColor: "#e57373",
    borderColor: "#e57373",
  },
  chipText: {
    color: "#e57373",
    fontWeight: "700",
    fontSize: size(15),
    fontFamily: Platform.OS === "ios" ? "Montserrat" : "sans-serif",
  },
  chipTextSelected: {
    color: "#fadcd9",
    fontWeight: "700",
  },
  iconRow: {
    flexDirection: "row",
    gap: size(10),
    marginBottom: size(18),
  },
  iconBlock: {
    flex: 1,
    backgroundColor: "#fadcd9",
    borderRadius: size(16),
    paddingHorizontal: size(10),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fbb1b1",
  },
  iconInput: {
    flex: 1,
    paddingVertical: size(12),
    fontSize: size(15),
    color: "#e57373",
    fontFamily: Platform.OS === "ios" ? "Montserrat" : "sans-serif",
  },
  input: {
    backgroundColor: "#fadcd9",
    paddingVertical: size(12),
    paddingHorizontal: size(14),
    borderRadius: size(14),
    color: "#e57373",
    fontSize: size(15),
    borderWidth: 1.5,
    borderColor: "#fbb1b1",
    marginBottom: size(14),
    fontFamily: Platform.OS === "ios" ? "Montserrat" : "sans-serif",
  },
  subtaskHeader: {
    marginTop: size(18),
  },
  subtaskTitle: {
    color: "#e57373",
    fontSize: size(20),
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Montserrat" : "sans-serif",
  },
  subtaskArea: {
    backgroundColor: "#fadcd9",
    borderRadius: size(16),
    padding: size(14),
    borderWidth: 1,
    borderColor: "#fbb1b1",
    marginTop: size(8),
  },
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtaskInput: {
    flex: 1,
    marginBottom: 0,
  },
  addCircle: {
    width: size(36),
    height: size(36),
    borderRadius: size(18),
    backgroundColor: "#e57373",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: size(8),
    borderWidth: 1,
    borderColor: "#fadcd9",
  },
  addCircleText: {
    color: "#fadcd9",
    fontSize: size(24),
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Montserrat" : "sans-serif",
  },
  subtaskList: {
    marginTop: size(12),
  },
  subtaskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: size(6),
  },
  subtaskText: {
    color: "#e57373",
    fontSize: size(15),
  },
  removeText: {
    color: "#e57373",
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#e57373",
    marginTop: size(26),
    paddingVertical: size(16),
    borderRadius: size(28),
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fadcd9",
    fontSize: size(20),
    fontWeight: "800",
    fontFamily: Platform.OS === "ios" ? "Montserrat" : "sans-serif",
  },
});
