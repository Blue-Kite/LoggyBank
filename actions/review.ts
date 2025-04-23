'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ReviewParams } from '@/types/types';

export const getReviews = async () => {
  const supabase = await createSupabaseServerClient();

  let { data } = await supabase
    .from('review')
    .select('*')
    .is('deleted_at', null)
    .order('id', { ascending: false });
  return data;
};

export const getReviewById = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  let { data } = await supabase
    .from('review')
    .select('*')
    .is('deleted_at', null)
    .eq('id', id)
    .single();
  return data;
};

export const getReviewsBySearch = async (term: string) => {
  const supabase = await createSupabaseServerClient();

  let { data } = await supabase
    .from('review')
    .select('*')
    .is('deleted_at', null)
    .ilike('title', `%${term}%`)
    .order('id', { ascending: false })
    .limit(100);
  return data;
};

export const createReview = async ({
  title,
  content,
  user_id,
}: ReviewParams & {
  user_id: string;
}) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('review')
    .insert({
      title,
      content,
      user_id: user_id,
    })
    .select();

  return data;
};

export const updateReview = async (
  id: number,
  { title, content }: ReviewParams,
) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('review')
    .update({
      title,
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return data;
};

export const deleteReview = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('review')
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return data;
};
