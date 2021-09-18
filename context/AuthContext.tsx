import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/dist/client/router';
import { createContext, FC, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

type AuthContextType = {
  user?: User;
  session?: Session;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FC = (props) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();
  const router = useRouter();

  useEffect(() => {
    const currentSession = supabase.auth.session();
    if (currentSession) {
      setSession(currentSession);
      setUser(currentSession?.user);
    }

    const { data } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (event === 'SIGNED_OUT') {
          router.replace('/');
        }
        if (event === 'SIGNED_IN') {
          router.replace('/dashboard');
        }
        setSession(newSession);
        setUser(newSession?.user);
        await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({ event, session: newSession }),
        });
      }
    );

    return () => data?.unsubscribe();
  }, []);

  console.log(user);

  return (
    <AuthContext.Provider value={{ session, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
