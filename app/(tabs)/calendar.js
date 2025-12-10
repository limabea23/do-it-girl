import React, { useState } from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet, Animated, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../../contexts/TaskContext';

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: [
        'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarScreen() {
    const [selected, setSelected] = useState("");
    const [task, setTask] = useState("");
    const [time, setTime] = useState("");
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [tempTime, setTempTime] = useState(new Date());
    const [priority, setPriority] = useState("");
    const { tasks, addTask } = useTasks();
    
    const dayTasks = selected ? tasks.filter(t => t.date === selected) : [];

    function handleAddTask() {
        if (task.trim() && selected) {
            addTask({
                title: task.trim(),
                date: selected,
                time: time.trim(),
                priority: priority.trim(),
            });
            setTask("");
            setTime("");
            setPriority("");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calendário</Text>
            <ScrollView contentContainerStyle={{paddingBottom: 30}} showsVerticalScrollIndicator={false}>
                <Calendar
                    onDayPress={day => setSelected(day.dateString)}
                    markedDates={{
                        [selected]: { selected: true, selectedColor: '#F79489', dotColor: '#fff', marked: true }
                    }}
                    renderArrow={direction => (
                        <Ionicons
                            name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
                            size={24}
                            color="#F79489"
                        />
                    )}
                    theme={{
                        backgroundColor: '#fff',
                        calendarBackground: '#fff',
                        textSectionTitleColor: '#F79489',
                        selectedDayBackgroundColor: '#F79489',
                        selectedDayTextColor: '#fff',
                        todayTextColor: '#F79489',
                        dayTextColor: '#222',
                        textDisabledColor: '#ccc',
                        dotColor: '#F79489',
                        selectedDotColor: '#fff',
                        arrowColor: '#F79489',
                        monthTextColor: '#F79489',
                        indicatorColor: '#F79489',
                        textMonthFontWeight: 'bold',
                        textDayFontWeight: '500',
                        textDayHeaderFontWeight: 'bold',
                        textDayFontSize: 16,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 14,
                    }}
                    style={styles.calendar}
                />
                {selected ? (
                    <Animated.View style={styles.selectedBox}>
                        <Text style={styles.selectedText}>Dia selecionado: <Text style={{ color: '#F79489' }}>{selected.split('-').reverse().join('/')}</Text></Text>
                        <View style={styles.taskInputBox}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nova tarefa para este dia..."
                                value={task}
                                onChangeText={setTask}
                                returnKeyType="done"
                                placeholderTextColor="#F79489"
                            />
                        </View>
                        <View style={styles.taskInputBox}>
                            <TextInput
                                style={styles.input}
                                placeholder="Horário (ex: 14:30)"
                                value={time}
                                onChangeText={setTime}
                                keyboardType="numeric"
                                placeholderTextColor="#F79489"
                                maxLength={5}
                            />
                        </View>
                        <View style={styles.taskInputBox}>
                            <TextInput
                                style={styles.input}
                                placeholder="Prioridade (ex: Alta, Média, Baixa)"
                                value={priority}
                                onChangeText={setPriority}
                                placeholderTextColor="#F79489"
                            />
                        </View>
                        <TouchableOpacity style={styles.addBtnFull} onPress={handleAddTask}>
                            <Text style={styles.addBtnTextLabel}>Adicionar</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={dayTasks}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.taskItem}>
                                    <Ionicons name="ellipse" size={10} color="#F79489" style={{ marginRight: 8 }} />
                                    <View>
                                        <Text style={styles.taskText}>{item.title}</Text>
                                        {item.time ? (
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Ionicons name="time-outline" size={13} color="#F79489" style={{ marginRight: 2 }} />
                                                <Text style={styles.taskMeta}>{item.time}</Text>
                                            </View>
                                        ) : null}
                                        {item.priority ? (
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Ionicons name="star-outline" size={13} color="#F79489" style={{ marginRight: 2 }} />
                                                <Text style={styles.taskMeta}>{item.priority}</Text>
                                            </View>
                                        ) : null}
                                    </View>
                                </View>
                            )}
                            ListEmptyComponent={<Text style={styles.tip}>Nenhuma tarefa para este dia.</Text>}
                            style={{ marginTop: 10, width: '100%' }}
                        />
                    </Animated.View>
                ) : (
                    <Text style={styles.tip}>Toque em um dia para selecionar</Text>
                )}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
            addBtnFull: {
                backgroundColor: '#F79489',
                borderRadius: 8,
                paddingVertical: 7,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 6,
                marginBottom: 6,
                width: '70%',
                alignSelf: 'center',
            },
        timeInputBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 36,
        },
        timeInputText: {
            color: '#F79489',
            fontSize: 16,
        },
        modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
        },
        modalContent: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
        },
        modalOkBtn: {
            marginTop: 10,
            alignSelf: 'center',
        },
        modalOkText: {
            color: '#F79489',
            fontWeight: 'bold',
            fontSize: 16,
        },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 2,
    },
    taskInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 6,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#F79489',
        borderRadius: 5,
        padding: 3,
        fontSize: 13,
        color: '#222',
        backgroundColor: '#fff',
    },
    addBtn: {
        marginLeft: 8,
    },
    addBtnText: {
        marginLeft: 8,
        backgroundColor: '#F79489',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnTextLabel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
    taskText: {
        fontSize: 15,
        color: '#222',
    },
    taskMeta: {
        fontSize: 12,
        color: '#F79489',
        marginLeft: 2,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#F79489',
        marginBottom: 10,
        marginTop: 18,
    },
    calendar: {
        borderRadius: 16,
        elevation: 4,
        marginBottom: 16,
        marginTop: 0,
        width: 280,
        alignSelf: 'center',
        backgroundColor: '#fff7f4',
        borderWidth: 1.5,
        borderColor: '#ffe0db',
        shadowColor: '#F79489',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.13,
        shadowRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 2,
    },
    selectedBox: {
        backgroundColor: '#fff6f3',
        borderRadius: 7,
        padding: 5,
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#F79489',
    },
    selectedText: {
        fontSize: 18,
        color: '#222',
        textAlign: 'center',
    },
    tip: {
        color: '#aaa',
        fontSize: 16,
        marginTop: 16,
    },
});
