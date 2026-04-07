import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const LOCAL_USER = {
  email: 'ricardo.lima@ideen.tech',
  password: 'asd123',
  name: 'Ricardo Lima',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signIn: (email: string, password: string) => {
    set({ isLoading: true, error: null });

    if (email === LOCAL_USER.email && password === LOCAL_USER.password) {
      set({
        user: { id: '1', email: LOCAL_USER.email, name: LOCAL_USER.name },
        isLoading: false,
        error: null,
      });
    } else {
      set({
        user: null,
        isLoading: false,
        error: 'E-mail ou senha incorretos',
      });
    }
  },

  signOut: () => {
    set({ user: null, isLoading: false, error: null });
  },
}));
