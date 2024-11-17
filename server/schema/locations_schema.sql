CREATE TABLE locations (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    type ENUM('Gym', 'Yoga Club', 'Crossfit', 'Public Park', 'Gym Outdoor') NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
);

INSERT INTO locations (name, latitude, longitude, type, description) VALUES 
('DiR Claris', 41.3937, 2.1666, 'Gym', 'Popular gym in central Barcelona'),
('Holmes Place Balmes', 41.3876, 2.1611, 'Gym', 'High-end gym with premium facilities'),
('Anytime Fitness Eixample', 41.3982, 2.1669, 'Gym', '24/7 fitness center in Eixample'),
('Yoga One Mandri', 41.4016, 2.1398, 'Yoga Club', 'Yoga studio with a variety of classes'),
('Yoga Bindu', 41.3994, 2.1743, 'Yoga Club', 'Small and cozy yoga studio'),
('The Studio Barcelona', 41.4030, 2.1761, 'Yoga Club', 'Yoga and meditation classes in Eixample'),
('CrossFit Eixample', 41.3931, 2.1717, 'CrossFit', 'CrossFit box in the heart of Eixample'),
('CrossFit Gala', 41.3799, 2.1449, 'CrossFit', 'Great for high-intensity cross-training workouts'),
('CrossFit Grey Fox', 41.3990, 2.2047, 'CrossFit', 'Modern facilities and personalized training'),
('Parc de la Ciutadella', 41.3860, 2.1871, 'Public Park', 'Large park with plenty of space for running and outdoor activities'),
('Parc del Guinardó', 41.4186, 2.1709, 'Public Park', 'Hilly park with great views, perfect for outdoor exercises'),
('Parc de Montjuïc', 41.3636, 2.1584, 'Public Park', 'Great location for jogging and exercising with a view'),
('Parc de la Barceloneta (Zona de Calistenia)', 41.3818, 2.1945, 'Outdoor Gym', 'Calisthenics equipment close to the beach'),
('Parc del Poblenou (Zona Workout)', 41.3993, 2.2061, 'Outdoor Gym', 'Open-air workout area with basic equipment'),
('Parc de l\'Estació del Nord', 41.3958, 2.1836, 'Outdoor Gym', 'Workout station located in a public park');
