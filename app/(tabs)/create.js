import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../../contexts/TaskContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [category, setCategory] = useState('');
  const [goal, setGoal] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('');
  const [meeting, setMeeting] = useState('');
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
      date: date.trim(),
      time: time.trim(),
      meeting: meeting.trim(),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        <View style={styles.panel}>
          <Text style={styles.heading}>Minhas Listas e Tarefas</Text>
          {/* Chips de categoria */}
          <View style={styles.chipRow}>
            {['Todas', 'Estudos', 'AutoCuidado', 'Lazer'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, category === cat && styles.chipSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.chipText, category === cat && styles.chipTextSelected]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Campo de data com calendário */}
          <View style={styles.iconInputRow}>
            <View style={styles.iconInputBlock}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerText}>{date ? date : 'Selecionar data'}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date ? new Date(date.split('/').reverse().join('-')) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const d = selectedDate;
                      const formatted = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
                      setDate(formatted);
                    }
                  }}
                  style={{backgroundColor: '#fff'}}
                />
              )}
            </View>
            <View style={styles.iconInputBlock}>
              <TextInput
                value={time}
                onChangeText={setTime}
                placeholder="Hora"
                placeholderTextColor="#ffdede"
                style={styles.iconInput}
              />
            </View>
            <View style={styles.iconInputBlock}>
              <TextInput
                value={meeting}
                onChangeText={setMeeting}
                placeholder="Reunião"
                placeholderTextColor="#ffdede"
                style={styles.iconInput}
              />
            </View>
          </View>
          {/* Chips de meta/prioridade */}
          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, goal === 'Mais Importante' && styles.chipSelected]}
              onPress={() => setGoal('Mais Importante')}
            >
              <Text style={[styles.chipText, goal === 'Mais Importante' && styles.chipTextSelected]}>Meta Importante</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, priority === 'Prioridade' && styles.chipSelected]}
              onPress={() => setPriority('Prioridade')}
            >
              <Text style={[styles.chipText, priority === 'Prioridade' && styles.chipTextSelected]}>Prioridade</Text>
            </TouchableOpacity>
          </View>
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
            <View style={styles.subtaskArea}>
              <View style={styles.subtaskRow}>
                <TextInput
                  value={subtaskInput}
                  onChangeText={setSubtaskInput}
                  placeholder="Adicionar subtarefa"
                  placeholderTextColor="#ffdede"
                  style={[styles.input, styles.subtaskInput]}
                />
                <TouchableOpacity style={styles.addButtonCircle} onPress={handleAddSubtask}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
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
            </View>
          </View>
          <TouchableOpacity style={styles.saveButtonRounded} onPress={handleSaveTask} activeOpacity={0.85}>
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
    backgroundColor: '#e6eef0',
  },
  scrollContent: {
    paddingBottom: 40,
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
  chipRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f6cfcf',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#f6cfcf',
    elevation: 2,
  },
  chipSelected: {
    backgroundColor: '#a13d3a',
    borderColor: '#a13d3a',
    elevation: 4,
  },
  chipText: {
    color: '#a13d3a',
    fontWeight: '600',
    fontSize: 15,
  },
  chipTextSelected: {
    color: '#fff',
  },
  iconInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  iconInputBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6cfcf',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginRight: 8,
    flex: 1,
  },
  datePickerButton: {
    backgroundColor: '#f6cfcf',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  datePickerText: {
    color: '#6b3f3f',
    fontSize: 15,
  },
  iconInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#6b3f3f',
    fontSize: 15,
    paddingVertical: 10,
    borderRadius: 12,
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
  subtaskArea: {
    backgroundColor: '#f6cfcf',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
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
  addButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    elevation: 2,
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
  saveButtonRounded: {
    marginTop: 24,
    backgroundColor: '#a13d3a',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 3,
    width: '80%',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});