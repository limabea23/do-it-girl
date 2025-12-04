import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../../contexts/TaskContext';

export default function CreateTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [category, setCategory] = useState('');
  const [goal, setGoal] = useState('');
  const [priority, setPriority] = useState('');
  const navigation = useNavigation();

  const handleAddSubtask = () => {
    const trimmed = subtaskInput.trim();
    if (!trimmed) return;
    setSubtasks((current) => [...current, trimmed]);
    setSubtaskInput('');
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks((current) => current.filter((_, i) => i !== index));
  };

  const handleSaveTask = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert('Aviso', 'Informe um título para a tarefa.');
      return;
    }
    if (!category) {
      Alert.alert('Aviso', 'Selecione uma categoria.');
      return;
    }
    addTask({
      title: trimmedTitle,
      subtasks,
      listName: category,
      goal: goal.trim(),
      priority: priority.trim(),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.panel}>
        <Text style={styles.heading}>Criar nova tarefa</Text>

        {/* Categoria */}
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryRow}>
          {['Escola', 'Auto Cuidado', 'Lazer'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryChipText, category === cat && styles.categoryChipTextSelected]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meta */}
        <Text style={styles.label}>Meta</Text>
        <TextInput
          value={goal}
          onChangeText={setGoal}
          placeholder="Descreva a meta (opcional)"
          placeholderTextColor="#ffdede"
          style={[styles.input, styles.metaInput]}
        />

        {/* Prioridade */}
        <Text style={styles.label}>Prioridade</Text>
        <TextInput
          value={priority}
          onChangeText={setPriority}
          placeholder="Ex: Alta, Média, Baixa"
          placeholderTextColor="#ffdede"
          style={[styles.input, styles.priorityInput]}
        />

        {/* Título */}
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título"
          placeholderTextColor="#ffdede"
          style={styles.input}
        />

        {/* Subtarefas */}
        <View style={styles.subtaskHeader}>
          <Text style={styles.subtaskTitle}>Subtarefas</Text>
          <View style={styles.subtaskRow}>
            <TextInput
              value={subtaskInput}
              onChangeText={setSubtaskInput}
              placeholder="Adicionar subtarefa"
              placeholderTextColor="#ffdede"
              style={[styles.input, styles.subtaskInput]}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddSubtask}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {subtasks.length > 0 && (
          <View style={styles.subtaskList}>
            {subtasks.map((item, index) => (
              <View key={`${item}-${index}`} style={styles.subtaskItem}>
                <Text style={styles.subtaskText}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemoveSubtask(index)}>
                  <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
          <Text style={styles.saveButtonText}>Salvar tarefa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#e6eef0',
  },
  panel: {
    backgroundColor: '#f39b97',
    marginHorizontal: '4%',
    borderRadius: 12,
    padding: 18,
    marginTop: 40,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f6c0c0',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    color: '#6b3f3f',
    marginBottom: 10,
    fontSize: 15,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
    fontSize: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#f6cfcf',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#a13d3a',
  },
  categoryChipText: {
    color: '#a13d3a',
    fontWeight: '600',
  },
  categoryChipTextSelected: {
    color: '#fff',
  },
  metaInput: {
    borderWidth: 1,
    borderColor: '#a13d3a',
    backgroundColor: '#fbeee6',
  },
  priorityInput: {
    borderWidth: 1,
    borderColor: '#f39b97',
    backgroundColor: '#fbeee6',
  },
  subtaskHeader: {
    marginTop: 12,
  },
  subtaskTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtaskInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f6cfcf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#6b3f3f',
    fontSize: 24,
    fontWeight: '600',
  },
  subtaskList: {
    marginTop: 12,
    backgroundColor: '#f6cfcf',
    borderRadius: 12,
    padding: 12,
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  subtaskText: {
    color: '#6b3f3f',
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  removeText: {
    color: '#a13d3a',
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 18,
    backgroundColor: '#f6cfcf',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#6b3f3f',
    fontSize: 16,
    fontWeight: '600',
  },
});