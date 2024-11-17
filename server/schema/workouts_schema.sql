DROP DATABASE IF EXISTS fitness_planner;

CREATE DATABASE fitness_planner;

USE fitness_planner;


CREATE TABLE workouts (
    user_id INT NOT NULL AUTO_INCREMENT, 
    workout_date DATE NOT NULL,
    workout_type ENUM('Strength', 'Cardio', 'Flexibility', 'Balance', 'Mixed') NOT NULL, 
    duration_minutes INT NOT NULL,
    intensity_level ENUM('Low', 'Medium', 'High', 'Very High') NOT NULL, 
    exercises VARCHAR(255) NOT NULL,
    calories_burned INT, 
    notes TEXT, 
    created_at TIMESTAMP NOT NULL DEFAULT (now()),
    PRIMARY KEY(user_id)
);

INSERT INTO workouts (user_id, workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes) 
VALUES
(1, '2024-11-10', 'Strength', 60, 'High', 'Bench Press, Squats, Deadlifts', 500, 'Good energy level, focused on form'),
(2, '2024-11-11', 'Cardio', 45, 'Medium', 'Running, Jump Rope', 300, 'Outdoor workout with hills'),
(3, '2024-11-12', 'Flexibility', 30, 'Low', 'Yoga, Stretching', 100, 'Recovery day, light session'),
(4, '2024-11-13', 'Balance', 20, 'Medium', 'Balance Board, Single-leg Squats', 150, 'Improved balance control'),
(5, '2024-11-14', 'Mixed', 50, 'Very High', 'HIIT, Kettlebell Swings', 600, 'High intensity, full body workout');


