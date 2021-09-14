import { Provider } from '@supabase/gotrue-js';
import { supabase } from './supabaseClient';

export const signIn = async (email: string, password: string) => {
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

const signInWithProvider = async (provider: Provider) => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: provider,
  });
  console.log(user, session, error);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
};

export const user = supabase.auth.user();

export default signInWithProvider;
