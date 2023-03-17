import { TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { getAuthErrors, signUp } from '../../../../store/users';
import { UserType } from '../../../../types/types';
import Button from '../../../common/Button/Button';
import { DatePickerField, InputField, RadioGroup } from '../../../common/Fields';
import withPassword from '../../../common/Fields/HOC/withPassword';
import Switch from '../../../common/Switch';
import validatorConfig from './validatorConfig';

const genderItems = [
  { id: 'male', title: 'Man' },
  { id: 'female', title: 'Woman' },
];

const initialData: UserType = {
  firstName: '',
  secondName: '',
  gender: 'male',
  role: 'user',
  birthYear: Date.now(),
  email: '',
  password: '',
  subscribe: false,
};

const RegisterForm = () => {
  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(signUp(data));
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <InputField autoFocus name='firstName' label='First name' />
        <InputField name='secondName' label='Last name' />
        <RadioGroup name='gender' items={genderItems} />
        <DatePickerField
          value={data.birthYear}
          onChange={handleInputChange}
          openTo='year'
          mask='__.__.____'
          label='Date of birth'
          name='birthYear'
          minDate={new Date('1950-01-01')}
          renderInput={params => (
            <TextField {...params} {...(errors?.birthYear && { error: true, helperText: errors?.birthYear })} />
          )}
        />
        <InputField name='email' label='Email' />        
        <InputFieldWithPassword name='password' label='Password' type='password' />
        {/*<Switch name='subscribe' label='Receive special offers' onChange={handleInputChange} />*/}
        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Sign up
        </Button>
      </Form>
      {loginError && <p className='form__enter-error'>{loginError}</p>}
    </>
  );
};

export default RegisterForm;
