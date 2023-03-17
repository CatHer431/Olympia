import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { updateRoomData } from '../../../../store/rooms';
import { RoomType } from '../../../../types/types';
import Button from '../../../common/Button';
import { Checkbox, CheckBoxList, InputField, RadioGroup, SelectField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

type RoomEditFormProps = {
  roomData: RoomType | undefined;
  onCloseModal: () => void;
};

const roomType = [
  { id: 'Standard', title: 'Standard' },
  { id: 'Lux', title: 'Lux' },
];
const roomComfortsOptions = [
  { name: 'Wi-Fi', value: 'hasWifi' },
  { name: 'Workplace', value: 'hasWorkSpace' },
  { name: 'Air conditioner', value: 'hasConditioner' },
];

const RoomEditForm: React.FC<RoomEditFormProps> = ({ roomData, onCloseModal }) => {
  const initialData: RoomType = {
    _id: roomData?._id || 'not found',
    roomNumber: roomData?.roomNumber || '',
    type: roomData?.type || 'Standard',
    price: roomData?.price || 0,
    comforts: roomData?.comforts || [],
    canPets: roomData?.canPets || false,
    canSmoke: roomData?.canSmoke || false,
    canInvite: roomData?.canInvite || false,
    hasWideCorridor: roomData?.hasWideCorridor || false,
    hasDisabledAssistant: roomData?.hasDisabledAssistant || false,
  };

  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validate(data)) {
      dispatch(updateRoomData(data));
      onCloseModal();
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <InputField name='roomNumber' label='Room number' autoFocus />
        <RadioGroup label='room type' name='type' items={roomType} value={roomData?.type} />
        <InputField name='price' label='Rent per day ($)' />
        <SelectField label='Facilities' name='comforts' options={roomComfortsOptions} multiple />
        <CheckBoxList>
          <Checkbox label='Allowed with pets' name='canPets' />
          <Checkbox label='Smoking permitted' name='canSmoke' />
          <Checkbox label='You can invite guests (up to 10 people)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList>
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

        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RoomEditForm;
