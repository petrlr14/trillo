import { supabase } from './supabaseClient';

const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  });
  console.log(user, session, error);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
};

export const user = supabase.auth.user();

export default signInWithGoogle;
