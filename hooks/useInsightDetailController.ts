import { getInsightById } from '@/actions/insight';

import { Insight, Task } from '@/types/types';
import { useEffect, useState } from 'react';

export const useInsightDetailController = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<Insight | null>(null);

  const onGetInsight = async () => {
    setLoading(true);
    try {
      const result = await getInsightById(Number(id));
      if (result) {
        setInsight(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetInsight();
  }, []);

  return {
    loading,
    insight,
  };
};
