import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      toast({
        title: 'Login realizado!',
        description: 'Bem-vindo de volta.',
      });
    } catch (error: unknown) {
      const raw = error instanceof Error ? error.message : 'Erro inesperado';
      const message = raw === 'Invalid login credentials' ? 'Email ou senha incorretos.' : raw;
      toast({
        title: 'Erro no login',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      toast({
        title: 'Conta criada!',
        description: 'Você já pode fazer login.',
      });
    } catch (error: unknown) {
      const raw = error instanceof Error ? error.message : 'Erro inesperado';
      const message = raw.includes('already registered') ? 'Este email já está cadastrado.' : raw;
      toast({
        title: 'Erro no cadastro',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: 'Logout realizado!',
        description: 'Até logo.',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro inesperado';
      toast({
        title: 'Erro no logout',
        description: message,
        variant: 'destructive',
      });
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!session,
  };
};
