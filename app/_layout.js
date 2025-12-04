import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { TaskProvider } from "../contexts/TaskContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Slot />
      </TaskProvider>
    </AuthProvider>
  );
}
