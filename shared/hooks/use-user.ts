import { useEffect, useState } from 'react';
import { getUserCurrent } from '../services/users';
import { User } from '../types/User';

export const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserCurrent();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return userData;
};
