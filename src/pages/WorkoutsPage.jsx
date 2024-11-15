import React from 'react';
import Workouts from '../components/Workouts';
import { FaDumbbell  } from 'react-icons/fa';

const WorkoutsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className='flex space-x-5 text-4xl font-bold'> <FaDumbbell/>
        <h1 className=" text-4xl font-bold mb-4">
        Workouts </h1>
      </div>
      <Workouts />
    </div>
  );
};

export default WorkoutsPage;
