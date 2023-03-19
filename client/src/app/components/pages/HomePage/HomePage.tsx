import { Paper } from '@mui/material';
import React from 'react';
import Container from '../../common/Container';
import { SearchRoomsForm } from '../../ui/forms';

const HomePage: React.FC = () => {
  return (
    <main className='main-home__page'>
      <Container>
        <div className='main-home__wrapper'>
          <h1 className='visually-hidden'>Hotel room search</h1>
          <Paper elevation={3} className='form-card searchRooms-form'>
            <h2>Let find a right hotels for you.</h2>
            <SearchRoomsForm />
          </Paper>
          <p className='main__text-wishes'>The best rooms for your work, leisure and inspiration</p>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
