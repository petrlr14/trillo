import { Provider } from '@supabase/gotrue-js';
import { supabase } from './supabaseClient';

interface Credentials {
  email: string;
  password: string;
}

export const signUp = async ({ email, password }: Credentials) => {
  try {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  } catch (e) {
    throw e;
  }
};

export const signIn = async ({ email, password }: Credentials) => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
  } catch (e) {
    throw e;
  }
};

export const signInWithProvider = async (provider: Provider) => {
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: provider,
    },
    { redirectTo: '/dashboard' }
  );
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
};

export const getSession = supabase.auth.session();

export const getUser = supabase.auth.user();
