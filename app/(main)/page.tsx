import { Slider } from '@/shared/components/index';
import { Premier } from '@/shared/components/shared/index';
import React from 'react';

const Home: React.FC = () => {
	console.log(process.env.NEXT_PUBLIC_API_URL);
	console.log(process.env.JWT_SECRET);
  return (
    <>
      <Slider />
      <Premier />
    </>
  );
};

export default Home;
