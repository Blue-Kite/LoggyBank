import { getReviewById } from '@/actions/review';
import { Review } from '@/types/types';
import { useEffect, useState } from 'react';

export const useReviewDetailController = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState<Review | null>(null);

  const onGetReview = async () => {
    setLoading(true);
    try {
      const result = await getReviewById(Number(id));
      if (result) {
        setReview(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetReview();
  }, []);

  return {
    loading,
    review,
  };
};
