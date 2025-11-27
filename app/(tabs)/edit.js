import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function EditScreen({ route, navigation }) {
    const initial = route?.params?.task ?? {
        title: 'Estudar Geografia',
        date: '25/11/2025',
        time: '14:40h',
        list: 'Escola',
        priority: 'Alta',
        description: '',
        meta: '',
        subtasks: [
            { id: 1, text: 'Prespuricar marcas', done: true },
            { id: 2, text: 'Ir na loja de cosméticos', done: false },
        ],
    };

    const [description, setDescription] = useState(initial.description);
    const [meta, setMeta] = useState(initial.meta);
    const [subtasks, setSubtasks] = useState(initial.subtasks);
    const [completed, setCompleted] = useState(false);

    function toggleSubtask(id) {
        setSubtasks(prev => prev.map(s => (s.id === id ? { ...s, done: !s.done } : s)));
    }

    function toggleCompleteTask() {
        setCompleted(c => !c);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                <TouchableOpacity style={styles.back} onPress={() => navigation?.goBack?.()}>
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>

                <Text style={styles.header}>Minha Lista e Tarefas!</Text>

                <TouchableOpacity style={styles.finishButton} onPress={toggleCompleteTask}>
                    <Text style={styles.finishText}>{completed ? 'Tarefa Concluída' : 'Concluir Tarefa!'}</Text>
                </TouchableOpacity>

                <View style={styles.card}>
                    <Text style={styles.title}>{initial.title}</Text>
                    <Text style={styles.info}>Data: {initial.date}</Text>
                    <Text style={styles.info}>Hora: {initial.time}</Text>
                    <Text style={styles.info}>Lista: {initial.list}</Text>
                    <Text style={styles.info}>Prioridade: {initial.priority}</Text>

                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Digite..."
                        placeholderTextColor="#ffd9d9"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                        returnKeyType="done"
                    />

                    <Text style={styles.label}>Meta</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Digite..."
                        placeholderTextColor="#ffd9d9"
                        multiline
                        value={meta}
                        onChangeText={setMeta}
                        returnKeyType="done"
                    />

                    <Text style={styles.subheader}>SubTarefas</Text>

                    {subtasks.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.subtaskRow}
                            onPress={() => toggleSubtask(item.id)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, item.done && styles.checkboxChecked]}>
                                {item.done && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={[styles.subtaskText, item.done && styles.subtaskDone]}>{item.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4b0ad", // BG rosa suave
    },
    scroll: {
        flexGrow: 1,
        padding: 18,
        paddingBottom: 40,
    },
    back: {
        width: 30,
        height: 30,
        justifyContent: "center",
    },
    backText: {
        fontSize: 28,
        color: "#4a2f2f",
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        color: "#fff6f6",
        marginTop: 6,
        marginBottom: 12,
        textAlign: "left",
        textShadowColor: "rgba(0,0,0,0.08)",
        textShadowRadius: 2,
    },
    finishButton: {
        backgroundColor: "#f7c7c5",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 12,
        alignItems: "center",
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    finishText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#f49b96",
        borderRadius: 12,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff6f6",
        marginBottom: 8,
    },
    info: {
        color: "#fff6f6",
        marginVertical: 2,
        fontSize: 14,
    },
    label: {
        color: "#fff6f6",
        marginTop: 12,
        marginBottom: 6,
        fontWeight: "600",
        fontSize: 14,
    },
    input: {
        backgroundColor: "#f7c7c5",
        borderRadius: 12,
        padding: 12,
        color: "#fff",
        minHeight: 44,
        fontSize: 14,
    },
    textarea: {
        minHeight: 80,
        textAlignVertical: "top",
    },
    subheader: {
        color: "#fff6f6",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 14,
    },
    subtaskRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: "#fff6f6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: "transparent",
    },
    checkboxChecked: {
        backgroundColor: "#fff6f6",
    },
    checkmark: {
        color: "#f49b96",
        fontWeight: "700",
        fontSize: 14,
    },
    subtaskText: {
        color: "#fff6f6",
        fontSize: 16,
    },
    subtaskDone: {
        textDecorationLine: "line-through",
        opacity: 0.7,
    },
});