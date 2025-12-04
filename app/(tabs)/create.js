import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useTasks } from "../../contexts/TaskContext";
import { useRouter } from "expo-router";

export default function CreateTask() {
    const { addTask } = useTasks();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [important, setImportant] = useState(false);
    const [priority, setPriority] = useState(false);
    const [subtasks, setSubtasks] = useState([]);

    function handleCreate() {
        if (!title.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            title,
            category,
            important,
            priority,
            subtasks,
        };

        addTask(newTask);
        router.push("/list");
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Minhas Listas e Tarefas</Text>

            {/* Filtro de categoria */}
            <View style={styles.row}>
                {['Escola', 'Bem-estar', 'Autocuidado'].map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.chip, category === cat && { backgroundColor: '#f39b97', borderWidth: 1, borderColor: '#fff' }]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text style={{ color: category === cat ? '#fff' : '#6b3f3f', fontWeight: category === cat ? 'bold' : 'normal' }}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Título da sua tarefa..."
                placeholderTextColor="#ffe5e5"
                value={title}
                onChangeText={setTitle}
            />

            {/* Bloco de meta e prioridade */}
            <View style={[styles.row, { justifyContent: 'center', marginBottom: 20 }]}> 
                <TouchableOpacity
                    style={[styles.tag, important && { backgroundColor: "#f39b97", borderWidth: 1, borderColor: '#fff' }]}
                    onPress={() => setImportant(!important)}
                >
                    <Text style={{ color: important ? '#fff' : '#6b3f3f', fontWeight: important ? 'bold' : 'normal' }}>Meta Importante</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tag, priority && { backgroundColor: "#f39b97", borderWidth: 1, borderColor: '#fff' }]}
                    onPress={() => setPriority(!priority)}
                >
                    <Text style={{ color: priority ? '#fff' : '#6b3f3f', fontWeight: priority ? 'bold' : 'normal' }}>Prioridade</Text>
                </TouchableOpacity>
            </View>

            {/* Subtarefas editáveis */}
            <View style={styles.subBox}>
                <Text style={styles.subtitle}>Subtarefas</Text>
                {subtasks.map((sub, idx) => (
                    <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                        <Text style={{ color: '#6b3f3f', fontSize: 15, marginLeft: 8 }}>•</Text>
                        <TextInput
                            style={[styles.input, { flex: 1, marginBottom: 0, backgroundColor: '#fff5f5', fontSize: 15, paddingVertical: 6 }]}
                            placeholder={`Subtarefa ${idx + 1}`}
                            placeholderTextColor="#f6b3b3"
                            value={sub}
                            onChangeText={txt => setSubtasks(prev => prev.map((s, i) => i === idx ? txt : s))}
                        />
                        <TouchableOpacity onPress={() => setSubtasks(prev => prev.filter((_, i) => i !== idx))}>
                            <Text style={{ color: '#f39b97', fontWeight: 'bold', fontSize: 18, marginLeft: 6 }}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setSubtasks(prev => [...prev, ''])}
                >
                    <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleCreate}>
                <Text style={styles.btnText}>CRIAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f39b97",
        padding: 20,
    },
    title: {
        fontSize: 26,
        color: "#fff",
        textAlign: "center",
        marginBottom: 15,
        fontFamily: "Georgia",
    },
    row: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
    },
    chip: {
        backgroundColor: "#ffd1d1",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    input: {
        backgroundColor: "#f6c0c0",
        borderRadius: 12,
        padding: 12,
        color: "#6b3f3f",
        marginBottom: 15,
        fontSize: 16,
    },
    tag: {
        backgroundColor: "#f6cfcf",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    subBox: {
        height: 150,
        backgroundColor: "#f6b3b3",
        borderRadius: 12,
        marginTop: 20,
        padding: 10,
        position: "relative",
    },
    subtitle: {
        color: "#6b3f3f",
        fontSize: 18,
        marginBottom: 8,
    },
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#f39b97",
        position: "absolute",
        bottom: 12,
        right: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        backgroundColor: "#f6cfcf",
        paddingVertical: 14,
        borderRadius: 18,
        marginTop: 25,
        width: "70%",
        alignSelf: "center",
    },
    btnText: {
        textAlign: "center",
        color: "#6b3f3f",
        fontSize: 16,
        fontWeight: "bold",
    },
});
