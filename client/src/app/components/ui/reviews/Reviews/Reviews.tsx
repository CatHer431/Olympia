import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getReviewsByRoomId } from '../../../../store/reviews';
import { getCurrentUserId } from '../../../../store/users';
import declOfNum from '../../../../utils/declOfNum';
import { ReviewsForm } from '../../forms';
import ReviewsList from '../ReviewsList';

const Reviews = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const reviews = useSelector(getReviewsByRoomId(roomId));

  const currentUserId = useSelector(getCurrentUserId());

  const sortedReviews = reviews.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  const totalReviewsCount = sortedReviews.length;

  return (
    <>
      {reviews.length > 0 && (
        <section className='reviews'>
          <div className='reviews-title'>
            <h2 className='room-info__card-title'>Reviews of room visitors</h2>
            <span>{`${totalReviewsCount} ${declOfNum(totalReviewsCount, ['review', 'reviews', 'reviews'])}`}</span>
          </div>
          {totalReviewsCount > 0 && <ReviewsList reviews={sortedReviews} />}
        </section>
      )}
      {currentUserId && (
        <section className='reviews-form'>
          <h2>Leave feedback</h2>
          <ReviewsForm />
        </section>
      )}
    </>
  );
};

export default Reviews;
