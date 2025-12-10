import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUser,
  saveUser,
  removeUser,
  validateLogin,
  saveNewUser,
} from "../utils/storage";
import { useRouter, useSegments } from "expo-router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const defaultUsers = [
      {
        id: "1",
        username: "Leme",
        email: "leme@gmail.com",
        password: "leme123",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        username: "Maria",
        email: "maria@gmail.com",
        password: "maria123",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        username: "Valentim",
        email: "valentim@gmail.com",
        password: "valentim123",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        username: "Bealima",
        email: "bealima@gmail.com",
        password: "bealima123",
        createdAt: new Date().toISOString(),
      },
      {
        id: "5",
        username: "Luana",
        email: "luana@gmail.com",
        password: "luana123",
        createdAt: new Date().toISOString(),
      },
    ];

    const seedDefaultUsers = async () => {
      const { getAllUsers, saveNewUser } = await import("../utils/storage");
      const users = await getAllUsers();
      for (const user of defaultUsers) {
        const exists = users.some(u => u.username === user.username);
        if (!exists) {
          await saveNewUser(user);
        }
      }
    };
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    seedDefaultUsers().then(loadUser);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/signin");
    } else if (user && inAuthGroup) {
      router.replace("/home");
    }
  }, [user, segments, isLoading]);

  const loadUser = async () => {
    try {
      const storedUser = await getUser();
      setUser(storedUser);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (username, password) => {
    try {
      const result = await validateLogin(username, password);

      if (result.success) {
        setUser(result.user);
        await saveUser(result.user);
        return { success: true };
      }

      return { success: false, message: result.message };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return { success: false, message: "Erro ao fazer login" };
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      const result = await saveNewUser(newUser);

      if (result.success) {
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        await saveUser(userWithoutPassword);
        return { success: true };
      }

      return { success: false, message: result.message };
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      return { success: false, message: "Erro ao cadastrar usuário" };
    }
  };

  const signOut = async () => {
    try {
      await removeUser();
      setUser(null);
      router.replace("/signin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
