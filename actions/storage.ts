'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function uploadFile(file: File) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .upload(file.name, file, { upsert: true });

  if (error) {
    throw Error('Error file uploading in with Supabase', error);
  }

  return data;
}

export async function deleteFile(fileName: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .remove([fileName]);

  if (error) {
    throw Error('Error file delete in with Supabase', error);
  }

  return data;
}
