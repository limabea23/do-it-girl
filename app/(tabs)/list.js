import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useTasks } from '../../contexts/TaskContext';
import { useRouter } from 'expo-router';

export default function List() {
    const [search, setSearch] = useState("");
    const { tasks, deleteTask } = useTasks();
    const router = useRouter();

    const filtered = tasks
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .map((t) => ({
            id: t.id,
            title: t.title,
            category: t.category,
            important: t.important,
            priority: t.priority,
            subtasks: t.subtasks || [],
        }));

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.panel}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Minha Lista e Tarefas!</Text>
                    <TextInput
                        placeholder="Buscar tarefa..."
                        placeholderTextColor="#ffdede"
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />

                    {filtered.length === 0 && (
                        <Text style={{ textAlign: "center", color: "#fff", marginTop: 10 }}>
                            Nenhuma tarefa encontrada.
                        </Text>
                    )}

                    {filtered.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            activeOpacity={0.85}
                            onPress={() => router.push({ pathname: '/edit', query: { id: item.id } })}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardText}>{item.title}</Text>
                                    <Text style={{ color: '#b06e6e', fontSize: 13, marginTop: 2 }}>
                                        {item.category ? `Categoria: ${item.category}` : ''}
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                        {item.important && (
                                            <Text style={{ color: '#f39b97', fontWeight: 'bold', marginRight: 10 }}>Meta</Text>
                                        )}
                                        {item.priority && (
                                            <Text style={{ color: '#f39b97', fontWeight: 'bold' }}>Prioridade</Text>
                                        )}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => router.push({ pathname: '/edit', query: { id: item.id } })}
                                        style={styles.editBtn}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
                                        <Text style={{ color: "#fff", fontWeight: "bold" }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {item.subtasks && item.subtasks.length > 0 && (
                                <View style={{ marginTop: 6 }}>
                                    {item.subtasks.map((sub, idx) => (
                                        !!sub && (
                                            <Text key={idx} style={{ color: "#6b3f3f", fontSize: 13, marginLeft: 8 }}>
                                                • {sub}
                                            </Text>
                                        )
                                    ))}
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    <View style={{ height: 24 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#e6eef0",
        alignItems: "center",
    },
    panel: {
        width: "92%",
        backgroundColor: "#f39b97",
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 14,
        marginTop: 12,
        flex: 1,
        alignSelf: "center",
    },
    content: {
        paddingBottom: 30,
    },
    title: {
        fontSize: 26,
        color: "#fff",
        textAlign: "center",
        marginBottom: 18,
        fontFamily: "Georgia",
        textShadowColor: "rgba(0,0,0,0.15)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    input: {
        backgroundColor: "#f6c0c0",
        width: "90%",
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        color: "#6b3f3f",
        marginBottom: 10,
        fontSize: 15,
    },
    card: {
        backgroundColor: "#f6cfcf",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginVertical: 8,
        width: "90%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        color: "#6b3f3f",
        fontSize: 16,
        flex: 1,
    },
    editBtn: {
        backgroundColor: "#f6cfcf",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginLeft: 0,
        marginRight: 6,
    },
    deleteBtn: {
        backgroundColor: "#f39b97",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginLeft: 0,
    },
});
