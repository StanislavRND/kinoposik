'use client';

import { sendCode } from '@/shared/services/auth';
import { userAuth } from '@/shared/services/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonNext } from '../../ui/index';
import styles from './auth.module.scss';

type Input = {
  sms: string;
};

type Props = {
  phoneValue: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormSms = ({ phoneValue, setIsModal, setIsAuthenticated }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Input>();
  const [isCursor, setIsCursor] = useState(false);
  const [sms, setSms] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputSms = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value.replace(/\D/g, '');

    if (value.length >= 1) {
      setIsCursor(true);
    } else {
      setIsCursor(false);
    }

    (event.target as HTMLInputElement).value = value;

    setSms(value);
    setValue('sms', value);
  };

  useEffect(() => {
    const fetchCode = async () => {
      if (phoneValue) {
        const generatedCode = await sendCode(phoneValue);
        setCode(generatedCode);
      }
    };
    fetchCode();
  }, [phoneValue]);

  const onSubmit = async () => {
    try {
      if (sms === code) {
        setIsLoading(true);
        await userAuth(phoneValue);
        setIsModal(false);
        setIsAuthenticated(true);
      } else {
        setError('Неправильный код подтверждения');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setError('Ошибка авторизации. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
      document.body.style.overflow = 'visible';
    }
  };

  const isButtonDisabled = sms.length !== 6;

  return (
    <>
      <div className={styles.code}>{code.length === 0 ? 'Загрузка...' : code}</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.auth__text}>код отправлен на номер телефона {phoneValue}</div>
        <div className={styles.inputContainer}>
          <input
            {...register('sms')}
            maxLength={6}
            className={`${styles.input} ${styles.sms}`}
            style={{
              paddingLeft: isCursor ? '8px' : '0px',
              marginBottom: error.length !== 0 ? '0px' : '2.6rem',
            }}
            type="text"
            autoComplete="off"
            onChange={handleInputSms}
          />

          {error.length !== 0 && <p className={styles.sms__error}>{error}</p>}
        </div>

        <ButtonNext isLoading={isLoading} isButtonDisabled={isButtonDisabled} />
      </form>
    </>
  );
};
