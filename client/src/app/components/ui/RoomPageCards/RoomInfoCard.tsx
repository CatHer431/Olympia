import React from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MoodIcon from '@mui/icons-material/Mood';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Divider from '../../common/Divider/Divider';

const RoomInfoCard = () => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Room information</h3>
      <ul className='features-list'>
        <li className='features-list__item'>
          <div className='feature'>
            <MoodIcon className='feature__icon' />
            <div className='feature-content'>
              <div className='feature__title'>Comfort</div>
              <div className='feature__subtitle'>Noise-absorbing walls</div>
            </div>
          </div>
          <Divider className='feature-separator' />
        </li>
        <li className='features-list__item'>
          <div className='feature'>
            <LocationCityIcon className='feature__icon' />
            <div className='feature-content'>
              <div className='feature__title'>Convenience</div>
              <div className='feature__subtitle'>Window in each bedroom</div>
            </div>
          </div>
          <Divider className='feature-separator' />
        </li>
        <li className='features-list__item'>
          <div className='feature'>
            <WhatshotIcon className='feature__icon' />
            <div className='feature-content'>
              <div className='feature__title'>Cozy</div>
              <div className='feature__subtitle'>The room is equipped with a fireplace</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RoomInfoCard;
