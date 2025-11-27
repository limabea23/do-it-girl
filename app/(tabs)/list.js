import React from 'react'
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

const items = [
	{ id: '1', text: 'Passar tônico e hidratante facial', icon: '' },
	{ id: '2', text: 'Fazer unhas', icon: '✏️' },
	{ id: '3', text: 'Fazer máscara no cabelo', icon: '♡' },
	{ id: '4', text: '', icon: '📄' },
	{ id: '5', text: 'Fazer skincare noturno', icon: '' },
]

export default function List() {
	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.panel}>
				<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
					<Text style={styles.title}>Minha Lista e Tarefas!</Text>

					{items.map((item) => (
						<TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
							<Text style={styles.cardText}>{item.icon ? item.icon + '  ' : ''}{item.text || ' '}</Text>
						</TouchableOpacity>
					))}

					<View style={{ height: 24 }} />
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: '#e6eef0',
		alignItems: 'center',
	},
	panel: {
		width: '92%',
		backgroundColor: '#f39b97',
		borderRadius: 8,
		paddingVertical: 18,
		paddingHorizontal: 14,
		marginTop: 12,
		flex: 1,
		alignSelf: 'center',
	},
	smallTitle: {
		color: '#4a90e2',
		fontSize: 13,
		marginBottom: 6,
	},
	content: {
		paddingBottom: 30,
	},
	title: {
		fontSize: 26,
		color: '#fff',
		textAlign: 'center',
		marginBottom: 18,
		fontFamily: 'Georgia',
		textShadowColor: 'rgba(0,0,0,0.15)',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	card: {
		backgroundColor: '#f6cfcf',
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderRadius: 12,
		marginVertical: 8,
		width: '90%',
		alignSelf: 'center',
		// shadow for iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.12,
		shadowRadius: 4,
		// elevation for Android
		elevation: 2,
	},
	cardText: {
		color: '#6b3f3f',
		fontSize: 16,
	},
})

