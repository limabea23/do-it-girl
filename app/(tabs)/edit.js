// ...existing code...
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Platform,
} from "react-native";

export default function EditScreen() {
  const tarefa = {
    title: "Estudar Geografia",
    date: "25/11/2025",
    time: "14:40h",
    list: "Escola",
    priority: "Alta",
    description: "",
    goal: "",
    subtasks: [
      { id: 1, text: "Prespuricar marcas", done: true },
      { id: 2, text: "Ir na loja de cosméticos", done: true },
    ],
  };

  const handleConcluir = () => {
    Alert.alert(
      "Concluir Tarefa",
      "Deseja marcar esta tarefa como concluída?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => Alert.alert("Tarefa concluída") },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Minha Lista e Tarefas!</Text>

        <TouchableOpacity style={styles.finishBtn} onPress={handleConcluir}>
          <Text style={styles.finishText}>Concluir Tarefa!</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>{tarefa.title}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data:</Text>
            <Text style={styles.infoValue}>{tarefa.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hora:</Text>
            <Text style={styles.infoValue}>{tarefa.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lista:</Text>
            <Text style={styles.infoValue}>{tarefa.list}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prioridade:</Text>
            <Text style={styles.infoValue}>{tarefa.priority}</Text>
          </View>

          <Text style={styles.fieldLabel}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Digite..."
            placeholderTextColor="#ffd7d3"
            defaultValue={tarefa.description}
            multiline
          />

          <Text style={styles.fieldLabel}>Meta</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite..."
            placeholderTextColor="#ffd7d3"
            defaultValue={tarefa.goal}
          />

          <Text style={styles.subtasksTitle}>SubTarefas</Text>
          <View style={styles.subtasks}>
            {tarefa.subtasks.map((s) => (
              <View key={s.id} style={styles.subtaskRow}>
                <View style={[styles.checkbox, s.done && styles.checkboxDone]}>
                  <Text style={styles.checkmark}>{s.done ? "✓" : ""}</Text>
                </View>
                <Text style={styles.subtaskText}>{s.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footerSpacer} />
      </View>
    </ScrollView>
  );
}

const COLORS = {
  bg: "#f79b95",    
  soft: "#ffd7d6",   
  card: "#f29a94",   
  text: "#fff7f7",
  dark: "#3b2a29",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 40,
  },
  backBtn: {
    padding: 6,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  backArrow: {
    fontSize: 22,
    color: COLORS.dark,
  },
  header: {
    fontSize: 26,
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 14,
    textShadowColor: "rgba(0,0,0,0.08)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  finishBtn: {
    alignSelf: "center",
    width: "78%",
    backgroundColor: COLORS.soft,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  finishText: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  infoLabel: {
    width: 90,
    color: COLORS.text,
    fontWeight: "600",
  },
  infoValue: {
    color: COLORS.text,
    fontWeight: "400",
  },
  fieldLabel: {
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "700",
  },
  input: {
    backgroundColor: COLORS.soft,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.dark,
  },
  inputMultiline: {
    height: 74,
    textAlignVertical: "top",
  },
  subtasksTitle: {
    color: COLORS.text,
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
  },
  subtasks: {
    marginTop: 10,
  },
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  checkboxDone: {
    backgroundColor: "#fff",
  },
  checkmark: {
    color: COLORS.dark,
    fontWeight: "700",
  },
  subtaskText: {
    color: COLORS.text,
    fontSize: 15,
    flex: 1,
  },
  footerSpacer: {
    height: 80,
  },
});
