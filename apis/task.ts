'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { TaskParams } from '@/types/types';

export const getTasks = async () => {
  const supabase = createSupabaseBrowserClient();
  let { data } = await supabase
    .from('task')
    .select('*')
    .is('deleted_at', null)
    .order('id', { ascending: false });
  return data;
};

export const getTaskById = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  let { data } = await supabase
    .from('task')
    .select('*')
    .is('deleted_at', null)
    .eq('id', id)
    .single();
  return data;
};

export const getTasksBySearch = async (term: string) => {
  const supabase = createSupabaseBrowserClient();
  let { data } = await supabase
    .from('task')
    .select('*')
    .is('deleted_at', null)
    .ilike('title', `%${term}%`)
    .order('id', { ascending: false })
    .limit(100);
  return data;
};

export const createTask = async ({
  title,
  timeline,
  todoDescription,
  doneDescription,
}: TaskParams) => {
  const supabase = createSupabaseBrowserClient();

  const { data } = await supabase
    .from('task')
    .insert({
      title,
      timeline: timeline,
      todo_description: todoDescription,
      done_description: doneDescription,
    })
    .select();

  return data;
};

export const updateTask = async (
  id: number,
  { title, timeline, todoDescription, doneDescription }: TaskParams,
) => {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from('task')
    .update({
      title,
      timeline: timeline,
      todo_description: todoDescription,
      done_description: doneDescription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return data;
};

export const deleteTask = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from('task')
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return data;
};
