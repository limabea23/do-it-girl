import React, { useState } from 'react'
import { 
    SafeAreaView, View, Text, ScrollView, 
    TouchableOpacity, StyleSheet, TextInput 
} from 'react-native'

const items = [
    { id: '1', text: 'Passar tônico e hidratante facial', icon: '' },
    { id: '2', text: 'Fazer unhas', icon: '✏️' },
    { id: '3', text: 'Fazer máscara no cabelo', icon: '♡' },
    { id: '4', text: 'Fazer o trabalho da escola', icon: '📄' },
    { id: '5', text: 'Fazer skincare noturno', icon: '' },
    { id: '6', text: 'Ler um capítulo do meu livro favorito', icon: '📚' },
	{ id: '7', text: 'Organizar meu espaço de estudo', icon: '🧹' },
	{ id: '8', text: 'Praticar meditação por 10 minutos', icon: '🧘‍♀️' },
	{ id: '9', text: 'Planejar minhas refeições da semana', icon: '🍎' },
	{ id: '10', text: 'Fazer uma caminhada ao ar livre', icon: '🚶‍♀️' },
	{ id: '11', text: 'Assistir a um documentário interessante', icon: '🎥' },
	{ id: '12', text: 'Experimentar uma nova receita saudável', icon: '🍳' },
	{ id: '13', text: 'Escrever no meu diário de gratidão', icon: '📝' },
	{ id: '14', text: 'Fazer alongamentos matinais', icon: '🤸‍♀️' },
	{ id: '15', text: 'Ouvir meu podcast favorito', icon: '🎧' },
	{ id: '16', text: 'Planejar uma atividade divertida para o fim de semana', icon: '🎉' },
	{ id: '17', text: 'Fazer uma videochamada com um amigo', icon: '📱' },
	{ id: '18', text: 'Organizar minhas fotos no celular', icon: '📸' },
	{ id: '19', text: 'Fazer uma limpeza geral no quarto', icon: '🛏️' },
	{ id: '20', text: 'Praticar um hobby criativo', icon: '🎨' },
	{ id: '21', text: 'Planejar meus objetivos para o próximo mês', icon: '📅' },
	{ id: '22', text: 'Fazer uma pausa para um chá ou café', icon: '☕' },
	{ id: '23', text: 'Assistir a um filme inspirador', icon: '🍿' },
	{ id: '24', text: 'Fazer exercícios de respiração profunda', icon: '🌬️' },
	{ id: '25', text: 'Escrever uma carta para alguém especial', icon: '💌' },
    { id: '26', text: 'Revisar minhas finanças pessoais', icon: '💰' },
	{ id: '27', text: 'Fazer um planejamento semanal', icon: '🗓️' },
	{ id: '28', text: 'Experimentar uma nova atividade física', icon: '🏋️‍♀️' },
	{ id: '29', text: 'Fazer uma lista de coisas pelas quais sou grata', icon: '🙏' },
	{ id: '30', text: 'Desconectar das redes sociais por um dia', icon: '📵' },
	{ id: '31', text: 'Fazer um piquenique no parque', icon: '🧺' },
]

export default function List() {
    const [search, setSearch] = useState("")

    // aplica filtro
    const filtered = items.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.panel}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    
                    <Text style={styles.title}>Minha Lista e Tarefas!</Text>

                    {/* Campo de busca */}
                    <TextInput
                        placeholder="Buscar tarefa..."
                        placeholderTextColor="#ffdede"
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />

                    {filtered.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
                            <Text style={styles.cardText}>
                                {item.icon ? item.icon + '  ' : ''}
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {filtered.length === 0 && (
                        <Text style={{ textAlign: 'center', color: '#fff', marginTop: 10 }}>
                            Nenhuma tarefa encontrada.
                        </Text>
                    )}

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
    input: {
        backgroundColor: '#f6c0c0',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        color: '#6b3f3f',
        marginBottom: 10,
        fontSize: 15,
    },
    card: {
        backgroundColor: '#f6cfcf',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        color: '#6b3f3f',
        fontSize: 16,
    },
})
