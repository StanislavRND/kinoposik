import { useState } from 'react';
import {ButtonClose} from '../../ui/index';
import { FormPhone, FormSms } from './index';
import styles from './modal.module.scss';
import React from 'react';

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalAuth = ({ setIsModal, setIsAuthenticated }: Props) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [message, setMessage] = useState(false);


  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div
          style={!message ? { justifyContent: 'flex-end' } : { justifyContent: 'space-between' }}
          className={styles.button__block}>
          {message && (
            <svg
              onClick={() => setMessage(false)}
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                fill="white"
              />
            </svg>
          )}
          <ButtonClose setIsModal={setIsModal} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>FilmIndustry</div>
          <div className={styles.phone__text}>
            Введите {!message ? 'номер телефона' : 'код из СМС'}
          </div>
          {!message ? (
            <FormPhone setPhoneValue={setPhoneValue} setMessage={setMessage} />
          ) : (
            <FormSms setIsAuthenticated={setIsAuthenticated} phoneValue={phoneValue} setIsModal={setIsModal} />
          )}
        </div>
      </div>
    </div>
  );
};
