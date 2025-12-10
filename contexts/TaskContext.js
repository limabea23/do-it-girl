import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TaskContext = createContext(null)

const seedTasksLuana = [
  {
    id: 'seed-1',
    title: 'Estudar Geografia',
    date: '2025-11-25',
    time: '14:40',
    listName: 'Escola',
    priority: 'Alta',
    description: 'Revisar capitulos 3 e 4 do livro.',
    goal: 'Garantir nota alta na avaliacao.',
    subtasks: [
      { id: 'seed-1-sub-1', title: 'Pesquisar mapas', completed: false },
      { id: 'seed-1-sub-2', title: 'Separar materiais', completed: true },
    ],
    completed: false,
    createdAt: '2025-11-01T10:00:00.000Z',
  },
  {
    id: 'seed-2',
    title: 'Rotina de skincare',
    date: '2025-12-01',
    time: '20:00',
    listName: 'Autocuidado',
    priority: 'Media',
    description: '',
    goal: '',
    subtasks: [
      { id: 'seed-2-sub-1', title: 'Limpar o rosto', completed: false },
      { id: 'seed-2-sub-2', title: 'Aplicar hidratante', completed: false },
    ],
    completed: false,
    createdAt: '2025-11-15T12:30:00.000Z',
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { getUser } = await import('../utils/storage');
        const user = await getUser();
        if (user && user.id) {
          setUserId(user.id);
          const data = await AsyncStorage.getItem(`tasks_${user.id}`);
          if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) setTasks(parsed);
            else setTasks([]);
          } else {
            if (user.id === '5') setTasks(seedTasksLuana);
            else setTasks([]);
          }
        } else {
          setUserId(null);
          setTasks([]);
        }
      } catch (e) {
        console.warn('Erro ao carregar tarefas:', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!userId) return;
      try {
        await AsyncStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
      } catch (e) {
        console.warn('Erro ao salvar tarefas:', e);
      }
    })();
  }, [tasks, userId]);

  const addTask = useCallback((taskData) => {
    const timestamp = Date.now().toString()
    const preparedSubtasks = (taskData.subtasks || []).map((title, index) => ({
      id: `${timestamp}-sub-${index}`,
      title,
      completed: false,
    }))

    const newTask = {
      id: `task-${timestamp}`,
      title: taskData.title,
      date: taskData.date || '',
      time: taskData.time || '',
      listName: taskData.listName || '',
      priority: taskData.priority || '',
      description: taskData.description || '',
      goal: taskData.goal || '',
      subtasks: preparedSubtasks,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks((current) => [newTask, ...current])
    return newTask
  }, [])

  const updateTask = useCallback((taskId, updates) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, ...updates }
          : task,
      ),
    )
  }, [])

  const toggleSubtask = useCallback((taskId, subtaskId) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        const subtasks = task.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask,
        )

        return { ...task, subtasks }
      }),
    )
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }, []);

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, toggleSubtask, deleteTask }),
    [tasks, addTask, updateTask, toggleSubtask, deleteTask],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider')
  }
  return context
}
