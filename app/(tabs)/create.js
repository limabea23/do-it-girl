import React, { useState } from 'react'
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useTasks } from '../../contexts/TaskContext'

export default function CreateTaskScreen() {
	const navigation = useNavigation()
	const { addTask } = useTasks()

	const [title, setTitle] = useState('')
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [listName, setListName] = useState('')
	const [priority, setPriority] = useState('')
	const [description, setDescription] = useState('')
	const [goal, setGoal] = useState('')
	const [subtaskInput, setSubtaskInput] = useState('')
	const [subtasks, setSubtasks] = useState([])

	const handleAddSubtask = () => {
		const trimmed = subtaskInput.trim()
		if (!trimmed) {
			return
		}
		setSubtasks((current) => [...current, trimmed])
		setSubtaskInput('')
	}

	const handleRemoveSubtask = (index) => {
		setSubtasks((current) => current.filter((_, itemIndex) => itemIndex !== index))
	}

	const handleSaveTask = () => {
		const trimmedTitle = title.trim()
		if (!trimmedTitle) {
			Alert.alert('Aviso', 'Informe um titulo para a tarefa.')
			return
		}

		const createdTask = addTask({
			title: trimmedTitle,
			date: date.trim(),
			time: time.trim(),
			listName: listName.trim(),
			priority: priority.trim(),
			description: description.trim(),
			goal: goal.trim(),
			subtasks,
		})

		navigation.navigate('edit', { taskId: createdTask.id, feedback: 'created' })
	}

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.panel}>
					<Text style={styles.heading}>Criar nova tarefa</Text>

					<TextInput
						value={title}
						onChangeText={setTitle}
						placeholder="Titulo"
						placeholderTextColor="#ffdede"
						style={styles.input}
					/>

					<View style={styles.inlineGroup}>
						<TextInput
							value={date}
							onChangeText={setDate}
							placeholder="Data (AAAA-MM-DD)"
							placeholderTextColor="#ffdede"
							style={[styles.input, styles.halfInput]}
						/>
						<TextInput
							value={time}
							onChangeText={setTime}
							placeholder="Hora (HH:MM)"
							placeholderTextColor="#ffdede"
							style={[styles.input, styles.halfInput]}
						/>
					</View>

					<TextInput
						value={listName}
						onChangeText={setListName}
						placeholder="Lista"
						placeholderTextColor="#ffdede"
						style={styles.input}
					/>

					<TextInput
						value={priority}
						onChangeText={setPriority}
						placeholder="Prioridade"
						placeholderTextColor="#ffdede"
						style={styles.input}
					/>

					<TextInput
						value={description}
						onChangeText={setDescription}
						placeholder="Descricao"
						placeholderTextColor="#ffdede"
						style={[styles.input, styles.multiline]}
						multiline
					/>

					<TextInput
						value={goal}
						onChangeText={setGoal}
						placeholder="Meta"
						placeholderTextColor="#ffdede"
						style={[styles.input, styles.multiline]}
						multiline
					/>

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
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		flex: 1,
		backgroundColor: '#f39b97',
	},
	content: {
		flexGrow: 1,
		paddingVertical: 24,
		paddingHorizontal: 22,
	},
	panel: {
		flex: 1,
		backgroundColor: '#f39b97',
		borderRadius: 0,
		paddingVertical: 4,
		width: '100%',
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
	multiline: {
		minHeight: 80,
		textAlignVertical: 'top',
	},
	inlineGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	halfInput: {
		flex: 1,
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
})
