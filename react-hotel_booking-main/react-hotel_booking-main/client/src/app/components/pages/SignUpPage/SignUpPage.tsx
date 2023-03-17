import { Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import RegisterForm from '../../ui/forms/RegisterForm';

const SignUpPage: React.FC = () => {
  return (
    <>
      <h1 className='visually-hidden'>Registration</h1>
      <div className='login-form__wrapper'>
        <Paper elevation={3} className='form-card login-form__card'>
          <h2>Sign up</h2>
          <RegisterForm />
          <div className='login-form__footer'>
            <span>Already have an account on Olympia?</span>
            <Link to='./signIn' className='login-form__link'>
              <Button variant='outlined' size='small'>
                Log in
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default SignUpPage;
