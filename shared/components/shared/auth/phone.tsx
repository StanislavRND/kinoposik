'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonNext } from '../../ui/index';
import styles from './auth.module.scss';

type Input = {
  phone: string;
};

interface Props {
  setPhoneValue: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<boolean>>;
}

export const FormPhone = ({ setPhoneValue, setMessage }: Props) => {
  const { register, handleSubmit, setValue, setFocus } = useForm<Input>();
  const [isVisibleClear, setIsVisibleClear] = useState(false);
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState<number>();
	const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('phone', value);
    setPhone(value);
    setOperator(Number(value.slice(2, 6)));

    if (value.length > 2) {
      setIsVisibleClear(true);
    } else if (value.length < 3) {
      setIsVisibleClear(false);
    }
  };

  const handleLabelClick = () => {
    setValue('phone', '+7');
    setPhone('');
    setIsVisibleClear(false);
    setFocus('phone');
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value.replace(/\s/g, '');

    value = value.replace(/[^0-9]/g, '');

    let formattedValue = '+7';
    for (let i = 1; i < value.length; i++) {
      if (i === 1 || i === 4 || i === 7 || i === 9) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    setValue('phone', formattedValue);
  };

  const onSubmit = (data: Input) => {
    setPhoneValue(data.phone);
    setMessage(true);
		setIsLoading(true);
  };

  const isButtonDisabled =
    phone.length !== 16 || (operator !== undefined && (operator < 900 || operator > 997));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.auth__text}>чтобы войти или зарегистрироваться на Кинопосик</div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          {...register('phone')}
          defaultValue={'+7 '}
          maxLength={16}
          placeholder="+7"
          autoComplete="off"
          onInput={handleInput}
          onChange={handleChange}
        />
        {isVisibleClear && (
          <label onClick={handleLabelClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 329.26933 329"
              width="329pt">
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
            </svg>
          </label>
        )}
      </div>
      <ButtonNext isLoading={isLoading} isButtonDisabled={isButtonDisabled} />
      <div className={styles.agreement}>
        Нажимая «Продолжить», я принимаю условия <a href="#">Пользовательского соглашения</a> ООО
        «Кинопосик»
      </div>
    </form>
  );
};
