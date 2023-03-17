import { RoomType } from './../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof RoomType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  roomNumber: {
    isRequired: {
      message: 'The field "room number" is required',
    },
  },
  price: {
    isRequired: {
      message: 'The field "Rent per day" is required',
    },
    isValidInterval: {
      message: 'Enter a price from 0 to 1000',
      value: [0, 1000],
    },
  },
};

export default validatorConfig;
