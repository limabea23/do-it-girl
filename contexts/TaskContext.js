

import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas salvas ao iniciar
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('tasks');
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) setTasks(parsed);
        }
      } catch (e) {
        console.warn('Erro ao carregar tarefas:', e);
      }
    })();
  }, []);

  // Salvar tarefas sempre que mudarem
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.warn('Erro ao salvar tarefas:', e);
      }
    })();
  }, [tasks]);

  function addTask(task) {
    setTasks((prev) => [...prev, task]);
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function updateTask(id, updatedTask) {
    setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}


export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
