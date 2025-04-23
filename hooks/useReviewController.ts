import { getUser } from '@/actions/auth';
import {
  createReview,
  deleteReview,
  getReviews,
  getReviewsBySearch,
  updateReview,
} from '@/actions/review';
import { Review, ReviewParams } from '@/types/types';
import { useEffect, useState } from 'react';

export const useReviewController = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  const onGetReviews = async () => {
    setLoading(true);
    try {
      const result = await getReviews();
      if (result) {
        setReviews(result);
      }
    } catch (error) {
      console.error('Failed to get reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchReviews = async (term: string) => {
    if (term) {
      const result = await getReviewsBySearch(term);
      if (result) {
        setReviews(result);
      }
    } else {
      await onGetReviews();
    }
  };

  const onCreateReview = async ({ title, content }: ReviewParams) => {
    const user = await getUser();

    if (user) {
      try {
        await createReview({
          title,
          content,
          user_id: user.id,
        });

        await onGetReviews();
      } catch (error) {
        console.error('Failed to create review:', error);
      }
    }
  };

  const onUpdateReview = async (
    id: number,
    { title, content }: ReviewParams,
  ) => {
    try {
      await updateReview(id, {
        title,
        content,
      });

      await onGetReviews();
    } catch (error) {
      console.error('Failed to update review:', error);
      return false;
    }
  };

  const onDeleteReview = async (id: number) => {
    await deleteReview(id);
    await onGetReviews();
  };

  useEffect(() => {
    onGetReviews();
  }, []);

  return {
    loading,
    reviews,
    onSearchReviews,
    onDeleteReview,
    onCreateReview,
    onUpdateReview,
  };
};
