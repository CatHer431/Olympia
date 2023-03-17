import React from 'react';
import { useSelector } from 'react-redux';
import { getLikesByUserId } from '../../../../store/likes';
import { getReviewsByIds } from '../../../../store/reviews';
import { getCurrentUserId } from '../../../../store/users';
import ReviewsList from '../../reviews/ReviewsList';

const ProfileLikes = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const likes = useSelector(getLikesByUserId(currentUserId || 'not found'));
  const reviewsIds = likes.map(el => el.reviewId);
  const reviews = useSelector(getReviewsByIds(reviewsIds));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px' }}>The reviews that you liked</h1>
      {reviews.length > 0 ? <ReviewsList reviews={reviews} /> : <h3>The list is empty</h3>}
    </div>
  );
};

export default ProfileLikes;
