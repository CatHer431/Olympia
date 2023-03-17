import { ReviewType } from '../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof ReviewType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  content: {
    isRequired: { message: 'The "Message" field must not be empty' },
  },
};

export default validatorConfig;
