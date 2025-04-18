'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { InsightParams } from '@/types/types';

export const getInsights = async () => {
  const supabase = await createSupabaseServerClient();

  let { data } = await supabase
    .from('insight')
    .select('*')
    .is('deleted_at', null)
    .order('id', { ascending: false });
  return data;
};

export const getInsightById = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  let { data } = await supabase
    .from('insight')
    .select('*')
    .is('deleted_at', null)
    .eq('id', id)
    .single();
  return data;
};

export const getInsightsBySearch = async (term: string) => {
  const supabase = await createSupabaseServerClient();

  let { data } = await supabase
    .from('insight')
    .select('*')
    .is('deleted_at', null)
    .ilike('title', `%${term}%`)
    .order('id', { ascending: false })
    .limit(100);
  return data;
};

export const createInsight = async ({
  title,
  content,
  user_id,
}: InsightParams & {
  user_id: string;
}) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('insight')
    .insert({
      title,
      content,
      user_id: user_id,
    })
    .select();

  return data;
};

export const updateInsight = async (
  id: number,
  { title, content }: InsightParams,
) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('insight')
    .update({
      title,
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return data;
};

export const deleteInsight = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('insight')
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return data;
};
