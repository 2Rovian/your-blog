import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface AuthState {
  user: {
    id: string;
    username: string;
  } | null;
  token: string | null;
  login: (user: { id: string; username: string }, token: string) => void;
  logout: () => void;
}

// Adapter para o localStorage
const storage: PersistStorage<AuthState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value)); // 🔹 Garante a serialização
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // Nome da chave no localStorage
      storage, // Usa o adaptador criado
    }
  )
);