import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { translateSupabaseError } from '../utils/errorTranslation';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: authData, error: authError } = await supabase.auth
        .signInWithPassword({ email, password });

      if (authError) throw authError;

      if (!authData.user) throw new Error('No user data returned');

      const { data: profile, error: profileError } = await supabase
        .from('user_profile')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      set({
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          name: profile.name
        },
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: translateSupabaseError(error instanceof Error ? error.message : 'An error occurred'),
        isLoading: false 
      });
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data: authData, error: authError } = await supabase.auth
        .signUp({ email, password });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned');

      const { error: profileError } = await supabase
        .from('user_profile')
        .insert([{ id: authData.user.id, email, name }]);

      if (profileError) throw profileError;

      set({
        user: {
          id: authData.user.id,
          email,
          name
        },
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: translateSupabaseError(error instanceof Error ? error.message : 'An error occurred'),
        isLoading: false 
      });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ 
        error: translateSupabaseError(error instanceof Error ? error.message : 'An error occurred'),
        isLoading: false 
      });
    }
  }
}));