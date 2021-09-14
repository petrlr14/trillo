import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = supabase.auth.api.getUser(req.headers.token as string);
  console.log(user);
  if (user) return res.status(200).json(user);
  return res.status(400).json({ error: 'not found' });
};

export default getUser;
