import { Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useMockData } from '../../../../hooks';
import { getUserById } from '../../../../store/users';
import { getDateDDMMYYYY } from '../../../../utils/formatDate';
import config from '../../../../config.json';

const UserProfile = ({ userId }: { userId: string }) => {
  const currentUser = useSelector(getUserById(userId));

  const { error, initialize, progress, status } = useMockData();

  const isFireBase = currentUser?.role === 'admin' && config.isFireBase;

  const handleClick = () => {
    initialize();
  };
  if (currentUser) {
    return (
      <main className='main-profile__page'>
        <h1 className='visually-hidden'>User profile</h1>
        <h2>User page {`${currentUser?.firstName} ${currentUser?.secondName}`}</h2>
        <div className='user-card'>
          <div>
            <img className='user-card__avatarPhoto' src={currentUser?.avatarPhoto} alt='avatarPhoto' />
          </div>
          <Paper className='user-card__content'>
            <p>First name: {currentUser?.firstName}</p>
            <p>Last name: {currentUser?.secondName}</p>
            <p>Gender: {currentUser?.gender === 'male' ? 'Man' : 'Woman'}</p>
            <p>Status: {currentUser?.role === 'admin' ? 'Administrator' : 'User'}</p>
            <p>Date of birth: {getDateDDMMYYYY(currentUser?.birthYear || Date.now())}</p>
          </Paper>
        </div>

        {isFireBase && (
          <>
            <h3>Data initialization in FireBase</h3>
            <ul>
              <li>Status: {status}</li>
              <li>Progress: {progress}%</li>
              {error && <li>error: {error}</li>}
            </ul>
            <button className='btn btn-primary' onClick={handleClick}>
              Initialize
            </button>
          </>
        )}
      </main>
    );
  }
  return (
    <main className='main-profile__page'>
      <h1 className='visually-hidden'>User profile</h1>
      <h2>User page not found</h2>
    </main>
  );
};

export default UserProfile;
