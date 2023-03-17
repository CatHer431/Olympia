import React, { useCallback } from 'react';
import { useFiltersQuery } from '../../../../hooks';
import Button from '../../../common/Button';
import { Checkbox, CheckBoxList, DateOfStayField, RangeSliderField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter/GuestsCounter';
import RoomsFilterList from './RoomsFiltersList/RoomsFiltersList';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  price: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

type RoomsFilterProps = {
  onReset: () => void;
};

const RoomsFilter: React.FC<RoomsFilterProps> = ({ onReset }) => {
  const { searchFilters, handleChangeFilter, handleResetSearchFilters } = useFiltersQuery();

  const handleResetFilters = useCallback(
    e => {
      e.preventDefault();
      handleResetSearchFilters();
      onReset();
    },
    [handleResetSearchFilters, onReset]
  );

  const data = { ...initialState, ...searchFilters };

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Room search at Olympia</h2>
      <RoomsFilterList data={data} handleChange={handleChangeFilter}>
        <DateOfStayField data={data} onChange={handleChangeFilter} title='Date of stay at the hotel' />
        <GuestsCounter data={data} onChange={handleChangeFilter} />
        <RangeSliderField
          label='Price range'
          description='Cost per night stay in the room'
          name='price'
          onChange={handleChangeFilter}
          min={0}
          max={15000}
        />
        <CheckBoxList title='Facilities'>
          <Checkbox label='Wi-Fi' name='hasWifi' />
          <Checkbox label='Air conditioner' name='hasConditioner' />
          <Checkbox label='Workplace' name='hasWorkSpace' />
        </CheckBoxList>
        <CheckBoxList title='Accommodation conditions'>
          <Checkbox label='Allowed with pets' name='canPets' />
          <Checkbox label='Smoking permitted' name='canSmoke' />
          <Checkbox label='You can invite guests (up to 10 people)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList title='Availability'>
          <Checkbox
            label='wide corridor'
            name='hasWideCorridor'
            labelDetails='The width of the corridors in the room is at least 5 feet'
          />
          <Checkbox
            label='Helper for the Disabled'
            name='hasDisabledAssistant'
            labelDetails='On the 1st floor you will be met by a specialist and escorted to your room'
          />
        </CheckBoxList>
        <Button type='button' onClick={handleResetFilters} fullWidth>
          Reset Filters
        </Button>
      </RoomsFilterList>
    </section>
  );
};

export default React.memo(RoomsFilter);
