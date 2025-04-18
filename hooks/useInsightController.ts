import { getUser } from '@/actions/auth';
import {
  createInsight,
  deleteInsight,
  updateInsight,
  getInsights,
  getInsightsBySearch,
} from '@/actions/insight';
import { Insight, InsightParams } from '@/types/types';
import { useEffect, useState } from 'react';

export const useInsightController = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<Insight[]>([]);

  const onGetInsights = async () => {
    setLoading(true);
    try {
      const result = await getInsights();
      if (result) {
        setInsights(result);
      }
    } catch (error) {
      console.error('Failed to get tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchInsights = async (term: string) => {
    if (term) {
      const result = await getInsightsBySearch(term);
      if (result) {
        setInsights(result);
      }
    } else {
      await onGetInsights();
    }
  };

  const onCreateInsight = async ({ title, content }: InsightParams) => {
    const user = await getUser();

    if (user) {
      try {
        await createInsight({
          title,
          content,
          user_id: user.id,
        });

        await onGetInsights();
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
  };

  const onUpdateInsight = async (
    id: number,
    { title, content }: InsightParams,
  ) => {
    try {
      await updateInsight(id, {
        title,
        content,
      });

      await onGetInsights();
    } catch (error) {
      console.error('Failed to update task:', error);
      return false;
    }
  };

  const onDeleteInsight = async (id: number) => {
    await deleteInsight(id);
    await onGetInsights();
  };

  useEffect(() => {
    onGetInsights();
  }, []);

  return {
    loading,
    insights,
    onSearchInsights,
    onDeleteInsight,
    onCreateInsight,
    onUpdateInsight,
  };
};
