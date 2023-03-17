import { Link } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import React from 'react';
import Container from '../Container';
import Divider from '../Divider';
import { InputField } from '../Fields';
import withSubscribe from '../Fields/HOC/withSubscribe';
import Logo from '../Logo';

const Footer = () => {
  const SubscribeInput = withSubscribe(InputField);

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-wrapper'>
          <div className='footer-item footer-item--logo'>
            <div className='footer-logo'>
              <Logo />
              <p className='footer-logo__text'>
                  Booking rooms in the best hotels of 2023 according to the Hotel Views Association
              </p>
            </div>
          </div>

          <div className='footer-item footer-item--newsletter'>
            <form className='footer-newsletter'>
              <p className='footer-newsletter__title'>Signature</p>
              <span>Receive special offers and service news</span>
              <div className='footer-newsletter__input'>
                <SubscribeInput size='small' placeholder='Email' name='email' type='email' />
              </div>
            </form>
          </div>
        </div>
      </Container>
      <Divider variant='fullWidth' className='footer-divider' />
      <Container>
        <div className='footer-bottom'>
          <p className='footer-copyright'>Copyright © 2023 Olympia. All rights reserved.</p>
          <Link underline='none' href='https://github.com/CatHer431/Olympia' rel='noopener noreferrer' target='_blank'>
            <div className='footer-social'>
              <GitHub />
              <span className='footer-social__link'>Olympia</span>
            </div>
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
