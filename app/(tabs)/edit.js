import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

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

export default function EditTaskScreen() {
	const navigation = useNavigation()
	const route = useRoute()
	const { tasks, updateTask, toggleSubtask } = useTasks()

	const taskId = route.params?.taskId || route.params?.tarefa?.id || null
	const fallbackTask = route.params?.tarefa

	const taskFromContext = useMemo(() => {
		if (!taskId) {
			return null
		}
		return tasks.find((item) => item.id === taskId) || null
	}, [tasks, taskId])

	const task = taskFromContext || fallbackTask || null

	const [description, setDescription] = useState(task?.description || '')
	const [goal, setGoal] = useState(task?.goal || '')
	const [completed, setCompleted] = useState(task?.completed || false)
	const [statusMessage, setStatusMessage] = useState('')
	const feedbackTimer = useRef(null)

	const showFeedback = useCallback((message) => {
		setStatusMessage(message)
		if (feedbackTimer.current) {
			clearTimeout(feedbackTimer.current)
		}
		feedbackTimer.current = setTimeout(() => {
			setStatusMessage('')
			feedbackTimer.current = null
		}, 2500)
	}, [])

	useEffect(() => {
		setDescription(task?.description || '')
		setGoal(task?.goal || '')
		setCompleted(task?.completed || false)
	}, [task?.id, task?.description, task?.goal, task?.completed])

	useEffect(() => {
		if (route.params?.feedback) {
			const message =
				route.params.feedback === 'created'
					? 'Tarefa criada com sucesso!'
					: String(route.params.feedback)
			showFeedback(message)
			navigation.setParams({ feedback: undefined })
		}
	}, [route.params?.feedback, navigation, showFeedback])

	useEffect(() => {
		return () => {
			if (feedbackTimer.current) {
				clearTimeout(feedbackTimer.current)
			}
		}
	}, [])

	if (!task) {
		return (
			<SafeAreaView style={styles.safe}>
				<View style={styles.emptyPanel}>
					<Text style={styles.emptyText}>Tarefa nao encontrada.</Text>
					<TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('list')}>
						<Text style={styles.backButtonText}>Voltar</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}

	const subtasks = taskFromContext ? taskFromContext.subtasks : task.subtasks || []

	const handleToggleComplete = () => {
		const next = !completed
		setCompleted(next)
		if (taskFromContext) {
			updateTask(taskFromContext.id, { completed: next })
		}
		showFeedback(next ? 'Tarefa concluida!' : 'Tarefa reaberta.')
	}

	const handleSaveInfo = () => {
		if (taskFromContext) {
			updateTask(taskFromContext.id, {
				description: description.trim(),
				goal: goal.trim(),
			})
		}
		showFeedback('Informacoes salvas!')
	}

	const handleSubtaskToggle = (subtaskId) => {
		if (taskFromContext) {
			toggleSubtask(taskFromContext.id, subtaskId)
			showFeedback('Subtarefa atualizada!')
		}
	}

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				<View style={styles.panel}>
					<Text style={styles.topTitle}>Minha Lista e Tarefas!</Text>
					<View style={styles.headerRow}>
						<TouchableOpacity onPress={() => navigation.navigate('list')}>
							<Text style={styles.backSymbol}>{'<'}</Text>
						</TouchableOpacity>
						<Text style={styles.headerTitle}>Editar tarefa</Text>
					</View>

					{statusMessage ? (
						<View style={styles.feedbackBanner}>
							<Text style={styles.feedbackText}>{statusMessage}</Text>
						</View>
					) : null}

					<TouchableOpacity style={styles.completeButton} onPress={handleToggleComplete}>
						<Text style={styles.completeButtonText}>
							{completed ? 'Reabrir tarefa' : 'Concluir tarefa'}
						</Text>
					</TouchableOpacity>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>{task.title}</Text>
						<View style={styles.metaBlock}>
							<Text style={styles.metaText}>Data: {formatDate(task.date)}</Text>
							<Text style={styles.metaText}>Hora: {formatTime(task.time)}</Text>
							{task.listName ? <Text style={styles.metaText}>Lista: {task.listName}</Text> : null}
							{task.priority ? <Text style={styles.metaText}>Prioridade: {task.priority}</Text> : null}
						</View>
					</View>

					<View style={styles.section}>
						<Text style={styles.fieldLabel}>Descrição</Text>
						<TextInput
							value={description}
							onChangeText={setDescription}
							style={styles.textArea}
							placeholder="Digite..."
							placeholderTextColor="#ffdede"
							multiline
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.fieldLabel}>Meta</Text>
						<TextInput
							value={goal}
							onChangeText={setGoal}
							style={styles.textArea}
							placeholder="Digite..."
							placeholderTextColor="#ffdede"
							multiline
						/>
					</View>

					<TouchableOpacity style={styles.saveButton} onPress={handleSaveInfo}>
						<Text style={styles.saveButtonText}>Salvar informações</Text>
					</TouchableOpacity>

					<View style={styles.section}>
						<Text style={styles.subtaskHeading}>Subtarefas</Text>
						{subtasks.length === 0 && <Text style={styles.metaText}>Nenhuma subtarefa cadastrada.</Text>}
						{subtasks.map((subtask) => (
							<TouchableOpacity
								key={subtask.id}
								style={styles.subtaskRow}
								onPress={() => handleSubtaskToggle(subtask.id)}
								activeOpacity={taskFromContext ? 0.8 : 1}
							>
								<View style={[styles.checkbox, subtask.completed && styles.checkboxChecked]}>
									{subtask.completed ? <Text style={styles.checkboxSymbol}>✓</Text> : null}
								</View>
								<Text style={[styles.subtaskText, subtask.completed && styles.subtaskCompleted]}>{subtask.title}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#f39b97',
    },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 26,
        paddingHorizontal: 22,
    },
    panel: {
        flex: 1,
        backgroundColor: '#f39b97',
        borderRadius: 0,
        paddingVertical: 6,
        width: '100%',
    },
    topTitle: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backSymbol: {
        color: '#fff',
        fontSize: 20,
        marginRight: 12,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    completeButton: {
        backgroundColor: '#f6cfcf',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1.4,
        borderColor: '#d97a7a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Aumenta a altura da sombra
        shadowOpacity: 0.3, // Torna a sombra mais visível
        shadowRadius: 5, // Aumenta o raio da sombra
        elevation: 4, // Sombra mais forte para Android
    },
    completeButtonText: {
        color: '#6b3f3f',
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginBottom: 18,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
    },
    metaBlock: {
        backgroundColor: '#f6cfcf',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1.4,
        borderColor: '#d97a7a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Aumenta a altura da sombra
        shadowOpacity: 0.3, // Torna a sombra mais visível
        shadowRadius: 5, // Aumenta o raio da sombra
        elevation: 4, // Sombra mais forte para Android
    },
    metaText: {
        color: '#6b3f3f',
        fontSize: 14,
        marginBottom: 4,
    },
    fieldLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    textArea: {
        backgroundColor: '#f6cfcf',
        borderRadius: 12,
        padding: 12,
        color: '#6b3f3f',
        fontSize: 14,
        minHeight: 80,
        textAlignVertical: 'top',
        borderWidth: 1.4,
        borderColor: '#d97a7a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Aumenta a altura da sombra
        shadowOpacity: 0.3, // Torna a sombra mais visível
        shadowRadius: 5, // Aumenta o raio da sombra
        elevation: 4, // Sombra mais forte para Android
    },
    saveButton: {
        backgroundColor: '#f6cfcf',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1.4,
        borderColor: '#d97a7a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Aumenta a altura da sombra
        shadowOpacity: 0.3, // Torna a sombra mais visível
        shadowRadius: 5, // Aumenta o raio da sombra
        elevation: 4, // Sombra mais forte para Android
    },
    saveButtonText: {
        color: '#6b3f3f',
        fontSize: 15,
        fontWeight: '600',
    },
    subtaskHeading: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    subtaskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#f6cfcf',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#f6cfcf',
    },
    checkboxSymbol: {
        color: '#6b3f3f',
        fontSize: 16,
        fontWeight: '700',
    },
    subtaskText: {
        color: '#fff',
        fontSize: 15,
        flex: 1,
    },
    subtaskCompleted: {
        opacity: 0.6,
        textDecorationLine: 'line-through',
    },
    emptyPanel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#6b3f3f',
        fontSize: 16,
        marginBottom: 12,
    },
    backButton: {
        backgroundColor: '#f39b97',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    feedbackBanner: {
        backgroundColor: '#f6cfcf',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 14,
    },
    feedbackText: {
        color: '#6b3f3f',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});