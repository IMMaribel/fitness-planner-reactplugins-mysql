import React from 'react';
import WorkoutItem from './WorkoutItem';

function WorkoutList({ workouts, handleEdit, handleDelete }) {
  return (
    <ul>
      {workouts.map((workout, index) => (
        <WorkoutItem
          key={workout.user_id || index}
          workout={workout}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default WorkoutList;
