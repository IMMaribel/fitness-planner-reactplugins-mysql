CREATE TABLE calendar_events (
    id INT NOT NULL AUTO_INCREMENT,
    workout_id INT,
    event_date DATE NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (workout_id) REFERENCES workouts(user_id) ON DELETE CASCADE
);