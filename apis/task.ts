'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';

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

export const createTask = async () => {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from('task')
    .insert({
      title: '새로운 태스크',
      timeline: [
        {
          startTime: '11:00',
          endTime: '12:00',
          description: '프로젝트 문서 작성',
        },
        {
          startTime: '13:00',
          endTime: '14:00',
          description: '팀 회의',
        },
      ],
    })
    .select();

  return data;
};

export const updateTask = async (id: number, title: string) => {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from('task')
    .update({
      title: title,
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
