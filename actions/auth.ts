'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error);
    return { error: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }

  return { error: 'Failed to get authentication URL' };
}

export async function signInWithGithub() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with GitHub:', error);
    return { error: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }

  return { error: 'Failed to get authentication URL' };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/auth');
}
