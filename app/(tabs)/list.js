import React, { useMemo, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import { useTasks } from '../../contexts/TaskContext'

const formatDate = (value) => {
    if (!value) {
        return 'Sem data'
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const year = value.slice(0, 4)
        const month = value.slice(5, 7)
        const day = value.slice(8, 10)
        return `${day}/${month}/${year}`
    }

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
        return value
    }

    const day = String(parsed.getDate()).padStart(2, '0')
    const month = String(parsed.getMonth() + 1).padStart(2, '0')
    const year = parsed.getFullYear()
    return `${day}/${month}/${year}`
}

const formatTime = (value) => {
    if (!value) {
        return 'Sem horario'
    }

    if (/^\d{2}:\d{2}$/.test(value)) {
        return value
    }

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
        return value
    }

    const hours = String(parsed.getHours()).padStart(2, '0')
    const minutes = String(parsed.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
}

export default function List() {
    const [search, setSearch] = useState('')
    const navigation = useNavigation()
    const { tasks, deleteTask } = useTasks()

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            }
            if (a.createdAt < b.createdAt) {
                return 1
            }
            return 0
        })
    }, [tasks])

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        if (!term) {
            return sortedTasks
        }

        return sortedTasks.filter((task) => {
            const text = [task.title, task.listName, task.priority]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
            return text.includes(term)
        })
    }, [sortedTasks, search])

    const handleTaskPress = (task) => {
        navigation.navigate('edit', { taskId: task.id })
    }

    const handleCreatePress = () => {
        navigation.navigate('create')
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.panel}>
                    <Text style={styles.title}>Minha Lista e Tarefas!</Text>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleCreatePress}>
                        <Text style={styles.primaryButtonText}>Criar nova tarefa</Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Buscar tarefa"
                        placeholderTextColor="#ffdede"
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />

                    {filtered.map((task) => {
                        const subtitleParts = [formatDate(task.date), formatTime(task.time)]
                        if (task.listName) {
                            subtitleParts.push(task.listName)
                        }

                        return (
                            <View key={task.id} style={[styles.card, task.completed && styles.cardCompleted, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                <TouchableOpacity style={{flex: 1}} activeOpacity={0.85} onPress={() => handleTaskPress(task)}>
                                    <Text style={styles.cardTitle}>{task.title}</Text>
                                    <Text style={styles.cardSubtitle}>{subtitleParts.join(' • ')}</Text>
                                    {task.priority ? <Text style={styles.cardPriority}>Prioridade: {task.priority}</Text> : null}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
                                    <MaterialIcons name="delete" size={22} color="#e57373" />
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                    {filtered.length === 0 && (
                        <Text style={styles.emptyState}>Nenhuma tarefa encontrada.</Text>
                    )}

                    <View style={styles.bottomSpacing} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#f39b97',
    },
    panel: {
        flex: 1,
        backgroundColor: '#f39b97',
        paddingVertical: 8,
        width: '100%',
    },
    content: {
        flexGrow: 1,
        paddingVertical: 26,
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        color: "#fff",
        textAlign: "center",
        marginBottom: 18,
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: '#f6cfcf',
        paddingVertical: 11,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButtonText: {
        color: '#6b3f3f',
        fontSize: 15,
        fontWeight: '600',
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
    cardCompleted: {
        opacity: 0.6,
    },
    cardTitle: {
        color: '#6b3f3f',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    cardSubtitle: {
        color: '#6b3f3f',
        fontSize: 13,
    },
    cardPriority: {
        color: '#a13d3a',
        fontSize: 13,
        marginTop: 6,
        fontWeight: '500',
    },
    emptyState: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 10,
    },
    bottomSpacing: {
        height: 24,
    },
    deleteButton: {
        marginLeft: 10,
        backgroundColor: '#fadcd9',
        borderRadius: 20,
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
