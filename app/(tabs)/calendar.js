import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Calendário de Eventos</Text>
                {selectedDate ? (
                    <Text style={styles.selectedDate}>
                        Data selecionada: {selectedDate}
                    </Text>
                ) : (
                    <Text style={styles.info}>Selecione uma data no calendário abaixo.</Text>
                )}
            </View>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    theme={{
                        selectedDayBackgroundColor: "#007AFF",
                        todayTextColor: "#007AFF",
                        arrowColor: "#007AFF",
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#007AFF",
        marginBottom: 10,
    },
    selectedDate: {
        fontSize: 16,
        color: "#333",
        marginTop: 10,
    },
    info: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
    },
    calendarContainer: {
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        paddingTop: 10,
        backgroundColor: "#fff",
    },
});