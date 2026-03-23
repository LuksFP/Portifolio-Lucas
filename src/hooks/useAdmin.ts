import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useAdmin = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isAuthenticated || !user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (roleError) throw roleError;

        if (roleData) {
          setIsAdmin(true);
          setLoading(false);
          return;
        }

        // If no role exists, check if user email is in admin_emails
        const { data: emailData, error: emailError } = await supabase
          .from('admin_emails')
          .select('email')
          .eq('email', user.email)
          .maybeSingle();

        if (emailError) throw emailError;

        if (emailData) {
          // Auto-assign admin role to preapproved email
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({ user_id: user.id, role: 'admin' });

          if (!insertError) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [user, isAuthenticated, authLoading]);

  return { isAdmin, loading: loading || authLoading };
};
