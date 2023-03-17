import React from 'react';

const RoomRulesCard = () => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Regulations</h3>
      <ul className='bullet-list'>
        <li className='bullet-list__item'>Not allowed with pets</li>
        <li className='bullet-list__item'>No parties or events</li>
        <li className='bullet-list__item'>Check-in time is after 1:00 AM and check-out is before 12:00 PM</li>
      </ul>
    </div>
  );
};

export default RoomRulesCard;
