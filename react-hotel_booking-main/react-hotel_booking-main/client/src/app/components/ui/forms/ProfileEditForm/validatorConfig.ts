import { UserType } from '../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof UserType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  firstName: {
    isRequired: {
      message: 'The field "First name" is required',
    },
  },
  secondName: {
    isRequired: {
      message: 'The field "Last name" is required',
    },
  },
  email: {
    isRequired: {
      message: 'Email is required',
    },
    isEmail: {
      message: 'The field "Email" is entered incorrectly',
    },
  },
  password: {
    isRequired: {
      message: 'The "Password" field is required',
    },
    isCapitalSymbol: {
      message: 'Password must contain at least 1 capital letter',
    },
    isContainDigit: {
      message: 'Password must contain at least 1 number',
    },

    min: {
      value: 8,
      message: 'Password must contain at least 8 characters',
    },
  },
};

export default validatorConfig;
